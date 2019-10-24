<template>
  <div style="margin-top:8%">
    <button @click="toggle" class="button is-link is-outlined is-rounded">Create Post</button>
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
            <input v-model="title" class="input" type="text" placeholder="Title">
          </div><br>
          <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea>
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
        })
        .catch(err => alert(err.message));
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>