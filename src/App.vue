<template>
  <div id="app">
    <b-navbar class="is-link is-fixed-top">
      <template slot="brand">
        <b-navbar-item>
          <router-link to="/home">
            <p class="title is-3 has-text-light">EventHub</p>
          </router-link>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- <Login/> -->
    <router-view to="/login"></router-view>
    <br>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>PostMaker</strong> by
          <a href="https://bulma.io">Chervin Tanilon</a>. All Rights Reserved 2019
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style scoped>
.title {
  padding-top: 10%;
}
</style>
