# UTT Arena 2017 — Stream break

Stream Break url : http://localhost:8080
Admin url : http://localhost:8080/admin

## Stream Break Configuration

`client/src/Client.vue`

Change:

```
  recording: true,
  recordingIntro: true,
  fakeParticles: false,
```

Recording: automatically record and download webgl (webgl -> webm)
Recording quality : 40kbps on intro, default on background (remove option `videoBitsPerSecond`)

## FFmpeg cheatsheet

Change container (fix weird start/end timings)
`ffmpeg -i test.webm -c copy intro.mp4`

Convert 60fps to 30fps
`ffmpeg -i input.mp4 -r 30 output.30fps.mp4`
