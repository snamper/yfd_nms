<style scoped>
 .listTitleFoot{width: 96%;margin: 10px 18px;}
 .addList{border: 1px solid #ccc;min-height: 100px;padding: 10px;background: white}
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
    <el-row>
            <el-col style="float:right" :span="2"><div class="grid-content bg-purple-light"><el-button type="success" @click="AddStaffDiv()" size="mini">添加员工</el-button></div></el-col>
        </el-row>
        <div class="listTitleFoot addList" v-if="off.addList">
            <div style="float:right">
                <button @click="AddList()" style="display:block" class="buttonAddStaff">增加一行</button>
                <button @click="AddStaff()" class="buttonAddStaff">确定添加</button>
            </div>
            <div v-for="(v,i) in list" :key="i" class="mt8">
                用户姓名 : <el-input style="width:25%" size="small" maxlength=10 v-model="list[i].username" placeholder="请输入内容"></el-input>
                &nbsp;&nbsp;&nbsp;手机号码 : <el-input style="width:25%" size="small" maxlength=11 v-model="list[i].phone" placeholder="请输入内容"></el-input>
                &nbsp;&nbsp;&nbsp;职务 :  <el-checkbox v-model="list[i].checked">店长</el-checkbox><el-checkbox v-model="list[i].checked2">管理员</el-checkbox><el-checkbox v-model="list[i].checked3">销售</el-checkbox>
            </div>
        </div>
    <!-- <div v-if="off.searchList"> -->
    <div v-if="detailsList">
        <div v-if="detailsList.length>0">    
            <div class="listTitleFoot">
                <el-row>
                    <el-col :span="20"><div class="grid-content bg-purple">员工列表<span v-if="form.page>0" class="fontWeight greyFont"> ({{form.page}})</span></div></el-col>
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
      <yfdStaff v-if="off.staffDetails" :forms="searchRes">

      </yfdStaff>
      <common-layer v-if="off.layer"></common-layer>      
  </div>	 
</template>
<script>
const options={text:"正在加载"}
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils.js";
import layerAddStaff from "../../../components/layeruseryfd";
import yfdStaffDetails from "../../../components/yfdStaffDetails";
export default{
	data (){
		return {
            detailsList:'',
            name:'',
            phone:'',
            radio:'1,2',
            pa:'',
            searchDetailsYfdData:'',//查询人
            searchRes:"",
            addAble:0,//是否可以添加
            list: [{username: '', phone: '',checked:false,checked2:false,checked3:false,departName:"好亚飞达总部"},],//添加员工            
			off:{
                showSearch:"",
                searchList:false,
                staffDetails:false,
                searchStaff:true,
                addList:false,
                layer:false,
			},
			form:{
                page:1
			},
		}
	},
	components:{
        "yfdStaff":yfdStaffDetails,
        "common-layer":layerAddStaff,        
	},
	created:function(){
       
    },
	methods:{
         AddList(){//添加员工状态操作
            this.list.push({username: '', phone: '',checked:false,checked2:false,checked3:false,departName:"好亚飞达总部"})
        },
        AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let data={"newUsers":[],authCode:''},vm=this;
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].checked==true||this.list[i].checked2==true||this.list[i].checked3==true){
                    if(this.list[i].checked==true){
                        this.list[i].userRole='4'}
                    if(this.list[i].checked2==true){
                        this.list[i].userRole+=',5'}
                    if(this.list[i].checked3==true){
                        this.list[i].userRole+=',6'}
                    delete this.list[i].checked;
                    delete this.list[i].checked2;
                    delete this.list[i].checked3;
                    data.newUsers.push(this.list[i])
                    this.addAble='1';
                }
            }
            if(this.addAble=='0'){
                layer.open({
                    content:'请输入添加的员工信息',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            this.off.layer=true;
            this.off.sync=true;
            this.off.userAdd=true;
            this.addUsersData=data;
        },
        search(p){//查询
            let load=Loading.service(options) ,data={},url='/yfd-ums/w/user/getDepartDetail',vm=this;
            //data={'searchDepartId':"1803160000",userState:"1,2",username:"",phone:"",pageNum:"1",pageSize:"10"};
             vm.pa=p||1;
                data={
                "searchDepartId":"1803160000",
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
        }
        ,getStaffDetails(p){
            let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
            data={"searchUserId":p.userId,"sessionType":"2"}
            vm.searchDetailsYfdData=data;
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

