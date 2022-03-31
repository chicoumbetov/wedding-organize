import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Admin from '../views/admin.vue'
import Profil from '../views/profil.vue'

Vue.use(VueRouter)


function admin_guard(to, from, next)
{
    const parse = JSON.parse(localStorage.getItem('user'));

    if(parse.isAdmin == true){
        next()
    }
    else{
        next({name: 'home'})

    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/profil',
        name: 'profil',
        component: Profil,
    },
    {
        path: '/admin',
        name: 'admin',
        beforeEnter : admin_guard,
        component: Admin,
    }

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
