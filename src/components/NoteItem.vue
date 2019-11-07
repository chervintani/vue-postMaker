<template>
  <article class="message is-info" style="margin-top: 5%">
    <div class="message-header">
      <p>Event Title: {{ note.title }}</p>
      <button @click="deleteNote" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <b-field label="About">
      <p>{{note.body}}</p>
      </b-field>
      <br>
      <b-field label="Location">
      <p>{{note.location}}</p>
      </b-field>
      <br>
      <span class="has-text-grey-light">Created at: {{ note.createdat | moment }}</span>
      <br>
      <span class="has-text-grey-light">Last updated: {{ note.updatedat | moment }}</span>
      <br>
      <UpdateNoteModal :note="note" @updateNote="updateNote" :key="note._id"/>
    </div>
  </article>
</template>

<script>
import { deleteNote , createNote } from "../repository";
import UpdateNoteModal from "./UpdateNoteModal";
import Moment from "moment";

export default {
  name: "NoteItem",
  props: ["note"],
  components: { UpdateNoteModal },
  methods: {
    deleteNote(e) {
      e.preventDefault();
      const title = this.note.title
      const body = this.note.body
      const location = this.note.location
      this.$buefy.snackbar.open({
        duration: 5000,
        message:
          this.note.title +
          " is deleted successfully!<br><em>Click UNDO to restore post</em>.",
        type: "is-danger",
        position: "is-bottom-left",
        actionText: "Undo",
        queue: false,
        onAction: () => {
          let data = {title: title, body: body, location: location}
          createNote(data)
            .then(data => {
              this.$emit("createNote", data.note);
              this.$buefy.toast.open({
                message: "Refresh page to undo the post",
                queue: false
              });
            });
        }
      });
       deleteNote(this.note._id)
        .then(() => this.$emit("deleteNote", this.note._id))
        .catch(err => alert(err));
    },
    updateNote(note) {
      this.$emit("updateNote", note);
    },
  },
  filters: {
    moment(date) {
      return Moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>