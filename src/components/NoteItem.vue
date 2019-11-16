<template>
  <article class="message is-info" style="margin-top: 5%">
    <div class="message-header">
      <p>Event Title: {{ note.title }}</p>
      <button @click="deleteNote" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
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
      <UpdateNoteModal :note="note" @updateNote="updateNote" :key="note._id"/>
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
      members: {
        picture: require("../assets/logo.png")
      }
    };
  },
  components: { UpdateNoteModal },
  methods: {
    imageModal() {
      this.$buefy.modal.open(
        `<p class="image is-4by3">
          <img src="${this.note.image}">
        </p>`
      );
    },
    deleteNote(e) {
      e.preventDefault();
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      const title = this.note.title;
      const body = this.note.body;
      const people = this.note.people;
      const location = this.note.location;
      const datetime = this.note.datetime;
      const filename = this.note.filename;
      const image = this.note.image;
      const date_created = this.note.date_created;
      const date_updated = this.note.date_updated;
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
          let data = {
            title: title,
            body: body,
            people: people,
            location: location,
            datetime: datetime,
            filename: filename,
            image: image,
            date_created: date_created,
            date_updated: date_updated
          };
          createNote(data).then(data => {
            this.$emit("createNote", data.note);
            this.$buefy.toast.open({
              message: "Refresh page to undo the post",
              queue: false
            });
          });
        }
      });
      deleteNote(this.note._id)
        .then(() => {
          loadingComponent.close();
          this.$emit("deleteNote", this.note._id);
        })
        .catch(err => alert(err));
    },
    updateNote(note) {
      this.$emit("updateNote", note);
    }
  },
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
