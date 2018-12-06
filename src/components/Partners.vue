<template>
  <div class="partners">
    <img src="../assets/scoup.png" height="90">
    <img src="../assets/rog.png" height="90">
    <img src="../assets/meltdown.png" height="90">
    <img src="../assets/tekliss.png" height="90">
    <img src="../assets/silverstone.png" height="90">
  </div>
</template>

<style>
.partners {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: rgba(42,42,42,.66);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0 -4px 12px rgba(255,255,255,.4);
}

.partners > img:not(:last-child) {
  margin-right: 15px;
}
</style>
