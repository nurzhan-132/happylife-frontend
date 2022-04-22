<template>
  <teleport to="body">
    <periodical-details
      @show-details="showDetails"
      @close="close"
      v-if="detailsIsVisible === true"
      :id="periodical.id"
      :img="periodical.image"
      :name="periodical.name"
      :description="periodical.description"
      :publisher="periodical.publisher"
      :type="periodical.type"
      :subscribers="periodical.subscribers"
      :available="periodical.available"
    >
    </periodical-details
  ></teleport>
  <div class="item">
    <div class="image"><img :src="image" alt="" /></div>
    <div class="periodical-info">
      <p class="type">{{ type }}</p>
      <a class="name" @click="showDetails">{{ name }}</a>
      <p class="publisher">{{ publisher }}</p>
      <div v-if="available === 't'" class="take-place-container">
        <div v-if="isReserved === false" class="not-reserverd">
          <fa-icon icon="book" class="icon" />
          <span class="no-queue">No queue</span>
        </div>
        <a @click="showDetails" class="take-place">Take place</a>
        <fa-icon icon="arrow-right" class="icon" />
      </div>
      <div v-if="available === 'f'" class="take-place-container">
        <fa-icon icon="book-open-reader" class="icon" />
        <a class="take-place">
          <span class="check-out">Check out</span
          ><span class="library"> library</span>
        </a>
      </div>
      <fa-icon icon="thumbtack" class="pin" @click="addPinned"></fa-icon>
    </div>
  </div>
</template>

<script>
import PeriodicalDetails from "./PeriodicalDetails.vue";
export default {
  components: { PeriodicalDetails },
  props: [
    "id",
    "img",
    "type",
    "name",
    "description",
    "publisher",
    "subscribers",
    "available",
  ],
  data() {
    return {
      detailsIsVisible: false,
      periodicalId: null,
      periodical: null,
    };
  },
  methods: {
    showDetails() {
      this.periodicalId = this.id;
      this.periodical = this.$store.getters["periodicals/getPeriodicals"].find(
        (periodical) => periodical.id === this.periodicalId
      );
      this.detailsIsVisible = !this.detailsIsVisible;
      console.log(this.periodical);
    },
    close() {
      this.detailsIsVisible = !this.detailsIsVisible;
    },
    addPinned() {
      this.$store.commit("pinned/addPeriodicalId", this.id);
      console.log(this.$store.getters["pinned/getPinned"]);
    },
  },
  computed: {
    isReserved() {
      if (this.subscribers.length === 0) return false;
      return true;
    },
    periodicalDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
    image() {
      return "data:image/jpg;base64, " + this.img;
    },
  },
  created() {
    console.log("item created");
  },
};
</script>
<style scoped>
periodical-details {
  position: absolute;
}
.item {
  padding: 1rem;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-row: 1fr;
  column-gap: 2rem;
  line-height: 1.4;
  width: 100%;
  background-color: #f3f3f3;
}

a {
  cursor: pointer;
}

.image img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}

.periodical-info {
  padding-bottom: 1.6rem;
  grid-column: 2/-1;
  position: relative;
}

.type {
  font-size: 1.6rem;
}

.name {
  display: block;
  font-size: 1.8rem;
  color: #44707b;
}

.name:link,
.name:visited {
  text-decoration: none;
}
.name:hover {
  text-decoration: underline;
}

.description {
  font-size: 1.6rem;
}

.publisher {
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
}

.icon {
  color: #a9a9a9;
}

.take-place-container {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  column-gap: 0.5rem;
}

.take-place {
  font-size: 1.6rem;
}

.take-place:link,
.take-place:visited {
  text-decoration: none;
}
.take-place:hover {
  text-decoration: underline;
  background-color: #e1f3ff;
}

.not-reserverd {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

.check-out {
  color: #c16726;
}

.library {
  color: #e0870d;
}

.no-queue {
  color: #67cb59;
  margin-right: 1.2rem;
}

.take-place {
  color: #44707b;
}

.pin {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(45deg);
  cursor: pointer;
}

.pin:hover {
  color: #3498db;
}
</style>
