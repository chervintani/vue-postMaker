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
          <b-input placeholder="Search..." type="search" v-model="searching"></b-input>
          <p class="control">
            <b-button class="button title is-6 is-outlined" @click="searched" id="search">Search</b-button>
          </p>
        </b-field>

        <b-navbar-item tag="div">
          <div class="buttons">
            <CreateNoteModal @createNote="createNote"/>
            <b-dropdown aria-role="list">
              <button class="button is-primary" slot="trigger">
                <span id="username" v-html="user" style="margin-right:10%" ></span>
                <img id="avatar" src="../assets/download.png">
                <b-icon icon-pack="fas" icon="chevron-down" size="is-small"></b-icon>
              </button>
              <b-dropdown-item aria-role="listitem" href="/#"> <!-- SWITCH TO PROFILE ROUTER PATH -->
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
          <p class="title is-3 has-text-dark" style="text-align:center" v-if="notFound">
            No results found for
            <span id="noResult"></span>
          </p>
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
          <div class="control">
            
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success is-outlined is-fullwidth is-rounded">Update</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import NoteItem from "../components/NoteItem.vue";
import CreateNoteModal from "../components/CreateNoteModal";
import UpdateProfModal from "../components/UpdateProfModal";
import { getNotes } from "../repository";
import $ from "jquery";
export default {
  name: "home",
  components: { NoteItem, CreateNoteModal, UpdateProfModal },
  data() {
    return {
      notes: [],
      noteSearch: [],
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
    searched(e) {
      e.preventDefault();
      let keyword = this.searching;
      let a = this.noteSearch.filter(function(post) {
        return post.title == keyword;
      });
      if (this.searching != "") {
        for (var i = 0; i < this.noteSearch.length; ++i) {
          if (this.noteSearch[i].title == keyword) {
            this.notFound = false;
            this.notes = [];
            this.notes.push(a[0]);
            break;
          } else {
            if (
              this.noteSearch[i] == this.noteSearch[this.noteSearch.length - 1]
            ) {
              // console.log("Search not found");
              $("#noResult").text(this.searching);
              this.notFound = true;
              this.notes = [];
            }
          }
        }
      }
    },
    home(e) {
      e.preventDefault();
      this.notes = this.noteSearch;
      this.notFound = false;
      window.location.reload();
    }
  },
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    getNotes()
      .then(data => {
        loadingComponent.close();
        for(var i =0; i<data.notes.length;++i){
          if(data.notes[i].creator == this.user){
            this.notes.push(data.notes[i])
          }
        }
        console.log(data.notes.length)
        
        // this.notes = data.notes;
        // this.noteSearch = this.notes;
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
  border-radius: 50%
}
</style>
