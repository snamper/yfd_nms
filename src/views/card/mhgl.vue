<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
</style>
<template>
<section>
  <div v-if="off.notCardDetails">
    <!-- 查询模块 -->
    <div class="dls">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">号包名称：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="packagename" size="mini" maxlength=15 placeholder="请输入号包名称"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" maxlength=10 placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">号包类型：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="cardType"  label="1">全部</el-radio>
                    <el-radio v-model="cardType"  label="2">整号段</el-radio>
                    <el-radio v-model="cardType"  label="3">靓号包</el-radio>
                    <el-radio v-model="cardType"  label="4">普号包</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" size="mini" maxlength=11 placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
       <el-row class="marginTop">
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="nowStatus"  label="1">全部</el-radio>
                    <el-radio v-model="nowStatus"  label="2">未上架</el-radio>
                    <el-radio v-model="nowStatus"  label="3">已上架</el-radio>
                    <el-radio v-model="nowStatus"  label="4">已售</el-radio>
                    <el-radio v-model="nowStatus"  label="5">已下架</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
           <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">运营商：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">移动</el-radio>
                    <el-radio v-model="radio"  label="3">联通</el-radio>
                    <el-radio v-model="radio"  label="4">电信</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="24"><div class="grid-content bg-purple-light">
                <el-col :span="2"><div class="grid-content bg-purple-dark textR inputTitle">运营商：</div></el-col>
                <el-col :span="18">
                    <el-checkbox-group v-model="checkedCities">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search()">搜索</button>
        </el-row>
      </div> 
      <div v-if="off.searchList">
        <div class="listTitleFoot">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple">员工列表</div></el-col>
            </el-row>        
        </div>
		<div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td colspan="10">
                        <el-row>
                        <!-- <el-col :span="7"><div class="grid-content bg-purple">
                            最后同步成功时间:<span></span>
                        </div></el-col>
                        <el-col :span="7"><div class="grid-content bg-purple-light">
                            下次同步成功时间:<span></span>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">
                            同步间隔时间:<span></span>
                            <el-button type="primary" size="mini" @click="openSet()">设置</el-button>
                        </div></el-col> -->
                        <el-col :span="24"><div class="fr grid-content bg-purple-light">
                            <el-button type="success" size="mini" @click="sync()">手动同步</el-button>
                        </div></el-col>
                        </el-row>
                    </td>
				</tr>
                <tr>
                    <td></td>
                    <td>序号</td>
                    <td>号包名称</td>
                    <td>号包类型</td>
                    <td>归属品牌</td>
                    <td>运营商</td>
                    <td>修改时间</td>
                    <td>操作人</td>
                    <td>手机号码</td>
                    <td>当前状态</td>
                </tr>
                <tr v-for="(v,i) of searchList" :key="i">
                    <td>
                         <el-checkbox v-model="v.ischecked" :checked="v.ischecked" ></el-checkbox>
                    </td>
                    <td>
                        {{((pa-1)*10+(i+1))}}
                    </td>
                    <td >
                       <a href="javascript:void(0)" @click="getDetails()">{{v.productName}}</a>
                    </td>
                    <td >
                       {{v.productType}}
                    </td>
                    <td >
                       {{v.brand}}
                    </td>
                    <td >
                       {{v.isp}}
                    </td>
                    <td >
                       {{v.nodifyTime}}
                    </td>
                    <td >
                       {{v.operatorName}}
                    </td>
                     <td >
                       {{v.operatorPhone}}
                    </td>
                    <td >
                       {{v.productState}}
                    </td>
                    <td v-show="false">
                        {{v.productId}}
                    </td>
                </tr>
                <tr>
                    <td colspan="10" style="text-align:left">
                        选择:<a href="javascript:void(0)" @click="doFilter('all')">全选</a>-<a href="javascript:void(0)" @click="doFilter('on')">已上架</a>-<a href="javascript:void(0)" @click="doFilter('noton')">未上架</a>-<a href="javascript:void(0)" @click="doFilter('off')">已下架</a>-<a href="javascript:void(0)" @click="doFilter('seal')">已售</a>
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
                <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFounction(1)">上架</el-button><el-button size="mini" @click="doFounction(2)">下架</el-button></div>
            </el-col>
            </el-row>
        </div>
    </div>
    <div v-if="off.modify">
        <div class="listTitleFoot">
            <p style="text-align:right">将已选择内容批量加入黑名单</p>
        </div>
        <div class="listTitleFoot">
            <el-input v-model="reason" placeholder="请输入原因，不能为空" size="small"></el-input>
        </div> 
        <div class="listTitleFoot">
            <p style="text-align:right">验证号码:aaaaaa2223333
                <el-input v-model="item" size="mini" style="width:30%" placeholder="请输入内容"></el-input>
                <el-button size="mini" type="primary" @click="getAuthCode()">获取验证码</el-button>
            </p> 
        </div> 
        <div class="listTitleFoot">
            <p style="float:right">
            <el-button type="success" size="small" @click="success()">确定</el-button>
            </p>
        </div>
    </div>    
	</div>
        <!-- 同步时间弹框 -->
    <common-layer v-if="off.layer"></common-layer>
        <!-- 代理商详情 -->
    <!-- <dls-Details v-if="off.dlsDetails"></dls-Details> -->
    <card-Details v-if="off.cardDetails"></card-Details>	 
</section>
</template>
<script>
import { Loading } from 'element-ui';
import { getDateTime,getUnixTime,errorDeal } from "../../config/utils.js";
import {requestMethod,requestMethod2} from "../../config/service.js"; 
import search from "../../../components/search";
import layer from "../../../components/layer";
import dlsDetails from "../../../components/dlsDetails";
import cardDetails from "../../../components/cardDetails";
const cityOptions = ['远特', '蜗牛', '迪信通', '极信','小米','海航','乐语','苏宁互联','国美','联想','蓝猫移动','长城'];
const options={text:"正在加载",}
export default{
	data (){
		return {
            userId:"",
            packagename:"",
            startTime: "",
            endTime: "",
            cname: "",
            cardType:"",
            nowStatus:"1",
            phone: "",
            name: "",
            radio: "2",
            cardType:"1",
            productType:"1",
            searchList:"",
            timeType:"a",
            checkedCities: [],
            cities: cityOptions,
            dourl:'',
            pa:'',
            ix:[{color:'red',age:18,sex:'girl',s:"on"},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'}],
			off:{
                layer:false,
                // dlsDetails:false,
                notCardDetails:true,//
                cardDetails:false,//卡详情
                setSync:false,//同步时间设置
                sync:false,//手动同步
                searchList:false,//查询结果
                modify:false//编辑栏
			},
			form:{
                page:50
            },
		}
	},
	components:{
        "common-search":search,
        "common-layer":layer,
        "dls-Details":dlsDetails,
        "card-Details":cardDetails
	},
	created:function(){
        let vm=this,userInfo=localStorage.getItem("KA_ECS_USER");
        let Info=JSON.parse(userInfo);
        vm.userId=Info.userId;
	},
	methods:{
		getDetails(){
            this.off.notCardDetails=false;
            this.off.cardDetails=true;
        },
        openSet(){//同步设置
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=true;
            vm.off.sync=false;
        },
        sync(){//手动同步
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=false;
            vm.off.sync=true;
        },
        changeChecked(){//单选按钮点击事件
            this.ix.checkeda=!this.ix.checkeda;
        },
        addCheckBox(){//便利对象添加单选按钮状态
            for(let i=0;i<this.ix.length;i++){
                this.ix[i].checkeda=false;
            }
        }
        ,search(p){//查询
            let load=Loading.service(options),checked=[],data={},url='/yfd-nms/w/number/productSearch',vm=this;
            vm.pa=p||1;
            for(let i in vm.checkedCities){
                checked.push(cityOptions.indexOf(vm.checkedCities[i])+1);
            }
            checked=checked.join(",");
            data={
                "brand":checked,
                // "isp":vm.radio,
                "isp":0,
                "operatorName":vm.name,
                "operatorPhone":vm.phone,
                "productName":vm.packagename,
                "productType":vm.cardType,
                "productState":vm.nowStatus,
                "sessionType":2,
                "pageSize":10
                ,"pageNum":p||1}
            requestMethod2(data,url,function(){load.close()})
            .then((data)=>{
                if(data.code==200){
                    vm.off.searchList=true;
                    vm.searchList=data.data.products;
                }else{
                    errorDeal(data);
                }
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e),function(){load.close()});
        }
        ,doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.searchList.length;v++){
                    this.$set(this.searchList[v],'ischecked',true);
                }
            }else if(s=="off"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.ix[v].s=='off'){
                       this.$set(this.searchList[v],'ischecked',true);
                    }else{
                       this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="on"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.ix[v].s=='on'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="noton"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.ix[v].s=='black'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="off"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.ix[v].s=='black'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="seal"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.ix[v].s=='black'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }
        },
         doFounction(val){
             let vm=this;
            for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    vm.off.modify=true;
                }
            }
            if(val=='2'){
                vm.dourl="/yfd-nms/w/number/pullOffProducts";
                this.a="下架";
            }else if(val=='1'){
                vm.dourl="/yfd-ums/w/number/putOnProducts";
                this.a="上架";
            }
        }
        ,getAuthCode(){
            let load=Loading.service(options),data={},url='/yfd-ums/uus/w/user/getAuthCode',vm=this;
            data={"phone":vm.userId}
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                }  
            }).then(()=>{
                load.close(); 
            }).catch(e=>errorDeal(e));
        }
        ,success(){
            let vm=this,data={"operateProductIds":[],"authCode":123456},url='',che='';
            for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    data.operateProductIds.push(vm.searchList[v].productId);
                    vm.off.modify=true;
                }
            }
            url=vm.dourl;
            // this.off.cardDetails=true;
            // this.off.notDlsDetails=false;
            requestMethod(data,url)
            .then((data)=>{

            }).then(()=>{

            }).catch(err=>errorDeal(err)
            );
        }
    }
}
</script>

