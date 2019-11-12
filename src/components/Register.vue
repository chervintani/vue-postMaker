<template>
  <div class="modal-card" style="margin-top: 5%">
    <section class="modal-card-body">
      <h3 class="title has-text-centered has-text-dark">Member Registration</h3>
      <div class="box">
        <b-field label="Username">
          <b-input v-model="username" type="text" placeholder="Username" maxlength="20"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            placeholder="Password"
            minlength="6"
            maxlength="20"
            password-reveal
          ></b-input>
        </b-field>
        <b-field label="Confirm Password">
          <b-input
            v-model="confirm_password"
            type="password"
            placeholder="Confirm Password"
            minlength="6"
            password-reveal
          ></b-input>
        </b-field>
        <button class="button is-success is-large is-fullwidth is-rounded" @click="doLogin">Register</button>
        <p id="or" class="has-text-centered">or</p>
        <router-link to="/login">
          <button class="button is-danger is-outlined is-fullwidth is-rounded">Cancel</button>
        </router-link>
        <div class="has-text-centered"></div>
      </div>
    </section>
  </div>
</template>
<script>
import { register } from "../repository";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: ""
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
      if (
        this.username == "" ||
        this.password == "" ||
        this.confirm_password == ""
      ) {
        this.$buefy.toast.open({
          message: "Please fill all the fields!",
          type: "is-danger"
        });
      } else {
        if (this.password === this.confirm_password) {
          let data = {
            username: this.username,
            password: this.password
          };
          const loadingComponent = this.$buefy.loading.open({
            container: null
          });
          register(data)
            .then(data => {
              loadingComponent.close();
              this.$buefy.toast.open({
                message: data.account.username + " is registered successfully!",
                type: "is-success"
              });
              console.log(data);
            })
            .catch(err => {
              alert(err.message);
            });
          this.$router.push("/login");
        } else {
          this.$buefy.toast.open({
            message: "Password did not match!",
            type: "is-danger"
          });
        }
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