<template>
    <div>
        <mt-field label="用户名" state="success" v-model="username"></mt-field>
        <mt-field label="邮箱" :state="emailState" v-model="email"></mt-field>
        <mt-button @click="doLogin">登录</mt-button>
    </div>
</template>
<script>
    export default {
        methods:{
            doLogin(){
                this.$axios.put('users/'+ this.username,{
                    isLogin:true
                }).
                then( res=>{
                    this.$router.push({
                        name:'music.list'
                    },
                    window.localStorage.setItem("username",this.username)//当登录成功后，在本地保存登录名，以便home页面退出的时候可以获取到username从而改变data.json中的isLogin状态
                    
                    );
                })
            }
        },
        data(){
            return {
                username:'',email:'',emailState:''
            }
        },

        //监视
        watch:{
            //验证邮箱
            email:function(newV){
                if(newV == 'lh@qq.com'){
                    this.emailState = 'success';
                }else if(!newV.includes('@')){
                    this.emailState = 'error';
                }else{
                    this.emailState = 'warning';
                }
            }
        }
    }
</script>
<style>
    
</style>