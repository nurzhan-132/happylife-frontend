<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: inherit;
  border: 1px solid #2b6296;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: white;
  border-color: white;
}

.flat {
  background-color: transparent;
  color: white;
  border: none;
}

.outline {
  background-color: transparent;
  color: white;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: white;
  border-color: white;
  color: #2b6296;
}
</style>
