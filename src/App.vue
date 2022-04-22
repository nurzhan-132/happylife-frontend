<template>
  <div>
    <the-navigation></the-navigation>
    <the-search-bar></the-search-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "./components/header/TheNavigation.vue";
import TheSearchBar from "./components/header/TheSearchBarr.vue";

export default {
  components: {
    TheNavigation,
    TheSearchBar,
  },
  created() {
    this.$store.dispatch("auth/tryLogin");
    console.log(this.$store.getters["auth/userId"]);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&family=Inter:wght@300;400;500;600&family=Rubik:wght@400;600;700&family=Source+Sans+Pro:wght@200;300;400;600&family=Work+Sans:wght@300;400;500;600&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  /* 10px / 16px = 0.625 = 62.5% */
  /* Percentage of user's browser font-size setting */
  font-size: 62.5%;
}
body {
  margin: 0;
  background-color: #e9e9e9;
  font-family: "Work Sans", sans-serif;
  line-height: 1;
  font-weight: 400;
  color: #555;
  overflow-x: hidden;
}
</style>
