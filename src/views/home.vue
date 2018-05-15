<style>
  @import "../assets/css/home.css";
</style>
<template>
  <div class="f-scroll-lt" id="home" :class={active:off.headMenu}>
  	<header class="g-head">
		<table cellspacing="0">
			<tbody>
				<tr>
					<td>
						<a class="m-navside-show" @click="headMenu"><i class="u-icon-menu"></i></a>
						<span v-if="crumb[1].name" class="f-inline-block m-crumb">
							<a class="fcb">{{crumb[0].name}}</a>
							<i class="el-icon-arrow-right"></i>
							<a  v-show="!crumb[1].href">{{crumb[1].name}}</a>
							<router-link class="fcaqua" v-show="crumb[1].href" :to="crumb[1].href">{{crumb[1].name}}</router-link>
							<span v-show="crumb[2].name">
							    <i class="el-icon-arrow-right"></i>								
								<a class="fcaqua">{{crumb[2].name}}</a>
							</span>
						</span>
					</td>
					<td class="f-tar">
						<div class="m-info-user"><i></i><span  style="color:black">{{user.username}}</span></div>
						<div class="m-menu-user">
							<a @click="userMenu"><i class="u-icon-menu2"></i></a>
							<ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
								<li>
									<a class="user clr">
										<div class="logo fl"></div>
										<div class="info f-tal" ><div class="author" style="color:black">{{user.username}}</div></div>
									</a>
								</li>
								<li><a @click="clickSignOut">退出</a></li>
							</ul>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
  	</header>
  	<aside class="g-side">
		<nav class="g-side-nav">
			<header class="g-side-head"><img src="../assets/images/logo.png" alt="titleLogo"></header>
			<ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='架构管理'}">
					<b></b>
					<router-link to="/home/organization">
						<div>
							<i class="u-icon-jiagou"></i>
							<span>架构管理</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/organization/yfd"><b></b>亚飞达管理</router-link></li>
						<li><router-link to="/home/organization/agent"><b></b>代理商管理</router-link></li>
						<li><router-link to="/home/organization/staff"><b></b>员工管理</router-link></li>
					</ul>
				</li>
			</ul>
            <ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='码号管理'}">
					<b></b>
					<router-link to="/home/card">
						<div>
							<i class="u-icon-mahao"></i>
							<span>码号管理</span>
						</div>
					</router-link>
				</li>
			</ul>
            <ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='操作日志'}">
					<b></b>
					<router-link to="/home/operationLog">
						<div>
							<i class="u-icon-rizhi"></i>
							<span>操作日志</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/operationLog/cardmanage"><b></b>码号管理日志</router-link></li>
						<li><router-link to="/home/operationLog/synclog"><b></b>同步日志</router-link></li>
						<li><router-link to="/home/operationLog/loginlog"><b></b>登录日志</router-link></li>
					</ul>
				</li>
			</ul>
            <!-- <ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='浏览记录'}">
					<b></b>
					<router-link to="/home/browsingHistory">
						<div>
							<i class="u-icon-jilu"></i>
							<span>浏览记录</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/browsingHistory/yfd"><b></b>亚飞达管理</router-link></li>
						<li><router-link to="/home/browsingHistory/agent"><b></b>代理商管理</router-link></li>
						<li><router-link to="/home/browsingHistory/staff"><b></b>员工管理</router-link></li>
					</ul>
				</li>
			</ul> -->
            <ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='公告管理'}">
					<b></b>
					<router-link to="/home/notice">
						<div>
							<i class="u-icon-gonggao"></i>
							<span>公告管理</span>
						</div>
					</router-link>
				</li>
			</ul>
		</nav>
	</aside>
  	<section class="g-main" id="main">
  		<transition appear name="fadeInUp">
			<router-view></router-view>
		</transition>
	</section>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {getStore} from '../config/utils';
import { signOut } from '../config/service';
export default{
	data (){
		return {
            user:{"username":"admin"},
			off:{
				headMenu:true,//导航栏开关
				window:0,//浏览器窗口宽度
                userMenu:0,//用户菜单开关
			},
			userInfo:{isadmin:''},
            crumb:[{'name':''},{'name':''},{'name':''}],//面包屑
		}
    },
    created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
	},
	watch:{
		'$route':'routeChange',
	},
	beforeDestroy:function(){
		
    },
	mounted:function(){
        this.init();
	},
	computed:{
		
	},
	methods:{
		...mapMutations([
            "SIGN_OUT",
            "SET_USERINFO"
        ]),
		async init(){//页面初始化
			const vm=this;
			vm.routeChange();//头部面包屑导航
            window.onresize=()=>vm.debounce(300,vm.windowChange());
			let userInfo=getStore("YFD_NMS_INFO");
			vm.userInfo=userInfo;
			vm.SET_USERINFO(userInfo);
			document.attachEvent ? doucument.body.attachEvent("onclick",function(event){
				vm.off.userMenu=false;
				window.event.cacenlBubble=false;
			}) : document.body.addEventListener("click", function(event) {
				vm.off.userMenu=false;
				event.stopPropagation();
            },false);
        },
		headMenu:function(){//侧边导航show or hide
			this.off.headMenu?this.off.headMenu=false:this.off.headMenu=true;
		},
        routeChange:function(){//路由变化
			this.windowChange();
			var path=this.$route.path,
				crumb=[{"name":""},{"name":""},{"name":""}],
				mainDom=document.getElementById("main");
            if(path.indexOf("/home/organization")>-1){
                crumb[0]={"name":"架构管理","href":"/home/organization"}
                if(path.indexOf("home/organization/yfd")>-1){
                    crumb[1]={"name":"亚飞达管理","href":"yfd"}
                }else  if(path.indexOf("home/organization/agent")>-1){
                    crumb[1]={"name":"代理商管理","href":"agent"}
                }else  if(path.indexOf("home/organization/staff")>-1){
                    crumb[1]={"name":"员工管理","href":"staff"}
                }
            }
            if(path.indexOf("/home/card")>-1){
                crumb[0]={"name":"码号管理","href":"/home/card"}
            }
            if(path.indexOf("/home/operationLog")>-1){
                crumb[0]={"name":"操作日志","href":"/home/operationLog"}
                 if(path.indexOf("home/operationLog/cardmanage")>-1){
                    crumb[1]={"name":"码号管理日志","href":"cardmanage"}
                }else  if(path.indexOf("home/operationLog/synclog")>-1){
                    crumb[1]={"name":"同步日志","href":"synclog"}
                }else  if(path.indexOf("home/operationLog/loginlog")>-1){
                    crumb[1]={"name":"登录日志","href":"loginlog"}
                }
            }
            if(path.indexOf("/home/browsingHistory")>-1){
				crumb[0]={"name":"浏览记录","href":"/home/browsingHistory"}
            }
            if(path.indexOf("/home/notice")>-1){
				crumb[0]={"name":"公告管理","href":"/home/notice"}
            }
			this.crumb=crumb;
			mainDom.style.overflowY='hidden';
			var timer=setTimeout(()=>mainDom.style.overflowY='',500);
        },
		userMenu:function(e){//用户菜单show or hide
			this.off.userMenu?this.off.userMenu=false:this.off.userMenu=true;
			e.stopPropagation();
		},
		windowChange:function(){//窗口改变
			const vm=this;
			let w=window.innerWidth;
			let href=window.location.href;

			if(href.indexOf('dashboard')>-1||w<=960){
				vm.off.headMenu=false;
			}
			vm.off.window=w;
        },
		debounce:function(time,action){//节流函数
		  let last;
		  return function(){
		    let ctx=this, args=arguments
		    clearTimeout(last)
		    last=setTimeout(function(){
		        action.apply(ctx,args)
		    },time)
		  }
		},
		clickSignOut:function(){
			var vm=this;
			signOut().then(function(res){
				vm.SIGN_OUT();
				vm.CLEAR_TIMER();
			});
		},
	}
}

</script>

