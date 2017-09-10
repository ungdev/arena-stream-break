<template>
    <div class="a-next">
        <h3 v-if="hasNext">Prochaine animation :</h3>
        <div class="a-next__table">
            <div class="a-next__row">
                <h2>{{ title }}</h2>
            </div>
            <div class="a-next__row">
                <h4>{{ subtitle }}</h4>
            </div>
        </div>
        <div></div>
        <a-timeout
            :in="countdown"
            :active="hasCountdown"
            @done="done"
            ref="countdown"></a-timeout>
    </div>
</template>

<script>
import Timeout from './Timeout.vue'

export default {
    props: ['title', 'subtitle', 'countdown'],

    components: {
        'a-timeout': Timeout
    },

    data() {
        return {
            hasCountdown: false,
            hasNext: false
        }
    },

    methods: {
        done() {
            this.$emit('done')
        },

        nextUpdate() {
            console.log('nextUpdate', this.title, this.subtitle, this.countdown)
            this.hasNext = this.title.length > 0 && this.subtitle.length > 0
            this.hasCountdown = !!this.countdown
            this.$refs.countdown.nextUpdate()
        }
    }
}
</script>

<style>
.a-next {
    text-align: center;
    opacity: 1;

    /*transition: .8s transform ease-out;*/
    transition: .8s opacity ease-out;
    transition-delay: 0.85s;
}

.a-next h3, .a-next h2, .a-next h4 {
    margin: 0;

    color: #7adbc0;
    font-family: 'MotionControl', Impact, sans-serif;
    font-size: 42px;
    text-transform: uppercase;
}

.a-next h2 {
    color: #fb9700;
    font-size: 54px;
}

.a-next h4 {
    color: #b7002b;
    font-size: 48px;
}

.a-next__table {
    display: inline-block;
    margin: 20px 0;
    padding: 20px 50px;

    background-color: #19222d;
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.a--hiding .a-next {
    /*transform: translateX(calc(100% + 100px));*/
    opacity: 0;
}
</style>
