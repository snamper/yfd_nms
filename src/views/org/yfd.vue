<style scoped>
 .addList{border: 1px solid #c0c4cc;min-height: 100px;padding: 10px;background: white;border-radius: 4px}
 /* .addList span{display:inline-block;width:60px;} */
 /* table tr td{text-align: left;padding-left: 20px;}  */
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
                <el-col :xs="16" :sm="14" :md="14" :lg="16" :xl="16">
                     <el-input v-model="name" :maxlength="10" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                   
                </el-col> 
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
                    <el-radio v-model="radio"  label="1,2" >全部</el-radio>
                    <el-radio v-model="radio"  label="1" >正常</el-radio>
                    <el-radio v-model="radio"  label="2" >黑名单</el-radio>
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
        <el-col style="float:right" :xs="4" :sm="4" :md="4" :lg="2" :xl="2"><div class="grid-content bg-purple-light"><el-button type="success" @click="AddStaffDiv()" size="mini" v-if="user.userRole!=2&&user.userRole!=3"><span v-if="!off.addList">添加员工</span><span v-if="off.addList">隐藏</span></el-button></div></el-col>
    </el-row>
    <div class="listTitleFoot addList" v-if="off.addList">
        <el-row>
            <el-col :xs="18" :sm="18" :md="18" :lg="22" :xl="22" >
                <div v-for="(v,i) in list" :key="i" class="mt8">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><span>用户姓名 : </span><el-input style="width:80%" size="small" :maxlength="10" v-model="list[i].username" placeholder="请输入内容"></el-input></el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><span>手机号码 : </span><el-input style="width:80%" size="small" :maxlength="11" v-model="list[i].phone" placeholder="请输入内容"></el-input></el-col>
                    <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6"><span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务 :  </span><el-checkbox :xs="24"  v-model="list[i].checked2">管理员</el-checkbox><el-checkbox v-model="list[i].checked3">销售</el-checkbox></el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2"><span @click="deleteLine(i)" class="u-icon-del"></span></el-col>
                </div>
            </el-col>
            <el-col :xs="6" :sm="4" :md="4" :lg="2" :xl="2" >
                <div style="float:right;">
                    <button @click="AddList()" style="display:block" class="buttonAddStaff">增加一行</button>
                    <button @click="AddStaff()" class="buttonAddStaff">确定添加</button>
                </div>
            </el-col>
        </el-row>
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
                            <span v-for="(x,i) in v.userRole" :key="i">
                                <span v-if="x==1">管理员<b v-if="v.userRole.indexOf(2)>-1||v.userRole.indexOf(3)>-1||v.userRole.indexOf(4)>-1||v.userRole.indexOf(5)>-1">、</b></span><span v-if="x==2"><b v-if="v.userRole.indexOf(3)>-1||v.userRole.indexOf(4)>-1||v.userRole.indexOf(5)>-1">、</b>销售</span><span v-if="x==3">店长<b v-if="v.userRole.indexOf(4)>-1||v.userRole.indexOf(5)>-1">、</b></span><span v-if="x==4">采购员<b v-if="v.userRole.indexOf(5)>-1">、</b></span><span v-if="x==5">业务员</span>                                
                            </span>
                        </td>
                        <td>
                        <span v-if="v.userState==1">正常</span>
                        <span v-if="v.userState==2">黑名单</span>
                        <span v-if="v.userState==3">注销</span>
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
      <yfdStaff v-if="off.staffDetails" :forms="searchRes"></yfdStaff>
      <common-layer v-if="off.layer"></common-layer>      
  </div>	 
</template>
<script>
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getDateTime,getUnixTime,errorDeal,getStore,checkMobile } from "../../config/utils.js";
import layerAddStaff from "./layeruseryfd";
import staffDetails from "../../components/staffDetails.vue";
export default{
	data (){
		return {
            user:'',//用户信息
            currentPage:0,//当前页面
            detailsList:'',
            name:'',
            phone:'',
            radio:'1,2',
            pa:'',
            searchDetailsYfdData:'',//查询人
            searchRes:"",
            addAble:0,//是否可以添加
            list: [{username: '', phone: '',checked2:false,checked3:false,departName:"好亚飞达总部"},],//添加员工            
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
        "yfdStaff":staffDetails,
        "common-layer":layerAddStaff,        
	},
	created:function(){
       let vm=this,Info=getStore("YFD_NMS_INFO");
       vm.user=Info;
    },
	methods:{
         AddList(){//添加员工状态操作
            this.list.push({username: '', phone: '',checked2:false,checked3:false,departName:"好亚飞达总部"})
        },
        AddStaffDiv(){//添加员工模块开关
            this.off.addList=!this.off.addList;
        },
        AddStaff(){//添加员工按钮
            let data={"newUsers":[],authCode:''},vm=this;
            for(let i=0;i<this.list.length;i++){
                this.list[i].userRole="";
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].checked==true||this.list[i].checked2==true||this.list[i].checked3==true){
                    if(this.list[i].checked2==true){this.list[i].userRole='1'}
                    if(this.list[i].checked3==true){
                        if(this.list[i].checked2==true){
                            this.list[i].userRole+=',2'
                        }else if(this.list[i].checked2==false){
                            this.list[i].userRole='2'
                        }
                    }
                    data.newUsers.push(this.list[i])
                }
            }
            for(let i=0;i<data.newUsers.length;i++){
                delete data.newUsers[i].checked2;
                delete data.newUsers[i].checked3;
                this.addAble='1';                
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
            let data={},url='/ums/w/user/getDepartDetail',vm=this;
            vm.pa=p||1;
            vm.currentPage=p||1;
            if(vm.phone!=''){
                checkMobile(vm.phone,function(){return false});
            }
            data={
            "searchDepartId":"1803160000",
            "username":vm.name
            ,"phone":vm.phone
            ,"userState":vm.radio
            ,"pageSize":15
            ,"pageNum":p||1}
            let load=Loading.service(options);
            requestMethod(data,url,()=>{load.close()})
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
            }).catch(e=>errorDeal(e));            
        }
        ,getStaffDetails(p){
            let data={},url='/ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
            data={"searchUserId":p.userId,"sessionType":"2"}
            vm.searchDetailsYfdData=data;
            requestMethod(data,url,()=>{load.close()})
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchStaff=false;
                    vm.off.staffDetails=true;
                    vm.searchRes=data.data;
                }else{
                    errorDeal(data)
                }  
            }).catch(e=>errorDeal(e));
        },getDateTime(v){
            return getDateTime(v);
        },deleteLine(v){
            let vm=this;
            if(vm.list.length<=1){
                return false;
            }
            vm.list.splice(v,1);
        }
	}
}
</script>

