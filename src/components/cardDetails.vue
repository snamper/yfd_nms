<style scoped>
</style>
<template>
    <section>
        <div class="allDetails" v-if="listSwitch.allDetails">
            <div class="listTitleFoot">
                <h3><span>号包详情</span><span><a href="javascript:void(0)" class="fr fcaqua" @click="goBack()">返回列表</a></span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr>
                        <td>号包名称 ：<span class="deepGreyFont f-s-14">{{dataList.productName||'--'}}</span></td>
                        <td>运&nbsp;&nbsp;营&nbsp;&nbsp;商 ：
                            <span class="deepGreyFont f-s-14">
                                <span v-if="dataList.isp==1">移动</span>
                                <span v-if="dataList.isp==2">联通</span>
                                <span v-if="dataList.isp==3">电信</span>
                            </span> 
                        </td>
                    </tr>
                    <tr>
                        <td>号包类型 ：
                            <span class="deepGreyFont f-s-14">
                                <span v-if="dataList.productType==1">整号包</span>
                                <span v-if="dataList.productType==2">靓号包</span>
                                <span v-if="dataList.productType==3">普号包</span>
                            </span>    
                        </td>
                        <td>当前状态 ： 
                    <!-- 1：未上架，2：手动上架，3：手动下架，4：系统下架，5：已出售, 6: 购物车中", -->
                            
                            <span class="deepGreyFont f-s-14">
                                <span v-if="dataList.productState==1">未上架 </span>  
                                <span v-if="dataList.productState==2">手动上架</span>
                                <span v-if="dataList.productState==3">手动下架</span>
                                <span v-if="dataList.productState==4">系统下架</span>
                                <span v-if="dataList.productState==5">已出售</span>
                                <span v-if="dataList.productState==6">购物车中</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>码号数量 ：
                            <span class="deepGreyFont f-s-14" v-if="!pickCardSwitch">
                                <span v-if="dataList.productType==1">{{dataList.normalTotal+dataList.cuteTotal}}</span>
                                <span v-if="dataList.productType==2">{{dataList.cuteTotal}}</span>
                                <span v-if="dataList.productType==3">{{dataList.normalTotal}}</span>
                            </span>
                            <span class="deepGreyFont f-s-14" v-if="pickCardSwitch">
                                <span v-if="listSwitch.liang">{{dataList.cuteTotal}}</span>
                                <span v-if="listSwitch.pu">{{dataList.normalTotal}}</span>
                            </span>
                        </td>
                        <td>修改时间 ：
                            <span class="deepGreyFont f-s-14">
                                {{getDateTime(dataList.modifyTime)[6]}}
                            </span>
                        </td>
                        <!-- <td>修改时间 ：{{new Date(dataList.modifyTime).toLocaleString()||'--'}}</td> -->
                    </tr>
                        <tr>
                        <td>归属品牌 ：
                            <span class="deepGreyFont f-s-14">
                                <span v-if="dataList.brand==1">远特</span>
                                <span v-if="dataList.brand==2">蜗牛</span>
                                <span v-if="dataList.brand==3">迪信通</span>
                                <span v-if="dataList.brand==4">极信</span>
                                <span v-if="dataList.brand==5">小米</span>
                                <span v-if="dataList.brand==6">海航</span>
                                <span v-if="dataList.brand==7">乐语</span>
                                <span v-if="dataList.brand==8">苏宁互联</span>
                                <span v-if="dataList.brand==9">国美</span>
                                <span v-if="dataList.brand==10">联想</span>
                                <span v-if="dataList.brand==11">蓝猫移动</span>
                                <span v-if="dataList.brand==12">长城</span>
                            </span>
                        </td>
                        <td>操&nbsp;&nbsp;作&nbsp;&nbsp;人 ：
                            <span class="deepGreyFont f-s-14">
                                {{dataList.operatorName||'--'}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="liang" v-if="listSwitch.liang">
            <div class="listTitleFoot">
                <h3><span>靓号详情</span><span class="deepGreyFont"> ({{dataListLiang.len||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListLiang" :key="i">
                        <td v-for="(v,i) of dataListLiang[i]" :key="i">{{v.phone}}</td>
                    </tr>
                    <tr v-if="!dataListLiang.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无靓号详情</td>
                    </tr>
                </table>
            </div> 
        </div>
        <div class="pu" v-if="listSwitch.pu">
            <div class="listTitleFoot">
                <h3><span>普号详情</span><span class="deepGreyFont"> ({{dataListPu.len||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListPu" :key="i">
                        <td v-for="(v,i) of dataListPu[i]" :key="i">{{v.phone}}</td>
                    </tr>
                    <tr v-if="!dataListPu.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无普号详情</td>
                    </tr>
                </table>
            </div> 
        </div>  
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal } from "../config/utils.js";
export default{
    props:{dataList:Object,dataListLiang:Array,dataListPu:Array,listSwitch:Object,pickCardSwitch:Boolean},        
    data (){
		return {
            pageNumDetails:"",//号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
			off:{
                layer:false,
                dlsDetails:false,
                notDlsDetails:true,
			},
			form:{
			
			},
		}
	},
	methods:{
        goBack(){
            this.$parent.off.cardDetails=false;
            this.$parent.off.notCardDetails=true;
            if(this.$parent.off.searchList==true){
                this.$parent.search();
            }
        },
		getDetails(){
            this.off.notDlsDetails=false;
            this.off.dlsDetails=true;
        },
        openSet(){
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=true;
            vm.off.sync=false;
        },
        sync(){
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=false;
            vm.off.sync=true;
        },getDateTime(v){
            return getDateTime(v)
        }
    }
}
</script>

