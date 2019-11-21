<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-3by1">
          <img
            src="https://hdwallpaperim.com/wp-content/uploads/2017/09/17/64380-minimalism-gradient-748x468.jpg"
            alt="Placeholder image"
          >
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-right">
            <figure @click="imageModal()">
              <img src="../assets/chervin.jpg" alt="Profile picture" id="profile_pic" border="3">
            </figure>
          </div>
          <div class="media-content" style="margin-left:5%">
            <p class="title is-4">Chervin Tanilon</p>
            <p class="subtitle is-6">@chervint</p>
          </div>
          <!-- <button
            class="button is-medium is-primary"
            style="margin-right:25%;margin-top:5%"
            @click="alertCustom"
          >Launch alert (custom)</button>-->

          <b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            :open.sync="isOpen"
            style="margin-right: 15%"
          >
            <div
              slot="trigger"
              class="panel-heading"
              role="button"
              aria-controls="contentIdForA11y2"
            >
              <strong>Personal Information</strong>
            </div>
            <div class="panel-block">
              <ul id="example-1">
                <li v-for="item in items" :key="item">
                  <strong>{{item.strong}}</strong>
                  {{ item.value }}
                </li>
              </ul>
            </div>
          </b-collapse>&nbsp;
          <!-- EDIT PROFILE BUTTON ON THE RIGHT  -->
          <div class="is-pulled-right">
            <b-tooltip label="Update">
              <button class="button is-primary is-outlined" @click="toggle">
                <b-icon pack="fas" icon="pencil-alt" size="is-small"></b-icon>
              </button>
            </b-tooltip>
          </div>
        </div>
        <center>
          <div class="content">
            This is a profile picture page and its awesome! Chervin make it better
            <a>@bulmaio</a>.
            <a href="#">#css</a>
            <a href="#">#responsive</a>
            <br>
            <time datetime="2019-1-1">11:09 PM - 1 Jan 2019</time>
          </div>
        </center>
      </div>
    </div>
    <!-- THIS IS A MODAL-->
    <div class="modal" :class="{ 'is-active': isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Profile</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <b-field label="Name">
              <b-input placeholder="Name"></b-input>
            </b-field>
            <b-field label="Birthdate">
              <b-datepicker placeholder="Birthdate"></b-datepicker>
            </b-field>
            <b-field label="Address">
              <b-input placeholder="Address"></b-input>
            </b-field>
            <b-field label="Gender">
              <!-- <b-input placeholder="Gender"></b-input> -->
              <b-select placeholder="Select gender" expanded>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </b-select>
            </b-field>
            <b-field label="Civil Status">
              <b-select placeholder="Select status" expanded>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </b-select>
            </b-field>
            <b-field label="Favorite Place">
              <b-input placeholder="Favorite Place"></b-input>
            </b-field>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success is-outlined is-fullwidth is-rounded"
            @click="prompt"
          >Update Profile</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile } from "../repository";
export default {
  name: "UpdateProfModal",
  data() {
    return {
      isActive: false,
      isImageModalActive: false,
      isOpen: false,
      labelPosition: "on-border",
      password: "",
      items: [
        { strong: "Name: ", value: "Chervin Tanilon" },
        { strong: "Birthdate: ", value: "09/30/1999" },
        { strong: "Address: ", value: "Guizo, Mandaue City" },
        { strong: "Gender: ", value: "Male" },
        { strong: "Civil Status: ", value: "Single" },
        { strong: "Favorite Place: ", value: "Eiffel Tower" }
      ],
      profile:[]
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    prompt() {
      this.$buefy.dialog.prompt({
        message: `Please input your password`,
        inputAttrs: {
          placeholder: "Password",
          type: "password"
        },
        trapFocus: true,
        onConfirm: value => {
          this.password = value;
          if (this.password == sessionStorage.getItem("password")) {
            this.$buefy.toast.open({
              message: "Profile is updated successfully",
              type: "is-success"
            });
            this.isActive = !this.isActive;
          } else {
            this.$buefy.toast.open({
              message: "Incorrect Password",
              type: "is-danger"
            });
          }
          //HERE YOU CAN NOW CHECK IF THE PASSWORD MATCHED WITH THE SESSION STORAGE PASSWORD
        }
      });
    },
    imageModal() {
      this.$buefy.modal.open(
        `<p class="image is-4by3">
          <img src="https://buefy.org/static/img/placeholder-1280x960.png">
        </p>`
      );
    }
  },
  mounted(){
    // const loadingComponent = this.$buefy.loading.open({
    //   container: null
    // });
    getProfile()
      .then(data => {
        // loadingComponent.close();
        this.profile = data.profile;
      })
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
#profile_pic {
  border: 5px solid;
  border-image: linear-gradient(to bottom, #8c67ef 0%, #cc4e80 100%) 1;
  height: 250px;
  width: 250px;
  object-fit: cover;
}
#profile_pic:hover {
  cursor: pointer;
  box-shadow: 5px 5px 8px grey;
  transition: 0.2s;
}
li {
  padding: 3px;
}
</style>
