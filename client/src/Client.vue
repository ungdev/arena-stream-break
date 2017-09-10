<template>
  <div id="app">
    <a-background ref="bg" :recording="recording" :fakeParticles="fakeParticles"></a-background>
    <div class="a-content" v-if="!recording">
      <a-logo></a-logo>
      <div class="a-content__text">
        <a-title></a-title>
        <a-next
          :title="title"
          :subtitle="subtitle"
          :countdown="countdown"
          @done="autostartCheck"
          ref="next"></a-next>
        <a-partners></a-partners>
      </div>
    </div>
    <a-music ref="music"></a-music>
    <a-motion-control v-if="!recording"></a-motion-control>
  </div>
</template>

<script>
import io from 'socket.io-client'
import download from 'downloadjs'

import Background from './components/Background.vue'
import Logo from './components/Logo.vue'
import Title from './components/Title.vue'
import Next from './components/Next.vue'
import Partners from './components/Partners.vue'
import Music from './components/Music.vue'
import MotionControl from './components/MotionControl.vue'

export default {
  components: {
    'a-background': Background,
    'a-logo': Logo,
    'a-title': Title,
    'a-next': Next,
    'a-partners': Partners,
    'a-music': Music,
    'a-motion-control': MotionControl
  },

  data() {
    return {
      // config
      recording: false,
      recordingIntro: false,
      fakeParticles: true,

      title: 'Stream interrompu',
      subtitle: '',
      countdown: null,
      autostart: false
    }
  },

  mounted() {
    if (!this.recording) {
      this.io = io()

      this.io.on('reset', () => {
        location.reload()
      })

      this.io.on('start', () => {
        this.play()
      })

      this.io.on('next', (next) => {
        this.title = next.title
        this.subtitle = next.subtitle
        this.countdown = next.countdown
        this.autostart = next.autostart

        setTimeout(() => {
          this.$refs.next.nextUpdate()
        })
      })
    }

    if (this.recording) {
      if (this.recordingIntro) {
        setTimeout(() => {
          console.log('-- start playing')
          this.play()
        }, 6000)
      }

      const recordingTime = (this.recordingIntro) ? 50 * 1000 : 5 * 60 * 1000

      const canvas = this.$refs.bg.$refs.particles.$canvas
      const recordedBlobs = []
      const recorder = new MediaRecorder(canvas.captureStream(), {
        mimeType: 'video/webm',
        videoBitsPerSecond: 40 * 1000 * 1000
      })

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedBlobs.push(e.data)
        }
      }

      setTimeout(() => {
        console.log('-- start recording')
        // 10s buffer
        recorder.start(10000)
      }, 5000)

      setTimeout(() => {
        console.log('-- stop recording')
        recorder.stop()

        console.log(recordedBlobs.length, 'chunks')
        const full = new Blob(recordedBlobs)

        download(full, 'test.webm', 'video/webm')
      }, recordingTime + 5000)
    }
  },

  methods: {
    play() {
      this.$el.classList.add('a--hiding')

      setTimeout(() => {
        this.$refs.bg.play()

        if (!this.fakeParticles)  {
          this.$refs.music.play()
        }
      }, 2500)
    },

    autostartCheck() {
      if (this.autostart) {
        this.play()
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  height: 100vh;
  width: 100vw;

  overflow: hidden;
}

.a-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 35vh;
}

.a-content > .a-logo {
  flex-shrink: 1;
  padding: 0 50px;
}

.a-content__text {
  flex: 1;
}
</style>
