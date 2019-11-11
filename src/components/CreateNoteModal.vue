<template>
  <div style="margin-top:8%">
    <button @click="toggle" class="button is-light is-outlined is-rounded">Create Event</button>
    <br>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title" >Add an event</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <!-- <input v-model="title" class="input" type="text" placeholder="Title"> -->
            <b-field label="Name of the event" :label-position="labelPosition">
              <b-input placeholder="Title" icon-pack="fas" icon="pencil-alt" v-model="title" maxlength="50"></b-input>
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
          <b-field label="Set date and time" :label-position="labelPosition">
            <b-datetimepicker
              rounded
              placeholder="Type or select a date..."
              icon="calendar"
              v-model="datetime"
              :timepicker="{ hourFormat: format }"
            ></b-datetimepicker>
          </b-field>

          <!-- <textarea v-model="body" class="textarea" placeholder="Enter content"></textarea> -->
          <div class="upload-button">
            <div class="upload-cover">
              <b-icon icon-pack="fas" icon="upload"></b-icon>&nbsp Upload image
            </div>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file">
          </div>
          <div class="fileUpload btn btn-primary">
            <span>Upload</span>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file" class="upload">
          </div>
          <br>
          <span class="file-name" id="filename" v-if="file">{{ file }}</span>
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
      formatAmPm: true,
      file: null,
      labelPosition: "on-border",
      title: "",
      body: "",
      people: "",
      location: "",
      datetime: null,
      images: null,
      isActive: false,
      uploaded: false
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
        this.images = { filename: b[2], image: img.src };
      };
      reader.readAsDataURL(file);

      var temp = document.getElementById("file").value.split("\\");
      this.file = temp[2];
      this.uploaded = true;
    },
    create() {
      if (!this.uploaded) {
        return this.$buefy.toast.open({
          message: "Please fill all the fields!",
          type: "is-danger"
        });
      } else {
        let data = {
          title: this.title,
          body: this.body,
          people: this.people,
          location: this.location,
          datetime: this.datetime,
          filename: this.images.filename,
          image: this.images.image
        };
        if (
          data.title == "" ||
          data.body == "" ||
          data.people == "" ||
          data.location == "" ||
          data.datetime == ""
        ) {
          this.$buefy.toast.open({
            message: "Please fill all the fields!",
            type: "is-danger"
          });
        } else {
          var tostring = data.datetime.toString();
          var subs = tostring.substring(0,24)
          data.datetime = subs;
          createNote(data)
            .then(data => {
              const loadingComponent = this.$buefy.loading.open({
                container: null
              });
              setTimeout(() => loadingComponent.close(), 1 * 1000);
              this.title = "";
              this.body = "";
              this.people = "";
              this.location = "";
              this.datetime = null;
              this.file = "";

              this.$emit("createNote", data.note);
              this.toggle();
              this.$buefy.toast.open({
                message: "Posted successfully!",
                type: "is-success"
              });
            })
            .catch(err => alert(err.message));
        }
      }
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  },
  computed: {
    format() {
      return this.formatAmPm ? "12" : "24";
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
