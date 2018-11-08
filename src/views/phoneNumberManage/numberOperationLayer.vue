<style scoped>
@import "../../assets/css/layer2.css";
</style>
<template>
<section  id="detailsView" class="greyFont">
	<!-- 号码上架下架确认 -->
    <div v-if="layer=='numberSJXJ'">
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
						<h3><span v-if="operationType=='SJ'">是否要执行上架操作</span>
						<span v-if="operationType=='XJ'">是否要执行下架操作</span></h3>
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
    <!-- 号段同步 -->
    <div v-if="layer=='numberSectionTB'">
        <table style="padding:20px;">
            <thead>
                <tr>
                    <th colspan="2">
                        号段同步
                    </th>
                </tr>
            </thead>
            <tbody v-if="true">
                <tr>
                    <td class="m-input-phone">
                        <p style="width:100%;padding:0 10px"><input v-model="numberSection" :maxlength="8" placeholder="请输入查询的号段" style="width:100%" type="text"></p>
                    </td>
                </tr>
                <tr class="tdBtn" colspan="2">
                    <span @click="close()">取消</span><span @click="btnYes(2)">确认</span>
                </tr>
            </tbody>
        </table>
        <div class="lay-mask"></div>
    </div>
    <!-- 号段同步确认 -->
    <div v-if="off.numberSection">
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
                        <h3>是否要执行号段同步操作</h3>
                    </td>
                </tr>
                <tr class="tdBtn">
                    <td colspan="2"  style="padding:0">
                        <span @click="close()">取消</span><span @click="btnYes(3)">确认</span>
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
import { errorDeal,getStore,checkNumberSection } from '../../config/utils';
export default{
    props:['layer','operationType'],
	data (){
		return {
            numberSection:"",
            off:{
                numberSection:false
            }
		}
    },
	created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
	},
	methods:{
        btnYes(v){//确认
        let vm=this;
        vm.$parent.off.layer1=false;
        vm.$parent.off.modify=false;
            if(v===1){
                let vm=this.$parent;
                requestMethod(vm.SJXJData,vm.dourl)
                .then((data)=>{
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
                }).then(()=>{
                    for(let v=0;v<vm.searchList.length;v++){
                        vm.$set(vm.searchList[v],'ischecked',false);
                    }}
                ).catch(e=>errorDeal(e));
            }else if(v===2){
                if(isNaN(vm.numberSection)){
                    layer.open({
                        content: "请输入正确的号段",
                        skin: "msg",
                        time: 2,
                        msgSkin: "error"
                    });
                    return false;
                }
                checkNumberSection(vm.numberSection,()=>{return false});
                vm.$parent.layerType1="";
                vm.$parent.off.layer1=true;
                vm.off.numberSection=true;
            }else if(v===3){
                let json = {
                    phone: vm.user.phone,
                    numberSection:vm.numberSection
                },
                url = "/nus/w/number/syncSection";
                vm.close();
                requestMethod(json,url)
                .then((data)=>{
                    if(data.code==200){
                        layer.open({
                            content:'操作成功',
                            skin:"msg",
                            time:2,
                            msgSkin:"success"
                        }) 
                        vm.$parent.search();
                    }
                }).catch((e)=>{errorDeal(e)})
            }
        },checkNumberSection(v,f){
            return checkNumberSection(v,f)
        },
		close(){//取消
            var vm=this;
			vm.$parent.off.layer1=false;
		}
	}
}
</script>

