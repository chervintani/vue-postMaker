import Vue from "vue";
import Vuex from "vuex";
import { isNull } from "util";

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            authenticated: isNull(sessionStorage.getItem("authenticated")) ? false : true
        },
        mutations: {
            setAuthentication(state, status) {
                sessionStorage.setItem("authenticated", status)
                state.authenticated = status;
            }

        }
    }
);
