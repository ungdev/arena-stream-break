<template>
    <div class="a-line">
        <svg width="50" height="50">
            <path
                :d="path"
                stroke-width="3"
                fill="transparent"
                filter="dropshadow"
                ref="path"></path>
        </svg>
    </div>
</template>

<style>
.a-line {
    position: absolute;
    height: 50px;
    width: 50px;
}
</style>

<script>
const tileWidth = 70
const tileHeight = 41

export default {
    data() {
        let path = 'M0 3 L9 18.5 L32 18.5 L44.2 39'
        const rnd = Math.random()

        if (rnd <= 0.2) {
            path += ' L31 59'
        } else if (rnd > 0.2 && rnd <= 0.4) {
            path += ' L68 39'
        } else if (rnd > 0.4 && rnd <= 0.6) {
            path += ' L68 39 L78 18.5'
        } else if (rnd > 0.6 && rnd <= 0.8) {
            path += ' L31 59 L9 59'
        } else {
            path += ''
        }

        return {
            path,
            pathLenght: 0
        }
    },

    mounted() {
        this.pathLenght = this.$refs.path.getTotalLength()

        this.topValues = this.possibleTopValues()
        this.leftValues = this.possibleLeftValues()

        this.choosePosition()
        this.restartAnim()
    },

    methods: {
        restartAnim() {
            this.$refs.path.setAttribute('stroke-dasharray', this.pathLenght)
            this.$refs.path.setAttribute('stroke-dashoffset', this.pathLenght)

            setTimeout(() => {
                this.$el.classList.add('a-line--animating')
                this.$refs.path.setAttribute('stroke-dashoffset', -1 * this.pathLenght)
            }, 500)

            const nextTick = (Math.floor(Math.random() * 10) + 1) * 1000

            setTimeout(() => {
                this.choosePosition()
                this.restartAnim()
            }, nextTick)
        },

        possibleTopValues() {
            const maxHeight = document.getElementById('app').getBoundingClientRect().height

            const values = []

            // top accepted : mid(50vh) - demiLogo(250px) - margin(20px)
            const maxTop = (maxHeight / 2) - 250 - 20

            for (let i = 0; i < maxTop; i += tileHeight) {
                values.push(i)
            }

            // bottom accepted : mid(50vh) + demiLogo(250px) + margin(20px)
            const minBottom = Math.ceil(maxHeight / 2 + 250 + 20)
            const shiftedMinBottom = values.slice().map(n => n + minBottom)

            values.push(...shiftedMinBottom)

            return values
        },

        possibleLeftValues() {
            const maxWidth = document.getElementById('app').getBoundingClientRect().width

            const values = []

            for (let i = 0; i < maxWidth; i += tileWidth) {
                values.push(i)
            }

            return values
        },

        choosePosition() {
            const left = this.leftValues[Math.floor(Math.random() * this.leftValues.length)]
            const top = this.topValues[Math.floor(Math.random() * this.topValues.length)]

            this.$el.style.left = `${left}px`
            this.$el.style.top = `${top}px`
            this.$el.classList.remove('a-line--animating')
        }
    }
}
</script>

<style>
    .a-line {
        position: absolute;
    }

    .a-line--animating path {
        transition: .8s 1s stroke-dashoffset ease-out;
    }

    .a-line path {
        stroke: rgba(255, 21, 21, 0.8);
    }
</style>

