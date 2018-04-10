
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
                            <el-col :span="10"><div class="grid-content bg-purple">公司名称&nbsp;&nbsp;:&nbsp;&nbsp;<span  style="color:blue">{{company}}</span></div></el-col>
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
            <el-col style="float:right" :span="2"><div class="grid-content bg-purple-light"><el-button type="success" @click="AddStaffDiv()" size="mini" v-if="user.userRole!=2&&user.userRole!=3">添加员工</el-button></div></el-col>
        </el-row>
        <div class="listTitleFoot addList" v-if="off.addList">
            <div style="float:right">
                <button @click="AddList()" style="display:block" class="buttonAddStaff">增加一行</button>
                <button @click="AddStaff()" class="buttonAddStaff">确定添加</button>
            </div>
            <div v-for="(v,i) in list" :key="i" class="mt8">
                用户姓名 : <el-input style="width:25%" size="mini" maxlength=10 v-model="list[i].username" placeholder="请输入内容"></el-input>
                &nbsp;&nbsp;&nbsp;手机号码 : <el-input style="width:25%" size="mini" maxlength=11 v-model="list[i].phone" placeholder="请输入内容"></el-input>
                &nbsp;&nbsp;&nbsp;职务 : <el-checkbox v-model="list[i].checked">采购员</el-checkbox><el-checkbox v-model="list[i].checked2">业务员</el-checkbox>
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
                <tr>
                    <td colspan="8">
                       <span class="fl">选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 取消全选 </a></span>
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
            <el-col :span="12">
                <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div>
            </el-col>
            </el-row>
        </div>
        <!-- 代理商员工操作模块 -->
        <div v-if="off.modify">
            <div class="listTitleFoot">
                <p style="text-align:right;font-size:14px" class="redFont" >将已选择内容{{a}}</p>
            </div>
            <div class="listTitleFoot">
                <el-input v-model="reason" size="small" :maxlength="20" placeholder="请输入原因，字数限制20个字符，必填"></el-input>
            </div> 
            <div class="listTitleFoot">
                <p style="text-align:right">验证号码:{{user.phone}}
                    <el-input v-model="authCode" size="mini" style="width:26%" placeholder="请输入验证码"></el-input>
                    <el-button size="mini" type="primary" @click="getAuthCode()">发送验证码</el-button>
                </p> 
            </div> 
            <div class="listTitleFoot">
                <p style="float:right">
                    <el-button type="success" size="small" @click="btnYes()" >确定</el-button>
                </p>
            </div>
       </div>
      </div> 
      <!-- 代理商员工个人详情和编辑模块 -->
      <dlsStaff v-if="off.staffD" :forms="searchRes"></dlsStaff>
      <common-layer v-if="off.layer"></common-layer>
    </div>  
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import {requestMethod} from "../src/config/service"; 
import { getDateTime,getUnixTime,errorDeal } from "../src/config/utils";
import search from "./search";
import dlsStaffDetails from "./dlsStaffDetails";
import layers from "./layeruser";
export default{
    name:'dlsDetails',
    props:{lists:Array},
    data (){
        return {
            currentPage:0,//当前页
            a:'',//操作内容
            forms:"",
            searchRes:"",
            companyName:"",//..
            managerName:"",//..
            managerPhone:"",//..
            name:'',
            phone:'',
            radio:'1,2',
            checked:true,
            checked2:true,
            reason:'',//操作原因
            authCode:"",//验证码
            doUrl:'',//强制离线，加入黑名单，解除黑名单，删除
            addAble:'0',
            addUsersData:'',//添加员工信息
            searchType:0,//
            searchDepartId:'',//部门Id
            doAble:'0',
            searchStaffInfo:'',//员工信息
            form:{
                page:0,
            },
            list: [{username: '', phone: '',checked:false,checked2:false},]
            ,off:{
                addList:false,
                noStaffd:true,
                staffD:false,
                modify:false,
                layer:false,
                sync:false,
                userAdd:false
            }
        }
    },
    components:{
        "common-search":search,
        "dlsStaff":dlsStaffDetails,
        "common-layer":layers,
    },
    created:function(){
        let vm=this,userInfo=localStorage.getItem("KA_ECS_USER");
        let Info=JSON.parse(userInfo);
        vm.user=Info;        
        vm.searchType=vm.$parent.searchDetailsType;
        vm.searchDepartId=vm.$parent.searchDepartId;
        vm.pa=1;
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
            this.$parent.search(vm.$parent.pa);
        },   
         AddList(){//添加员工状态操作
            this.list.push({username: '', phone: '',checked:false,checked2:false})
        },
        AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let vm=this, data={"newUsers":[]};
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].checked==true||this.list[i].checked2==true){
                    if(this.list[i].checked==true&&this.list[i].checked2==false){
                        this.list[i].userRole='4'
                    }else if(this.list[i].checked==false&&this.list[i].checked2==true){
                        this.list[i].userRole='5'
                    }else if(this.list[i].checked==true&&this.list[i].checked2==true){
                        this.list[i].userRole='4,5'
                    }
                    this.list[i].departName=vm.company;
                    delete this.list[i].checked;
                    delete this.list[i].checked2;
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
            // requestMethod(data,url)
            // .then((data)=>{
            //     if(data.code==200){
            //         layer.open({
            //             content:'操作成功',
            //             skin: 'msg',
            //             time: 2,
            //             msgSkin:'success',
            //         });
            //         this.search();   
            //         for(let i=0;i<this.list.length;i++){
            //            this.list=[],
            //            this.list.push({username: '', phone: '',checked:false,checked2:false})
            //         }
            //     }else{
            //         //    this.list[i].username="",
            //         //    this.list[i].phone="",
            //         //    this.list[i].checked=false,
            //         //    this.list[i].checked2=false
            //            this.list=[],
            //            this.list.push({username: '', phone: '',checked:false,checked2:false})
            //         layer.open({
            //             content:data.msg,
            //             skin: 'msg',
            //             time: 2,
            //             msgSkin:'error',
            //         });
            //     }  
            // }).then(()=>{
            //     load.close();
            // }).catch(e=>errorDeal(e))
        }
        ,doFunction(val){
            let vm=this,data={"operateUserIds":[]},url='',che='';vm.off.modify=false;
            for(let v in vm.lists){
                if(vm.lists[v].ischecked==true){
                    data.operateUserIds.push(vm.lists[v].username);
                    che+=vm.lists[v].username+',';
                    vm.off.modify=true;
                }
            }
            if(vm.off.modify==false){
                layer.open({
                    content:'请选择要操作的用户',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
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
            }else if(s=="on"){
                for(let v=0;v<this.lists.length;v++){
                    this.$set(this.lists[v],'ischecked',false);
                }
            }
        }
        ,getAuthCode(){
            let load=Loading.service(options),data={},url='/yfd-ums/w/user/getAuthCode',vm=this;
            data={"phone":vm.user.phone}
            // data={"phone":15684765209}
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
            let vm=this,data={},url='/yfd-ums/w/user/getDepartDetail',load=Loading.service(options);
            data={'searchDepartId':vm.$parent.searchDepartId,userState:vm.radio,username:vm.name,phone:vm.phone,pageNum:p||1,pageSize:"10"};
            requestMethod(data,url)
            .then((data)=>{
                load.close();
                if(data.code==200){
                    if(data.data.users.length>0){
                        vm.$parent.off.notDlsDetails=false;
                        vm.$parent.off.dlsDetails=true;
                        vm.$parent.detailsList=data.data.users;
                        vm.$parent.headUserName=data.data.users[0].username;
                        vm.$parent.headPhone=data.data.users[0].phone;
                    }else{
                        vm.$parent.off.notDlsDetails=false;
                        vm.$parent.off.dlsDetails=true;
                        vm.$parent.detailsList=[];
                        vm.$parent.detailsList.username='';
                        vm.$parent.detailsList.phone='';
                    }
                }else{
                    errorDeal(data);
                }
            }).catch(e=>errorDeal(e));
        }
        ,getStaffDetails(p){
            let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
            vm.searchStaffInfo=p;
            data={"searchUserId":p.userId,"sessionType":"2"}
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
            let data={'operateUserIds':[]},vm=this;
            for(let v in vm.lists){
                if(vm.lists[v].ischecked==true){
                    data.operateUserIds.push(vm.lists[v].userId)
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
            data.authCode=vm.authCode;
            requestMethod(data,vm.doUrl)
            .then((data)=>{
                vm.off.modify=false;
                vm.reason="";
                vm.authCode="";
                if(data.code==200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });

                    if(this.searchType!=1){
                        this.search();
                    }else if(this.searchType==1){
                        let vm=this,data={},url='/yfd-ums/w/user/getDepartDetail',load=Loading.service(options);
                        vm.searchDetailsType=1;
                        vm.searchDepartId=vm.$parent.searchDepartId;
                        data={'searchDepartId':vm.$parent.searchDepartId,userState:vm.radio,username:vm.name,phone:vm.phone,pageNum:1,pageSize:"10"};
                        // vm.companyName=v.departName;
                        // vm.managerName=v.managerName;
                        // vm.managerPhone=v.phone;
                        requestMethod(data,url)
                        .then((data)=>{
                            load.close();
                            if(data.code==200){
                                if(data.data.users.length>0){
                                    vm.$parent.off.notDlsDetails=false;
                                    vm.$parent.off.dlsDetails=true;
                                    vm.$parent.detailsList=data.data.users;                                    
                                }else{
                                    vm.$parent.off.notDlsDetails=false;
                                    vm.$parent.off.dlsDetails=true;
                                    vm.$parent.detailsList=data.data.users;
                                }
                            }else{
                                errorDeal(data);
                            }
                        }).catch(e=>errorDeal(e));
                    } 
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

