<template>
  <div class="test" v-for="(r, i) in results" :key="i">{{ r }}asdadsasd</div>
  <div class="margin-bottom">
    <div class="container">
      <div class="layout-grid search-container">
        <label>Library Search</label>
        <input type="text" placeholder="Enter title..." v-model="searchInput" />
        <fa-icon icon="magnifying-glass" class="search-icon" @click="search" />
      </div>
    </div>
    <div class="pop-up-login" v-if="!isLoggedIn">
      <p>
        Sign in to take place
        <router-link class="login" to="auth">
          <fa-icon icon="arrow-right-from-bracket" />
          Log in</router-link
        >
        <a @click="closePopUp" class="dismiss">
          | Dismiss <fa-icon icon="xmark"
        /></a>
      </p>
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
export default {
  data() {
    return {
      isClosedPopUp: false,
      searchInput: "",
      results: [],
      options: { defaultAll: true, keys: ["name", "publisher"] },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    closePopUp() {
      this.isClosedPopUp = true;
      return this.$store.getters["auth/isAuthenticated"];
    },
    search() {
      // this.$store.commit("periodicals/performSearch", {
      //   input: this.query,
      //   options: { defaultAll: true, keys: ["name", "publisher"] },
      // });
      this.$store.commit("periodicals/setSearchQuery", this.searchInput);
      const fuse = new Fuse(
        this.$store.getters["periodicals/getPeriodicals"],
        this.options
      );
      this.$store.commit(
        "periodicals/setSearchResults",
        fuse.search(this.$store.getters["periodicals/getSearchQuery"])
      );
      const plain = { ...this.$store.getters["periodicals/getSearchResults"] };
      console.log(plain.at(0).name);
    },
  },
};
</script>

<style scoped>
.test {
  height: 10rem;
  width: 10rem;
}
.margin-bottom {
  margin-bottom: 4.8rem;
}
.container {
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  background-color: #3172ae;
}
.layout-grid {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
}

.search-container {
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
  height: 6.5rem;
  width: 80rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  height: 100%;
  background-color: #f7eda3;
}

input {
  border-radius: 0 2em;
  padding: 0 1.6rem;
  border: none;
  outline: none;
  font-size: 1.6rem;
  line-height: 2em;
}

.search-icon {
  display: block;
  justify-self: flex-end;
  border-radius: 0.5rem;
  padding: 2.5rem;
  color: green;
  cursor: pointer;
}

.search-icon:hover {
  background-color: #e7f2e5;
}

.pop-up-login {
  padding: 3.2rem 4.8rem;
  width: 100%;
  font-size: 1.4rem;
  background-color: #f7eda3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-up-login .login {
  color: #3498db;
  cursor: pointer;
}

.pop-up-login .login:hover {
  text-decoration: underline;
  color: #3498db;
}

.dismiss {
  cursor: pointer;
}
</style>
