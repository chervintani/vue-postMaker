<template>
  <div style="margin-top:8%">
    <button @click="toggle" class="button is-light is-outlined is-rounded">Create Event</button>
    <br>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add an event</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <!-- <input v-model="title" class="input" type="text" placeholder="Title"> -->
            <b-field label="Enter a title" :label-position="labelPosition">
              <b-input placeholder="Title" icon-pack="fas" icon="pencil-alt" v-model="title"></b-input>
            </b-field>
          </div>
          <br>
          <b-field label="Put a content..." :label-position="labelPosition" rounded>
            <b-input
              maxlength="200"
              type="textarea"
              v-model="body"
              placeholder="Say what you want to say..."
            ></b-input>
          </b-field>
          <b-field label="Add a location" :label-position="labelPosition">
            <b-input
              placeholder="Add location"
              icon-pack="fas"
              icon="map-marker-alt"
              v-model="location"
            ></b-input>
          </b-field>
          <!-- <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea> -->
          <b-field label="Add a photo of the event:">
            <b-field class="file">
              <b-upload v-model="file">
                <a class="button is-primary is-outlined">
                  <b-icon icon="upload"></b-icon>
                  <span>Click to upload</span>
                </a>
              </b-upload>
              <span class="file-name" id="filename" v-if="file">{{ file.name }}</span>
            </b-field>
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <button @click="create" class="button is-success is-fullwidth is-rounded">Post</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { createNote, uploadImage } from "../repository";
export default {
  name: "CreateNoteModal",
  data() {
    return {
      file: null,
      labelPosition: "on-border",
      title: "",
      body: "",
      location: "",
      isActive: false
    };
  },
  methods: {
    create() {
      let data = {
        title: this.title,
        body: this.body,
        location: this.location
      };
      if (data.title == "" || data.body == "" || data.location == "") {
        this.$buefy.toast.open({
          message: "Please fill all the fields!",
          type: "is-danger"
        });
      } else {
        createNote(data)
          .then(data => {
            this.$emit("createNote", data.note);
            this.title = this.body = "";
            this.toggle();
            this.$buefy.toast.open({
              message: "Posted successfully!",
              type: "is-success"
            });
          })
          .catch(err => alert(err.message));
  //I STOPPED HERE AT UPLOAD IMAGE
          // uploadImage(data).then(data=>{
          //   this.$emit("uploadImage", data.note);
          // })
      }
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style scoped>
#filename {
  color: rgb(36, 35, 35);
}
</style>
