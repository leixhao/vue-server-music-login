import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Axios from 'axios';

import App from './components/App.vue';
import Home from './components/Home.vue';
import Music from './components/Music.vue';
import List from './components/List.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);
Vue.use(MintUi);
Vue.prototype.$axios = Axios;

//拦截器loadding
Axios.interceptors.request.use(function(config) {
    MintUi.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config) {
    MintUi.Indicator.close();
    return config;
});
console.log(Axios.defaults);

//设置全局默认URL前缀，每次跳转链接前面拼接上
Axios.defaults.baseURL = 'http://localhost:3000/';

//路由
let router = new VueRouter();

router.addRoutes([{
        path:'/',//设置默认路由，即默认访问/的时候，直接跳转home页面，防止用户看到空页面
        redirect:{name:'home'}//路由重定向
    },{
    name:'home',
    path:'/home',
    component:Home,
    children: [{
        name:'login',
        path:'/login',
        component:Login   
    },{
        name:'music',
        path:'/music',
        component:Music,
        meta:{check:true},//设置meta值，以便路由钩子中获取，判断用户的登录状态，判断是否可以跳转
        children:[
            {name:'music.list',path:'list',meta:{check:true},component:List}
        ]
    }]
}]);

//全局钩子
router.beforeEach((to,from,next)=>{
    let checkLogin = false;
    // console.log(to.matched);//每个路由的信息，其中的meta值可以获取到上面路由中设置的check值，从而判断用户是否登录
    to.matched.forEach(ele=>{
        if(ele.meta.check){
            checkLogin = true;
        }
    });

    //判断是否发送请求
    if(checkLogin){
        Axios.get('users/lh')
        .then(  res => {
            //如果登录,直接放行
            if(res.data.isLogin){
                return next();
            }

            //没有登录,提示
            MintUi.Toast({
                message: '请登录',
                position: 'middle',
                duration: 5000
              });
              //没登录跳转到login登录页面
              next({
                  name:'login'
              })
        })
        .catch( err =>{
            console.log(err);
        })
    }else{
        next();
    }


});


new Vue ({
    el:"#app",
    render:c => c(App),
    router
})
