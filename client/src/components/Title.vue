<template>
    <h1 class="a-title">UTT ARENA 2017</h1>
</template>

<style>
.a-title {
    margin: 0 0 75px 0;

    color: #fff;
    font-family: 'MotionControl', Impact, sans-serif;
    font-size: 86px;
    text-align: center;
    text-shadow: 2px 3px 0 rgba(183, 0, 43, 0.5);
    text-transform: uppercase;
    opacity: 1;

    /*transition: 1s transform ease-out;*/
    transition: 1s opacity ease-out;
    transition-delay: 0.85s;
}

.a--hiding .a-title {
    /*transform: translateX(100%);*/
    opacity: 0;
}
</style>
