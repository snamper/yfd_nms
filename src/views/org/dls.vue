<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 18px;}
</style>
<template>
<section>
  <div v-if="off.notDlsDetails">
    <!-- 查询模块 -->
    <div class="dls greyFont">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple">
                <el-col :span="2"><div class="grid-content bg-purple-dark textR inputTitle">选择时间：</div></el-col>
                <el-col :span="8">
                    <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    size="small"
                    editable=false
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span>——</span>
                    <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    size="small"
                    editable=false                    
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="12" style="font-size:18px">
                    ( <el-radio v-model="timeType"  label="2">修改时间</el-radio>
                    <el-radio v-model="timeType"  label="1">创建时间</el-radio> )
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">公司名称：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="cname" :maxlength="25" size="small" placeholder="请输入查询的公司名称"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name"  :maxlength="20" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1,3">全部</el-radio>
                    <el-radio v-model="radio"  label="1">正常</el-radio>
                    <el-radio v-model="radio"  label="3">注销</el-radio>
                    <!-- <el-radio v-model="radio"  label="2">注销</el-radio> -->
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" :maxlength="11" size="small"  placeholder="请输入联系人号码"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button  class="searchBtn" @click="search()">搜索</button>
        </el-row>
    </div>  
    
    <!-- 查询结果模块 -->
    <div v-if="searchList">
        <div class="listTitleFoot">
            <p>代理商列表  ：<span class="greyFont fontWeight">{{total}}</span></p>
        </div>
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td colspan="8">
                    <el-row>
                    <!-- <el-col :span="7"><div class="grid-content bg-purple">
                        最后同步成功时间:<span>{{}}</span>
                    </div></el-col>
                    <el-col :span="7"><div class="grid-content bg-purple-light">
                        下次同步成功时间:<span>{{}}</span>
                    </div></el-col> -->
                    <!-- <el-col :span="6"><div class="grid-content bg-purple">
                        同步间隔时间:<span></span>
                        <el-button type="primary" size="mini" @click="openSet()">设置</el-button>
                    </div></el-col> -->
                    <el-col :span="24"><div class="grid-content bg-purple-light">
                        <el-button class="fr" type="success" size="mini" @click="sync()">手动同步</el-button>
                    </div></el-col>
                    </el-row>
                    </td>
                </tr>
                <tr>
                    <td>序号</td>
                    <td>修改时间</td>
                    <td>公司名称</td>
                    <td>联系人</td>
                    <td>手机号码</td>
                    <td>当前状态</td>
                    <td>创建时间</td>
                    <td>员工详情</td>
                </tr>
                <tr v-for="(v,i) of searchList" :key="i" :class="{'greyFont':v.departState==3}">
                    <td >
                       {{((pa-1)*10+(i+1))}}
                    </td>
                    <td >
                       {{new Date(v.modifyTime).toLocaleString()}}
                    </td>
                    <td >
                       {{v.departName}}
                    </td>
                    <td >
                       {{v.managerName}}
                    </td>
                    <td >
                       {{v.phone}}
                    </td>
                    <td >
                       <span v-if="v.departState==1">
                            正常
                       </span>
                       <span v-if="v.departState==3">
                            黑名单
                       </span>
                    </td>
                    <td >
                       {{new Date(v.createTime).toLocaleString()}}
                    </td>
                    <td >
                       <a href="javascript:void(0)" @click="getDetails(v)">查看详情</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="listTitleFoot">
            <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-pagination
                    layout="prev, pager, next"
                    :page-size="5"
                    @current-change="search"
                    :total="form.page">
                    </el-pagination>
                </div></el-col>
                <el-col :span="12">
                    <!-- <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div> -->
                </el-col>
            </el-row>
        </div>  
    </div>
    </div>
    <!-- 弹框组件 -->
    <common-layer v-if="off.layer"></common-layer>
    <!-- 查看员工详情组件 -->
    <dls-Details v-if="off.dlsDetails" :lists="detailsList"></dls-Details>   
</section>
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils";
import {requestMethod,requestMethod2} from "../../config/service.js"; 
import search from "../../../components/search";
import layers from "../../../components/layer";
import dlsDetails from "../../../components/dlsDetails";
export default{
    name:'dls',
    data (){
        return {
            hesdUserName:"",
            headPhone:"",
            total:"",
            startTime: "",
            endTime: "",
            cname: "",
            phone: "",
            name: "",
            radio: "1,3",
            timeType:"1",
            detailsList:[],
            pa:1,
            companyName:"",//..
            managerName:"",//..
            managerPhone:"",//..
            searchDetailsType:"",//查看员工详情
            off:{
                dlsList:false,
                layer:false,
                dlsDetails:false,
                notDlsDetails:true
            },
            form:{
                page:0
            }
            ,searchList:''
            ,details:{}
            ,ix:[{color:'red11',age:18,sex:'girl',s:'off'},{color:'red22',age:18,sex:'girl',s:'on'},{color:'red33',age:18,sex:'girl',s:'black'},{color:'red44',age:18,sex:'girl',s:'on'}],      
        }
    },
    components:{
        "common-search":search,
        "common-layer":layers,
        "dls-Details":dlsDetails
    },
    created:function(){

    },
    methods:{
        openSet(){//设置
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=true;
            vm.off.sync=false;
        },
        sync(){//手动同步
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=false;
            vm.off.sync=true;
        },search(p){//查询
            if(this.startTime.length==0||this.endTime.length==0){
                layer.open({
                    content:'请选择开始和结束时间',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            let load=Loading.service(options),data={},url='/yfd-ums/w/user/departSearch',vm=this;
            vm.pa=p||1;
            data={
                "startTime":new Date(vm.startTime).getTime()||''
                ,"endTime":new Date(vm.endTime).getTime()||''
                ,"searchType":vm.timeType
                ,"departName":vm.cname
                ,"managerName":vm.name
                ,"departState":vm.radio
                ,"phone":vm.phone
                ,"pageSize":10
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                load.close()
                if(data.code==200){
                    vm.total=data.data.total;//查询总数
                    vm.searchList=data.data.departs;//查询内容
                    vm.form.page=data.data.total/10
                }else{
                    errorDeal(data);
                }
            }).then(()=>{

            }).catch(e=>errorDeal(e));
        }
        ,getDetails(v){//查看详情
            let vm=this,data={},url='/yfd-ums/w/user/getDepartDetail',load=Loading.service(options);
            vm.searchDetailsType=1;
            vm.searchDepartId=v.departId;
            data={'searchDepartId':v.departId,userState:"1,2",username:"",phone:"",pageNum:"1",pageSize:"10"};
            vm.companyName=v.departName;
            vm.managerName=v.managerName;
            vm.managerPhone=v.phone;
            requestMethod(data,url)
            .then((data)=>{
                load.close();
                if(data.code==200){
                    if(data.data.users.length>0){
                        vm.off.notDlsDetails=false;
                        vm.off.dlsDetails=true;
                        vm.detailsList=data.data.users;
                        vm.headUserName=data.data.users[0].username;
                        vm.headPhone=data.data.users[0].phone;
                    }else{
                        vm.off.notDlsDetails=false;
                        vm.off.dlsDetails=true;
                        vm.detailsList=[];
                        vm.detailsList.username='';
                        vm.detailsList.phone='';
                    }
                }else{
                    errorDeal(data);
                }
            }).catch(e=>errorDeal(e));
        },
    }
}
</script>

