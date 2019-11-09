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
          <div class="upload-button">
            <div class="upload-cover">Upload image</div>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file">
          </div>
          <div class="fileUpload btn btn-primary">
            <span>Upload</span>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file" class="upload">
          </div>
          <span class="file-name" id="filename" v-if="file">{{ file.name }}</span>
        </section>

        <footer class="modal-card-foot">
          <button @click="create" class="button is-success is-fullwidth is-rounded">Post</button>
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
      file: null,
      labelPosition: "on-border",
      title: "",
      body: "",
      location: "",
      isActive: false,
      images: null
    };
  },
  methods: {
    encodeToBase64(event) {
      event.preventDefault();
      const file = event.target.files[0];
      const canvas = document.createElement("canvas");
      canvas.getContext("2d");
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          this.image = canvas
            .toDataURL("image/png")
            .replace(/^data:image\/(png|jpg);base64,/, "");
          // console.log("RESULT/png", this.image);
        };
        img.src = event.target.result;
        // console.log("RESULT!", img.src);
        var a = document.getElementById("file").value;
        var b = a.split("\\");
        // console.log(b[2]);
        this.images = { filename: b[2], image: img.src };
      };
      reader.readAsDataURL(file);
    },
    create() {
      let data = {
        title: this.title,
        body: this.body,
        location: this.location,
        filename: this.images.filename,
        image: this.images.image
      };
      if (data.title == "" || data.body == "" || data.location == "") {
        this.$buefy.toast.open({
          message: "Please fill all the fields!",
          type: "is-danger"
        });
      } else {
        createNote(data)
          .then(data => {
            const loadingComponent = this.$buefy.loading.open({
              container: null
            });
            setTimeout(() => loadingComponent.close(), 1 * 1000);
            this.$emit("createNote", data.note);
            this.title = this.body = "";
            this.toggle();
            this.$buefy.toast.open({
              message: "Posted successfully!",
              type: "is-success"
            });
          })
          .catch(err => alert(err.message));
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
  border: 1px solid red;
}

.upload-button:hover .upload-cover {
  background-color: #f06;
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
