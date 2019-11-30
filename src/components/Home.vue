<template>
  <div id="home">
    <b-navbar class="is-link is-fixed-top">
      <template slot="brand">
        <b-navbar-item>
          <p class="title is-3 has-text-light" @click="home">EventHub</p>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-field style="margin-top:3%;margin-right: 2%">
          <b-input placeholder="Search event title..." type="search" v-model="searching"></b-input>
          <p class="control">
            <b-button class="button title is-6 is-outlined" @click="searched" id="search">Search</b-button>
          </p>
        </b-field>

        <b-navbar-item tag="div">
          <div class="buttons">
            <CreateNoteModal @createNote="createNote"/>
            <b-dropdown aria-role="list">
              <button class="button is-primary" slot="trigger">
                <span id="username" v-html="user" style="margin-right:10%"></span>
                <img id="avatar" src="../assets/download.png">
                <b-icon icon-pack="fas" icon="chevron-down" size="is-small"></b-icon>
              </button>
              <b-dropdown-item aria-role="listitem" href="/#">
                <!-- SWITCH TO PROFILE ROUTER PATH -->
                <p class="title is-6">Profile</p>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" href="/login">
                <p class="title is-6" @click="loggedOut">Logout</p>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <br>
    <div class="container">
      <div v-if="notes">
        <br>
        <div>
          <div style="overflow: hidden;">
            <p
              v-if="notFound"
              style="margin:1;display:inline;float:left"
              class="title is-3 has-text-dark"
            >No results found for '</p>
            <p
              style="margin:1;display:inline:float:right"
              class="title is-3 has-text-dark"
              id="noResult"
            ></p>
          </div>
          <noteItem
            v-for="(note, index) in notes"
            :note="note"
            :key="index"
            @deleteNote="deleteNote"
            @updateNote="updateNote"
          />
        </div>
      </div>
    </div>
    <!-- THIS IS A MODAL-->
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Profile</p>
          <button class="delete" aria-label="close" @click="toggle"></button>
        </header>
        <section class="modal-card-body">
          <div class="control"></div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success is-outlined is-fullwidth is-rounded">Update</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NoteItem from "./NoteItem.vue";
import CreateNoteModal from "./CreateNoteModal";
import UpdateProfModal from "./UpdateProfModal";
import { getNotes, searchNote } from "../repository";
import $ from "jquery";
export default {
  name: "home",
  components: { NoteItem, CreateNoteModal, UpdateProfModal },
  data() {
    return {
      notes: [],
      searching: "",
      notFound: false,
      user: sessionStorage.getItem("username"),
      isActive: false
    };
  },
  methods: {
    openModal() {
      this.isActive = true;
    },
    toggle() {
      this.isActive = !this.isActive;
    },
    loggedOut() {
      sessionStorage.removeItem("authenticated");
    },
    deleteNote(id) {
      let notes = this.notes.filter(note => note._id != id);
      this.notes = notes;
    },
    updateNote(note) {
      this.deleteNote(note._id);
      this.createNote(note);
    },
    createNote(note) {
      this.notes = [note, ...this.notes];
    },
    searched() {
      if (!this.searching.match(/^\s*$/)) {
        const loadingComponent = this.$buefy.loading.open({
          container: null
        });
        searchNote(this.searching).then(data => {
          loadingComponent.close();
          if (data.data.length <= 0) {
            console.log("Search not found");
            $("#noResult").show();
            $("#noResult").text(data.search + "'");
            this.notFound = true;
            this.notes = [];
          } else {
            this.notFound = false;
            $("#noResult").hide();
            this.notes = [];
            this.notes = data.data;
          }
        });
      }
    },
    home() {
      this.notFound = false;
      window.location.reload();
    }
  },
  mounted() {
    $("#noResult").hide();
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    getNotes()
      .then(data => {
        loadingComponent.close();
        this.notes = data.notes;
      })
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
.title {
  padding-top: 10%;
}
.is-6:hover {
  color: #8c67ef;
}
#username {
  display: block;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#avatar {
  border-radius: 50%;
}
</style>
