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
            <!-- <input v-model="title" class="input" type="text" placeholder="Title"> -->
            <b-field label="Name of the event" :label-position="labelPosition">
              <b-input placeholder="Title" icon-pack="fas" icon="pencil-alt" v-model="title"></b-input>
            </b-field>
          </div>
          <br />
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
            <b-input placeholder="Date and Time" icon-pack="fas" icon="calendar" v-model="datetime"></b-input>
          </b-field>
          <div class="upload-button">
            <div class="upload-cover">
              <b-icon icon-pack="fas" icon="upload"></b-icon>&nbsp; Upload image
            </div>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file" />
          </div>
          <br />
          <img v-bind:src="note.image" id="image" />
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
import Moment from "moment";
export default {
  name: "UpdateNoteModal",
  data() {
    return {
      file: null,
      labelPosition: "on-border",
      title: this.note.title,
      body: this.note.body,
      people: this.note.people,
      location: this.note.location,
      datetime: this.note.datetime,
      isActive: false,
      images: null
    };
  },
  props: ["note"],
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

    },
    update() {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      if(!this.images){
        this.images = {
          filename: this.note.filename,
          image: this.note.image
        }
      }
      let data = {
        title: this.title,
        body: this.body,
        people: this.people,
        location: this.location,
        datetime: this.datetime,
        filename: this.images.filename,
        image: this.images.image,
        date_created: this.note.date_created,
        date_updated: Moment().format("MMMM Do YYYY, h:mm:ss a")
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
  color: white;
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

#image {
  width: 40%;
}

#image:hover {
  box-shadow: 2px 2px 10px grey;
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
