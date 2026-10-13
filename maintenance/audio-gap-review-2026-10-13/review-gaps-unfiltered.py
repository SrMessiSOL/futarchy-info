import os,sys,pathlib,json,subprocess
base=pathlib.Path('work/deep-review').resolve();sys.path.insert(0,str(base/'media-tools'));os.environ['HF_HOME']=str(base/'model-cache')
import numpy as np
import imageio_ffmpeg
from faster_whisper import WhisperModel
model=WhisperModel('base.en',device='cpu',compute_type='int8',cpu_threads=4,download_root=str(base/'model-cache'),local_files_only=True)
rows=json.loads(pathlib.Path('work/audio-gap-review.json').read_text())
out=[];dest=pathlib.Path('work/audio-gap-unfiltered.json')
if dest.exists():out=json.loads(dest.read_text())
for r in rows:
 if any(x['resourceId']==r['resourceId'] and x['start']==r['start'] for x in out):continue
 segments=[]
 for offset in np.arange(r['start'],r['end'],30):
  end=min(float(offset)+30,r['end'])
  raw=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(offset),'-t',str(end-offset),'-i',str(base/'recordings'/r['file']),'-f','s16le','-ac','1','-ar','16000','pipe:1'],capture_output=True,check=True).stdout
  audio=np.frombuffer(raw,np.int16).astype(np.float32)/32768
  if not len(audio):continue
  # Digital silence needs no recognizer; retain measured sample count in the first-pass evidence.
  if np.max(np.abs(audio))==0:continue
  seq,_=model.transcribe(audio,beam_size=1,language='en',vad_filter=False,condition_on_previous_text=False,temperature=0,max_new_tokens=96)
  for s in seq:segments.append({'start':float(offset)+s.start,'end':min(end,float(offset)+s.end),'text':s.text,'avgLogprob':s.avg_logprob,'noSpeechProbability':s.no_speech_prob})
 out.append({'resourceId':r['resourceId'],'start':r['start'],'end':r['end'],'audioSha256':r['audioSha256'],'method':'base.en CPU int8 beam 1, no VAD, independent 30-second windows, no context conditioning; recognizer output is candidate text only, including potential music/silence hallucinations.','segments':segments})
 dest.write_text(json.dumps(out,indent=2),encoding='utf8');print(r['resourceId'],round(r['start']),len(segments),flush=True)
