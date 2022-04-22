<template>
  <!-- <div class="opacity-color"></div> -->
  <div class="container">
    <h1>Post new periodical</h1>
    <form>
      <div><label>Name:</label><input type="text" class="name-input" /></div>
      <div>
        <label>Publisher:</label><input type="text" class="publisher-input" />
      </div>
      <div>
        <label>Description:</label
        ><input type="text" class="description-input" />
      </div>
      <div>
        <button>Choose file</button><span>.jpg/.png</span>
        <button>Post periodical</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* .opacity-color {
  background-color: #7aa7c7;
  width: 100%;
  height: 100%;
  z-index: 9998;
} */
.container {
  background-color: #e9e9e9;
  padding: 1.6rem 3.2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
form {
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
}
.name-input {
  height: 5rem;
  width: 60rem;
}
.publisher-input {
  height: 7rem;
  width: 60rem;
}
.description-input {
  height: 20rem;
  width: 60rem;
}
</style>
