<template>
    <div class="a-particles">
        <div v-if="!fakeParticles"></div>
        <video :src="bg" v-if="fakeParticles" autoplay loop/>
        <video :src="intro" v-show="playing" ref="intro" />
        <img :src="logo" />
        <h1>UTT Arena 2017</h1>
    </div>
</template>

<script>
import logo from '../assets/logo.png'
import particles from '../lib/particles'
import bg from '../assets/particles.bg.mp4'
import intro from '../assets/intro.ua.2017.mp4'

/**
 * Music parts:
 * sound 00:000 -> 00:783
 * off 00:783 -> 01:247
 * sound 01:247 -> 03:151
 * off 03:151 -> 03:781
 * sound 03:781 -> 05:696
 * off 05:696 -> 06:305
 * sound 06:305 -> end
 */
const music = [
    0,
    720,
    1247,
    3000,
    3600,
    5450,
    6050,
    7500
]

const totalVideo = 8443

const linear = function (t) { return t }

export default {
    props: ['fakeParticles', 'recording'],

    data() {
        return {
            logo,
            bg,
            intro,
            playing: false
        }
    },

    mounted() {
        this.baseBrightness = 0.4
        this.targetBrightness = 0.4 * 10
        this.baseBlobiness = 1.1
        this.targetBlobiness = 1.5

        if (!this.fakeParticles) {
            this.gl = particles(this.$el)
            this.$canvas = this.$el.children[3]

            this.updateAnimation = this.updateAnimation.bind(this)
        }
    },

    methods: {
        play() {
            this.playing = true
            this.$refs.intro.play()

            if (!this.fakeParticles) {
                this.gl.energy = 2
                this.gl.scanlines = true
            }

            console.log('--start video')

            this.startingTime = null
            this.lastTime = null
            this.totalElapsedTime = null

            requestAnimationFrame(this.updateAnimation)
        },

        updateAnimation(currentTime) {
            if (!this.startingTime) {
                this.startingTime = currentTime
            }

            if (!this.lastTime) {
                this.lastTime = currentTime
            }

            this.totalElapsedTime = (currentTime - this.startingTime);
            this.lastTime = currentTime;

            if (this.totalElapsedTime >= totalVideo) {
                return
            }

            // music progression
            let activeIndex = 0
            for (let i = 0; i < music.length; i++) {
                if (this.totalElapsedTime >= music[i]) {
                    activeIndex = i
                }
            }

            this.$el.setAttribute('class', 'a-particles')
            this.$el.classList.add(`a--logo-step-${activeIndex}`)

            if (activeIndex === music.length - 1) {
                // Uncomment for circle at the end
                // this.gl.energy = 0
                // this.gl.updateUniforms()
                this.$el.classList.add('a--showing-logo')
                return
            }

            if (!this.fakeParticles) {
                if (activeIndex % 2 === 1) {
                    this.gl.energy = 0
                } else {
                    this.gl.energy = 2
                }

                const percentage = linear(this.totalElapsedTime / totalVideo)

                // brightness
                const brightness = this.baseBrightness + (this.targetBrightness - this.baseBrightness) * percentage
                const blobiness = this.baseBlobiness + (this.targetBlobiness - this.baseBlobiness) * percentage

                this.gl.brightness = brightness
                this.gl.blobiness = blobiness
                this.gl.updateUniforms()
            }

            requestAnimationFrame(this.updateAnimation)
        }
    }
}
</script>

<style>
.a-particles {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
}

.a-particles > video {
    position: absolute;
    top: 50%;
    /* center horizontally if ratio is not screen ratio */
    left: 50%;
    transform: translate(-50%, -50%);
}

.a-particles > img {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    /* Correct image centerness */
    /* 108px left and 10px bottom at 2000px^2 scale */
    margin-left: 27px;

    opacity: 0;
    z-index: 2;
}

.a-particles > h1 {
    color: #19222d;
    font-family: 'MotionControl', Impact, sans-serif;
    font-size: 64px;
    text-align: center;
    text-shadow: 2px 3px 0 rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    position: absolute;
    top: calc(50vh + 180px);
    left: 50vw;
    transform: translate(-50%, -50%);

    opacity: 0;
    z-index: 2;
}

.a--logo-step-1 img {
    opacity: 1;
    width: 180px;
    height: 180px;
    margin-left: 12.15px;
}

.a--logo-step-3 img {
    opacity: 1;
    width: 300px;
    height: 300px;
    margin-left: 20.25px;
}

.a--logo-step-5 img {
    opacity: 1;
    width: 375px;
    height: 375px;
    margin-left: 25.313px;
}

.a-particles.a--showing-logo > img,
.a-particles.a--showing-logo > h1 {
    transition: .8s opacity ease-out;
    opacity: 1;
}
</style>
