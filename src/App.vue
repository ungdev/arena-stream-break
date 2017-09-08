<template>
  <div id="app">
    <a-background></a-background>
    <a-logo></a-logo>
    <a-title></a-title>

    <a-motion-control></a-motion-control>
  </div>
</template>

<script>
import Background from './components/Background.vue'
import Logo from './components/Logo.vue'
import Title from './components/Title.vue'
import MotionControl from './components/MotionControl.vue'

export default {
  components: {
    'a-background': Background,
    'a-logo': Logo,
    'a-title': Title,
    'a-motion-control': MotionControl
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>
