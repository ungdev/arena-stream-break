<template>
  <div class="home">
    <video src="../assets/background.mp4" autoplay loop></video>
    <div class="content">
      <img src="../assets/logo.png" alt="logo">
      <div class="infos-wrapper">
        <div class="infos">
          <h1 v-if="game">
            À suivre :<br/>
            {{ game }}
          </h1>
          <h1 v-else>Nous serons bientôt de retour</h1>
          <h1 v-if="next">
            <VueCountdown :time="next">
              <template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
            </VueCountdown>
          </h1>
        </div>
      </div>
    </div>

    <Social />
    <Partners />
  </div>
</template>

<script>
import VueCountdown from '@xkeshi/vue-countdown'
import io from 'socket.io-client'

import Partners from '@/components/Partners'
import Social from '@/components/Social'

export default {
  components: {
    VueCountdown,
    Partners,
    Social
  },

  data: () => ({
    game: '',
    next: null
  }),

  mounted() {
    this.socket = io()

    this.socket.on('state', ({ game, next }) => {
      this.game = game
      this.next = next
    })
  }
}
</script>

<style scoped> 
video {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 100%; 
  min-height: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.content {
  max-width: 1600px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

.content > img {
  width: 42%;
  position: absolute;
  top: calc(50% - 100px);
  right: 0;
  transform: translateY(-50%);
}

.infos-wrapper {
  position: absolute;
  left: 20px;
  top: calc(50% - 150px);
  transform: translateY(-50%);
  box-shadow: 0 0 0 4px #fff,
              0 5px 10px rgba(0,0,0,.8);
}

.infos {
  background-color: rgba(0,0,0,.1);
  backdrop-filter: blur(10px);
  font-size: 22px;
  padding: 40px;
  min-width: 300px;
}

h1 {
  color: #fff;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
}

h1:not(:last-child) {
  margin-bottom: 10px;
}
</style>