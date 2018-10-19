<template>
  <div class="social">
    <div class="entry">
      <img src="../assets/facebook.png" />
      <h2>UTTArena</h2>
    </div>
    <div class="entry">
      <img src="../assets/twitter.png" />
      <h2>@UTTArena</h2>
    </div>
  </div>
</template>

<style>
.social {
  position: absolute;
  bottom: 125px;
  left: 0;
  right: 0;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.social .entry {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social .entry:not(:last-child) {
  margin-right: 80px;
}

.social img {
  height: 60px;
  width: 60px;
}

.social h2 {
  color: #fff;
  text-transform: uppercase;
}
</style>