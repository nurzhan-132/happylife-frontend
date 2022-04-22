<template>
  <main>
    <ul>
      <!-- <vue-fuse
        :keys="keys"
        :list="$store.getters['periodicals/getPeriodicals']"
        :search="$store.getters['periodicals/getSearchQuery']"
        :defaultAll="true"
        :eventName="change"
      >
      </vue-fuse> -->
      <periodical-list-item
        v-for="per in $store.getters['periodicals/getPeriodicals']"
        :key="per.id"
        :id="per.id"
        :img="per.image"
        :name="per.name"
        :description="per.description"
        :publisher="per.publisher"
        :type="per.type"
        :subscribers="per.subscribers"
        :available="per.available"
      ></periodical-list-item>
    </ul>
  </main>
</template>

<script>
import PeriodicalListItem from "../periodicals/PeriodicaListItem.vue";
// import VueFuse from "vue-fuse";

export default {
  components: {
    PeriodicalListItem,
    // VueFuse,
  },
  data() {
    return {
      detailsIsVisible: false,
      periodicalId: null,
      periodical: null,
      keys: ["name", "publisher"],
    };
  },
  methods: {
    async loadPeriodicals() {
      try {
        await this.$store.dispatch("periodicals/loadPeriodicals");
      } catch (error) {
        console.log(error);
      }
    },
    performSearch() {},
  },
  computed: {
    periodicals() {
      return this.$store.getters["periodicals/getPeriodicals"];
    },
  },
  created() {
    this.loadPeriodicals();
  },
};
</script>

<style scoped>
main {
  position: relative;
  margin-bottom: 9.2rem;
}
ul {
  list-style: none;
  margin: 0 9.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 1rem;
  column-gap: 2rem;
}
</style>
