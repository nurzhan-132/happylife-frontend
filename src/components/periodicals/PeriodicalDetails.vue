<template>
  <div class="opacity-color sticky"></div>
  <div class="layout-grid-2-cols top-element sticky">
    <fa-icon icon="xmark" class="icon" @click="close" />
    <div class="periodical-container">
      <div class="container">
        <section class="layout-grid-2-cols grid-container">
          <div class="periodical-image">
            <!-- <img :src="image" class="image" /> -->
          </div>
          <div class="details">
            <h1>Details</h1>
            <div class="layout-grid-2-cols details-grid">
              <p class="about">Type</p>
              <p class="type about-text">{{ periodical.type }}</p>

              <p class="about">Title</p>
              <h3 class="title about-text">{{ periodical.name }}</h3>

              <p class="about">Publisher</p>
              <p class="publisher about-text">
                {{ periodical.publisher }}
              </p>

              <p class="about">Description</p>
              <p class="description about-text">
                {{ periodical.description }}
              </p>
            </div>
          </div>
          <div class="queue">
            <h1>Queue</h1>
            <p class="queue-info">{{ queueInfo }}</p>
            <button
              class="btn-take"
              v-if="available === 't' && isSubscribed === false"
              @click="subscribe"
            >
              Take place
            </button>
            <button
              class="btn-take"
              v-if="available === 't' && isSubscribed === true"
              @click="unsubscribe"
            >
              Unsubscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      selectedPeriodical: null,
      periodical: null,
      takePlaceButtonCaption: "Take place",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async subscribe() {
      const subscribeRequest = {
        periodicalId: this.id,
        username: this.$store.getters["auth/username"],
      };
      await this.$store.dispatch("periodicals/subscribe", subscribeRequest);

      this.getPeriodical();
    },
    async unsubscribe() {
      const unsubscribeRequest = {
        periodicalId: this.id,
        username: this.$store.getters["auth/username"],
      };
      await this.$store.dispatch("periodicals/unsubscribe", unsubscribeRequest);

      this.getPeriodical();
    },
    getPeriodical() {
      this.periodical = this.$store.getters["periodicals/getPeriodicals"].find(
        (periodical) => periodical.id === this.id
      );
    },
  },
  computed: {
    isReserved() {
      if (this.selectedPeriodical.subscribers.length > 0) return true;
      return false;
    },
    isSubscribed() {
      let subscribed = false;
      console.log(this.periodical.subscribers);
      this.periodical.subscribers.find((s) => {
        if (s.id === this.$store.getters["auth/userId"]) subscribed = true;
      });
      return subscribed;
    },
    queueInfo() {
      console.log(this.subscribers.length);
      let result = "";
      if (this.subscribers.length === 0) result = "Free to take.";
      if (this.isSubscribed === true) {
        if (this.subscribers.length === 1)
          result = "Available to read right now.";
        if (this.subscribers.length === 2) result = "You are next.";
        if (this.subscribers.length > 2)
          result = `${this.subscribers.length - 1} Before You.`;
      } else {
        const count =
          this.subscribers.length === 1
            ? "Someone reading"
            : `${this.subscribers.length} people waiting`;
        result = count + " right now.";
      }
      return result;
    },
  },
  image() {
    return "data:image/jpg;base64, " + this.periodical.img;
  },
  created() {
    this.getPeriodical();
    console.log(this.$store.getters["auth/userId"]);
    console.log(this.isSubscribed);
    console.log(this.periodical.subscribers);
  },
};
</script>

<style scoped>
.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
.opacity-color {
  background-color: #3172ae;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.top-element {
  z-index: 9999;
  position: fixed;
  top: 0;
  width: 100%;
}

.periodical-container {
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: #e9e9e9;
  justify-self: flex-end;
}

.icon {
  z-index: 9999;
  height: 15rem;
  width: 15rem;
  color: white;
  align-self: center;
  justify-self: center;
}

.icon:hover {
  cursor: pointer;
  color: #e9e9e9;
}

.about {
  font-size: 2.4rem;
  font-weight: 600;
}

.about-text {
  font-size: 1.8rem;
  font-weight: 200;
}

.periodical-image {
  justify-self: center;
  width: 15rem;
  height: 22rem;
  grid-column: 1;
}

.image {
  max-width: 100%;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}

.layout-grid-2-cols {
  display: grid;
  grid-template-columns: 15% 85%;
}

.details-grid {
  margin-left: 1.6rem;
  row-gap: 1.1rem;
}

.grid-container {
  padding: 4.8rem 2.25rem 1.5rem 4.5rem;
  row-gap: 9.2rem;
}

.grid-container h1 {
  font-size: 3.2rem;
  margin-bottom: 2.4rem;
  font-weight: 200;
}

.queue {
  grid-column: 2;
}

.queue-info {
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2.6rem;
}

.queue-list {
  list-style: none;
  margin-bottom: 2.8rem;
}

.queue-member {
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
}

.btn-take {
  margin-bottom: 3.8rem;
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn-take:hover,
.btn-take:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.btn-take:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.btn-take:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
</style>
