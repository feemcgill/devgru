<template>
  <div class="deets">
    <ul class="mains">
      <li><a href="#">323.405.7545</a></li>
      <li><a href="#">hello@devgru.la</a></li>
    </ul>
    <ul class="seconds">
      <li><a href="#">Instagram</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">LinkedIn</a></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.deets {
  //text-align: center;
  li a {
    background: $white;
    padding: 5px;
    margin-bottom: 5px;
    display: inline-block;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  }
  .mains {
    font-size: 0.9em;
    margin-bottom: 0.5em;
  }
  .seconds {
    font-size: 0.7em;
  }
  a {
    text-decoration: none;
  }
}
</style>
