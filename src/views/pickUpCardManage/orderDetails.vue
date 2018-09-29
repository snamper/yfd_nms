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
                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <p class="lh30"><span class="letterSpacing1">订单号码&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.sysOrderId||'--'}}</span></p>
                            <p class="lh30"><span class="letterSpacing1">支付金额&nbsp;：&nbsp;&nbsp;</span><span>{{(detailsData.totalStrikePrice/100).toFixed(2)||'--'}} 元</span></p>
                        </el-col>
                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <p class="lh30"><span class="letterSpacing1">生成时间&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.createTime||'--'}}</span></p>
                            <p class="lh30"><span class="letterSpacing1">修改时间&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.modifyTime||'--'}}</span></p>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row class="greyFont">
                    <el-col :span=24>
                        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2">
                            &nbsp;
                        </el-col>
                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <p class="lh30"><span class="letterSpacing1">下单备注&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.remark||'--'}}</span></p>
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
                            <td>{{translateData(1,v.isp)}}</td>
                            <td>产品类型</td>
                            <td>{{translateData(2,v.productType)}}</td>
                        </tr>
                        <tr>
                            <td>品牌</td>
                            <td>{{translateData(4,v.brand)}}</td>
                            <td>码号数</td>
                            <td>{{v.total}}
                                <a v-if="!isNaN(v.total)&&v.total!=0" href="javascript:void(0)" class="fcaqua fr pr20" @click="details('',v)">查看列表</a>
                            </td>
                        </tr>
                        <tr>
                            <td>归属地</td>
                            <td>{{v.area||'--'}}</td>
                            <td rowspan="2">价格</td>
                            <td rowspan="2">
                                <p v-if="v.discountPrice!=v.strikePrice" class="t-linethrough">￥{{Math.formatFloat(parseFloat(v.strikePrice/100),2)}}</p>
                                <p class="f-s-18 c-yellow">￥{{Math.formatFloat(parseFloat(v.discountPrice/100),2)}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>销售方式</td>
                            <td>
                                <span v-if="v.splitFlag==1">不可拆分</span>
                                <span v-if="v.splitFlag==2">可拆分</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <card-details :pickCardSwitch="off.pickCardDetailsSwitch" :dataInfo="numberTotal" v-if="off.cardDetails" :listSwitch="listSwitch" :dataListLiang="searchLiang" :dataListPu="searchPu"></card-details>
    </section>
</template>
<script>
import { requestMethod,requestgetOrderSplitNumbers } from '../../config/service';
import { errorDeal,translateData } from "../../config/utils";
import { Loading } from 'element-ui';
import cardDetails from "../../components/pickupCardList.vue";
export default{
    props:{detailsData:Object},        
    data (){
		return {
            searchProductListId:'',
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
            },
            numberTotal:{}
		}
	},
	components:{
        "card-details":cardDetails
	},
	methods:{
        details(p,i){
            let vm=this,
            json={sysOrderId:i.sysOrderId,
                numberId:i.numberId,
                pageNum:p||1,
                pageSize:90};
            vm.searchJson=json;
            requestgetOrderSplitNumbers(json)
            .then((data)=>{
                if(data.code==200){
                    this.$set(vm.listSwitch,'pu',true)   
                    vm.numberTotal.p=data.data.total;                         
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
        },
        goBack(){
            let vm=this;
            vm.$parent.off.details=false;
        },
        translateData(v,i){
            return translateData(v,i)
        }
    }
}
</script>
<style scoped>
    .headTitle{width: 96%;height: 28px;margin:30px 30px 0px 30px;}
    .tab-container{width: 96%;margin:10px 30px 20px 30px;}
    .zhenghaoduan table{border-collapse: collapse;width: 100%}
    .zhenghaoduan table tr td{border: 1px solid #d1d1d1;width: 25%}
    .zhenghaoduan table tr td:nth-child(even){background: #ffffff;padding-left: 20px}
    .zhenghaoduan table tr td:nth-child(odd){text-align: right;padding: 10px;width: 20%;color:grey}
</style>

