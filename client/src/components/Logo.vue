<template>
    <div class="a-logo"></div>
</template>

<style>
.a-logo {
    width: 600px;
    height: 500px;

    background-image: url(../assets/logo.png);
    background-size: 500px 500px;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;

    /*transition: 0.8s transform ease-out;*/
    transition: 0.8s opacity ease-out;
    transition-delay: 0.85s;
}

.a--hiding .a-logo {
    /*transform: translateX(calc(-100% - 100px));*/
    opacity: 0
}
</style>
