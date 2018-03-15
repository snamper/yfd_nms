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
							<a>{{crumb[0].name}}</a>
							<a class="u-icon-right mid"></a>
							<a v-show="!crumb[1].href">{{crumb[1].name}}</a>
							<router-link v-show="crumb[1].href" :to="crumb[1].href">{{crumb[1].name}}</router-link>
							<span v-show="crumb[2].name">
								<a class="u-icon-right mid"></a>
								<a>{{crumb[2].name}}</a>
							</span>
						</span>
					</td>
					<td class="f-tar">
						<div class="m-info-user"><i></i><span>{{userInfo.name}}</span></div>
						<div class="m-menu-user">
							<a @click="userMenu"><i class="u-icon-menu2"></i></a>
							<ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
								<li>
									<a class="user clr">
										<div class="logo fl"></div>
										<div class="info f-tal"><div class="author">{{userInfo.name}}</div></div>
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
			<header class="g-side-head"><img src="../assets/images/logo_page.png" alt="titleLogo"></header>
			<ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='订单查询'}">
					<b></b>
					<router-link to="/home/search">
						<div>
							<i class="u-icon-search"></i>
							<span>订单查询</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/"><b></b>开卡订单</router-link></li>
						<li><router-link to="/home/"><b></b>充值订单</router-link></li>
						<li><router-link to="/home/"><b></b>网厅订单</router-link></li>
					</ul>
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
			off:{
				headMenu:true,//导航栏开关
				window:0,//浏览器窗口宽度
                userMenu:0,//用户菜单开关
			},
			userInfo:{isadmin:''},
            crumb:[{'name':''},{'name':''},{'name':''}],//面包屑
		}
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
         
			let userInfo=getStore("KA_ECS_USER");
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
            if(path.indexOf("/home/search")>-1){
				crumb[0]={"name":"订单查询","href":"/home/search"}
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

