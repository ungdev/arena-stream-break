<template>
    <div class="a-timeout" v-show="target">
        <h2 v-if="!pending">{{ countdown }}</h2>
        <h2 class="a-timeout__right-away" v-else>Dans quelques instants</h2>
    </div>
</template>

<script>
import moment from 'moment'
import ms from 'ms'

export default {
    props: [ 'in', 'active' ],

    data() {
        return {
            pending: false,
            target: null,
            doneSent: false,
            countdown: ''
        }
    },

    mounted() {
        this.parseCountdown = this.parseCountdown.bind(this)

        this.parseCountdown()
    },

    methods: {
        nextUpdate() {
            this.doneSent = false
            this.target = this.in ? Date.now() + ms(this.in) : null
            this.parseCountdown()
        },

        parseCountdown() {
            if (!this.in) {
                return
            }

            const now = Date.now()
            const diff = Math.round((this.target - now) / 1000)

            let min = Math.floor(diff / 60)
            let sec = diff % 60

            if (min <= 0 && sec <= 0) {
                this.pending = true
                return
            }

            if (!this.doneSent && min === 0 && sec === 2) {
                this.doneSent = true
                this.$emit('done')
            }

            if (min < 10) {
                min = `0${min}`
            }

            if (sec < 10) {
                sec = `0${sec}`
            }

            this.countdown = `${min}:${sec}`.replace(/0/g, 'O')

            setTimeout(this.parseCountdown, 150)
        }
    }
}
</script>

<style>
.a-timeout {
    margin-top: -21px;
    display: inline-block;

    background-color: #19222d;
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-top: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.a-timeout h2 {
    color: #7adbc0;
    background-color: #19222d;
    padding: 10px 20px;
}

.a-timeout h2.a-timeout__right-away {
    font-size: 42px;
}
</style>
