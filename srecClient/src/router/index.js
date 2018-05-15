import Vue from 'vue'
import Router from 'vue-router'
// import index from '../views/index.vue';
// import newsDetail from '../views/newsDetail.vue'
// import userInfo from '../views/userInfo.vue';
// import register from '../views/register.vue';
// import login from '../views/login.vue';

Vue.use(Router)
const _import_ = file => () => import("@/views/"+file+".vue");

export default new Router({
  routes: [
    {
      path:"/",
      name:"index",
      component:_import_("index"),
      meta:{
        keepAlive:true
      }
    },
    {
      path:"/newsDetail/:n_id",
      name:"newsDetail",
      component:_import_("newsDetail")
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:_import_("userInfo")
    },
    {
      name:'register',
      path:'/register',
      component:_import_("register")
    },{
      name:'login',
      path:"/login",
      component:_import_("login")
    },
    {
      name:'test',
      path:'/test',
      component:_import_('test')
    }
  ]
})
