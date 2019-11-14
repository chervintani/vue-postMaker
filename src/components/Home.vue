<template>
  <div id="home">
    <b-navbar class="is-link is-fixed-top">
      <template slot="brand">
        <b-navbar-item>
          <p class="title is-3 has-text-light" @click="home">EventHub</p>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-field style="margin-top:3%">
          <b-input placeholder="Search..." type="search" v-model="searching"></b-input>
          <p class="control">
            <b-button class="button is-primary" @click="searched">Search</b-button>
          </p>
        </b-field>
        <b-navbar-item tag="div">
          <div class="buttons">
            <CreateNoteModal @createNote="createNote" />
            <router-link to="/login"></router-link>
            <b-navbar-dropdown>
              <b-navbar-item href="/login">
                <button class="button is-danger is-outlined is-fullwidth" @click="loggedOut">Logout</button>
              </b-navbar-item>
            </b-navbar-dropdown>
            <span id="username" v-html="user">test</span>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <br />
    <div class="container">
      <div v-if="notes">
        <br />
        <div>
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
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";
import CreateNoteModal from "./CreateNoteModal";
import { getNotes } from "../repository";

export default {
  name: "home",
  components: { NoteItem, CreateNoteModal },
  data() {
    return {
      notes: [],
      noteSearch: [],
      searching: "",
      user: sessionStorage.getItem("username")
    };
  },
  methods: {
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
    searched(e) {
      e.preventDefault();
      let keyword = this.searching;
      let a = this.noteSearch.filter(function(post) {
        return post.title == keyword;
      });
      for (var i = 0; i < this.noteSearch.length; ++i) {
        if (this.noteSearch[i].title == keyword) {
          this.notes = [];
          this.notes.push(a[0]);
          break;
        }else {
          console.log("Search not found")
        }
      }
    },
    home(e) {
      e.preventDefault();
      this.notes = this.noteSearch;
    }
  },
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    getNotes()
      .then(data => {
        loadingComponent.close();
        this.notes = data.notes;
        this.noteSearch = this.notes;
      })
      .catch(err => alert(err));
  }
  // computed: {
  //   filteredList() {
  //     return this.notes.filter(post => {
  //       return post.title.toLowerCase().includes(this.search.toLowerCase());
  //     });
  //   }
  // }
};
</script>
<style scoped>
.title {
  padding-top: 10%;
}
</style>
