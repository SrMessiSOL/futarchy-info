import os,sys,pathlib,json,subprocess,hashlib,time
base=pathlib.Path('work/deep-review').resolve();sys.path.insert(0,str(base/'media-tools'))
os.environ['HF_HOME']=str(base/'model-cache')
import numpy as np
import imageio_ffmpeg
from faster_whisper import WhisperModel
from yt_dlp import YoutubeDL
ts=json.loads(pathlib.Path('content/transcripts.json').read_text())
model=WhisperModel('small.en',device='cpu',compute_type='int8',cpu_threads=4,download_root=str(base/'model-cache'),local_files_only=True)
dest=pathlib.Path('work/audio-gap-review.json');out=json.loads(dest.read_text()) if dest.exists() else []
for t in ts:
 gaps=t['qualityAudit']['untranscribedIntervals']
 if not gaps:continue
 name=t['resourceId'].replace('ownership-','').replace('-recording','').replace('-','')
 file=base/'recordings'/(name+('.m4a' if name.startswith('radio') else '.webm'))
 if not file.exists():
  with YoutubeDL({'format':'bestaudio','outtmpl':str(base/'recordings'/(name+'.%(ext)s')),'socket_timeout':20,'retries':1,'noprogress':True}) as dl:dl.download([t['sourceUrl']])
 sha=hashlib.sha256(file.read_bytes()).hexdigest()
 if t.get('audioSha256'):assert sha==t['audioSha256']
 for gap in gaps:
  if any(r['resourceId']==t['resourceId'] and r['start']==gap['start'] for r in out):continue
  start,end=gap['start'],gap['end'];decodeStart=max(0,start-5);decodeEnd=min(t['durationSeconds'],end+5)
  raw=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(decodeStart),'-t',str(decodeEnd-decodeStart),'-i',str(file),'-f','s16le','-ac','1','-ar','16000','pipe:1'],capture_output=True,check=True).stdout
  audio=np.frombuffer(raw,np.int16).astype(np.float32)/32768
  segments,info=model.transcribe(audio,beam_size=3,language='en',vad_filter=True,condition_on_previous_text=False)
  rows=[{'start':s.start+decodeStart,'end':min(decodeEnd,s.end+decodeStart),'text':s.text,'avgLogprob':s.avg_logprob,'noSpeechProbability':s.no_speech_prob} for s in segments]
  inGap=audio[int((start-decodeStart)*16000):int((end-decodeStart)*16000)]
  entry={'resourceId':t['resourceId'],'sourceUrl':t['sourceUrl'],'file':file.name,'audioSha256':sha,'start':start,'end':end,'decodedStart':decodeStart,'decodedEnd':decodeEnd,'sampleCount':len(inGap),'zeroFraction':float(np.mean(inGap==0)),'rms':float(np.sqrt(np.mean(inGap**2))),'method':'faster-whisper small.en CPU int8 beam 3; VAD enabled; original gap plus up to five seconds context; machine audio analysis, not manual listening','segments':rows}
  out.append(entry);dest.write_text(json.dumps(out,indent=2),encoding='utf8');print(t['resourceId'],round(start),round(end),'segments',len(rows),'zero',round(entry['zeroFraction'],4),flush=True)
