<template>
  <div class="modal-card" style="margin-top: 5%">
    <section class="modal-card-body">
      <h3 class="title has-text-centered has-text-dark">Member Login</h3>
      <div class="box">
        <b-field label="Username">
          <b-input v-model="username" type="text" placeholder="Username"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            placeholder="Password"
            minlength="6"
            password-reveal
          ></b-input>
        </b-field>
        <button class="button is-primary is-large is-fullwidth is-rounded" @click="doLogin">Login</button>
        <p id="or" class="has-text-centered">or</p>
        <router-link to="/register">
          <button class="button is-success is-outlined is-fullwidth is-rounded">Register</button>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script>
import { login } from "../repository";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    passwordReminder() {
      this.$parent.close();
      this.$modal.open({
        parent: this,
        hasModalCArd: true,
        props: {}
      });
    },
    doLogin() {
      if (this.username == "" || this.password == "") {
        this.$buefy.toast.open({
          message: "Login failed",
          type: "is-danger"
        });
      } else {
        let data = {
          username: this.username,
          password: this.password
        };
        const loadingComponent = this.$buefy.loading.open({
          container: null
        });
        login(data).then(data => {
          loadingComponent.close();
          console.log(data);
          if (data.login === "success") {
            this.$buefy.toast.open({
              message: `Welcome ${this.username}!`,
              type: "is-success"
            });
            this.$router.push("/home");
          } else {
            this.$buefy.toast.open({
              message: "Invalid username or password",
              type: "is-danger"
            });
          }
        });
      }
    }
  }
};
</script>
<style scoped>
#or {
  text-align: center;
}
</style>