<template>
    <section>
        <div class="allDetails">
            <div class="m-headTitle f-s-16">
                <span class="fl"> 号段详情 </span>
                <label class="m-number-title">
                    ( <p><span>号段 :<a style="color:#66A1DF" href="JavaScript:void(0)">{{faceValueDetails.sectionId}}</a></span></p>
                    <p><span>归属地 :</span> {{faceValueDetails.area}}</p>
                    <p><span>归属品牌 :</span> {{translateData(4,faceValueDetails.brand)}}</p>
                    <p><span>运营商 :</span> {{translateData(1,faceValueDetails.isp)}}</p>
                    <p><span>当前状态 :</span> {{translateData(3,faceValueDetails.productState)}}</p>
                    <p><span>总数：</span>{{faceValueDetails.productTotal}}</p> )
                </label>
                <span><a href="javascript:void(0)" class="fr fcaqua" @click="goBack()">返回列表</a></span>
            </div>
        </div>
        <div class="faceValue">
            <p>
                <label @click="listSwitch(1)" class="switch" :class="off.switchlist==1?'active':''">按面值</label>
                <label @click="listSwitch(2)" class="switch" :class="off.switchlist==2?'active':''">按千段</label>
            </p>
            <table v-if="off.switchlist==1" style="width:100%" cellspacing="0" cellpadding="0"  class="m-searchTable">
                <tr>
                    <td>面值</td>
                    <td>套餐</td>
                    <td>码号数（个）</td>
                    <td>靓号数（个）</td>
                    <td>带4数（个）</td>
                    <td>带4比例</td>
                </tr>
                <tr v-for="(v,i) in faceValueDetails.faceValueMap">
                    <td colspan="6">
                        <table cellspacing="0" cellpadding="0"  style="width:100%;" class="m-searchTable1">
                            <tr v-for="(v1,i1) in v">
                                <td colspan="6">
                                    <table style="width:100%" cellspacing="0" cellpadding="0" class="m-searchTable2">
                                        <tr v-for="(v2,i2) in v1">
                                            <td>{{i/100}}</td>
                                            <td>{{i2}}</td>
                                            <td>
                                                <a :class="{'c-yellow':off.isShow1==v2}" @click="getNumberList(1,{t:1,c:'productTotal',i:i/100},v2,i2)" href="javascript:void(0)">
                                                    {{v2.productTotal}}
                                                </a>
                                            </td>
                                            <td>
                                                <a :class="{'c-yellow':off.isShow2==v2}" @click="getNumberList(1,{t:1,c:'cuteTotal',i:i/100},v2,i2)" href="javascript:void(0)">
                                                    {{v2.cuteTotal}}
                                                </a>
                                            </td>
                                            <td>
                                                <a :class="{'c-yellow':off.isShow3===v2}" @click="getNumberList(1,{t:1,c:'numberWithFour',i:i/100},v2,i2)" href="javascript:void(0)">
                                                    {{v2.numberWithFour}}
                                                </a>
                                            </td>
                                            <td>{{v2.ratio}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table v-if="off.switchlist==2" style="width:100%" class="m-searchTable4">
                <tr>
                    <td>千段</td>
                    <td>码号数（个）</td>
                    <td>靓号数（个）</td>
                    <td>带四数（个）</td>
                    <td>带四比例</td>
                </tr>
                <tr v-for="(v,i) in thousandDetails">
                    <td>{{i}}</td>
                    <td><a :class="{'c-yellow':off.isShow4===v}" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal',i:i},v)">{{v.productTotal}}</a></td>
                    <td><a :class="{'c-yellow':off.isShow5===v}" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal',i:i},v)">{{v.cuteTotal}}</a></td>
                    <td><a :class="{'c-yellow':off.isShow6===v}" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour',i:i},v)">{{v.numberWithFour}}</a></td>
                    <td>{{v.ratio}}</td>
                </tr>
            </table>
        </div>
        <div class="numberList" v-if="off.numberlist">
            <p style="font-size:14px;height:30px;"><span style="color:#66A1DF">{{listTitle}}</span>详情 ( 共<span style="color:#F78A24">{{listTotal}}</span>条 )</p>
            <table style="width:100%">
                <tr>
                    <td>序号</td>
                    <td>号码</td>
                    <td>号码等级</td>
                    <td>SIM号</td>
                    <td>面值(元)</td>
                    <td>套餐名称</td>
                </tr>
                <tr v-for="(v,i) in numberlist">
                    <td>{{(currentPage-1)*15+i+1}}</td>
                    <td>{{v.phone}}</td>
                    <td>{{translateData('phoneLevel',v.phoneLevel)}}</td>
                    <td>{{v.sim}}</td>
                    <td>{{translateData('fenToYuan',v.faceValue)}}</td>
                    <td>{{v.packageDesc}}</td>
                </tr>
            </table>
            <div class="listTitleFoot">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-pagination
                        layout="prev, pager, next"
                        :page-size="15"
                        @current-change="getNumberList"
                        :current-page.sync="currentPage"                            
                        :total="maxpage">
                        </el-pagination>
                    </div></el-col>
                </el-row>
            </div>
        </div>
    </section>   
</template>
<script>
import { getNumberStorageFaceDtails,getNumberStorageDetails } from '../../config/service';
import { errorDeal,translateData } from "../../config/utils";
export default{
    props:['faceValueDetails','thousandDetails'],        
    data (){
		return {
           numberlist:"",
           currentPage:"",
           search:"",
           maxpage:"",
           datav:"",//查询参数
           datai:"",//查询参数
           listTitle:"",
           listTotal:"",
           mapFaceValue:[0,1000,2000,3000,5000,10000],
           mapNumberSection:[0,1,2,3,4,5,6,7,8,9,]
           ,off:{
               numberlist:false,
               isShow1:'',
               isShow2:'',
               isShow3:'',
               isShow4:'',
               isShow5:'',
               isShow6:'',
               switchlist:1,
           }
		}
	},
	methods:{
        getNumberList(p,v,i,x){
            let vm=this,json;
            if(typeof(v)!="undefined"){
                vm.datav=v;
                vm.datai=i;
                vm.datax=x;
            }else{
                v=vm.datav;
                i=vm.datai;
                x=vm.datax;
            }
            vm.getClickStatus(v,i);
            if(v.t==1){//面值
                let withFour,cute,t;
                t=v.c;
                vm.listTitle=v.i+'面值码号';
                vm.listTotal=i[t];
                if(v.c=="numberWithFour"){
                    withFour=1
                }else{
                    withFour=0
                }
                if(v.c=="cuteTotal"){
                    cute='0,1,2,3,4,5,6';
                }else{
                    cute="";
                }
                json={
                    "faceValue": v.i*100,
                    "pageNum": p||1,
                    "pageSize": 15,
                    "phoneLevel": cute,
                    "sectionId": vm.faceValueDetails.sectionId,
                    "withFour": withFour,
                    "packageDesc":x,
                }
                getNumberStorageFaceDtails(json)
                .then((data)=>{
                    vm.off.numberlist=true;
                    vm.numberlist=data.data.numbers;
                    vm.maxpage=data.data.total;
                    vm.currentPage=p||1;
                }).catch(e=>errorDeal(e))
            }else if(v.t==2){//号段
                let withFour,cute;
                vm.listTitle=v.i+'千段码号';
                vm.listTotal=vm.getProVlaue(vm.thousandDetails,v.i,v.c)
                if(v.c=="numberWithFour"){
                    withFour=1
                }else{
                    withFour=0
                }
                if(v.c=="cuteTotal"){
                    cute='0,1,2,3,4,5,6';
                }else{
                    cute="";
                }
                json={
                    "faceValue": vm.$parent.downloadData.faceValue,
                    "pageNum": p||1,
                    "pageSize": 15,
                    "phoneLevel": cute,
                    "section":v.i,
                    "sectionId": vm.faceValueDetails.sectionId,
                    "withFour": withFour
                }
                getNumberStorageDetails(json)
                .then((data)=>{
                    vm.off.numberlist=true;
                    vm.numberlist=data.data.numbers;
                    vm.maxpage=data.data.total;
                    vm.currentPage=p||1;
                }).catch(e=>errorDeal(e))
            }else{
                return false;
            }
        },getClickStatus(v,i){
            let vm=this;
            vm.off.isShow1=''; 
            vm.off.isShow2='';
            vm.off.isShow3='';
            vm.off.isShow4=''; 
            vm.off.isShow5='';
            vm.off.isShow6='';
            if(v.t==1){
                if(v.c=='productTotal'){
                    vm.off.isShow1=i; 
                }else if(v.c=='cuteTotal'){
                    vm.off.isShow2=i;
                }else if(v.c=='numberWithFour'){
                    vm.off.isShow3=i; 
                }
            }else if(v.t==2){
                if(v.c=='productTotal'){
                    vm.off.isShow4=i; 
                }else if(v.c=='cuteTotal'){
                    vm.off.isShow5=i;
                }else if(v.c=='numberWithFour'){
                    vm.off.isShow6=i; 
                }
            }
        },getProVlaue(v,i,p){
            if(v.hasOwnProperty(i)&&v[i].hasOwnProperty(p)){
                if(p=='ratio'){
                    return v[i][p]
                }else{
                    return v[i][p]  
                }
            }else{
                return '--'
            }
        },
        listSwitch(v){
            let vm=this;
            if(v==1){
                vm.off.switchlist=1;
                vm.off.numberlist="";
                vm.numberlist="";
            }else if(v==2){
                vm.off.switchlist=2;
                vm.off.numberlist="";
                vm.numberlist="";                
            }
        },goBack(){
            let vm=this;
            vm.$parent.off.numberDetails=false;
        },translateData(v,i){
            return translateData(v,i)
        }
    }
}
</script>
<style scoped>
    .m-headTitle{width: 96%;height: 28px;margin:30px 30px 0px 30px;border-bottom: 1px solid #E6E6E6}
    .m-headTitle .m-number-title{margin-left: 10px;font-size: 14px}
    .m-headTitle .m-number-title p{display: inline-block;margin-right: 20px}
    .m-headTitle .m-number-title p:last-child{margin-right: 0px;}
    .m-headTitle .m-number-title p .switch{color: #999999;display: inline-block;}
    .faceValue p{margin-top: 10px;height: 35px;}
    .faceValue,.thousand,.numberList{width: 96%;margin: 0 auto;}
    .numberList{margin-top: 15px;}
    .faceValue .switch,.thousand .switch,.numberList .switch{height: 30px;margin-top: 20px;font-size: 16px;cursor: pointer;text-decoration: underline}
    .faceValue .switch.active,.thousand .switch.active,.numberList .switch.switch.active{color: #66A1DF;}
    .faceValue .switch::before,.thousand .switch::before{content: "";background: url('../../assets/images/dian.png') no-repeat center;width: 20px;height: 10px;background-size: contain;display: inline-block;margin-left: 5px;}
    .faceValue>.m-searchTable,.thousand>.m-searchTable,.numberList>.m-searchTable{border-collapse: collapse;font-size: 12px;}
    /* .faceValue>.m-searchTable>tr,.thousand .m-searchTable>tr{border-bottom: 1px solid #e2e2e2} */
    .faceValue>.m-searchTable>tr:nth-child(odd),.thousand .m-searchTable>tr:nth-child(odd){background: #FAFAFA}
    .faceValue>.m-searchTable>tr:nth-child(even),.thousand .m-searchTable>tr:nth-child(even){background: #fff}
    .m-searchTable2>tr:nth-child(odd){background: #fff}
    .m-searchTable2>tr:nth-child(even){background: #EEF1F6}
    .faceValue>.m-searchTable>tr:nth-child(1),.thousand .m-searchTable>tr:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}    
    .faceValue>.m-searchTable>tr>td:nth-child(1),.thousand>.m-searchTable>tr>td:nth-child(1){background: #EEF1F6;border-left: 1px solid #e2e2e2}
    .faceValue>.m-searchTable>tr>td a,.thousand .m-searchTable>tr>td a,.m-searchTable4>tr>td a{color:#66A1DF;text-decoration: underline}
    .faceValue>.m-searchTable>tr>td a.c-yellow,.thousand .m-searchTable>tr>td a.c-yellow,.m-searchTable4>tr>td a.c-yellow{color: #F78A24;text-decoration: underline}
    .faceValue>.m-searchTable>tr>td:last-child,.thousand .m-searchTable>tr>td:last-child{border-right: 1px solid #e2e2e2}
    .faceValue>.m-searchTable>tr:nth-child(1),.thousand .m-searchTable>tr:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}
    .faceValue>.m-searchTable>tr>td,.thousand .m-searchTable>tr>td{height: 38px;text-align: center}
    .numberList table{border-collapse: collapse;border: 1px solid #E2E2E2;font-size: 12px;}
    .numberList table tr{height: 35px;text-align: center}
    .numberList table tr:nth-child(odd){background: #EEF1F6}
    .numberList table tr:nth-child(even){background: #FFF}
    .numberList table tr:first-child{background: #f2f5fc}
    .numberList table tr:not(:last-child) td{border-bottom: 1px solid #e2e2e2;margin-bottom: 10px}
    /* .numberList>.m-searchTable>tr{height: 35px;border-bottom: 1px solid #e2e2e2;text-align: center} */
    .numberList>.m-searchTable>tr:nth-child(even){background: #fff}
    .numberList>.m-searchTable>tr:nth-child(odd){background: #EEF1F6}
    .tab-container{width: 96%;margin:10px 30px 20px 30px;}
    .m-searchTable{vertical-align: text-top}
    .m-searchTable>tr>td{width: 16.67%}
    .m-searchTable1{margin: 0;padding: 0;}
    /* .m-searchTable2>tr>td{} */
    .m-searchTable2>tr>td{height: 38px;border-bottom: 1px solid #e6E6E6}
    .m-searchTable2>tr>td{width: 16.67%}
    .m-searchTable4{margin: 0;padding: 0;border: 1px solid #E2E2E2;text-align: center;border-collapse: collapse}
    .m-searchTable4>tr:nth-child(odd){background: #EEF1F6}
    .m-searchTable4>tr:nth-child(even){background: #FFF}
    .m-searchTable4>tr>td{height: 38px;border-bottom: 1px solid #e6E6E6}
</style>

