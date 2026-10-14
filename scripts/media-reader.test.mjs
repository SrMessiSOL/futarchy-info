import test from 'node:test';
import assert from 'node:assert/strict';
import { resourceSeries } from '../lib/media-series.ts';
import { transcriptTime } from '../lib/transcript-time.ts';
test('series filters distinguish recordings from articles and similarly named sources', () => {
  assert.equal(resourceSeries({type:'podcast',title:'Ownership Radio #32: Kimia'}),'radio');
  assert.equal(resourceSeries({type:'video',title:'Ownership Roadshow #4: recording'}),'roadshow');
  assert.equal(resourceSeries({type:'video',title:'Ownership Forum #2'}),'forum');
  assert.equal(resourceSeries({type:'video',title:'Ownership Report #18'}),'report');
  assert.equal(resourceSeries({type:'podcast',title:'Ownership Podcast S2 E3'}),'founder');
  assert.equal(resourceSeries({type:'article',title:'Ownership Radio announcement'}),null);
  assert.equal(resourceSeries({type:'video',title:'Ownership Radioactive'}),null);
});
test('transcript timestamps preserve hours and floor subsecond timing', () => {
  assert.equal(transcriptTime(3661.8),'01:01:01');
  assert.equal(transcriptTime(59.9),'00:00:59');
});
import { transcriptPassages } from '../lib/transcript-time.ts';
test('readable passages preserve words, original anchors and gaps without mutating captions', () => {
  const segments = [{start:0,end:3,text:'Hello and'}, {start:3,end:6,text:'welcome.'}, {start:20,end:25,text:'Next speaker.'}];
  const before = JSON.stringify(segments);
  assert.deepEqual(transcriptPassages(segments), [{start:0,end:6,text:'Hello and welcome.',index:0},{start:20,end:25,text:'Next speaker.',index:2}]);
  assert.equal(JSON.stringify(segments), before);
});
