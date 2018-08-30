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
                    <p><span>当前状态 :</span> {{translateData(3,faceValueDetails.productState)}}</p> )
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
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},0)">
                            {{getProVlaue(faceValueDetails.faceValueMap,0,'productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},10)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'10','productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},20)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'20','productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},30)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'30','productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},50)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'50','productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'productTotal'},100)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'100','productTotal')}}
                        </a>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>靓号数（个）</td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},0)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'0','cuteTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},10)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'10','cuteTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},20)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'20','cuteTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},30)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'30','cuteTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},50)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'50','cuteTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'cuteTotal'},100)">                        
                            {{getProVlaue(faceValueDetails.faceValueMap,'100','cuteTotal')}}
                        </a>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>带4数（个）</td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},0)">                        
                            {{getProVlaue(faceValueDetails.faceValueMap,'0','numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},10)">                                                
                            {{getProVlaue(faceValueDetails.faceValueMap,'10','numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},20)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'20','numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},30)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'30','numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},50)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'50','numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:1,c:'numberWithFour'},100)">
                            {{getProVlaue(faceValueDetails.faceValueMap,'100','numberWithFour')}}
                        </a>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>带4比例</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'0','ratio')}}</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'10','ratio')}}</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'20','ratio')}}</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'30','ratio')}}</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'50','ratio')}}</td>
                    <td>{{getProVlaue(faceValueDetails.faceValueMap,'100','ratio')}}</td>
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
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList({t:2,c:'productTotal'},0)">
                            {{getProVlaue(thousandDetails,0,'productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},1)">
                            {{getProVlaue(thousandDetails,1,'productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},2)">
                            {{getProVlaue(thousandDetails,2,'productTotal')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},3)">
                            {{getProVlaue(thousandDetails,3,'productTotal')}}
                        </a>
                    </td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},4)">
                            {{getProVlaue(thousandDetails,4,'productTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},5)">
                            {{getProVlaue(thousandDetails,5,'productTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},6)">
                            {{getProVlaue(thousandDetails,6,'productTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},7)">
                            {{getProVlaue(thousandDetails,7,'productTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},8)">
                            {{getProVlaue(thousandDetails,8,'productTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'productTotal'},9)">
                            {{getProVlaue(thousandDetails,9,'productTotal')}}
                        </a></td>
                </tr>
                <tr>
                    <td>靓号数（个）</td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},0)">
                            {{getProVlaue(thousandDetails,0,'cuteTotal')}}
                        </a>
                    </td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},1)">
                            {{getProVlaue(thousandDetails,1,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},2)">
                            {{getProVlaue(thousandDetails,2,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},3)">
                            {{getProVlaue(thousandDetails,3,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},4)">
                            {{getProVlaue(thousandDetails,4,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},5)">
                            {{getProVlaue(thousandDetails,5,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},6)">
                            {{getProVlaue(thousandDetails,6,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},7)">
                            {{getProVlaue(thousandDetails,7,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},8)">
                            {{getProVlaue(thousandDetails,8,'cuteTotal')}}
                        </a></td>
                    <td><a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'cuteTotal'},9)">
                            {{getProVlaue(thousandDetails,9,'cuteTotal')}}
                        </a></td>
                </tr>
                <tr>
                    <td>带4数（个）</td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},0)">
                            {{getProVlaue(thousandDetails,0,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},1)">
                            {{getProVlaue(thousandDetails,1,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},2)">
                            {{getProVlaue(thousandDetails,2,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},3)">
                            {{getProVlaue(thousandDetails,3,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},4)">
                            {{getProVlaue(thousandDetails,4,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},5)">
                            {{getProVlaue(thousandDetails,5,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},6)">
                            {{getProVlaue(thousandDetails,6,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},7)">
                            {{getProVlaue(thousandDetails,7,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},8)">
                            {{getProVlaue(thousandDetails,8,'numberWithFour')}}
                        </a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="getNumberList(1,{t:2,c:'numberWithFour'},9)">
                            {{getProVlaue(thousandDetails,9,'numberWithFour')}}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>带4比例</td>
                    <td>{{getProVlaue(thousandDetails,0,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,1,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,2,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,3,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,4,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,5,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,6,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,7,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,8,'ratio')}}</td>
                    <td>{{getProVlaue(thousandDetails,9,'ratio')}}</td>
                </tr>
            </table>
        </div>
        <div class="numberList" v-if="off.numberlist">
            <p></p>
            <table style="width:100%">
                <tr>
                    <td>序号</td>
                    <td>号码</td>
                    <td>号码等级</td>
                    <td>SIM号</td>
                    <td>面值</td>
                    <td>套餐名称</td>
                </tr>
                <tr v-for="(v,i) in numberlist">
                    <td>{{(currentPage-1)*5+i+1}}</td>
                    <td>{{v.phone}}</td>
                    <td>{{v.phoneLevel}}</td>
                    <td>{{v.sim}}</td>
                    <td>{{v.faceValue}}</td>
                    <td>{{v.packageDesc}}</td>
                </tr>
            </table>
            <div class="listTitleFoot">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-pagination
                        layout="prev, pager, next"
                        :page-size="5"
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
           datai:""//查询参数
           ,off:{
               numberlist:false
           }
		}
	},
	methods:{
        getNumberList(p,v,i){
            debugger;
            let vm=this,json; 
            if(typeof(v)!="undefined"){
                vm.datav=v;
                vm.datai=i;
            }else{
                v=vm.datav;
                i=vm.datai;
            }
            if(v.t==1){
                if(vm.getProVlaue(vm.faceValueDetails.faceValueMap,i,v.c)=='--'){
                    return false
                }else{
                    let withFour;
                    if(v.c=="numberWithFour"){
                        withFour=1
                    }else{
                        withFour=0
                    }
                    json={
                        "faceValue": i,
                        "pageNum": p||1,
                        "pageSize": 5,
                        "phoneLevel": "",
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
                }
            }else if(v.t==2){
                if(vm.getProVlaue(vm.thousandDetails,i,v.c)=='--'){
                    return false
                }else{
                    let withFour;
                    if(v.c=="numberWithFour"){
                        withFour=1
                    }else{
                        withFour=0
                    }
                    json={
                        "faceValue": i,
                        "pageNum": p||1,
                        "pageSize": 5,
                        "phoneLevel": "",
                        "sectionId": vm.faceValueDetails.sectionId,
                        "withFour": withFour
                    }
                    getNumberStorageDetails(json)
                    .then((data)=>{
                        vm.off.numberlist=true;
                        vm.numberlist=data.data.numbers;
                    }).catch(e=>errorDeal(e))
                }
            }else{
                return false;
            }
        },goBack(){
            let vm=this;
            vm.$parent.off.numberDetails=false;
        },translateData(v,i){
            return translateData(v,i)
        },getProVlaue(v,i,p){
            if(v.hasOwnProperty(i)&&v[i].hasOwnProperty(p)){
                return v[i][p] 
            }else{
                return '--'
            }
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
    .faceValue table tr:nth-child(odd),.thousand table tr:nth-child(odd){background: #EEF1F6}
    .faceValue table tr:nth-child(even),.thousand table tr:nth-child(even){background: #fff}
    .faceValue table tr td:nth-child(1),.thousand table tr td:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}
    .faceValue table tr td a,.thousand table tr td a{color:#66A1DF;text-decoration: underline}
    .faceValue table tr td:last-child,.thousand table tr td:last-child{border-right: 1px solid #e2e2e2}
    .faceValue table tr:nth-child(1),.thousand table tr:nth-child(1){background: #EEF1F6;border: 1px solid #e2e2e2}
    .faceValue table tr td,.thousand table tr td{width: 9%;height: 35px;text-align: center}
    .tab-container{width: 96%;margin:10px 30px 20px 30px;}
    .numberList table{border: 1px solid #e2e2e2;margin-bottom: 10px}
    .numberList table tr{height: 35px;border-bottom: 1px solid #e2e2e2;text-align: center}
    .numberList table tr:nth-child(even){background: #fff}
    .numberList table tr:nth-child(odd){background: #EEF1F6}
</style>

