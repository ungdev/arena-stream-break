<template>
    <div class="a-partners">
        <img :src="bde" />
        <img :src="c3" />
        <img :src="compumsa" />
        <img :src="meltdown" />
        <img :src="orange" />
        <img :src="plantronics" width="180"/>
        <img :src="troyesExpoCube" />
    </div>
</template>

<script>
import bde from '../assets/bde.jpg'
import c3 from '../assets/c3.png'
import compumsa from '../assets/compumsa.png'
import meltdown from '../assets/meltdown.png'
import orange from '../assets/orange.jpg'
import plantronics from '../assets/plantronics.png'
import troyesExpoCube from '../assets/troyesExpoCube.png'

export default {
    data() {
        return {
            bde,
            c3,
            compumsa,
            meltdown,
            orange,
            plantronics,
            troyesExpoCube
        }
    }
}
</script>

<style>
.a-partners {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    transition: 0.8s transform cubic-bezier(0.41,-0.89, 0.65, 0.99);
}

.a-partners > img {
    max-height: 120px;
}

.a-partners > img:not(:last-child) {
    margin-right: 20px;
}

.a--hiding .a-partners {
    transform: translateY(calc(100% + 20px));
}
</style>
