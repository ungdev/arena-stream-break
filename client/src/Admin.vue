<template>
    <div id="app">
        <button @click="startStream">Start stream</button>
        <button @click="resetStream">Reset stream</button>
        <button @click="stopStream">Stop stream</button>

        <form @submit.prevent="updateNext">
            <input type="text" v-model.trim="title" placeholder="Title" />
            <div/>
            <input type="text" v-model.trim="subtitle" placeholder="Sous-titre" />
            <div/>
            <input type="text" v-model.trim="countdown" placeholder="Countdown ('1m', '5m', ...)" />
            <label>
                <input type="checkbox" v-model="autostart">
                Auto-start intro after countdown
            </label>
            <div/>
            <button>Update</button>
        </form>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data() {
        return {
            title: '',
            subtitle: '',
            countdown: null,
            autostart: false
        }
    },

    mounted() {
        this.io = io()
    },

    methods: {
        startStream() {
            this.io.emit('admin@start')
        },

        resetStream() {
            this.io.emit('admin@reset')
        },

        stopStream() {
            this.title = 'Stream Interrompu'
            this.subtitle = ''
            this.countdown = null
            this.autostart = true
            this.updateNext()
        },

        updateNext() {
            const hasCountdown = this.countdown && this.countdown.length > 0

            this.io.emit('admin@next', {
                title: this.title,
                subtitle: this.subtitle,
                autostart: this.autostart,
                countdown: hasCountdown ? this.countdown : null
            })
        }
    }
}
</script>
