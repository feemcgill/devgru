<template>
  <div class="auto-pilot-toggle">
    <span>auto scroll</span>
    <div class="toggle">
      <div class="ball" v-bind:class="auto_pilot && 'ball--on'"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    auto_pilot: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.auto-pilot-toggle {
  display: flex;
  align-items: center;
  color: var(--primary_color);
  cursor: pointer;

  span {
    font-size: 14px;
    margin-right: 0.5em;
  }

  .toggle {
    position: relative;
    width: 50px;
    height: 20px;
    border: 2px solid var(--primary_color);
    border-radius: 40px;

    .ball {
      position: absolute;
      top: calc(50% - 6px);
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: var(--primary_color);
      border-radius: 100%;
      transition: 0.5s left;

      &--on {
        left: calc(100% - 14px);
      }
    }
  }
}
</style>
