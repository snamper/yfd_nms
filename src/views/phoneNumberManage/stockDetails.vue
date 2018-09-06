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
            <p>面值</p>
            <table style="width:100%">
                <tr>
                    <td>面值</td>
                    <td>0</td>
                    <td>10</td>
                    <td>20</td>
                    <td>30</td>
                    <td>50</td>
                    <td>100</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>码号数（个）</td>
                    <td v-for="(v,i) in mapFaceValue">
                        <a :class="{'c-yellow':off.isShow1===v}" v-if="getProVlaue(faceValueDetails.faceValueMap,v,'productTotal')!='--'"   href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},v)">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'productTotal')}}
                        </a>
                        <span v-if="getProVlaue(faceValueDetails.faceValueMap,v,'productTotal')=='--'">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'productTotal')}}
                        </span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>靓号数（个）</td>
                    <td v-for="(v,i) in mapFaceValue">
                        <a :class="{'c-yellow':off.isShow2===v}" v-if="getProVlaue(faceValueDetails.faceValueMap,v,'cuteTotal')!='--'" href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},v)">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'cuteTotal')}}
                        </a>
                        <span v-if="getProVlaue(faceValueDetails.faceValueMap,v,'cuteTotal')=='--'">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'cuteTotal')}}
                        </span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>带4数（个）</td>
                    <td  v-for="(v,i) in mapFaceValue">
                        <a :class="{'c-yellow':off.isShow3===v}" v-if="getProVlaue(faceValueDetails.faceValueMap,v,'numberWithFour')!='--'" href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},v)">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'numberWithFour')}}
                        </a>
                        <span v-if="getProVlaue(faceValueDetails.faceValueMap,v,'numberWithFour')=='--'">
                            {{getProVlaue(faceValueDetails.faceValueMap,v,'numberWithFour')}}
                        </span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>带4比例</td>
                    <td v-for="(v,i) in mapFaceValue">
                       {{getProVlaue(faceValueDetails.faceValueMap,v,'ratio')}}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="thousand">
            <p>千字段</p>
            <table style="width:100%">
                <tr>
                    <td>千段</td>
                    <td>0千段</td>
                    <td>1千段</td>
                    <td>2千段</td>
                    <td>3千段</td>
                    <td>4千段</td>
                    <td>5千段</td>
                    <td>6千段</td>
                    <td>7千段</td>
                    <td>8千段</td>
                    <td>9千段</td>
                </tr>
                <tr>
                    <td>码号数（个）</td>
                    <td v-for="(v,i) in mapNumberSection">
                        <a :class="{'c-yellow':off.isShow4===v}" v-if="getProVlaue(thousandDetails,v,'productTotal')!='--'" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},v)">
                            {{getProVlaue(thousandDetails,v,'productTotal')}}
                        </a>
                        <span  v-if="getProVlaue(thousandDetails,v,'productTotal')=='--'" >
                            {{getProVlaue(thousandDetails,v,'productTotal')}}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>靓号数（个）</td>
                    <td v-for="(v,i) in mapNumberSection">
                        <a :class="{'c-yellow':off.isShow5===v}" v-if="getProVlaue(thousandDetails,v,'cuteTotal')!='--'" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},v)">
                            {{getProVlaue(thousandDetails,v,'cuteTotal')}}
                        </a>
                        <span  v-if="getProVlaue(thousandDetails,v,'cuteTotal')=='--'" >
                            {{getProVlaue(thousandDetails,v,'cuteTotal')}}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>带4数（个）</td>
                    <td v-for="(v,i) in mapNumberSection">
                        <a :class="{'c-yellow':off.isShow6===v}" v-if="getProVlaue(thousandDetails,v,'numberWithFour')!='--'" href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},v)">
                            {{getProVlaue(thousandDetails,v,'numberWithFour')}}
                        </a>
                        <span  v-if="getProVlaue(thousandDetails,v,'numberWithFour')=='--'" >
                            {{getProVlaue(thousandDetails,v,'numberWithFour')}}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>带4比例</td>
                    <td v-for="(v,i) in mapNumberSection">
                        {{getProVlaue(thousandDetails,v,'ratio')}}
                    </td>
                </tr>

            </table>
        </div>
        <div class="numberList" v-if="off.numberlist">
            <p style="font-size:14px"><span style="color:#66A1DF">{{listTitle}}</span>详情 ( 共<span style="color:#F78A24">{{listTotal}}</span>条 )</p>
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
           mapFaceValue:[0,10,20,30,50,100],
           mapNumberSection:[0,1,2,3,4,5,6,7,8,9,]
           ,off:{
               numberlist:false,
               isShow1:'',
               isShow2:'',
               isShow3:'',
               isShow4:'',
               isShow5:'',
               isShow6:''
           }
		}
	},
	methods:{
        getNumberList(p,v,i){
            let vm=this,json;
            if(typeof(v)!="undefined"){
                vm.datav=v;
                vm.datai=i;
            }else{
                v=vm.datav;
                i=vm.datai;
            }
            vm.getClickStatus(v,i);
            if(v.t==1){//面值
                let withFour,cute;
                vm.listTitle=i+'面值码号';
                vm.listTotal=vm.getProVlaue(vm.faceValueDetails.faceValueMap,i,v.c)
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
                    "faceValue": i,
                    "pageNum": p||1,
                    "pageSize": 15,
                    "phoneLevel": cute,
                    "sectionId": vm.faceValueDetails.sectionId,
                    "withFour": withFour
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
                vm.listTitle=i+'千段码号';
                vm.listTotal=vm.getProVlaue(vm.thousandDetails,i,v.c)
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
                    "faceValue": i,
                    "pageNum": p||1,
                    "pageSize": 15,
                    "phoneLevel": cute,
                    "section":i,
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
                    return parseFloat(v[i][p])*100+'%'  
                }else{
                    return v[i][p]  
                }
            }else{
                return '--'
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
    .m-headTitle{width: 96%;height: 28px;margin:30px 30px 0px 30px;}
    .m-headTitle .m-number-title{margin-left: 10px;font-size: 14px}
    .m-headTitle .m-number-title p{display: inline-block;margin-right: 20px}
    .m-headTitle .m-number-title p:last-child{margin-right: 0px;}
    .m-headTitle .m-number-title p span{color: #999999;display: inline-block;}
    .faceValue,.thousand,.numberList{width: 96%;}
    .faceValue p,.thousand p,.numberList p{margin-left: 2%;height: 30px;margin-top: 20px;font-size: 16px}
    .faceValue p::before,.thousand p::before{content: "";background: url('../../assets/images/dian.png') no-repeat center;width: 20px;height: 10px;background-size: contain;display: inline-block;margin-left: 5px;}
    .faceValue table,.thousand table,.numberList table{margin-left:2%;border-collapse: collapse;font-size: 12px}
    .faceValue table tr,.thousand table tr{border-bottom: 1px solid #e2e2e2}
    .faceValue table tr:nth-child(odd),.thousand table tr:nth-child(odd){background: #FAFAFA}
    .faceValue table tr:nth-child(even),.thousand table tr:nth-child(even){background: #fff}
    .faceValue table tr:nth-child(1),.thousand table tr:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}    
    .faceValue table tr td:nth-child(1),.thousand table tr td:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}
    .faceValue table tr td a,.thousand table tr td a{color:#66A1DF;text-decoration: underline}
    .faceValue table tr td a.c-yellow,.thousand table tr td a.c-yellow{color: #F78A24;text-decoration: underline}
    .faceValue table tr td:last-child,.thousand table tr td:last-child{border-right: 1px solid #e2e2e2}
    .faceValue table tr:nth-child(1),.thousand table tr:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}
    .faceValue table tr td,.thousand table tr td{width: 9%;height: 35px;text-align: center}
    .tab-container{width: 96%;margin:10px 30px 20px 30px;}
    .numberList table{border: 1px solid #e2e2e2;margin-bottom: 10px}
    .numberList table tr{height: 35px;border-bottom: 1px solid #e2e2e2;text-align: center}
    .numberList table tr:nth-child(even){background: #fff}
    .numberList table tr:nth-child(odd){background: #EEF1F6}
</style>

