<template>
  <div class="grid">
    <!-- <router-view class="post-modal"></router-view> -->
    <header>
      <span>Periodicals info</span>
      <a to="post-new" class="link" @click="togglePostModal"
        >Add new<fa-icon icon="plus" class="icon"></fa-icon
      ></a>
    </header>
    <table>
      <tr>
        <th>Id</th>
        <th>Periodical Name</th>
        <th>Change Availability</th>
        <th>Delete Periodical</th>
      </tr>
      <tr v-for="row in periodicals" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td v-if="isAvailable(row.available) === 'Available'">
          <a class="availability" @click="changeAvailability(row.id)"
            >Available</a
          >
        </td>
        <td v-else>
          <a class="availability" @click="changeAvailability(row.id)"
            >Unavailable</a
          >
        </td>
        <td><a class="delete" @click="deletePeriodical(row.id)">Delete</a></td>
      </tr>
    </table>
    <div v-if="isOpenModal" class="opacity-color"></div>
    <dialog open v-if="isOpenModal" class="post-modal">
      <form @submit.prevent="publish">
        <h2>
          Publish New Periodoical
          <fa-icon
            icon="xmark"
            class="icon-close-modal"
            @click="togglePostModal"
          ></fa-icon>
        </h2>
        <textarea
          type="text"
          placeholder="Tytle..."
          class="name-input"
          v-model="name"
        ></textarea>

        <textarea
          type="text"
          placeholder="Publisher..."
          class="publisher-input"
          v-model="publisher"
        ></textarea>

        <textarea
          type="text"
          placeholder="Description..."
          class="description-input"
          v-model="description"
        ></textarea>
        <footer>
          <div class="btn btn-choose">
            <label for="file-upload" class="custom-file-upload">
              <fa-icon icon="cloud-arrow-up" class="icon-upload"></fa-icon
              >Choose file(.jpg/.png)
            </label>
            <input id="file-upload" type="file" @change="uploadFile" />
          </div>
          <div>
            <button class="btn btn-publish">Publish</button>
          </div>
        </footer>
      </form>
    </dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      periodicals: [],
      isOpenModal: false,
      name: "",
      publisher: "",
      description: "",
      file: null,
      available: "t",
    };
  },
  methods: {
    async loadPeriodicals() {
      try {
        await this.$store.dispatch("periodicals/loadPeriodicals");
        this.periodicals = this.$store.getters["periodicals/getPeriodicals"];
      } catch (error) {
        console.log(error);
      }
    },
    isAvailable(input) {
      if (input === "t") return "Available";
      else return "Unavailable";
    },
    deletePeriodical(id) {
      this.$store.dispatch("periodicals/deletePeriodical", id);
    },
    changeAvailability(id) {
      this.$store.dispatch("periodicals/updateAvailability", id);
    },
    togglePostModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    uploadFile(event) {
      this.file = event.target.files[0];
    },
    publish() {
      const fd = new FormData();
      fd.append("publisher", this.publisher);
      fd.append("name", this.name);
      fd.append("description", this.description);
      fd.append("file", this.file);
      fd.append("available", this.available);

      this.$store.dispatch("periodicals/postPeriodical", fd);
    },
  },
  created() {
    this.loadPeriodicals();
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  position: relative;
  grid-template: 1fr;
  row-gap: 2.4rem;
  margin: 0 auto;
  width: 102.4rem;
}

header {
  display: flex;
}

header span {
  font-size: 3.2rem;
  color: #333;
}
header a {
  margin-left: 1rem;
  display: flex;
  padding: 0.2rem 0.4rem;
  font-size: 1.6rem;
  color: white;
  background-color: #3172ae;
  border-radius: 0.5rem;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

.icon {
  padding-left: 0.8rem;
}

table {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 9.6rem;
}

table,
tr,
td {
  border: 1px solid;
  border-collapse: collapse;
}

th {
  font-size: 1.4rem;
  padding: 1.2rem;
  color: white;
  background-color: #3172ae;
  text-align: start;
}

td {
  font-size: 1.2rem;
  padding: 1.2rem;
  text-align: center;
  background-color: aliceblue;
}
.availability {
  color: #3172ae;
  cursor: pointer;
}
.delete {
  cursor: pointer;
  color: red;
}

ul {
  list-style: none;
}
.container {
  padding: 3.2rem 1rem;
  border-radius: 0.4rem;
  background-color: #e9e9e9;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 10rem;
}

h1 {
  margin-bottom: 3.4rem;
}

.opacity-color {
  background-color: #3172ae;
  opacity: 0.5;
  z-index: 9998;
  width: 100%;
  height: 100%;
}

.icon-close-modal {
  padding: 0.2rem 0.6rem;
  position: absolute;
  right: -1.5rem;
  top: -1.7rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: #e9e9e9;
  color: #3172ae;
}

.post-modal {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.post-modal::backdrop {
  background: #39739d;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
  border: none;
}

form h2 {
  padding: 1rem;
  font-size: 2.4rem;
  background-color: #3172ae;
  color: white;
  position: relative;
}

form textarea {
  margin: 1rem;
  padding: 1rem;
  outline: none;
  resize: none;
  overflow: auto;
  border: 1px solid #ccc;
  width: 50rem;
  border-radius: 0.4rem;
}

.name-input {
  height: 5rem;
}
.publisher-input {
  height: 7rem;
}
.description-input {
  height: 20rem;
}

form input[type="file"] {
  display: none;
}

form footer {
  border-top: 0.1rem solid #ccc;
  display: flex;
  justify-content: space-between;
  background: #eee;
  padding: 0.5rem 1rem;
}
.btn-choose {
  background: #3172ae;
  color: white;
}
.btn-publish {
  background: #78f89f;
}
.btn {
  font-size: 1.4rem !important;
  border: 0;
  border-radius: 0.5rem;
  padding: 0.8rem 1.6rem;
  font-size: 0.8rem;
  line-height: 1;
  cursor: pointer;
}
.icon-upload {
  padding-right: 0.5rem;
}
</style>
