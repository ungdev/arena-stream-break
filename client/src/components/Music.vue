<template>
    <audio :src="soundFile"></audio>
</template>

<script>
import soundFile from '../assets/skin.contest.ogg'

export default {
    data() {
        return {
            soundFile
        }
    },

    methods: {
        play() {
            console.log('-- start audio')
            this.$el.play()
        }
    }
}
</script>
