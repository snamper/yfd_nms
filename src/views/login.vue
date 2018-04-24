<template>
  <section class="g-login">
    <div class="top"><img src="../assets/images/logo.jpg"></div>
    <div class="login-box">
      <div class="inner">
        <!-- <div class="shift">
          <span class="right btn" :class="{active:loginType==2}" @click="shiftLoginType(2)">后台管理<i></i></span>
        </div> -->
        <div class="row">
          <span class="left u-icon-user"></span>
          <input type="text" v-model="form.phone" placeholder="请输入手机号码" maxlength="11">
        </div>
        <div class="row vercode">
          <span class="left u-icon-reg"></span>
          <input type="text" v-model="form.authCode" @keydown="toLogin" placeholder="请输入验证码" maxlength="6">
          <span class="btn" v-show="!count" @click="identifyBtnClick">发送验证码</span>
          <span class="count" v-show="count">{{ count }}</span>
        </div>
        <button @click="actionLogin">登录</button>
      </div>
    </div>
  </section>
</template>

<script>
// import base64 from '../../utils/base64';
import { errorDeal,windowJump,setStore } from '../config/utils/uutils';
import api from '../config/api/login.js';
import {mapMutations} from 'vuex';
import mutations from '../store/mutations';
import { SET_USERINFO } from '../store/mutation-types';
export default {
  props: ['login'],
  data(){
    return {
      title:'登录-码号商城',
      loginType:1,//1，码号商城登录；2、后台管理
      count:0,
      form:{
        phone:'',
        authCode:''
      }
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '登录-码号商城' }
      ]
    }
  },
  mounted:function(){
  },
  beforeDestroy:function(){
    this.initForm();
  },
  methods:{
    ...mapMutations([
        "SET_USERINFO",
    ]),
    shiftLoginType(type){
      this.loginType=type;
      this.initForm();
    },
    initForm(){
      clearInterval(window.Timer);
      this.form={
        phone:'',
        authCode:''
      };
      this.count=0;
    },
    identifyBtnClick(){
      const vm=this;

      if(!vm.form.phone.match(/^1(3|4|5|7|8|9)\d{9}$/)){
        errorDeal('手机号码格式错误');
        return false;
      }

      api.getIdentifyCode({phone:vm.form.phone})
      .then(res=>{
        vm.countDown(120);
      })
      .catch(error=>{
        console.log(error);
      });
    },
    actionLogin(){
      const vm=this;
      let errorText='';

      if(!vm.form.phone.match(/^1(3|4|5|7|8|9)\d{9}$/)){
        errorText='手机号码格式错误';
      }else if(!vm.form.authCode){
        errorText='请输入验证码';
      }
      if(errorText){
        errorDeal(errorText);
        return false;
      }    
    api.actionMagLogin({phone:vm.form.phone,authCode:vm.form.authCode})
        .then(res=>{
            res.data.phone=vm.form.phone;
            // Object.assign(res.data,{departName:''});
            res.data.departName=''
            this.SET_USERINFO(res.data);
            windowJump("#/home");
        })
        .catch(error=>{
            errorDeal(error);
        });
    },
    toLogin:function(e){
      e.keyCode==13&&this.actionLogin();
    },
    countDown(count){
      const vm=this;
      vm.count=count;
      window.Timer=setInterval(()=>{
        let t=vm.count;
        if(!t){
          clearInterval(window.Timer);
          return false;
        }
        t--;
        vm.count=t;
      },1000);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
div.top{
    background-color: #fff;
}
.u-icon-user{
  background-image:url('../assets/images/user.png');
}
.u-icon-reg{
  background-image:url('../assets/images/reg.png');
}
.g-login{
  display: flex;
  flex-direction:column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  >.top{
    height: 0.8rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    background-image:url('../assets/images/bg_login_top.jpg');
    >img{
      width: 1.4rem;
      margin:0.15rem 0 0 0.7rem;
    }
  }
  >.login-box{
    display: flex;
    flex-grow:1;
    background-color:#2D44A1;
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    background-image:url('../assets/images/bg_login_all.png');
    >.inner{
      width: 3.3rem;
      margin:auto;
      background-color:#fff;
      text-align:center;
      position: relative;
      top: -0.1rem;
      height: 3rem;
      padding-top:.5rem;
      >.shift{
        display: flex;
        margin-bottom:0.5rem;
        
        >.btn{
          flex:1;
          text-align:center;
          position: relative;
          font-size:0.15rem;
          background-color:#DDDDDD;
          padding:0.1rem 0;
          cursor: pointer;
        }
        >.active{
          color:#2F7AC1;
          background-color:#fff;
          font-weight:bold;
          >i{
            position: absolute;
            display: inline-block;
            
            border-top:0.55rem solid transparent;
            
            
            top: -0.15rem;
            z-index:999;
          }
        }
        >.active:before{
          content:'';
          position: absolute;
          width: 1.55rem;
          height: 0.2rem;
          background-color:#fff;
          top: -0.15rem;
          
        }
        >.left.active{
          >i{
            border-left:0.3rem solid #fff;
            border-right:0.3rem solid transparent;
            right:-0.5rem;
          }
        }
        >.left.active:before{
          left: 0;
        }
        >.right.active{
          >i{
            border-right:0.3rem solid #fff;
            border-left:0.3rem solid transparent;
            left:-0.5rem;
          }
        }
        >.right.active:before{
          right: 0;
        }
      }
      >.row{
        margin-bottom:0.15rem;
        
        >.left{
          display: inline-block;
          vertical-align:middle;
          width: 0.25rem;
          height: 0.25rem;
          margin-right:0.1rem;
        }
        input{
          width: 2.3rem;
          text-indent:0.15rem;
          height: 0.4rem;
          line-height:0.4rem;
          border:1px solid transparent;
          border-color:#bfcbd9;
          border-radius:3px;
          &:hover{
            border-color:#20A0FF;
          }
        }

      }
      >.vercode{
        position: relative;
        >.btn, .count{
          cursor: pointer;
          position: absolute;
          top: 2px;
          right:0.35rem;
          width: 0.9rem;
          height: 0.35rem;
          line-height:0.37rem;
          border-radius:3px;
          color: #fff;
          background-color:#ffc333;
          font-size:0.12rem;
          overflow:hiddden;
        }
        >.count{
          cursor: auto;
          background-color:#ddd;
          color: #666;
        }
      }
      button{
        background-color:#4db3ff;
        border:1px solid transparent;
        border-radius:3px;
        color: #fff;
        width:2.65rem;
        height: 0.4rem;
        line-height:0.4rem;
        margin:0.2rem 0 0.5rem 0;
        font-size:0.14rem;
        cursor: pointer
      }
    }
  }
}
</style>
