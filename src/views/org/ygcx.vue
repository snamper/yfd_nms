<style scoped>
 .listTitleFoot{width: 96%;margin: 10px 18px;}
</style>
<template>
  <div>
      <div v-if="off.searchStaff">
      <div class="ygcx greyFont">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" size="mini" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1,2" >全部</el-radio>
                    <el-radio v-model="radio"  label="1" >正常</el-radio>
                    <el-radio v-model="radio"  label="2" >黑名单</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search()">搜索</button>
        </el-row>
    </div>
    <div v-if="off.searchList">
        <div class="listTitleFoot">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple">员工列表</div></el-col>
            </el-row>        
        </div>
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td>序号</td>
                    <td>用户姓名</td>
                    <td>手机号码</td>
                    <td>创建时间</td>
                    <td>职务</td>
                    <td>当前状态</td>
                    <td>最后登录时间</td>
                </tr>
                <tr v-for="(v,i) of detailsList" :key="i">
                    <td>
                        {{((pa-1)*10+(i+1))}}
                    </td>
                    <td >
                       <a style="" href="javascript:void(0)" @click="getStaffDetails(v.username)">{{v.username}}</a>
                    </td>
                    <td >
                       {{v.phone}}
                    </td>
                    <td >
                       {{new Date(v.createTime).toLocaleString()}}
                    </td>
                    <td >
                       {{v.userRole}}
                    </td>
                    <td >
                       {{v.userState}}
                    </td>
                    <td >
                       {{new Date(v.lastLoginTime).toLocaleString()}}
                    </td>
                </tr>
                <tr>
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
            </el-row>
        </div>
        </div>
      </div>
      <dlsStaff v-if="off.staffDetails" :forms="searchRes">

      </dlsStaff>
  </div>	 
</template>
<script>
const options={text:"正在加载"}
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils.js";
import dlsStaffDetails from "../../../components/StaffDetails";
import search from "../../../components/search";
export default{
	data (){
		return {
            detailsList:'',
            name:'',
            phone:'',
            radio:'2',
            pa:'',
            ix:[{color:'red1',age:18,sex:'girl'},{color:'red2',age:18,sex:'girl'},{color:'red3',age:18,sex:'girl'},{color:'red4',age:18,sex:'girl'}],            
			off:{
                showSearch:"",
                searchList:false,
                staffDetails:false,
                searchStaff:true,
			},
			form:{
			
			},
		}
	},
	components:{
        "dlsStaff":dlsStaffDetails
	},
	created:function(){
       
    },
	methods:{
        search(p){//查询
            let load=Loading.service(options) ,data={},url='/yfd-ums/w/user/userSearch',vm=this;
             vm.pa=p||1;
                data={
                "username":vm.name
                ,"phone":vm.phone
                ,"userstate":vm.radio
                ,"pageSize":10
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                vm.off.searchList=true;
                vm.detailsList=data.data.users;
                if(data.code==200){
                    
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e),load.close());            
        },
        getDetails(v){
            
        }
        ,getStaffDetails(p){
            let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
             data={"searchUserId": "15684765209"}
            requestMethod(data,url)
            .then((data)=>{
                vm.off.searchStaff=false;
                vm.off.staffDetails=true;
                vm.searchRes=data.data;
                if(data.code==200){
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        }
	}
}
</script>

