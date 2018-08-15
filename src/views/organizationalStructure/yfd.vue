
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
                <el-col :xs="16" :sm="14" :md="14" :lg="16" :xl="16">
                     <el-input v-model="name" :maxlength="10" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"></el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :xs="16" :sm="14" :md="14" :lg="16" :xl="16">
                     <el-input type="tel" v-model="phone" :maxlength="11" size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="5" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :xs="16" :sm="16" :md="14" :lg="16" :xl="16">
                    <el-radio v-model="radio"  label="1,2,3,4" >全部</el-radio>
                    <el-radio v-model="radio"  label="1" >正常</el-radio>
                    <el-radio v-model="radio"  label="2" >黑名单</el-radio>
                    <el-radio v-model="radio"  label="3,4" >注销</el-radio>
                </el-col>
                <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search()">搜索</button>
        </el-row>
    </div>
    <el-row>
        <el-col style="float:right" :xs="4" :sm="4" :md="4" :lg="2" :xl="2"><div class="grid-content bg-purple-light addStaffDiv" ><button  @click="AddStaffDiv()"  v-if="user.userRole!=2&&user.userRole!=3"> <span v-if="!off.addList"> 添加员工 </span><span v-if="off.addList"> 关闭 </span> </button></div></el-col>
    </el-row>
    <div class="m-addStaff-out">
        <div class="m-addStaff" v-if="off.addList">
            <div v-for="(v,i) in list" :key="i" style="width:100%">
                <b><span>用户姓名：</span><input v-model="list[i].username" placeholder="请输入用户姓名" :maxlength="10" class="u-input" type="text"></b>
                <b><span>手机号码：</span><input v-model="list[i].phone" placeholder="请输入手机号码" :maxlength="11" class="u-input" type="text"></b>
                <b><span>职务：</span>
                    <el-checkbox-group class="displayInline" v-model="list[i].role">
                        <el-checkbox label=1>管理员</el-checkbox>
                        <el-checkbox label=2>销售</el-checkbox>
                        <el-checkbox label=6>提卡客服</el-checkbox>
                        <el-checkbox label=7>开卡客服</el-checkbox>
                        <!--<el-checkbox label=3>店长</el-checkbox>
                        <el-checkbox label=4>采购员</el-checkbox>
                        <el-checkbox label=5>业务员</el-checkbox>-->
                    </el-checkbox-group>
                </b>
                <b><span @click="deleteLine(i)" class="u-icon-del"></span></b>
            </div>
            <div class="m-addStaff-btn">
                <div class="m-addStaff-btn-in">
                    <button @click="AddList()" >新增一条</button>
                    <button @click="AddStaff()">确定添加</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div v-if="off.searchList"> -->
    <div v-if="detailsList">
        <div >    
            <div class="listTitleFoot">
                <el-row>
                    <el-col style="height:35px;" :span="20"><div class="grid-content bg-purple"><h3>员工列表<span class="fontWeight greyFont"> ({{form.page||'0'}})</span></h3></div></el-col>
                </el-row>        
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr style="font-size:14px">
                        <td></td>
                        <td>序号</td>
                        <td>用户姓名</td>
                        <td>手机号码</td>
                        <td>创建时间</td>
                        <td>职务</td>
                        <td>当前状态</td>
                        <td>用户数据来源</td>
                        <td>最后登录时间</td>
                    </tr>
                    <tr v-for="(v,i) of detailsList" :key="i" :class="{'greyFont':v.departState==3}">
                        <td><el-checkbox v-model="v.ischecked"></el-checkbox></td>
                        <td>
                            {{((pa-1)*15+(i+1))}}
                        </td>
                        <td>
                            <p style="float:left;margin-left:36%">
                                <span v-for="(v,i) in v.userRole" :key="i">
                                    <img v-if="v==3" src="../../assets/images/icon/admin.svg" class="adminIcon">
                                </span>
                                {{v.username}}
                            </p>
                        </td>
                        <td>
                            <a class="textDec" @click="getStaffDetails(v)">{{v.phone}}</a>
                        </td>
                        <td>
                        <!-- {{new Date(v.createTime).toLocaleString()}} -->
                            <span v-if="v.createTime">
                                {{getDateTime(v.createTime)[6]}}
                            </span>
                            <span v-if="!v.createTime">
                                --
                            </span>
                        </td>
                        <td>
                            <span v-for="(x,i) in v.userRole.split(',')">
                                {{translateData('userRole',x)}} <span v-if="v.userRole.split(',').length-1>i">,</span>
                            </span>
                        </td>
                        <td>
                            {{translateData('userState',v.userState)}}
                        </td>
                        <td>
                            <span v-if="v.userOrigin==1">手动加入</span>
                            <span v-else-if="v.userOrigin==2">系统同步</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if="v.lastLoginTime">
                                {{getDateTime(v.lastLoginTime)[6]}}
                            </span>
                            <span v-if="!v.lastLoginTime">
                                --
                            </span>
                        </td>
                    </tr>
                    <tr v-if="detailsList.length==0">
                        <td class="tac" colspan="9">
                            暂无数据                            
                        </td>
                    </tr>
                    <tr v-if="detailsList.length>0">
                        <td colspan="9" class="pl20">
                        <span class="fl">选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 取消全选 </a></span>
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
                <el-col :span="12">
                    <div class="grid-content bg-purple-light fr operate">操作 :<button v-if="false"  @click="doFunction('offLine')">强制离线</button><button  @click="doFunction('addBlack')">加入黑名单</button><button  @click="doFunction('cancelBlack')">解除黑名单</button><button  @click="doFunction('delete')">删除</button></div>
                </el-col>
                </el-row>
            </div>
            <div v-if="off.modify" class="modifyStaffStateDiv">
                <div class="borderTopModifyStaffState"></div>
                <div class="listTitleFoot" style="height:20px;">
                    <p style="text-align:right;font-size:14px" class="redFont" >将已选择内容批量{{typeTitle}}</p>
                </div>
                <!-- <div class="listTitleFoot">
                    <el-input class="tar" v-model="reason" size="small" maxlength=20 placeholder="请输入原因，字数限制20个字符，必填"></el-input>
                </div>  -->
                <!-- <div class="listTitleFoot tar">
                    验证号码 : {{user.phone}}
                    <el-input v-model="authCode" size="mini" style="width:30%" placeholder="请输入验证码" :maxlength="6"></el-input>
                    <el-button size="mini" type="primary" @click="getAuthCode()" :disabled="btnDisabled">{{count}}</el-button>
                </div>  -->
                <div style="height:35px" class="listTitleFoot">
                    <p style="float:right">
                        <button class="buttonModifyYes"   @click="btnYes()">确定</button>
                    </p>
                </div>
        </div>
        </div>
      </div>
      </div>
      <staffDetails v-if="off.staffDetails" :forms="searchRes"></staffDetails>
      <layerConfirm v-if="off.layer" :layer="layerType" :operationType="operationType"></layerConfirm>      
  </div>	 
</template>
<script>
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getDateTime,getUnixTime,errorDeal,getStore,checkMobile,translateData } from "../../config/utils.js";
import layers from "./layerConfirmYfd";
import staffDetails from "../../components/staffDetails.vue";
export default{
	data (){
		return {
            user:'',//用户信息
            currentPage:0,//当前页面
            detailsList:'',
            name:'',
            phone:'',
            radio:'1,2,3,4',
            pa:'',
            searchDetailsYfdData:'',//查询人
            searchRes:"",
            list: [{username: '', phone: '',role:[]}],//添加员工  
            topDepartmentId:"",//顶级部门Id          
            btnDisabled:false,
            layerType:"",
            operationType:"",
            typeTitle:"",
            operationJson:"",
            doUrl:"",
			off:{
                showSearch:"",
                searchList:false,
                staffDetails:false,
                searchStaff:true,
                addList:false,
                layer:false,
                modify:false,
			},
			form:{
                page:1
			},
		}
	},
	components:{
        "staffDetails":staffDetails,
        "layerConfirm":layers,        
	},
	created:function(){
       let vm=this,Info=getStore("YFD_NMS_INFO");
       vm.user=Info;
       let depid=window.localStorage.getItem("departId");
       vm.topDepartmentId=depid;
    },
	methods:{
        AddList(){//添加员工
            this.list.push({username: '', phone: '',role:[]})
        },AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },deleteLine(v){//添加员工删除行
            let vm=this;
            if(vm.list.length<=1){
                return false;
            }
            vm.list.splice(v,1);
        },AddStaff(){//添加员工按钮
            let data={"newUsers":[]},vm=this; 
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].role.length!=0){
                    checkMobile(this.list[i].phone,()=>{return false});
                    this.list[i].userRole = this.list[i].role.join(',');
                    this.list[i].departId=vm.topDepartmentId;
                    this.list[i].userHierachy=1;
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
            this.layerType='operationStaff';
            this.addUsersData=data;
        },
        search(p){//查询
            let data={},url='/ums/w/user/getDepartDetail',vm=this;
            vm.pa=p||1;
            vm.currentPage=p||1;
            this.$router.push({name:'yfd',params:{type:"yfdList"}});
            if(vm.phone!=''){
                checkMobile(vm.phone,function(){vm.off.searchList=false;vm.form.page="";vm.detailsList="";return false});
            }
            data={
            "searchDepartId":"1803160000",
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
            }).then(()=>{
                for(let v=0;v<vm.detailsList.length;v++){
                    vm.$set(vm.detailsList[v],'ischecked',false);
                }
                this.resetTimer()
            }).catch(e=>errorDeal(e,()=>{vm.off.searchList=false;vm.form.page="";vm.detailsList="";}));            
        },getStaffDetails(p){
            let data={},url='/ums/w/user/getUserDetail',vm=this;
            data={"searchUserId":p.userId,"sessionType":"2"}
            vm.searchDetailsYfdData=data;
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchStaff=false;
                    vm.off.staffDetails=true;
                    vm.searchRes=data.data;
                }else{
                    errorDeal(data)
                }  
            }).catch(e=>errorDeal(e));
        },doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.detailsList.length;v++){
                    this.$set(this.detailsList[v],'ischecked',true);
                }
            }else if(s=="on"){
                for(let v=0;v<this.detailsList.length;v++){
                    this.$set(this.detailsList[v],'ischecked',false);
                }
            }
        },doFunction(val){
            let vm=this,data={"operateUserIds":[]},url='',che='';vm.off.modify=false;
            for(let v in vm.detailsList){
                if(vm.detailsList[v].ischecked==true){
                    data.operateUserIds.push(vm.detailsList[v].userId);
                    che+=vm.detailsList[v].username+",";
                    vm.off.modify=true;
                }
            }
            che=che.substring(0,che.length-1);
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
                vm.typeTitle=`强制离线(${che})`;
            }else if(val=='addBlack'){               
                vm.doUrl="/ums/w/user/blacklistUsers";
                vm.typeTitle=`加入黑名单(${che})`;
                vm.operationType="HMD";
            }else if(val=='cancelBlack'){              
                vm.doUrl="/ums/w/user/unblacklistUsers";
                vm.typeTitle=`解除黑名单(${che})`;
                vm.operationType="JC";
            }else if(val=='delete'){
                vm.doUrl="/ums/w/user/delUsers";
                vm.typeTitle=`删除(${che})`;
                vm.operationType="SC";
            }
            vm.operationJson=data;
            setTimeout(()=>{
               this.funScrollTop()
           },50)
        },getDateTime(v){
            return getDateTime(v);
        },
        funScrollTop(){
            let domdo=document.getElementById("main");
            let ch=document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight;
            let oh=domdo.scrollHeight;
            let och=oh-ch,
                och1=80;
            let st=document.getElementById("home").scrollTop;
            if(st==och){
                return false;
            }
            let timer=setInterval(()=>{
                if(och>och1){
                    och1+=10
                }else{
                    clearInterval(timer)
                }
                document.getElementById("home").scrollTop=och1;
            },20)
        },btnYes(){
            let vm=this;
            vm.off.layer=true;
            vm.layerType='addStaff';
            let data={'operateUserIds':[]};
            for(let v in vm.detailsList){
                if(vm.detailsList[v].ischecked==true){
                    data.operateUserIds.push(vm.detailsList[v].userId)
                }
            }
        },getAuthCode(){
            const TIME_COUNT = 120;
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
        },resetTimer(){
            this.btnDisabled=false;                        
            this.show = true;
            this.count="点击获取验证码"                    
            clearInterval(this.timer);
            this.timer = null;
        },translateData(v,i){
            return translateData(v,i);
        }
	}
}
</script>
<style scoped>
    .m-addStaff-out{width: 100%}
    .m-addStaff{margin: 0 auto;border: 1px solid #c0c4cc;min-height: 100px;padding: 10px;background: white;border-radius: 4px;width:98%}
    .m-addStaff b{height: 30px;display: inline-block;}
    .m-addStaff b span{display: inline-block;width: 65px;text-align: justify;text-align-last: justify}
    .m-addStaff b span.u-icon-del{width: 20px}
    .m-addStaff b input{border: 1px solid #E8E8E8;height: 30px;border-radius: 4px;width: 80%;padding-left: 2%}
    .m-addStaff-btn button{width: 70px;height: 25px;border-radius: 4px;outline:none;color: #fff;font-size: 14px}
    .m-addStaff-btn button:nth-child(1){background: #00AA01;border: 1px solid #00AA01}
    .m-addStaff-btn button:nth-child(2){background: #193163;border: 1px solid #193163}
    .m-addStaff-btn button:active{box-shadow: 0 0 5px grey}
    .m-addStaff-btn-in{text-align: center;margin-top: 15px}
    @media screen and (min-width: 1400px){
        .m-addStaff b:nth-child(1){
            width: 30%
        }
        .m-addStaff b:nth-child(2){
            width: 30%
        }
        .m-addStaff b:nth-child(3){
            width: 35%
        }
    }
    @media screen and (min-width:1200px) and (max-width:1400px){
        .m-addStaff b input{width: 65%}
        .m-addStaff b:nth-child(1){
            width: 25%
        }
        .m-addStaff b:nth-child(2){
            width: 25%
        }
        .m-addStaff b:nth-child(3){
            width: 45%
        }
    }
    @media screen and (min-width:600px) and (max-width:1200px){
        .m-addStaff b input{width: 65%}
        .m-addStaff b:nth-child(1){
            width: 45%
        }
        .m-addStaff b:nth-child(2){
            width: 45%
        }
        .m-addStaff b:nth-child(3){
            margin-top: 10px;
            width: 90%
        }
    }
    @media screen and (max-width: 600px){
        .m-addStaff b:not(:first-child){
            margin-top: 10px;
        }
        .m-addStaff b:nth-child(1){
            width: 100%
        }
        .m-addStaff b:nth-child(2){
            width: 100%
        }
        .m-addStaff b:nth-child(3){
            width: 95%
        }
    }
    div.addStaffDiv button{border-radius:4px;padding:3px 10px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;} 
    div.operate button{ padding: 4px 10px;margin-left: 10px;border-radius: 4px;border: 1px solid rgb(212, 212, 212);border-top:1px solid rgb(189, 189, 189);outline: none; background: -webkit-radial-gradient(ellipse ,rgb(218, 218, 218,1), rgb(218,218,218,0)); background: -o-radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0)); background: -moz-radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0)); background: radial-gradient(ellipse ,rgb(218,218,218,1), rgb(218,218,218,0));}
    div.operate button:active{box-shadow: 0 0 5px grey}
    div.borderTopModifyStaffState{margin-left: 1%;width: 98%;border-top: 2px solid rgb(202, 202, 202)}
    div.modifyStaffStateDiv .buttonModifyYes{border-radius:4px;padding:5px 20px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
    div.modifyStaffStateDiv .buttonModifyYes:active{box-shadow: 0 0 5px green}
    div.addStaffDiv button{border-radius:4px;padding:3px 6px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
</style>

