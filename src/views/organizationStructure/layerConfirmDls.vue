<style scoped>
@import "../../assets/css/layer2.css";
</style>
<template>
<section  id="detailsView" class="greyFont">
    <!-- 代理商员工列表添加新员工 -->
    <div v-if="layer=='add'">
        <table style="width:260px;">
			<thead>
				<tr>
					<th colspan="2">
                        <img style="width:50px;height:50px" src="../../assets/images/questionMark.png" alt="">
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
                <tr>
                    <td colspan="2">
						<h3>是否确认添加新员工</h3>
                    </td>
                </tr>
                <tr class="tdBtn">
                    <td colspan="2" style="padding:0">
                        <span @click="close()">取消</span><span @click="btnYes(1)">确认</span>
                    </td>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
    <!-- 代理商员工操作 -->
    <div v-if="layer=='operation'">
        <table style="width:260px;">
			<thead>
				<tr>
					<th colspan="2">
                        <img style="width:50px;height:50px" src="../../assets/images/questionMark.png" alt="">
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
                <tr>
                    <td colspan="2">
						<h3>
                            <span v-if="operationType=='HMD'">是否将选中的员工加入黑名单</span>
                            <span v-if="operationType=='JC'">是否将选中的员工从黑名单中解除</span>
                            <span v-if="operationType=='SC'">是否删除选中的员工</span>
                        </h3>
                    </td>
                </tr>
                <tr class="tdBtn">
                    <td colspan="2" style="padding:0">
                        <span @click="close()">取消</span><span @click="btnYes(2)">确认</span>
                    </td>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
</section>
</template>
<script>
import {requestMethod} from "../../config/service.js"; 
import { errorDeal,getStore } from '../../config/utils';
export default{
    props:['layer','operationType'],
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
                    this.btnDisabled=false;                        
                    this.show = true;
                    this.count="获取验证码"
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
            let vm=this, 
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
        },btnYes(v){//确认添加员工
            this.$parent.off.layer=false
            if(v==1){
                let vm=this,url='/ums/w/user/addUsers',data='';
                data=vm.$parent.addUsersData;
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
                        this.$parent.list.push({username: '', phone: '',role:[]});
                        if(this.searchType!=1){
                            this.search();
                        }else if(this.searchType==1){
                            let vm=this,data={},url='/ums/w/user/getDepartDetail';
                            vm.searchDetailsType=1;
                            vm.searchDepartId=vm.$parent.searchDepartId;
                            data={'searchDepartId':vm.$parent.searchDepartId,userState:vm.$parent.radio,username:vm.$parent.name,phone:vm.$parent.phone,pageNum:1,pageSize:"10"};            
                            vm.companyName=v.departName;
                            vm.managerName=v.managerName;
                            vm.managerPhone=v.phone;
                            requestMethod(data,url)
                            .then((data)=>{
                                if(data.code==200){
                                    if(data.data.users.length>0){
                                        vm.$parent.off.notDlsDetails=false;
                                        vm.$parent.off.dlsDetails=true;
                                        vm.$parent.$parent.detailsList=data.data.users;
                                    }else{
                                        vm.$parent.off.notDlsDetails=false;
                                        vm.$parent.off.dlsDetails=true;
                                        vm.$parent.$parent.detailsList=data.data.users;                                    
                                    }
                                }else{
                                    errorDeal(data);
                                }
                            }).catch(e=>errorDeal(e));
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
            }else if(v==2){
                let vm=this.$parent;
                    vm.off.modify=false;
                requestMethod(vm.operationJson,vm.doUrl)
                .then((data)=>{
                    vm.reason="";
                    if(data.code==200){
                        layer.open({
                            content:data.msg,
                            skin: 'msg',
                            time: 2,
                            msgSkin:'success',
                        });
                        vm.search(); 
                    }else{
                        layer.open({
                            content:data.msg,
                            skin: 'msg',
                            time: 2,
                            msgSkin:'error',
                        });
                    }
                }).catch(e=>errorDeal(e));
            }
        },
		close(){
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

