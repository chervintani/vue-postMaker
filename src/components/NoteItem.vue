<template>
  <article class="message is-info" style="margin-top: 5%">
    <div class="message-header">
      <p>Post Title: {{ note.title }}</p>

      <button @click="deleteNote" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {{ note.body }}
      <br>
      <br>
      <span class="has-text-grey-light">Created at: {{ note.createdAt | moment }}</span>
      <br>
      <span class="has-text-grey-light">Last updated: {{ note.updatedAt | moment }}</span>
      <br>
      <UpdateNoteModal :note="note" @updateNote="updateNote" :key="note._id"/>
    </div>
  </article>
</template>

<script>
import { deleteNote } from "../repository";
import UpdateNoteModal from "./UpdateNoteModal";
import Moment from "moment";

export default {
  name: "NoteItem",
  props: ["note"],
  components: { UpdateNoteModal },
  methods: {
    deleteNote(e) {
      e.preventDefault();
      this.$buefy.snackbar.open({
        duration: 5000,
        message:
          this.note.title+ " is deleted successfully!<br>Note: <em>Message can include html</em>.",
        type: "is-danger",
        position: "is-bottom-left",
        actionText: "Close",
        queue: false,
        onAction: () => {
          this.$buefy.toast.open({
            message: "Case closed",
            queue: false
          });
        }
      });
      deleteNote(this.note._id)
        .then(() => this.$emit("deleteNote", this.note._id))
        .catch(err => alert(err));
    },
    updateNote(note) {
      this.$emit("updateNote", note);
    }
  },
  filters: {
    moment(date) {
      return Moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>