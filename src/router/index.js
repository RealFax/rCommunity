import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Text.Home.title'
    },
    component: () => import('../views/Home.vue')
  },{
    path: '/about',
    name: 'About',
    meta: {
      title: 'Text.About.title'
    },
    component: () => import('../views/About.vue')
  }, {
    path: '/EULA',
    name: 'EULA',
    meta: {
      title: 'Text.EULA.title'
    },
    component: () => import('../views/EULA.vue')
  }, {
    path: '/register',
    name: 'Register',
    meta: {
      title: "Text.Register.title"
    },
    component: () => import('../views/Register.vue')
  }, {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Text.Login.title'
    },
    component: () => import('../views/Login.vue')
  }, {
    path: '/verify',
    name: 'Verify',
    meta: {
      title: 'Text.Verify.title'
    },
    component: () => import('../views/Verify.vue')
  }, /**{
    path: '/search',
    title: 'Search',
    meta: {
      title: 'Text.Search.title'
    },
    component: () => import('../views/Search.vue')
  }, **/{
    path: '/topic/:topicId',
    name: 'Topic',
    // meta: {
    //   title: 'Text.Read.title'
    // },
    component: () => import('../views/topic/Ground.vue'),
    props: true
  }, {
    path: '/user/:userId',
    name: 'User',
    meta: {
      title: 'Text.User.title'
    },
    component: () => import('../views/User/User.vue'),
    props: true
  }, {
    path: '/user/:userId/setting',
    name: 'UserSetting',
    meta: {
      title: 'Text.User.Setting.title'
    },
    component: () => import('../views/User/Setting.vue'),
    props: true
  }, {
    path: '/logout',
    name: 'LogOut',
    meta: {
      title: 'Text.User.Exit.title'
    },
    component: () => import('../views/User/Exit.vue')
  }, {
    path: '/author',
    name: 'Author',
    meta: {
      title: 'Text.Author.title'
    },
    component: () => import('../views/author/Author.vue')
  }, {
    path: '/author/editor',
    name: 'AuthorEdit',
    meta: {
      title: 'Text.Author.Editor.title'
    },
    component: () => import('../views/author/Editor.vue')
  }, {
    path: '/author/manage',
    name: 'AuthorManage',
    meta: {
      title: 'Text.Author.Manage.title'
    },
    component: () => import('../views/author/Manage.vue')
  }, {
    path: '*',
    name: 'Notfound',
    meta: {
      title: 'Text.Status.NotFound.title'
    },
    component: () => import('../views/status/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
