<h2>MusicXML2Json Node Module</h2>

<div>The purpose of this module is to convert MusicXML files to timestamped JSON.</div>


<div>Sample output:</div>


```javascript
{[
{ 
  midiNumber: 56,
  isHarmony: false,
  measure: '31',
  duration: 768,
  instrument: 'P3-I1',
  currentVoice: 1,
  notations: [ { tied: [Object] } ],
  location: 0,
  durationWithNotations: 768 
},
  { 
  midiNumber: 56,
  isHarmony: false,
  measure: '32',
  duration: 512,
  instrument: 'P3-I1',
  currentVoice: 1,
  notations: [ { tied: [Object] } ],
  location: 0,
  durationWithNotations: 512
}
]}
```
<h2>Duration</h2>
<p>To ensure accurate location and duration, all time is kept as rational number, based on a quarter note divisions. The whole note has been kept at 1024 as per the musicXML specification. All durations are are a division of 1024, so a quarter note triplet is encoded as the rational number 1024/6</p>