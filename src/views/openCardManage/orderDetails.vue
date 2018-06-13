<style scoped>
    .headTitle{width: 96%;height: 28px;margin:30px 30px 0px 30px;}
    .tab-container{width: 96%;margin:10px 30px 20px 30px;}
    .zhenghaoduan table,.liang table,.pu table{border-collapse: collapse;width: 100%}
    .zhenghaoduan table tr td,.liang table tr td,.pu table tr td{border: 1px solid rgb(209, 209, 209)}
    .zhenghaoduan table tr td:nth-child(even),.liang table tr td:nth-child(even),.pu table tr td:nth-child(even){background: white;padding-left: 20px}
    .zhenghaoduan table tr td:nth-child(odd),.liang table tr td:nth-child(odd),.pu table tr td:nth-child(odd){text-align: right;padding: 10px;width: 20%;color:grey}
</style>
<template>
    <section>
        <div v-if="off.notCardDetails">
            <div class="allDetails">
                <div class="headTitle f-s-16">
                    <span class="fl">订单详情</span><span><a href="javascript:void(0)" class="fr fcaqua" @click="goBack()">返回列表</a></span>
                </div>
                <el-row type="flex" class="greyFont">
                    <el-col :span=24>
                        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2">
                                &nbsp;
                        </el-col>
                        <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                            <p class="lh30"><span class="letterSpacing1">订单号码&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.sysOrderId||'--'}}</span></p>
                            <p class="lh30"><span class="letterSpacing1">生成时间&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.createTime||'--'}}</span></p>
                            <p class="lh30"><span class="letterSpacing1">支付金额&nbsp;：&nbsp;&nbsp;</span><span>{{(detailsData.discountPrice/100).toFixed(2)||'--'}} 元</span></p>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="zhenghaoduan" v-if="true">
                <div v-for="(v,i) in detailsData.productList" :key="i" class="tab-container letterSpacing1">
                    <table>
                        <tr>
                            <td>产品名称</td>
                            <td colspan="3" class="f-s-18">{{v.productName||'--'}}</td>
                        </tr>
                        <tr>
                            <td>网络</td>
                            <td>
                                <span v-if="v.isp==1">移动</span>
                                <span v-if="v.isp==2">联通</span>
                                <span v-if="v.isp==3">电信</span>
                            </td>
                            <td>码号数</td>
                            <td>{{v.cuteTotal+v.normalTotal||'--'}}</td>
                        </tr>
                        <tr>
                            <td>品牌</td>
                            <td>
                                <span v-if="v.brand==1">远特</span>
                                <span v-if="v.brand==2">蜗牛</span>
                                <span v-if="v.brand==3">迪信通</span>
                                <span v-if="v.brand==4">极信</span>
                                <span v-if="v.brand==5">小米</span>
                                <span v-if="v.brand==6">海航</span>
                                <span v-if="v.brand==7">乐语</span>
                                <span v-if="v.brand==8">苏宁互联</span>
                                <span v-if="v.brand==9">国美</span>
                                <span v-if="v.brand==10">联想</span>
                                <span v-if="v.brand==11">蓝猫移动</span>
                                <span v-if="v.brand==12">长城</span>
                            </td>
                            <td>靓号数</td>
                            <td>{{v.cuteTotal||'--'}}<a href="javascript:void(0)" class="fcaqua fr pr20" @click="details('l',v.productId)">查看列表</a></td>
                        </tr>
                        <tr>
                            <td>归属地</td>
                            <td>{{v.cityName||'--'}}</td>
                            <td>普号数</td>
                            <td>{{v.normalTotal||'--'}}<a href="javascript:void(0)" class="fcaqua fr pr20" @click="details('p',v.productId)">查看列表</a></td>
                        </tr>
                        <tr>
                            <td>产品类型</td>
                            <td>
                                <span v-if="v.productType==1">整号包</span>
                                <span v-if="v.productType==2">靓号包</span>
                                <span v-if="v.productType==3">普号包</span>
                            </td>
                            <td rowspan="2">价格</td>
                            <td rowspan="2">
                                <p class="t-linethrough">￥{{(detailsData.totalPrice/100).toFixed(2)}}</p>
                                <p class="f-s-18 c-yellow">￥{{(detailsData.totalStrikePrice/100).toFixed(2)}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>销售方式</td>
                            <td>不可拆分销售</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <card-details :pickCardSwitch="off.pickCardDetailsSwitch" v-if="off.cardDetails" :listSwitch="listSwitch" :dataList="searchResData" :dataListLiang="searchLiang" :dataListPu="searchPu"></card-details>
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils";
import { Loading } from 'element-ui';
import cardDetails from "../../components/cardDetails";
import { requestMethod } from '../../config/service';
export default{
    props:{detailsData:Object},        
    data (){
		return {
            pageNumDetails:"",//号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
            listSwitch:{"allDetails":"","liang":"","pu":""},//详情页面开关                       
            searchLiang:[],
            searchPu:[],
			off:{   
                notCardDetails:true,
                cardDetails:false,
                pickCardDetailsSwitch:true
			}
		}
	},
	components:{
        "card-details":cardDetails
	},
	methods:{
        details(v,i){
            let vm=this,url="/nms/w/number/getProductDetail",data={}
            data.searchProductId=i;
            data.sessionType="2";
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    this.$set(vm.listSwitch,'allDetails',true)
                    vm.searchResData=data.data
                }
            })
            .then(()=>{
                if(v=='l'){
                    url="/nms/w/number/getProductCuteNumbers";
                    data.phoneLevel=2;
                    requestMethod(data,url)
                    .then((data)=>{
                        if(data.code==200){
                            this.$set(vm.listSwitch,'liang',true)                            
                            this.$set(vm.listSwitch,'pu',false)                            
                            vm.searchLiang=[]
                            for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                vm.searchLiang.push(data.data.numbers.slice(i,i+6));
                            }
                            vm.searchLiang.len=data.data.numbers.length;
                            this.off.notCardDetails=false;
                            this.off.cardDetails=true;
                        }else{
                            layer.open({
                                content:"data.msg",
                                skin: 'msg',
                                time: 2,
                                msgSkin:'error',
                            });
                        }
                    })
                }else if(v=='p'){
                    url="/nms/w/number/getProductNumbers";
                    data.phoneLevel=1;
                    requestMethod(data,url)
                    .then((data)=>{
                        if(data.code==200){
                            this.$set(vm.listSwitch,'pu',true)                             
                            this.$set(vm.listSwitch,'liang',false)                            
                            vm.searchPu=[]
                            for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                vm.searchPu.push(data.data.numbers.slice(i,i+6));
                            }
                            vm.searchPu.len=data.data.numbers.length;
                            this.off.notCardDetails=false;
                            this.off.cardDetails=true;
                        }else{
                            layer.open({
                                content:"data.msg",
                                skin: 'msg',
                                time: 2,
                                msgSkin:'error',
                            });
                        }
                    })
                }
            }).catch(e=>errorDeal(e));       
        },
        goBack(){
            let vm=this;
            vm.$parent.off.details=false;
        },
    }
}
</script>

