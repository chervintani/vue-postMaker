
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import Vue from "vue";
import Router from "vue-router";
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
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    }
    ]
});


export default router;