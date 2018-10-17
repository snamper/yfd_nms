<style scoped>
@import "../../assets/css/layer2.css";
#detailsView table td{padding: 0}
</style>
<template>
<section  id="detailsView" class="greyFont">
    <!-- 添加员工 -->
    <div v-if="layer=='operationStaff'">
        <table  style="width:260px;">
			<thead>
				<tr>
					<th colspan="2">
                        <img style="width:50px;height:50px" src="../../assets/images/questionMark.png" alt="">
					</th>
				</tr>
			</thead>
			<tbody>
                <tr>
                    <td colspan="2">
						<h3>是否要添加新员工</h3>
                    </td>
                </tr>
                <tr class="tdBtn">
                    <td colspan="2">
                        <span @click="close()">取消</span><span @click="btnYes(1)">确认</span>
                    </td>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
    <!-- 员工状态操作 -->
    <div v-if="layer=='addStaff'">
        <table  style="width:260px;">
			<thead>
				<tr>
					<th colspan="2">
                        <img style="width:50px;height:50px" src="../../assets/images/questionMark.png" alt="">
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
                <!-- <tr colspan="2">
                    <td  class="fl"><p class="pdl12">验证号码 : <span v-model="user.phone">{{user.phone}}</span></p></td>
                </tr>
                <tr colspan="2">
                    <td><el-input v-model="authCode" size="mini" :maxlength="6" style="width:60%" placeholder="请输入短信验证码"></el-input><el-button class="w84" v-model="count" size="mini" type="primary" @click="getAuthCode(userId)" :disabled="btnDisabled">{{count}}</el-button></td>
				</tr> -->
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
                    <td colspan="2">
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
            timer: null,
            show:true,
            date:'',//日期选择器
            time:'',//时间选择器
            value:'',//同步间隔时间
            phone:'',
            userId:'',
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
        btnYes(v){
            if(v===2){//员工状态
                let vm=this.$parent;
                this.close()
                requestMethod(vm.operationJson,vm.doUrl)
                .then((data)=>{
                    vm.reason="";
                    vm.authCode="";
                    vm.off.modify=false;
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
            }else if(v===1){//确认添加员工
                let vm=this,url='/ums/w/user/addUsers',data={};
                data=vm.$parent.addUsersData;
                this.close();
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
            }
        },close(){
            var vm=this;
			vm.$parent.off.layer=false;
		}
	}
}
</script>

