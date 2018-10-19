<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
  letter-spacing: .5px;
}


@font-face {
  font-family: 'MotionControl';
  src: url('./assets/Technoma_UA_2018.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2 {
  font-family: MotionControl, sans-serif;
}
</style>
