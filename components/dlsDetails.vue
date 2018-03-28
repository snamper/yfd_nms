
<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .addList{border: 1px solid #ccc;min-height: 100px;padding: 10px;background: white}    
</style>
<template>
  <div>
      <div v-if="off.noStaffd">
        <div class="yfd">
                <el-container>
                    <el-header style="margin-right:1%;margin-left:1%;border-bottom: 1px solid #ccc;padding-top:6px;height:50px;">
                        <el-row>
                            <el-col :span="10"><div class="grid-content bg-purple">公司名称&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{company}}</span></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">联系人&nbsp;&nbsp;:&nbsp;&nbsp;<span >{{managerName}}</span></div></el-col>
                            <el-col :span="4"><div class="grid-content bg-purple">手机号码&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{managerPhone}}</span></div></el-col>
                            <el-col :span="4"><div class="grid-content bg-purple-light fr"><a href="javascript:void(0)" @click="goBack()">返回列表</a></div></el-col>
                        </el-row>
                    </el-header>
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle">搜索条件</div></el-col>
                </el-row>
                <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                    <el-col :span="18">
                        <el-input v-model="name" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                    </el-col>
                    <el-col :span="2">
                        
                    </el-col> 
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                    <el-col :span="18">
                        <el-input v-model="phone" size="small" placeholder="请输入查询的手机号码"></el-input>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :span="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                    <el-col :span="18">
                        <el-radio v-model="radio"  label="1,2" >全部</el-radio>
                        <el-radio v-model="radio"  label="1" >正常</el-radio>
                        <!-- <el-radio v-model="radio"  label="3" >离线</el-radio> -->
                        <el-radio v-model="radio"  label="2" >黑名单</el-radio>
                        <!-- <el-radio v-model="radio"  label="2" >注销</el-radio> -->
                    </el-col>
                    <el-col :span="2"></el-col> 
                </div></el-col>
            </el-row>
            <el-row style="text-align:center" class="marginTop">
                <button class="searchBtn" type="danger" @click="search()">搜索</button>
            </el-row>
        </el-container>
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
                用户姓名:<el-input style="width:25%" size="mini" v-model="list[i].a" placeholder="请输入内容"></el-input>
                手机号码:<el-input style="width:25%" size="mini" v-model="list[i].b" placeholder="请输入内容"></el-input>
                职务:<el-checkbox v-model="list[i].checked">采购员</el-checkbox><el-checkbox v-model="list[i].checked2">业务员</el-checkbox>
            </div>
        </div>
        <!-- 代理商员工查询结果 -->
        <div class="listTitleFoot">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple">员工列表</div></el-col>
            </el-row>        
        </div>
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td></td>
                    <td>序号</td>
                    <td>用户姓名</td>
                    <td>手机号码</td>
                    <td>创建时间</td>
                    <td>职务</td>
                    <td>当前状态</td>
                    <td>最后登录时间</td>
                </tr>
                <tr v-for="(v,i) of lists" :key="i">
                    <td>
                        <el-checkbox v-model="v.ischecked" ></el-checkbox>
                    </td>
                    <td>
                        {{((p-1)*10+(i+1))}}
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
                       <span v-if="v.userState==1">正常</span>
                       <span v-if="v.userState==2">黑名单</span>
                       <span v-if="v.userState==3">注销</span>
                    </td>
                    <td >
                       {{new Date(v.lastLoginTime).toLocaleString()}}
                    </td>
                </tr>
                <tr>
                    <td colspan="8">
                       <span class="fl">选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 正常 </a>-<a href="javascript:void(0)" @click="doFilter('off')"> 注销 </a>-<a href="javascript:void(0)" @click="doFilter('black')"> 黑名单 </a></span>
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
                <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div>
            </el-col>
            </el-row>
        </div>
        <!-- 代理商员工操作模块 -->
        <div v-if="off.modify">
            <div class="listTitleFoot">
                <p style="text-align:right">将已选择内容{{a}}</p>
            </div>
            <div class="listTitleFoot">
                <el-input v-model="reason" size="small" placeholder="请输入原因，不能为空"></el-input>
            </div> 
            <div class="listTitleFoot">
                <p style="text-align:right">验证号码:{{user.userId}}
                    <el-input v-model="authCode" size="mini" style="width:26%" placeholder="请输入内容"></el-input>
                    <el-button size="mini" type="primary" @click="getAuthCode()">发送验证码</el-button>
                </p> 
            </div> 
            <div class="listTitleFoot">
                <p style="float:right">
                    <el-button type="success" @click="btnYes()" >确定</el-button>
                </p>
            </div>
       </div>
      </div> 
      <!-- 代理商员工个人详情和编辑模块 -->
      <dlsStaff v-if="off.staffD" :forms="searchRes">

      </dlsStaff>
    </div>  
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import {requestMethod} from "../src/config/service"; 
import { getDateTime,getUnixTime,errorDeal } from "../src/config/utils";
import search from "./search";
import dlsStaffDetails from "./dlsStaffDetails";
export default{
    name:'dlsDetails',
    props:{lists:Array},
    data (){
        return {
            a:'',//操作内容
            forms:"",
            headUserName:"",
            headPhone:"",
            searchRes:"",
            companyName:"",//..
            managerName:"",//..
            managerPhone:"",//..
            name:'',
            phone:'',
            radio:'1',
            checked:true,
            checked2:true,
            reason:'',//操作原因
            authCode:"",//验证码
            item:'',
            doUrl:'',//强制离线，加入黑名单，解除黑名单，删除
            form:{
                page:0,
            },
            list: [{a: '', b: '',checked:false,checked2:false},]
            ,off:{
                addList:false,
                noStaffd:true,
                staffD:false,
                modify:false
            }
        }
    },
    components:{
        "common-search":search,
        "dlsStaff":dlsStaffDetails
    },
    created:function(){
        let vm=this,userInfo=localStorage.getItem("KA_ECS_USER");
        vm.p=1;
        let Info=JSON.parse(userInfo);
        vm.user=Info;        
        vm.form.page=vm.lists.length/10;
        vm.company=vm.$parent.companyName;
        vm.managerPhone=vm.$parent.managerPhone;
        vm.managerName=vm.$parent.managerName;
    },
    methods:{
        goBack(){//返回上级
            let vm=this;
            vm.$parent.off.dlsDetails=false;
            vm.$parent.off.notDlsDetails=true;
        },   
         AddList(){//添加员工状态操作
            this.list.push({a: '', b: '',checked:false,checked2:false})
        },
        AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let data={"newUsers":[],authCode:''},url='/yfd-ums/w/user/addUsers',vm=this;
            for(let i=0;i<this.list.length;i++){
               if(this.list[i].a&&this.list[i].b&&this.list[i].checked||this.list[i].checked2){
                  this.list[i].username=this.list[i].a;
                  this.list[i].phone=this.list[i].b;
                  if(this.list[i].checked&&!this.list[i].checked2){
                      this.list[i].userRole='1'
                  }else if(!this.list[i].checked&&this.list[i].checked2){
                      this.list[i].userRole='2'
                  }else if(this.list[i].checked&&this.list[i].checked2){
                      this.list[i].userRole='1,2'
                  }
                  this.list[i].departName=vm.company;
                  delete this.list[i].a;
                  delete this.list[i].b;
                  delete this.list[i].checked;
                  delete this.list[i].checked2;
                  data.newUsers.push(this.list[i])
               }
            }
            let load=Loading.service(options);
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    layer.open({
                        content:'操作成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
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
            }).catch(e=>errorDeal(e))
        }
        ,doFunction(val){
            let vm=this,data={"operateUserIds":[]},url='',che='';
            for(let v in vm.lists){
                if(vm.lists[v].ischecked==true){
                    data.operateUserIds.push(vm.lists[v].username);
                    che+=vm.lists[v].username+',';
                    vm.off.modify=true;
                }else{
                    layer.open({
                        content:'请选择要操作的用户',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    vm.off.modify=false;
                }
            }
            if(val=='offLine'){
                vm.doUrl="/yfd-ums/w/user/kickoutUsers";
                vm.a=che+"强制离线";
            }else if(val=='addBlack'){               
                vm.doUrl="/yfd-ums/w/user/blacklistUsers";
                vm.a=che+"加入黑名单";
            }else if(val=='cancelBlack'){              
                vm.doUrl="/yfd-ums/w/user/unblacklistUsers";
                vm.a=che+"解除黑名单";
            }else if(val=='delete'){
                 vm.doUrl="/yfd-ums/w/user/delUsers";
                 vm.a=che+"删除";
            }
        }
        ,doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.lists.length;v++){
                    this.$set(this.lists[v],'ischecked',true);
                }
            }else if(s=="off"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].userState==2){
                       this.$set(this.lists[v],'ischecked',true);
                    }else{
                       this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }else if(s=="on"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].userState==1){
                        this.$set(this.lists[v],'ischecked',true);
                    }else{
                         this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }else if(s=="black"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].userState==3){
                        this.$set(this.lists[v],'ischecked',true);
                    }else{
                         this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }
        }
        ,getAuthCode(){
            let load=Loading.service(options),data={},url='/yfd-ums/w/user/getAuthCode',vm=this;
            data={"phone":vm.user.userId}
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    layer.open({
                        content:'验证码发送成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
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
            }).catch(e=>errorDeal(e));
        }
        ,search(p){//查询
            let data={},url='/yfd-ums/w/user/userSearch',vm=this,load=Loading.service(options);
            data={
                "username":vm.name
                ,"phone":vm.phone
                ,"userstate":vm.radio
                ,"pageSize":10
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                vm.off.dlsList=true;
                vm.$parent.detailsList=data.data.users;
                if(data.code==200){
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        }
        ,getStaffDetails(p){
            let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
            data={"searchUserId": "15684765209"}
            requestMethod(data,url)
            .then((data)=>{
                vm.off.noStaffd=false;
                vm.off.staffD=true;
                vm.searchRes=data.data;
                if(data.code==200){
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        } 
        ,btnYes(){
            let data={},vm=this;
                for(let v in vm.searchList){
                    if(vm.searchList[v].ischecked==true){
                            data.operateUserIds.push(vm.searchList[v])
                    }
            }
            if(vm.reason==""){
                layer.open({
                    content:'请输入操作原因',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            if(vm.authCode==""){
                layer.open({
                    content:'请输入验证码',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            let load=Loading.service(options);
            data.reason=vm.reason;//操作原因
            data.authCode=vm.item;
            requestMethod(data,vm.doUrl)
            .then((data)=>{
                console.log(data)
                if(data.code==200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
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
            }).catch(e=>errorDeal(e));
        }
    }
}
</script>

