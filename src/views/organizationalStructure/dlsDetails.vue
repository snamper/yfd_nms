<template>
  <div>
      <div v-if="off.searchStaff">
        <div class="yfd f-s-16">
                <el-container>
                    <el-header class="headTitleNav">
                        <el-row>
                            <el-col :xs="18" :sm="18" :md="18" :lg="10" :xl="10"><div class="grid-content bg-purple greyFont">公司名称&nbsp;&nbsp;:&nbsp;&nbsp;<span class="fcdb">{{company}}</span></div></el-col>
                            <el-col :xs="6" :sm="4" :md="4" :lg="6" :xl="6" class="hidden-md-and-down"><div class="grid-content bg-purple-light greyFont">联系人&nbsp;&nbsp;:&nbsp;&nbsp;<span class="fcb">{{managerName}}</span></div></el-col>
                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="hidden-md-and-down"><div class="grid-content bg-purple greyFont">手机号码&nbsp;&nbsp;:&nbsp;&nbsp;<span class="fcb">{{managerPhone}}</span></div></el-col>
                            <el-col :xs="6" :sm="6" :md="6" :lg="2" :xl="2"><div class="grid-content bg-purple-light fr"><a class="fcaqua" href="javascript:void(0)" @click="goBack()">返回列表</a></div></el-col>
                        </el-row>
                    </el-header>
                </el-container>                    
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle">搜索条件</div></el-col>
                </el-row>
                <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                    <el-col :xs="19" :sm="20" :md="18" :lg="18" :xl="18" :span="20">
                        <el-input v-model="name" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                    </el-col>
                </div></el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                    <el-col :xs="19" :sm="20" :md="18" :lg="18" :xl="18" :span="20">
                        <el-input v-model="phone" size="small" placeholder="请输入查询的手机号码"></el-input>
                    </el-col>
                </div></el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light greyFont">
                    <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                    <el-col :xs="19" :sm="21" :md="20" :lg="20" :xl="20" :span="20">
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
        </div>
        <el-row>
            <el-col style="float:right" :xs="4" :sm="4" :md="4" :lg="2" :xl="2"><div class="grid-content bg-purple-light addStaffDiv" ><button  @click="AddStaffDiv()"  v-if="user.userRole!=2&&user.userRole!=3"> <span v-if="!off.addList"> 添加员工</span><span v-if="off.addList">隐藏</span> </button></div></el-col>
        </el-row>
        <div class="listTitleFoot addList" v-if="off.addList">
            <el-row>
                <el-col :xs="18" :sm="18" :md="18" :lg="22" :xl="22" >
                    <div v-for="(v,i) in list" :key="i" class="mt8">
                        <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10"><span>用户姓名 : </span><el-input style="width:80%" size="small" :maxlength="10" v-model="list[i].username" placeholder="请输入内容"></el-input></el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10"><span>手机号码 : </span><el-input style="width:80%" size="small" :maxlength="11" v-model="list[i].phone" placeholder="请输入内容"></el-input></el-col>
                        <el-col :xs="20" :sm="20" :md="22" :lg="22" :xl="20">
                            <span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务 :  </span>
                            <el-checkbox-group class="displayInline" v-model="list[i].role">
                                <!--<el-checkbox label=1>管理员</el-checkbox>
                                <el-checkbox label=2>销售</el-checkbox>
                                <el-checkbox label=3>店长</el-checkbox>-->
                                <el-checkbox label=4>采购员</el-checkbox>
                                <el-checkbox label=5>业务员</el-checkbox>
                                <el-checkbox label=6>提卡客服</el-checkbox>
                                <el-checkbox label=7>开卡客服</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2"><span @click="deleteLine(i)" class="u-icon-del"></span></el-col>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="4" :md="4" :lg="2" :xl="2" >
                    <div style="float:right;">
                        <button @click="AddList()" style="display:block" class="buttonAddStaff">新增一条</button>
                        <button @click="AddStaff()" class="buttonAddStaff">确定添加</button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 代理商员工查询结果 -->
        <div class="listTitleFoot">
            <el-row>
                <p><h3>员工列表<span class="fontWeight greyFont">({{lists.length||'0'}})</span></h3></p>
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
                        <p style="float:left;margin-left:36%">
                            <span v-for="(v,i) in v.userRole" :key="i">
                                <img v-if="v==3" src="../../assets/images/icon/admin.svg" class="adminIcon">
                            </span>
                            {{v.username}}
                        </p>
                    </td>
                    <td >
                       <a class="textDec" @click="getStaffDetails(v)">{{v.phone}}</a>
                    </td>
                    <td >
                       <!-- {{new Date(v.createTime).toLocaleString()}} -->
                        <span v-if="v.createTime">
                            {{getDateTime(v.createTime)[6]}}
                        </span>
                        <span v-if="!v.createTime">
                            --
                        </span>
                    </td>
                    <td >
                        <span v-for="(v,i) in v.userRole.split(',')" :key="i">
                            {{translateData('userRole',v)}}
                        </span>
                    </td>
                    <td >
                       {{translateData('userState',v.userState)}}
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
                <tr v-if="lists.length==0">
                    <td class="tac" colspan="8">
                        暂无数据                            
                    </td>
                </tr>
                <tr v-if="lists.length>0">
                    <td colspan="8" class="pl20">
                       <span class="fl">选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 取消全选 </a></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="listTitleFoot" v-if="lists.length>0">
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
                <div class="grid-content bg-purple-light fr operate">操作 :<button v-if="false"  @click="doFunction('offLine')">强制离线</button><button  @click="doFunction('addBlack')">加入黑名单</button><button  @click="doFunction('cancelBlack')">解除黑名单</button><button  @click="doFunction('delete')">删除</button></div>
            </el-col>
            </el-row>
        </div>
        <!-- 代理商员工操作模块 -->
        <div v-if="off.modify" class="modifyStaffStateDiv">
            <div class="borderTopModifyStaffState"></div>
            <div class="listTitleFoot" style="height:20px;">
                <p style="text-align:right;font-size:14px" class="redFont" >将已选择内容批量{{a}}</p>
            </div>
            <div class="listTitleFoot">
                <el-input class="tar" v-model="reason" size="small" maxlength=20 placeholder="请输入原因，字数限制20个字符，必填"></el-input>
            </div> 
            <div class="listTitleFoot tar">
                验证号码:{{user.phone}}
                <!-- <el-input v-model="authCode" size="mini" style="width:26%" placeholder="请输入验证码"></el-input>
                <el-button size="mini" type="primary" @click="getAuthCode()">发送验证码</el-button> -->
                <el-input v-model="authCode" size="mini" style="width:30%" placeholder="请输入验证码" :maxlength="6"></el-input>
                <el-button size="mini" type="primary" @click="getAuthCode()" :disabled="btnDisabled">{{count}}</el-button>
            </div> 
            <div class="listTitleFoot">
                <p style="float:right">
                    <button class="buttonModifyYes"   @click="btnYes()">确定</button>
                </p>
            </div>
       </div>
      </div> 
      <!-- 代理商员工个人详情和编辑模块 -->
      <dlsStaff v-if="off.staffDetails" :forms="searchRes"></dlsStaff>
      <common-layer v-if="off.layer"></common-layer>
    </div>  
</template>
<script>
import {requestMethod} from "../../config/service"; 
import { getDateTime,getUnixTime,errorDeal,getStore,checkMobile,translateData } from "../../config/utils";
import staffDetails from "../../components/staffDetails.vue";
import layers from "./layeruser";
export default{
    name:'dlsDetails',
    props:{lists:Array},
    data (){
        return {
            btnDisabled:false,
            count:"点击获取验证码",            
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
            addUsersData:'',//添加员工信息
            searchType:0,//
            searchDepartId:'',//部门Id
            doAble:'0',
            searchStaffInfo:'',//员工信息
            searchDetailsYfdData:'',
            form:{
                page:0,
            },
            list: [{username: '', phone: '',role:[]},]
            ,off:{
                addList:false,
                searchStaff:true,
                staffDetails:false,
                modify:false,
                layer:false,
                sync:false,
                userAdd:false
            }
        }
    },
    components:{
        "dlsStaff":staffDetails,
        "common-layer":layers,
    },
    created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
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
            this.list.push({username: '', phone: '',role:[]})
        },
        AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let vm=this, data={"newUsers":[]};
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].role.length!=0){
                    checkMobile(this.list[i].phone,()=>{return false});
                    this.list[i].userRole = this.list[i].role.join(',');
                    this.list[i].departId=vm.searchDepartId;
                    data.newUsers.push(this.list[i])
                }else{
                    layer.open({
                        content:'请填写完整的员工信息',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    return false;
                }
            }
            this.off.layer=true;
            this.off.sync=true;
            this.off.userAdd=true;
            this.addUsersData=data;
        }
        ,doFunction(val){
            let vm=this,data={"operateUserIds":[]},url='',che='';vm.off.modify=false;
            vm.off.modify=false;
            for(let v in vm.lists){
                if(vm.lists[v].ischecked==true){
                    if(vm.lists[v].userRole==3&&val=="delete"){
                        layer.open({
                            content:"不允许删除店长",
                            skin: 'msg',
                            time: 2,
                            msgSkin:'error',
                        });
                        vm.off.modify=false;
                        return false;
                    }
                    data.operateUserIds.push(vm.lists[v].username);
                    if(data.operateUserIds.length>1){
                        che+=`、`
                    }
                    che+=vm.lists[v].username;
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
                vm.doUrl="/ums/w/user/kickoutUsers";
                vm.a=`强制离线(${che})`;
            }else if(val=='addBlack'){               
                vm.doUrl="/ums/w/user/blacklistUsers";
                vm.a=`加入黑名单(${che})`;
            }else if(val=='cancelBlack'){              
                vm.doUrl="/ums/w/user/unblacklistUsers";
                vm.a=`解除黑名单(${che})`;
            }else if(val=='delete'){
                 vm.doUrl="/ums/w/user/delUsers";
                 vm.a=`删除(${che})`;
            }
        },doFilter(s){//状态过滤操作
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
            const TIME_COUNT = 900;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.btnDisabled=true;
                    this.count--;
                    } else {
                    this.btnDisabled=false;                        
                    this.show = true;
                    this.count="点击获取验证码"                    
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
            let data={},url='/ums/w/user/getAuthCode',vm=this;
            data={"phone":vm.user.phone}
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
            }).catch(e=>errorDeal(e));
        }
        ,search(p){//查询
            let  vm=this;
            if(this.phone!=''){
                checkMobile(this.phone,function(){return false});
            }
            let data={},url='/ums/w/user/getDepartDetail'
            data={'searchDepartId':vm.$parent.searchDepartId,userState:vm.radio,username:vm.name,phone:vm.phone,pageNum:p||1,pageSize:"10"};
            requestMethod(data,url)
            .then((data)=>{
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
            }).then(()=>{
                for(let v=0;v<vm.$parent.detailsList.length;v++){
                    vm.$set(vm.$parent.detailsList[v],'ischecked',false);
                }
                vm.off.modify=false;
                vm.reason="";
                vm.authCode="";
                this.resetTimer()
            }).catch(e=>errorDeal(e));
        }
        ,getStaffDetails(p){
            let data={},url='/ums/w/user/getUserDetail',vm=this
            vm.searchStaffInfo=p;
            data={"searchUserId":p.userId,"sessionType":"2"}
            vm.searchDetailsYfdData=data;
            requestMethod(data,url)
            .then((data)=>{
                vm.off.searchStaff=false;
                vm.off.staffDetails=true;
                vm.searchRes=data.data;
                if(data.code==200){
                }  
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
            data.reason=vm.reason;//操作原因
            data.authCode=vm.authCode;//验证码
            requestMethod(data,vm.doUrl)
            .then((data)=>{
                vm.reason="";
                vm.authCode="";
                vm.off.modify=false;
                if(data.code==200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    this.search(); 
                }else{
                     layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }
            }).catch(e=>errorDeal(e));
        },
        resetTimer(){
            this.btnDisabled=false;                        
            this.show = true;
            this.count="点击获取验证码"                    
            clearInterval(this.timer);
            this.timer = null;
        },getDateTime(v){
            return getDateTime(v);
        },deleteLine(v){
            let vm=this;
            if(vm.list.length<=1){
                return false;
            }
            vm.list.splice(v,1);
        },translateData(v,i){
            return translateData(v,i)
        }
    }
}
</script>
<style scoped>
    .addList{border: 1px solid #c0c4cc;min-height: 100px;padding: 10px;background: white;border-radius: 4px} 
    div.operate button{ padding: 4px 10px;margin-left: 10px;border-radius: 8px;border: 1px solid rgb(212, 212, 212);border-top:1px solid rgb(189, 189, 189);outline: none;
    background: -webkit-radial-gradient(ellipse ,rgb(218, 218, 218,1), rgb(218,218,218,0)); 
    background: -o-radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0)); 
    background: -moz-radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0));
    background: radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0));}
    div.operate button:active{box-shadow: 0 0 5px grey}
    div.borderTopModifyStaffState{margin-left: 1%;width: 98%;border-top: 2px solid rgb(202, 202, 202)}
    div.modifyStaffStateDiv .buttonModifyYes{border-radius:8px;padding:8px 30px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
    div.modifyStaffStateDiv .buttonModifyYes:active{box-shadow: 0 0 5px green}
    div.addStaffDiv button{border-radius:6px;padding:3px 10px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
</style>

