<template>
  <ul>
    <pinned-list-item
      v-for="pinn in pinnedPeriodicals"
      :key="pinn.id"
      :id="pinn.id"
      :img="pinn.image"
      :name="pinn.name"
      :description="pinn.description"
      :publisher="pinn.publisher"
      :type="pinn.type"
      :subscribers="pinn.subscribers"
      :available="pinn.available"
    >
      <div>{{ pinn.name }}</div>
    </pinned-list-item>
  </ul>
</template>

<script>
import PinnedListItem from "../pinned/PinnedListItem.vue";
export default {
  components: {
    PinnedListItem,
  },
  data() {
    return {
      pinnedId: [],
    };
  },
  methods: {
    getPinned() {
      this.pinnedId = JSON.parse(localStorage.getItem("pinned"));
      if (this.pinnedId == null) this.pinnedId = [];
    },
  },
  computed: {
    pinnedPeriodicals() {
      const entries = [];
      this.$store.getters["periodicals/getPeriodicals"].forEach((element) => {
        if (this.pinnedId.includes(element.id)) entries.push(element);
      });
      console.log(entries);
      return entries;
    },
  },
  created() {
    this.getPinned();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  width: 80rem;
}
</style>
