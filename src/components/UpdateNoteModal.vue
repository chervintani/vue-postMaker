<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update post</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <input v-model="title" class="input" type="text" placeholder="Title">
          </div>
          <br>
          <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea>
          <br>
          <b-input placeholder="Add location" v-model="location"></b-input>
        </section>
        <footer class="modal-card-foot">
          <button
            @click="update"
            class="button is-success is-outlined is-fullwidth is-rounded"
          >Update</button>
        </footer>
      </div>
    </div>
    <button @click="toggle" class="button is-small is-primary">Update</button>
  </div>
</template>

<script>
import { updateNote } from "../repository";
export default {
  name: "UpdateNoteModal",
  data() {
    return {
      labelPosition: 'on-border',
      title: this.note.title,
      body: this.note.body,
      location: this.note.location,
      isActive: false
    };
  },
  props: ["note"],
  methods: {
    update() {
      let data = { title: this.title, body: this.body, location: this.location };
      this.$buefy.toast.open({
        message: this.note.title+" is updated successfully!",
        type: "is-success"
      });
      updateNote(data, this.note._id)
        .then(data => {
          this.$emit("updateNote", data.note);
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