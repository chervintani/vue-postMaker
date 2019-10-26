<template>
  <div style="margin-top:8%">
    <button @click="toggle" class="button is-light is-outlined is-rounded">Create Post</button>
    <br>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a post</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <!-- <input v-model="title" class="input" type="text" placeholder="Title"> -->
            <b-field label="Enter a title">
              <b-input placeholder="Title" v-model="title"></b-input>
            </b-field>
          </div>
          <br>
          <b-field label="Put a content..." :label-position="labelPosition" rounded>
            <b-input maxlength="200" v-model="body" type="textarea" placeholder="Say what you want to say..."></b-input>
          </b-field>
          <!-- <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea> -->
        </section>
        <footer class="modal-card-foot">
          <button @click="create" class="button is-success is-outlined is-fullwidth is-rounded">Post</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { createNote } from "../repository";
export default {
  name: "CreateNoteModal",
  data() {
    return {
      title: "",
      body: "",
      isActive: false
    };
  },
  methods: {
    create() {
      let data = { title: this.title, body: this.body };
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
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>