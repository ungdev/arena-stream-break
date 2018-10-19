<template>
  <div class="admin">
    <div class="form">
      <a-input placeholder="Prochain jeu" v-model="game" />
      <br />
      <a-input placeholder="Timer (4s)" v-model="nextStr" />
      <br>
      <Preview :game="game" :next="next" />
      <a-button
        block
        :loading="loading"
        @click="update"
        type="primary">Valider</a-button>
    </div>
  </div>
</template>

<script>
import ms from 'ms'
import io from 'socket.io-client'
import Button from 'ant-design-vue/lib/button'
import Input from 'ant-design-vue/lib/input'
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/message/style/css'

import Preview from '@/components/Preview'

export default {
  components: {
    Preview,
    'a-button': Button,
    'a-input': Input
  },

  data: () => ({
    loading: false,
    game: '',
    nextStr: ''
  }),

  computed: {
    next() {
      return this.nextStr.length > 0 ? ms(this.nextStr) : null
    }
  },

  methods: {
    update() {
      this.loading = true

      this.socket.emit('setState', {
        game: this.game,
        next: this.next
      }, () => this.ack())
    },

    ack() {
      message.info('Done !')

      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  },

  mounted() {
    this.socket = io()
  }
}
</script>

<style scoped>
.admin {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(../assets/background.jpg);
  background-size: cover;
  background-position: center;
}

.form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  padding: 15px;
  background: #4a4a4a;
  border: 1px solid #fff;
  color: #fff;
}

input:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>