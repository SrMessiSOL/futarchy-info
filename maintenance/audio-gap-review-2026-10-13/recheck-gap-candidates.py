import os,sys,pathlib,json,subprocess
base=pathlib.Path('work/deep-review').resolve();sys.path.insert(0,str(base/'media-tools'));os.environ['HF_HOME']=str(base/'model-cache')
import numpy as np
import imageio_ffmpeg
from faster_whisper import WhisperModel
model=WhisperModel('small.en',device='cpu',compute_type='int8',cpu_threads=4,download_root=str(base/'model-cache'),local_files_only=True)
targets=[('radio1',115,150),('radio12',235,275),('radio14',260,295),('radio16',25,85),('radio29',600,700)]
out=[]
for name,start,end in targets:
 raw=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(start),'-t',str(end-start),'-i',str(base/'recordings'/(name+'.m4a')),'-f','s16le','-ac','1','-ar','16000','pipe:1'],capture_output=True,check=True).stdout
 audio=np.frombuffer(raw,np.int16).astype(np.float32)/32768
 segs,_=model.transcribe(audio,beam_size=5,language='en',vad_filter=False,condition_on_previous_text=False,word_timestamps=True)
 rows=[{'start':s.start+start,'end':s.end+start,'text':s.text,'avgLogprob':s.avg_logprob,'noSpeechProbability':s.no_speech_prob,'words':[{'start':w.start+start,'end':w.end+start,'word':w.word,'probability':w.probability} for w in s.words]} for s in segs]
 out.append({'file':name,'start':start,'end':end,'method':'small.en int8 CPU beam 5, VAD disabled, word timestamps, no prompt or context conditioning','segments':rows})
 pathlib.Path('work/audio-gap-candidates.json').write_text(json.dumps(out,indent=2),encoding='utf8');print(name,json.dumps(rows),flush=True)
