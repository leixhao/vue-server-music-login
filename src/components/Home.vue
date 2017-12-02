<template>
    <div>
        <router-link :to="{name:'login'}">登录</router-link>
        <mt-button type="danger" size="small" @click="exit">退出</mt-button>
        <router-link :to="{name:'music'}">音乐</router-link>
        <router-link :to="{name:'music.list'}">音乐列表</router-link>

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        methods:{
            exit(){
                // console.log(window.localStorage.getItem("username"));//打印本地保存的username值
                var username = window.localStorage.getItem("username");//将登录时保存的本地username获取到，并赋值
                //点击退出，通过axios发送ajax请求，改变登录状态
                this.$axios.put('users/' + username,{
                    isLogin:false
                }).
                then( res=>{
                    //点击退出后，跳转到login登录页面
                    this.$router.push({
                        name:'login'
                    });
                });
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>
<style>
    
</style>