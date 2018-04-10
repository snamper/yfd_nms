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
                     <el-input v-model="name" :maxlength="10" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" :maxlength="11" size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1,2">全部</el-radio>
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
    <div v-if="detailsList">
        <div v-if="detailsList.length>0">
            <div class="listTitleFoot">
                <el-row>
                    <el-col :span="20"><div class="grid-content bg-purple">员工列表<span v-if="form.page" class="greyFont fontWeight"> ({{form.page}})</span></div></el-col>
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
                    <tr v-for="(v,i) of detailsList" :key="i" :class="{'greyFont':v.departState==3}">
                        <td>
                            {{((pa-1)*10+(i+1))}}
                        </td>
                        <td >
                        <a style="" href="javascript:void(0)" @click="getStaffDetails(v)">{{v.username}}</a>
                        </td>
                        <td >
                        {{v.phone}}
                        </td>
                        <td >
                        {{new Date(v.createTime).toLocaleString()}}
                        </td>
                        <td >
                            <span v-for="(v,i) in v.userRole" :key="i">
                                <span v-if="v==1">管理员</span>
                                <span v-if="v==2">销售</span>
                                <span v-if="v==3">店长</span>
                                <span v-if="v==4">采购员</span>
                                <span v-if="v==5">业务员</span>
                            </span>
                        </td>
                        <td >
                        <span v-if="v.userState==1">正常</span>
                        <span v-if="v.userState==2">黑名单</span>
                        <span v-if="v.userState==3">注销</span>
                        </td>
                        <td >
                        {{new Date(v.lastLoginTime).toLocaleString()}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="listTitleFoot">
                <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-size="10"
                        @current-change="search"
                        :current-page.sync="currentPage"                        
                        :total="form.page">
                    </el-pagination>    
                </div></el-col>
                </el-row>
            </div>
        </div>
        <div v-if="detailsList.length==0" class="searchResultInfoNone">
          查询结果为空!
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
export default{
	data (){
		return {
            currentPage:0,//当前页面
            detailsList:'',
            name:'',
            phone:'',
            radio:'1,2',
            pa:'',
            searchData:'',//查询人
            searchDetailsYfdData:'',
            searchUserId:'',
            searchRes:'',
            StaffdepartName:'',
			off:{
                showSearch:"",
                searchList:false,
                staffDetails:false,
                searchStaff:true,
			},
			form:{
                page:1
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
            let load=Loading.service(options),data={},url='/yfd-ums/w/user/userSearch',vm=this;
             vm.pa=p||1;
             vm.currentPage=p||1;
                data={
                "username":vm.name
                ,"phone":vm.phone
                ,"userState":vm.radio
                ,"pageSize":10
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchList=true;
                    vm.form.page=data.data.total;                    
                    vm.detailsList=data.data.users;
                }else{
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e),load.close());            
        },
        getDetails(v){
            
        }
        ,getStaffDetails(p){
            let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
            data={"searchUserId":p.userId,"sessionType":"2"}
            vm.searchUserId=p.userId;
            vm.searchDetailsYfdData=data;
            vm.StaffdepartName=p.departName;
            requestMethod(data,url)
            .then((data)=>{
                vm.off.searchStaff=false;
                vm.off.staffDetails=true;
                if(data.code==200){
                    vm.searchRes=data.data;
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        }
	}
}
</script>

