
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import NotFound from "@/components/404.vue";
import Profile from "@/components/UpdateProfModal.vue"
import MyEvents from "@/views/MyEvents.vue"
import Vue from "vue";
import Router from "vue-router";
import store from "./store"
Vue.use(Router);

var router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
        path: "/",
        redirect: {
            path: "/login"
        }
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next("/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/myevents",
        name: "myevents",
        component: MyEvents,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next("/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == true) {
                next("/home");
            } else {
                next();
            }

        },
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == true) {
                next("/home");
            } else {
                next();
            }

        },
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (!to.meta.tokenRequired) {
//         // console.log(localStorage.getItem('default'))
//         next("/login");
//     } else {
//         next();
//     }
//     let token = localStorage.getItem('default');
//     if (token === "success") {
//         next("/login");
//     } else {
//         next();
//     }

// });
export default router;