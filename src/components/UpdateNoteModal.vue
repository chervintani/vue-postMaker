<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update post</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <!-- <section class="modal-card-body">
          <div class="control">
            <input v-model="title" class="input" type="text" placeholder="Title">
          </div>
          <br>
          <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea>
          <br>
          <b-input placeholder="People" v-model="people"></b-input>
          <br>
          <b-input placeholder="Location" v-model="location"></b-input>
          <br>
          <b-input placeholder="Date and Time" v-model="datetime"></b-input>
        </section>-->
        <section class="modal-card-body">
          <div class="control">
            <!-- <input v-model="title" class="input" type="text" placeholder="Title"> -->
            <b-field label="Name of the event" :label-position="labelPosition">
              <b-input placeholder="Title" icon-pack="fas" icon="pencil-alt" v-model="title"></b-input>
            </b-field>
          </div>
          <br>
          <b-field label="Put a content..." :label-position="labelPosition" rounded>
            <b-input
              maxlength="200"
              type="textarea"
              v-model="body"
              placeholder="Discuss about the event..."
            ></b-input>
          </b-field>
          <b-field label="People invited" :label-position="labelPosition">
            <b-input placeholder="Add people" icon-pack="fas" icon="user" v-model="people"></b-input>
          </b-field>
          <b-field label="Set location" :label-position="labelPosition">
            <b-input
              placeholder="Add location"
              icon-pack="fas"
              icon="map-marker-alt"
              v-model="location"
            ></b-input>
          </b-field>
          <b-input placeholder="Date and Time" v-model="datetime"></b-input>
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
      labelPosition: "on-border",
      title: this.note.title,
      body: this.note.body,
      people: this.note.people,
      location: this.note.location,
      datetime: this.note.datetime,
      isActive: false
    };
  },
  props: ["note"],
  methods: {
    update() {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      let data = {
        title: this.title,
        body: this.body,
        people: this.people,
        location: this.location,
        datetime: this.datetime
      };
      updateNote(data, this.note._id)
        .then(data => {
          loadingComponent.close();
          this.$buefy.toast.open({
            message: this.note.title + " is updated successfully!",
            type: "is-success"
          });
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
<style scoped>
#filename {
  color: rgb(36, 35, 35);
}
/* first things first */
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

label {
  /* just positioning */
  float: left;
  margin-bottom: 0.5em;
}

.upload-button {
  /* key */
  position: relative;
  overflow: hidden;

  /* just positioning */
  float: left;
  clear: left;
}

.upload-cover {
  /* basicall just style this however you want */
  background-color: gray;
  text-align: center;
  padding: 0.5em 1em;
  border-radius: 2em;
  border: 5px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;
}

.upload-button input[type="file"] {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -75px; /* gets that button with no-pointer-cursor off to the left and out of the way */
  width: 200%; /* over compensates for the above - I would use calc or sass math if not here*/
  height: 100%;
  opacity: 0; /* left this here so you could see. Make it 0 */
  cursor: pointer;
  border: 1px solid #8c67ef;
}

.upload-button:hover .upload-cover {
  background-color: #8c67ef;
}

body {
  font-family: arial;
  padding: 3em;
}
.fileUpload {
  position: relative;
  overflow: hidden;
  margin: 10px;
}
.fileUpload input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>
