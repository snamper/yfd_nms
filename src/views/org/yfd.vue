<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .addList{border: 1px solid #ccc;min-height: 100px;padding: 10px;background: white}
</style>
<template>
  <div>
        <!-- 查询功能模块 -->
        <div class="yfd greyFont" >
            <el-container>
            <el-header style="margin-right:1%;margin-left:1%;border-bottom: 1px solid #ccc;padding-top:18px;height:50px;">公司名称&nbsp;&nbsp;:&nbsp;&nbsp;<span class="deepBlue">亚飞达</span></el-header>
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
            </el-row>
            <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">用户姓名：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" maxlength=10 size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" maxlength=11 size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class=" grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">在线</el-radio>
                    <el-radio v-model="radio"  label="3">离线</el-radio>
                    <el-radio v-model="radio"  label="4">黑名单</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search('yfd')">搜索</button>
        </el-row>
    </el-container>
    </div>
        <!-- 添加员工功能模块 -->
        <el-row>
            <el-col style="float:right" :span="2"><div class="grid-content bg-purple-light"><el-button type="success" @click="AddStaffDiv()" size="mini">添加员工</el-button></div></el-col>
        </el-row>
	    <div class="listTitleFoot addList" v-if="off.addList">
            <div style="float:right">
                <button @click="AddList()" style="display:block" class="buttonAddStaff">增加一行</button>
                <button @click="AddStaff()" class="buttonAddStaff">确定添加</button>
            </div>
            <div v-for="(v,i) in list" :key="i" class="mt8">
                用户姓名:<el-input style="width:25%" size="mini" v-model="list[i].username" placeholder="请输入内容"></el-input>
                手机号码:<el-input style="width:25%" size="mini" v-model="list[i].phone" placeholder="请输入内容"></el-input>
                职务:<el-checkbox v-model="list[i].checked">采购员</el-checkbox><el-checkbox v-model="list[i].checked2">业务员</el-checkbox>
            </div>
        </div>
        <!-- 查询结果 员工列表 -->
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
         <!--操作编辑模块  -->
        <div v-if="off.modify">
            <div class="listTitleFoot">
                <p style="text-align:right">将已选择内容{{a}}</p>
            </div>
            <div class="listTitleFoot">
                <el-input v-model="reason" size="small" placeholder="请输入原因，不能为空"></el-input>
            </div> 
            <div class="listTitleFoot">
                <p style="text-align:right">验证号码:aaaaaa2223333
                    <el-input v-model="item" size="small" style="width:26%" placeholder="请输入内容"></el-input>
                    <el-button size="small" type="primary" @click="getAuthCode()">发送验证码</el-button>
                </p> 
            </div> 
            <div class="listTitleFoot">
                <p style="float:right">
                    <el-button type="success" @click="btnYes()">确定</el-button>
                </p>
            </div>
        </div>
	</div>	 
</template>
<script>
const options={text:"正在加载"}
import { Loading } from 'element-ui';
import { getDateTime,getUnixTime,errorDeal,deepCopy } from "../../config/utils.js";
import search from "../../../components/search";
import { requestMethod } from '../../config/service';
import layerVue from '../../../components/layer.vue';
export default{
	data (){
		return {
            addAble:'',//员工可添加
            pa:"",//页码
            phone: "",
            name: "",
            radio: "2",//当前状态
            a:'',
            item:'',
            reason:'',
            checked:'',
            c:false,
            childWords:'',
            searchRes:'',
			off:{
                searchList:false,
                modify:false,
                addList:false,
			},
			form:{
                page:1
            },
            list: [{username: '', phone: '',checked:false,checked2:false}],
            //ix:[],
            ix:[{color:'red11',age:18,sex:'girl',s:'off'},{color:'red22',age:18,sex:'girl',s:'on'},{color:'red33',age:18,sex:'girl',s:'black'},{color:'red44',age:18,sex:'girl',s:'on'}],      
            ix2:[],
		}
	},
	components:{
		"common-search":search,
	},
	created:function(){
        
    },
	methods:{
         AddStaffDiv(){//打开添加员工模块
            this.off.addList=!this.off.addList;
        }
        ,AddList(){//员工添加增加一行按钮
            this.list.push({username: '', phone: '',checked:true,checked2:false})
        },
        AddStaff(){//添加员工按钮
            let data={"newUsers":[],authCode:'123456'},url='/yfd-ums/w/user/addUsers',vm=this;
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username!=""&&this.list[i].phone!=""&&this.list[i].checked==true||this.list[i].checked2==true){
                    if(this.list[i].checked==true&&this.list[i].checked2==false){
                        this.list[i].userRole='1'
                    }else if(this.list[i].checked==false&&this.list[i].checked2==true){
                        this.list[i].userRole='2'
                    }else if(this.list[i].checked==true&&this.list[i].checked2==true){
                        this.list[i].userRole='1,2'
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
            let load=Loading.service(options);
            requestMethod(data,url)
            .then((data)=>{
                load.close();
                if(data.code==200){
                    layer.open({
                        content:'操作成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    for(let i=0;i<this.list.length;i++){
                       this.list[i].username="",
                       this.list[i].phone="",
                       this.list[i].checked=false,
                       this.list[i].checked2=false
                    }
                }else{
                    for(let i=0;i<this.list.length;i++){
                       this.list[i].username="",
                       this.list[i].phone="",
                       this.list[i].checked=false,
                       this.list[i].checked2=false
                    }
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }  
            }).catch(e=>errorDeal(e))
        },
        doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.searchRes.length;v++){
                    this.$set(this.searchRes[v],'ischecked',true);
                }
            }else if(s=="off"){
                for(let v=0;v<this.searchRes.length;v++){
                    if(this.searchRes[v].s=='off'){
                       this.$set(this.searchRes[v],'ischecked',true);
                    }else{
                       this.$set(this.searchRes[v],'ischecked',false);
                    }
                }
            }else if(s=="on"){
                for(let v=0;v<this.searchRes.length;v++){
                    if(this.ix[v].s=='on'){
                        this.$set(this.searchRes[v],'ischecked',true);
                    }else{
                         this.$set(this.searchRes[v],'ischecked',false);
                    }
                }
            }else if(s=="black"){
                for(let v=0;v<this.searchRes.length;v++){
                    if(this.ix[v].s=='black'){
                        this.$set(this.searchRes[v],'ischecked',true);
                    }else{
                         this.$set(this.searchRes[v],'ischecked',false);
                    }
                }
            }
        },
        doFunction(val){
            let vm=this,filter={};
            if(JSON.stringify(vm.searchRes).indexOf("true")>-1){
                vm.off.modify=true;
            }else{
                layer.open({
		            content:'选择要操作者',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
            }
            if(val=='offLine'){
                this.a="强制离线";
            }else if(val=='addBlack'){
                this.a="加入黑名单"
            }else if(val=='cancelBlack'){
                 this.a="解除黑名单"
            }else if(val=='delete'){
                 this.a="删除"
            }
        },
        search(p){
            let load=Loading.service(options) ,data={},url='/yfd-ums/w/user/userSearch',vm=this;
             vm.pa=p||1;
                data={
                "departName":'yfd',
                "username":vm.name
                ,"phone":vm.phone
                ,"userstate":vm.radio
                ,"pageSize":10
                ,"pageNum":p||1}
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchList=true;
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
        ,getDetails(){

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
        ,btnYes(){
             let load=Loading.service(options),data={"do":[]},url='',vm=this;
             for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    data.do.push(vm.searchList[v])
                }
            }
            data.reason=vm.vm.reason;
            data.authCode=vm.item;
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

