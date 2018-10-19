<template>
  <div class="preview">
    <div v-if="game">
      À suivre :<br/>
      {{ game }}
    </div>
    <div v-else>Nous serons bientôt de retour</div>
    <div v-if="next">
      <VueCountdown :time="next">
        <template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
      </VueCountdown>
    </div>
  </div>
</template>

<script>
import VueCountdown from '@xkeshi/vue-countdown'

export default {
  components: {
    VueCountdown,
  },

  props: ['game', 'next']
}
</script>

<style>
.preview {
  margin: 10px 0;
}
</style>