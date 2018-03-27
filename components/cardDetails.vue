<style scoped>
    .listTitleFoot{width: 96%;height: 28px;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .searchTab tr{padding-left: 20px;}
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
                    <td>号包名称 ：</td>
                    <td></td>
                </tr>
                <tr>
                    <td>号包类型 ：</td>
                    <td>当前状态 ：</td>
                </tr>
                <tr>
                    <td>码号数量 ：</td>
                    <td>修改时间 ：</td>
                </tr>
                  <tr>
                    <td>归属品牌 ：</td>
                    <td>操作人 ：</td>
                </tr>
                <tr>
                    <td>运营商 ：</td>
                    <td>手机号码 ：</td>
                </tr>
			</table>
        </div>
      </div>
      <div class="liang">
        <div class="listTitleFoot">
            <span class="fl">靓号详情</span><span><a href="javascript:void(0)" class="fr"></a></span>
        </div>
        <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr v-for="(v,i) of ix" :key="i">
                    <td>{{ix[i].color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                </tr>
			</table>
        </div> 
      </div>
       <div class="pu">
        <div class="listTitleFoot">
            <span class="fl">普号详情</span><span><a href="javascript:void(0)" class="fr"></a></span>
        </div>
        <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr v-for="(v,i) of ix" :key="i">
                    <td>{{ix[i].color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                    <td>{{v.color}}</td>
                </tr>
			</table>
        </div> 
      </div>  
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal } from "../src/config/utils";
export default{
	data (){
		return {
            ix:[{color:'red',age:18,sex:'girl'},{color:'green',age:18,sex:'girl'},{color:'blue',age:18,sex:'girl'},{color:'yellow',age:18,sex:'girl'}],
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
    
	},
	methods:{
        goBack(){
            this.$parent.off.cardDetails=false;
            this.$parent.off.notCardDetails=true;
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
        }
    }
}
</script>

