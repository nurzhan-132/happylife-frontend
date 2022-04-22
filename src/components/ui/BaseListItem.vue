<template>
  <div class="item"></div>
  <slot></slot>
</template>

<script>
export default {};
</script>

<style scoped>
.item {
  padding: 1.5rem 2.25rem 1.5rem 4.5rem;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-row: 1fr;
  column-gap: 2rem;
  line-height: 1.4;
  width: 100%;
  background-color: #f3f3f3;
}
</style>
