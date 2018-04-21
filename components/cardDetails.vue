<style scoped>
    .listTitleFoot{width: 96%;height: 28px;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .searchTab tr{padding-left: 20px;}
    .searchTab tr td{text-align: left;padding-left: 80px;}
    .buttonSmallBlueUp{ width: 45px;height: 25px;border-radius: 8px;background: rgb(53, 170, 238);outline: none;border: 1px solid rgb(53, 170, 238)}
    .buttonSmallBlueUp:active{box-shadow: 0 0 10px rgb(53, 170, 238)}
    .buttonSmallBlueDown{ width: 45px;height: 25px;border-radius: 8px;background: rgb(238, 111, 143);outline: none;border: 1px solid rgb(53, 170, 238)}
    .buttonSmallBlueDown:active{box-shadow: 0 0 10px rgb(238, 111, 143)}
</style>
<template>
    <section>
      <div class="allDetails">
        <div class="listTitleFoot">
            <span class="fl">号包详情</span><span><a href="javascript:void(0)" class="fr" @click="goBack()">返回列表</a></span>
        </div>
        <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td>号包名称 ：{{dataList.productName||'--'}}</td>
                    <td>运营商 ：
                       <span v-if="dataList.isp==1">移动</span>
                       <span v-if="dataList.isp==2">联通</span>
                       <span v-if="dataList.isp==3">电信</span>
                    </td>
                </tr>
                <tr>
                    <td>号包类型 ：<span v-if="dataList.productType==1">整号包</span>
                                  <span v-if="dataList.productType==2">靓号包</span>
                                  <span v-if="dataList.productType==3">普号包</span>
                    </td>
                    <td>当前状态 ： 
                       <span v-if="dataList.productState==1">未上架 </span>  
                           <!-- <button class="buttonSmallBlueUp" @click="UpNum()">上架</button>                        -->
                       <span v-if="dataList.productState==2">已上架</span>
                       <span v-if="dataList.productState==3">已下架</span>
                       <span v-if="dataList.productState==4">已出售</span>
                    </td>
                </tr>
                <tr>
                    <td>码号数量 ：<span v-if="dataList.productType==1">{{dataList.normalTotal+dataList.cuteTotal}}</span>
                                  <span v-if="dataList.productType==2">{{dataList.cuteTotal}}</span>
                                  <span v-if="dataList.productType==3">{{dataList.normalTotal}}</span>
                    </td>
                    <td>修改时间 ：{{new Date(dataList.modifyTime).toLocaleString()||'--'}}</td>
                </tr>
                  <tr>
                    <td>归属品牌 ：<span v-if="dataList.brand==1">远特</span>
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
                       <span v-if="dataList.brand==12">长城</span></td>
                    <td>操作人 ：{{dataList.operatorName||'--'}}</td>
                </tr>
			</table>
        </div>
      </div>
      <div class="liang">
        <div class="listTitleFoot">
            <span class="fl">靓号详情</span><span class="fontWeight greyFont"> ({{dataListLiang.len||'0'}})</span>
        </div>
        <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                  <tr v-for="(v,i) of dataListLiang" :key="i">
                    <td v-for="(v,i) of dataListLiang[i]">{{v.phone}}</td>
                </tr>
			</table>
        </div> 
      </div>
       <div class="pu">
        <div class="listTitleFoot">
            <span class="fl">普号详情</span><span class="fontWeight greyFont">({{dataListPu.len||'0'}})</span>
        </div>
        <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr v-for="(v,i) of dataListPu" :key="i">
                    <td v-for="(v,i) of dataListPu[i]">{{v.phone}}</td>
                </tr>
			</table>
        </div> 
      </div>  
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal } from "../src/config/utils";
export default{
    props:{dataList:Object,dataListLiang:Array,dataListPu:Array},        
    data (){
		return {
            pageNumDetails:"",//号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
            ix:[{}],
			off:{
                layer:false,
                dlsDetails:false,
                notDlsDetails:true,
			},
			form:{
			
			},
		}
	},
	components:{
        
	},
	created:function(){
        let vm=this;
        // vm.pageNumDetails=vm.$parent.pageNumDetails;
        // vm.pageNumLiang=vm.$parent.pageNumLiang;
        // vm.pageNumPu=vm.$parent.pageNumPu;
        // console.log(vm.dataList)
},
    computed:{
        
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
        },
        UpNum(){
            //let vm=this,url="/yfd-ums/w/number/putOnProducts";
        },
        DownNum(){

        }
    }
}
</script>

