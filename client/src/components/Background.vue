<template>
    <div class="a-background">
        <a-particles
            ref="particles"
            :recording="recording"
            :fakeParticles="fakeParticles"></a-particles>
        <div v-if="!recording"></div>
        <div v-if="!recording" class="a-background__tile a-background__tile-first"></div>
        <div v-if="!recording" class="a-background__tile a-background__tile-last"></div>
    </div>
</template>

<script>
import Particles from './Particles.vue'

export default {
    props: ['recording', 'fakeParticles'],

    data() {
        return {
            playing: false
        }
    },

    components: {
        'a-particles': Particles
    },

    methods: {
        play() {
            this.$refs.particles.play()
        }
    }
}
</script>

<style>
.a-background {
    position: relative;

    height: 100vh;
    background-color: #000;
}

.a-background__tile {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 50vh;

    background-image: url(../assets/backgroundTile.png);
    background-size: 70px;

    transition: 1s transform ease-out;
    transition-delay: 1.75s;
}

.a-background__tile-first {
    background-position: bottom;
}

.a-background__tile-last {
    top: 50vh;
    margin-top: -4px;
    height: calc(50vh + 4px);

    background-position: top;
}

.a--hiding .a-background__tile-first {
    transform: translateY(-100%);
}

.a--hiding .a-background__tile-last {
    transform: translateY(100%);
}
</style>
