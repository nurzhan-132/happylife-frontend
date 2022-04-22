<template>
  <nav class="layout-row">
    <div class="logo" @click="$router.push('/')">Library Logo</div>
    <div class="searchcontent"></div>
    <router-link :to="{ name: 'pinned' }">
      <fa-icon icon="thumbtack" class="nav-icon" />
    </router-link>
    <fa-icon icon="clock-rotate-left" class="nav-icon" />
    <base-button class="logout" mode="flat" v-if="isLoggedIn" @click="logout"
      >Logout</base-button
    >
    <base-button class="login" mode="flat" link to="/auth" v-else
      >Login</base-button
    >
    <base-button class="menu" mode="flat">
      Menu
      <fa-icon icon="caret-down" class="menu-icon" />
    </base-button>
    <!-- <teleport to="body">
      <router-view></router-view>
    </teleport> -->
  </nav>
  <the-search-bar></the-search-bar>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/periodicals");
    },
  },
  created() {
    console.log(this.isLoggedIn);
  },
};
</script>
<style scoped>
nav {
  font-size: 1.6rem;
  background-color: #2b6296;
  color: white;
}

.layout-row {
  padding: 0 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: space-around;
}

.logo {
  cursor: pointer;
}

.searchcontent {
  margin: auto auto;
}
.nav-icon {
  margin: 0 1.6rem;
  padding: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  color: white;
  background-color: #2d5d8b;
  border-radius: 50%;
}

.nav-icon:hover {
  background-color: white;
  color: #2b6296;
}

.logout,
.login {
  font-size: 1.4rem;
  padding: 1.6rem 3.2rem;
  margin: 1rem;
  margin-right: 2rem;
}

.menu {
  font-size: 1.4rem;
  padding: 1.6rem 3.2rem;
}

.menu-icon {
  /* margin-left: 0.5rem; */
}
</style>
