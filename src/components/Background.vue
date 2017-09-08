<template>
    <div class="a-background">
        <div class="a-background__color"></div>
        <div class="a-background__glow" ref="glow"></div>
        <a-line v-for="n in 5"></a-line>
        <div class="a-background__tile"></div>
    </div>
</template>

<script>
import Line from './Line.vue'

export default {
    components: {
        'a-line': Line
    },

    mounted() {
        setTimeout(() => {
            this.glow()
        }, 10000)
    },

    methods: {
        glow() {
            if (this.$refs.glow.classList.contains('a-background__glow--active')) {
                this.$refs.glow.classList.remove('a-background__glow--active')

                setTimeout(() => {
                    this.glow()
                }, 10000)
            } else {
                this.$refs.glow.classList.add('a-background__glow--active')

                setTimeout(() => {
                    this.glow()
                }, 5000)
            }

        }
    }
}
</script>

<style>
.a-background {
    position: relative;

    height: 100%;
}

.a-background__tile {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-image: url(../assets/backgroundTile.png);
    background-size: 70px;
}

.a-background__glow {
    position: absolute;
    top: calc(50vh - 4px);
    left: calc(50vw - 6px);

    box-shadow: 0 0 50px 20px #ff1515;
    border-radius: 50%;

    transition: 5s box-shadow ease;
}

.a-background__glow--active {
    box-shadow: 0 0 30vw 15vw #ff1515;
}

.a-background__color {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #000;
}
</style>
