<h2>MusicXML2JSON</h2>

<div>The purpose of this Node module is to convert a MusicXML file into a to a timestamped JSON file.</div>


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



<p align="center">
  <img src="data-visualisation/visualization.png" width="750"/>
 
</p>

<h2>MusicJSON Attributes</h2>

<h4>Instrument</h4>
<div>
   Instrument name.
</div>
<h5>Voice</h5>
<div>
   Voice number within MusicXML part.
</div>

<h5>Midi number</h5>
<div>
   Number between 0 and 127 where 60 = Middle C = C4. 
</div>
<h5>Duration</h5>
<div>
   Lengh of a note or rest, where quarter note = 256.
</div>

<h5>Duration due to tied notes</h5>
<div>
   Modifier of the Duration attribute, due to tied values. Notes that are tied to a next note will accumulate the duration of the next note. Notes that are tied to a prior note will have 0 value.
</div>

<h5>Harmony note flag</h5>
<div>
   Boolean indicating note has been encoded as a MusicXML chord
</div>
<h5>Measure</h5>
<div>
   Integer representing current measure
</div>
<h5>Absolute Location</h5>
<div>
   Location of a beginning of a note of rest, where a quarter note = 256
</div>

<h5>Measure location</h5>
<div>
   Location of a measure in quarter notes, where a quarter note = 256
</div>

<h5>Location in measure</h5>
<div>
   Location of the beginning of a note or rest within a measure, where a quarter note = 256
</div>

<h5>Time signature numerator</h5>
<div>
   Number of beats in a measure
</div>

<h5>Time signature denominator</h5>
<div>
   Type of beats in a measure
</div>

<h5>Quarter beats per minute</h5>
<div>
   This is a standard bpm metronome measure, however, all values are converted to quarter note beats per minute.
</div>
<h5>Timestamp</h5>
<div>
   Time relative to beginning of music, calculated from the Absolute Location and Quarter Beats Per Minute attribute
</div>




<h2>Timestamps</h2>
<h3>Duration</h3>
<p>I have kept the conventino of a quarter note equating to 256.  whole note equating to 1024, and bases all calculations around this. In order to keep all durations consisent, it encoded with two numbers, 1024 and a denominator number for division. For example, a quarter note is encoded as 4, being 1024 / 4 = 256. A quater note triplet is encoded as 6, being 1024 / 6. This avoids the irrational numbers and makes aggregation easier based on a quarter note divisions. The whole note has been kept at 1024 as per the musicXML specification. All durations are are a division of 1024, so a quarter note triplet is encoded as the rational number 1024/6</p>
<p>Duration has been encoded with two attributes, duration, and durationWithNotations. The durationWithNotations is the important one as it will include any tied note information </p>
<h3>Location</h3>
<p>Location is encoded with two attributes, a measure int and location in the bar as denominator.</p>

<h2>Other encoding</h2>
<h3>Markings</h3>
<p>Markings is an array of string values including any additional information besides frequency, location and duration. This works well for me, but it is easy to modify the code to change this if needed. I have worked through the MusicXML spec. There are probably faster ways to do this, but its here being used as a preprocessor</p>

<h2>Testing</h2>
<p>The tests folder contains  what you would expect. I have also included some visualisation tests D3.js and Express</p>

<h3>Usage</h3>
<p>Logging is optional and handy to turn on if run into any issues during parsing. You can pass a flag to return basic stats. You can also pass the module a metadata object, a group of key value pairs which will also be included in the note and rest events </p>