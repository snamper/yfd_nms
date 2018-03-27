
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
                        <el-col :span="6"><div class="grid-content bg-purple-light">联系人&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{lists[0].username}}</span></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple">手机号码&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{lists[0].phone}}</span></div></el-col>
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
                       {{v.userState}}
                    </td>
                    <td >
                       {{new Date(v.lastLoginTime).toLocaleString()}}
                    </td>
                </tr>
                <tr>
                    <td colspan="8" class="fl">
                        选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 在线 </a>-<a href="javascript:void(0)" @click="doFilter('off')"> 离线 </a>-<a href="javascript:void(0)" @click="doFilter('black')"> 黑名单 </a>
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
                <p style="text-align:right">验证号码:aaaaaa2223333
                    <el-input v-model="item" size="mini" style="width:26%" placeholder="请输入内容"></el-input>
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
      <dlsStaff v-if="off.staffD">

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
            conpany:"",
            name:'',
            phone:'',
            radio:'1',
            checked:true,
            checked2:true,
            reason:'',
            item:'',
            form:{
                page:0,
            },
            list: [{a: '', b: '',checked:false,checked2:true},]
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
        let vm=this;
        vm.p=1;
        vm.form.page=vm.lists.length/10;
        vm.company=vm.$parent.companyName;
        console.log(vm.$parent);
    },
    methods:{
        goBack(){
            let vm=this;
            vm.$parent.off.dlsDetails=false;
            vm.$parent.off.notDlsDetails=true;
        },   
         AddList(){
            this.list.push({a: '', b: '',checked:true,checked2:false})
        },
        AddStaffDiv(){
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let load=Loading.service(options),data={"newUsers":[],authCode:''},url='/yfd-ums/w/user/addUsers',vm=this;
            for(let i=0;i<this.list.length;i++){
               if(this.list[i].a&&this.list[i].b&&this.list[i].checked||this.list[i].checked2){
                  data.newUsers.push(this.list[i])
               }
            }
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
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
                }
            }
            console.log(typeof che);
            if(val=='offLine'){
                this.a="";
                data.remark="1";
                url="/yfd-ums/w/user/blacklistUsers";
                this.a=che+"强制离线";
                che="";
                requestMethod(data,url)
                .then((data)=>{
                    if(data.code==200){
                    }
                }).then(()=>{
                }).catch(e=>errorDeal(e))
            }else if(val=='addBlack'){
                this.a="";                
                data.remark="2";
                url="/yfd-ums/w/user/kickoutUsers";
                this.a=che+"加入黑名单";
                che=""
            }else if(val=='calcelBalck'){
                this.a="";                
                data.remark="3";
                url="/yfd-ums/w/user/unblacklistUsers";
                 this.a=che+"解除黑名单";
                 che=""
            }else if(val=='delete'){
                this.a="";                
                 data.remark="4";
                 url="/yfd-ums/w/user/delUsers";
                 this.a=che+"删除";
                 che=""
            }
        }
        ,doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.lists.length;v++){
                    this.$set(this.lists[v],'ischecked',true);
                }
            }else if(s=="off"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].s=='off'){
                       this.$set(this.lists[v],'ischecked',true);
                    }else{
                       this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }else if(s=="on"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].s=='on'){
                        this.$set(this.lists[v],'ischecked',true);
                    }else{
                         this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }else if(s=="black"){
                for(let v=0;v<this.lists.length;v++){
                    if(this.lists[v].s=='black'){
                        this.$set(this.lists[v],'ischecked',true);
                    }else{
                         this.$set(this.lists[v],'ischecked',false);
                    }
                }
            }
        }
        ,getAuthCode(){
            let load=Loading.service(options),data={},url='',vm=this;
            data={"phone":vm.phone}
            url="abc";
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
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
                vm.searchList=vm.ix;
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
                if(data.code==200){
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        } 
        ,btnYes(){
             let load=Loading.service(options),data={"do":[]},url='',vm=this;
             for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    data.do.push(vm.searchList[v])
                }
            }
            data.authCode=vm.item;
            console.log(data);
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        }
    }
}
</script>

