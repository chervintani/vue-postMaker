<template>
  <div class="modal-card" style="margin-top: 5%">
    <img src="@/assets/images.jpg">
  </div>
</template>
<script>
export default {
  name: "404",
  data() {
    return {
      joke: {
        avatar: "images.jpg"
      }
    };
  }
};
</script>
<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>

