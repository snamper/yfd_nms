<style scoped>
</style>
<template>
  <div>
      <div v-if="off.searchStaff">
      <div class="ygcx greyFont">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :xs="19" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="name" :maxlength="10" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :xs="19" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="phone" :maxlength="11" size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :xs="19" :sm="18" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="radio"  label="1,2,3,4">全部</el-radio>
                    <el-radio v-model="radio"  label="1" >正常</el-radio>
                    <el-radio v-model="radio"  label="2" >黑名单</el-radio>
                    <el-radio v-model="radio"  label="3,4" >注销</el-radio>
                </el-col>
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search()">搜索</button>
        </el-row>
    </div>
    <div v-if="detailsList">
        <div>
            <div class="listTitleFoot">
                <el-row>
                    <p><h3>员工列表<span class="fontWeight greyFont">({{form.page||'0'}})</span></h3></p>                    
                </el-row>        
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr>
                        <td>序号</td>
                        <td>&nbsp;</td>
                        <td class="nameIcon">用户姓名</td>
                        <td>手机号码</td>
                        <td>创建时间</td>
                        <td>角色</td>
                        <td>当前状态</td>
                        <td>最后登录时间</td>
                    </tr>
                    <tr v-for="(v,i) of detailsList" :key="i" :class="{'greyFont':v.departState==3}">
                        <td>
                            {{((pa-1)*15+(i+1))}}
                        </td>
                        <td>&nbsp;</td>
                        <td class="nameIcon">
                            <p style="float:left;margin-left:36%">
                                <span>
                                    <span v-for="(v,i) in v.userRole" :key="i">
                                        <img v-if="v==3" src="../../assets/images/icon/admin.svg" class="adminIcon">
                                    </span>
                                    {{v.username}}
                                </span>
                            </p>
                        </td>
                        <td >
                            <a class="textDec" @click="getStaffDetails(v)">{{v.phone}}</a>                            
                        </td>
                        <td >
                            <span v-if="v.createTime">
                                {{getDateTime(v.createTime)[6]}}
                            </span>
                            <span v-if="!v.createTime">
                                --
                            </span>
                        </td>
                        <td >
                            <span v-for="(x,i) in v.userRole.split(',')">
                                {{translateRole(x,rolelist1)}} <span v-if="v.userRole.split(',').length-1>i">,</span>
                            </span>
                        </td>
                        <td >
                            <span :class="v.userState==1?'fcgreen':v.userState==2?'greyFont':''">{{translateData('userState',v.userState)}}</span> 
                        </td>
                        <td >
                            <span v-if="v.lastLoginTime">
                                {{getDateTime(v.lastLoginTime)[6]}}
                            </span>
                            <span v-if="!v.lastLoginTime">
                                --
                            </span>
                        </td>
                    </tr>
                    <tr v-if="detailsList.length<=0">
                        <td class="tac" colspan="8">
                            暂无数据                                                        
                        </td>
                    </tr>
                </table>
            </div>
            <div class="listTitleFoot" v-if="detailsList.length>0">
                <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-size="15"
                        @current-change="search"
                        :current-page.sync="currentPage"                        
                        :total="form.page">
                    </el-pagination>    
                </div></el-col>
                </el-row>
            </div>
        </div>
        </div>
      </div>
      <staffDetails v-if="off.staffDetails" :forms="searchRes"></staffDetails>
  </div>	 
</template>
<script>
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getStore,getDateTime,getUnixTime,errorDeal,checkMobile,translateData,translateRole } from "../../config/utils.js";
import staffDetails from "../../components/staffDetails.vue";
import { mapState,mapMutations,mapActions } from 'vuex';
export default{
	data (){
		return {
            currentPage:0,//当前页面
            detailsList:'',
            name:'',
            phone:'',
            radio:'1,2,3,4',
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
	},components:{
        "staffDetails":staffDetails
	},mounted:function(){
        this.init()
    },
    computed:{
        ...mapState([
            "rolelist1"
        ])
    },
	methods:{
        ...mapMutations([
            "GET_ROLE"
        ]),
        ...mapActions([
            "getRolesInfo"
        ]),
        async init(){
            let vm=this;
            vm.getRolesInfo();
            vm.options=vm.rolelist;
        },
        search(p){//查询
            let vm=this;
            if(this.phone!=''){
                checkMobile(this.phone,function(){vm.off.searchList=false;vm.form.page="";vm.detailsList="";return false});
            }
            let data={},url='/ums/w/user/userSearch';
             vm.pa=p||1;
             vm.currentPage=p||1;
                data={
                "username":vm.name
                ,"phone":vm.phone
                ,"userState":vm.radio
                ,"pageSize":15
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchList=true;
                    vm.form.page=data.data.total;                    
                    vm.detailsList=data.data.users;
                }else{
                    vm.off.searchList=false;
                    vm.form.page="";                    
                    vm.detailsList="";
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }  
            }).catch(e=>errorDeal(e,()=>{vm.off.searchList=false;vm.form.page="";vm.detailsList="";}));            
        },getStaffDetails(p){//获取员工详情
            let data={},url='/ums/w/user/getUserDetail',vm=this;
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
            }).catch(e=>errorDeal(e));
        },getDateTime(v){
            return getDateTime(v);
        },translateData(v,i){
            return translateData(v,i)
        },translateRole(v,i){
            return translateRole(v,i)
        }
	}
}
</script>

