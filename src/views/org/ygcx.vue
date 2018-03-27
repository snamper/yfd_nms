
<style scoped>
 .listTitleFoot{width: 96%;margin: 10px 18px;}
</style>
<template>
  <div>
    <div class="ygcx greyFont">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" size="mini" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">在线</el-radio>
                    <el-radio v-model="radio"  label="3">离线</el-radio>
                    <el-radio v-model="radio"  label="4">黑名单</el-radio>
                    <el-radio v-model="radio"  label="5">已删除</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search('staff')">搜索</button>
        </el-row>
    </div>
    <div v-if="off.searchList">
        <div class="listTitleFoot">
            <p>代理商列表</p>
        </div>
		<div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td>序号</td>
                    <td>用户姓名</td>
                    <td>手机号码</td>
                    <td>公司名称</td>
                    <td>创建时间</td>
                    <td>职务</td>
                    <td>当前状态</td>
                    <td>最后登录时间</td>
                </tr>
                <tr v-for="(v,i) of searchList" :key="i">
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       <a href="javascript:void(0)" @click="getDetails(v.color)">查看详情</a>
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
                    <!-- <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div> -->
                </el-col>
            </el-row>
        </div> 
  </div>
  </div>	 
</template>
<script>
const options={text:"正在加载"}
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils.js";
import search from "../../../components/search";
export default{
	data (){
		return {
            name:'',
            phone:'',
            radio:'2',
            ix:[{color:'red1',age:18,sex:'girl'},{color:'red2',age:18,sex:'girl'},{color:'red3',age:18,sex:'girl'},{color:'red4',age:18,sex:'girl'}],            
			off:{
                showSearch:"",
                searchList:false,
			},
			form:{
			
			},
		}
	},
	components:{
		"common-search":search,
	},
	created:function(){
       
    },
	methods:{
        search(p){//查询
            let load=Loading.service(options) ,data={},url='',vm=this;
            data={
                "startTime":getUnixTime(vm.startTime)
                ,"endTime":getUnixTime(vm.endTime)
                ,"timeType":vm.timeType
                ,"cname":vm.cname
                ,"name":vm.name
                ,"phone":vm.phone
                ,"radio":vm.radio
                ,"pageSize":10
                ,"pageNum":p||1}
            url="abc";
            requestMethod(data,url)
            .then((data)=>{
                vm.off.searchList=true;
                vm.searchList=vm.ix;
                if(data.code==200){
                    
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        },
        getDetails(v){
            
        }
	}
}
</script>

