<style scoped>
@import "../../assets/css/layer2.css";
</style>
<template>
<section  id="detailsView" class="greyFont">
    <div v-if="off.sync">
        <table >
			<thead>
				<tr>
					<th colspan="2">
						添加员工
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
                <tr colspan="2">
                    <td  class="fl"><p class="pdl12">验证号码 : <span v-model="user.phone">{{user.phone}}</span></p></td>
                </tr>
                <tr colspan="2">
                    <td><el-input v-model="authCode" size="mini" :maxlength="6" style="width:60%" placeholder="请输入短信验证码"></el-input><el-button class="w84" v-model="count" size="mini" type="primary" @click="getAuthCode(userId)" :disabled="btnDisabled">{{count}}</el-button></td>
				</tr>
                <tr class="tdBtn" colspan="2">
                    <span @click="close()">取消</span>
                    <span @click="btnYes(2)">确认</span>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
</section>
</template>
<script>
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { errorDeal,getStore } from '../../config/utils';
export default{
	data (){
		return {
            count: '获取验证码',
            timer: null,
            show:true,
            date:'',//日期选择器
            time:'',//时间选择器
            value:'',//同步间隔时间
            authCode:'',//验证码
            phone:'',
            userId:'',
            authCodeUrl:'',//验证码url
            syncUrl:'',//同步时间url
            user:'',//token的值
            btnDisabled:false,
            searchType:'',//
            off:{
                set:false,//同步时间设置
                sync:false,//手动同步
                rsync:false,//手动同步操作结果
            }
		}
		
    },
	created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
        vm.searchType=vm.$parent.searchType;
		if(vm.$parent.off.setSync==true){
            vm.off.set=true;
            vm.off.sync=false;
        }else if(vm.$parent.off.sync==true){
            vm.off.sync=true;
            vm.off.set=false;
        }

	},
	methods:{
        getAuthCode(v){//获取验证码
            const TIME_COUNT = 120;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.btnDisabled=true;
                    this.count--;
                    } else {
                        this.resetTimer();
                    }
                }, 1000)
            }
            let vm=this, 
            // data={"userId":vm.user.username,"phone":15684765209};
            data={"userId":vm.user.userId,"phone":vm.user.phone||""};
                vm.authCodeUrl="/ums/w/user/getAuthCode";
            requestMethod(data,vm.authCodeUrl)
            .then((data)=>{
                if(data.hasOwnProperty('code')&&data.code==200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                }else if(data.hasOwnProperty('code')&&data.code!=200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }else(
                    layer.open({
                        content:data,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    })
                ) 
            }).catch(e=>errorDeal(e));
        }
        ,btnYes(v){//确认添加员工
            let vm=this,url='/ums/w/user/addUsers',data={};
            data=vm.$parent.addUsersData;
            console.log(data);
            data.authCode=vm.authCode;
            if(vm.authCode==''){
                layer.open({
                    content:'请输入验证码',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                })
                return false;
            }
            this.resetTimer();
            vm.authCode="";
            requestMethod(data,url)
            .then((data)=>{
                vm.$parent.off.layer=false;                                    
                if(data.code==200){
                    layer.open({
                        content:'操作成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    this.$parent.list=[],
                    this.$parent.off.addList=false,
                    this.$parent.list.push({username: '', phone: '',role:[],departName:"好亚飞达"}) 
                    if(vm.$parent.off.searchList==true){
                        this.$parent.search();
                    }
                }else{
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }  
            }).catch(e=>errorDeal(e))
        },
		close:function(){
            var vm=this;
			vm.$parent.off.layer=false;
		},
        resetTimer(){
            this.btnDisabled=false;                        
            this.show = true;
            this.count="获取验证码"
            clearInterval(this.timer);
            this.timer = null;
        }
	}
}
</script>

