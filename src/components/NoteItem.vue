<template>
  <article class="message is-info" style="margin-top: 5%">
    <div class="message-header">
      <p>Event Title: {{ note.title }}</p>
      <button
        @click="deleteNote"
        class="delete"
        aria-label="delete"
        v-if="this.creator == note.creator"
      ></button>
    </div>
    <div class="message-body">
      <p class="is-pulled-left">Creator: {{note.creator}}</p>
      <br>
      <!-- note.creator -->
      <img v-bind:src="note.image" id="image" @click="imageModal()">
      <br>
      <b-field label="About">
        <p class="ellipsis">{{note.body}}</p>
      </b-field>

      <b-field label="People">
        <p class="ellipsis">{{note.people}}</p>
      </b-field>

      <b-field label="Location">
        <p class="ellipsis">{{note.location}}</p>
      </b-field>

      <b-field label="Date and time">
        <p class="ellipsis">{{note.datetime}}</p>
      </b-field>

      <span class="has-text-grey">Created at: {{ note.date_created }}</span>
      <br>
      <span class="has-text-grey">Last updated: {{note.date_updated }}</span>
      <br>
      <UpdateNoteModal
        :note="note"
        @updateNote="updateNote"
        :key="note._id"
        v-if="this.creator == note.creator"
      />
    </div>
  </article>
</template>

<script>
import { deleteNote, createNote } from "../repository";
import UpdateNoteModal from "./UpdateNoteModal";

export default {
  name: "NoteItem",
  props: ["note"],
  data() {
    return {
      close: false,
      creator: sessionStorage.getItem("username"),
      members: {
        picture: require("../assets/logo.png")
      }
    };
  },
  components: { UpdateNoteModal },
  methods: {
    imageModal() {
      this.$buefy.modal.open(
        `<p class="image is-2by2">
          <img src="${this.note.image}">
        </p>`
      );
    },
    deleteNote(e) {
      e.preventDefault();
      let retrieveData = {
        title: this.note.title,
        body: this.note.body,
        people: this.note.people,
        location: this.note.location,
        creator: this.note.creator,
        datetime: this.note.datetime,
        filename: this.note.filename,
        image: this.note.image,
        date_created: this.note.date_created,
        date_updated: this.note.date_updated
      };
      this.$buefy.dialog.confirm({
        title: "Deleting post",
        message: "Are you sure you want to <b>delete</b> your post?",
        confirmText: "Delete Post",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
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
              let data = retrieveData;
              createNote(data).then(data => {
                this.$emit("createNote", data.note);
                this.$buefy.toast.open({
                  message: "Refresh page to undo the post",
                  queue: false
                });
              });
            }
          })
      });
      deleteNote(this.note._id)
        .then(() => {
          this.$emit("deleteNote", this.note._id);
        })
        .catch(err => alert(err));
    },
    updateNote(note) {
      this.$emit("updateNote", note);
    }
  }
};
</script>
<style scoped>
#image {
  height: 250px;
}
#image:hover {
  cursor: pointer;
}

.message-body {
  background-color: rgb(205, 217, 252);
}
img {
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
article {
  text-align: center;
  margin-left: 15%;
  margin-right: 15%;
  font-family: Comfortaa;
}

.ellipsis {
  word-wrap: break-word;
  margin-left: 10%;
  margin-right: 10%;
  overflow: ellipsis;
}
</style>
