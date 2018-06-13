<style scoped>
    /* .listTitleFoot{width: 96%;margin: 10px 18px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline} */
    input{border: 0 none;}
    .box{width: 140px;height: 26px;background-color: #808000;clear: both;}
    .box span{float: left;display: inline-block;height: 26px;}
    .span1{width: 100px;position: relative;background: red}
    .span2{width: 40px;position: relative;background: green}
    .input{ text-align: center;height: 26px;width:100px;position: absolute;top: 0;left: 0;border: 1px solid #ccc;outline: none}
    .button{height: 26px;width: 40px;font: normal 14px/14px "微软雅黑";background: #5daf34;color: #fff;outline: none}
</style>
<template>
    <section ref="sec">
        <div v-if="off.notCardDetails">
            <!-- 查询模块 -->
            <div class="dls greyFont">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">号包名称：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                                <el-input v-model="packagename" size="small"  placeholder="请输入号包名称" :maxlength="15"></el-input>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                                <el-input v-model="name" size="small"  placeholder="请输入查询的联系人姓名" :maxlength="10"></el-input>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row class="marginTop">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">号包类型：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-radio v-model="cardType"  label="1,2,3">全部</el-radio>
                            <el-radio v-model="cardType"  label="1">整号段</el-radio>
                            <el-radio v-model="cardType"  label="2">靓号包</el-radio>
                            <el-radio v-model="cardType"  label="3">普号包</el-radio>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                                <el-input v-model="phone" size="small"  placeholder="请输入查询的手机号码" :maxlength="11"></el-input>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row class="marginTop">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="20" :xl="20">
                            <el-radio v-model="nowStatus"  label="1,2,3,4,5,6">全部</el-radio>
                            <el-radio v-model="nowStatus"  label="1">未上架</el-radio>
                            <el-radio v-model="nowStatus"  label="2">手动上架</el-radio>
                            <el-radio v-model="nowStatus"  label="3">手动下架</el-radio>
                            <el-radio v-model="nowStatus"  label="4">系统下架</el-radio>
                            <el-radio v-model="nowStatus"  label="5">已出售</el-radio>
                            <el-radio v-model="nowStatus"  label="6">购物车中</el-radio>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple-dark textR inputTitle">运营商：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="20" :xl="20">
                            <el-radio v-model="radio"  label="1,2,3">全部</el-radio>
                            <el-radio v-model="radio"  label="1">移动</el-radio>
                            <el-radio v-model="radio"  label="2">联通</el-radio>
                            <el-radio v-model="radio"  label="3">电信</el-radio>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row class="marginTop">
                    <el-col :span="24"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple-dark textR inputTitle">品牌：</div></el-col>
                        <el-col :xs="19" :sm="21" :md="21" :lg="20" :xl="18">
                            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20">
                                <el-checkbox text-color="#48576a" style="display:inline;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>                       
                                <el-checkbox-group style="display:inline" v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <!-- <el-checkbox class="hidden-xs-and-down" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>                        -->
                                    <el-checkbox  v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities4" :label="city" :key="city">{{city}}</el-checkbox>      
                                    <el-checkbox  v-for="city in cities5" :label="city" :key="city">{{city}}</el-checkbox>      
                                    <el-checkbox  v-for="city in cities6" :label="city" :key="city">{{city}}</el-checkbox>      
                                    <el-checkbox  v-for="city in cities7" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities8" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities9" :label="city" :key="city">{{city}}</el-checkbox>                       
                                    <el-checkbox  v-for="city in cities10" :label="city" :key="city">{{city}}</el-checkbox>      
                                    <el-checkbox  v-for="city in cities11" :label="city" :key="city">{{city}}</el-checkbox>      
                                    <el-checkbox  v-for="city in cities12" :label="city" :key="city">{{city}}</el-checkbox>      
                                </el-checkbox-group>
                            </el-col>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                    <button class="searchBtn" @click="search()">搜索</button>
                </el-row>
            </div> 
            <!-- 查询结果列表 -->
            <div v-if="searchList">
                <div>       
                    <div class="listTitleFoot">
                        <el-row>
                            <p><h3>号包列表<span class="fontWeight greyFont">({{total||'0'}})</span></h3></p>                    
                        </el-row>        
                    </div>
                    <div class="detailsListDiv">
                        <table class="searchTab" style="width:100%;height:100%;">
                            <tr>
                                <td colspan="11">
                                    <el-row>
                                        <el-col :span="7" class="tal pl20"><div class="grid-content bg-purple">
                                            <span class="greyFont">最后同步成功时间:</span>
                                            <span v-if="syncLastTime==0">--</span>
                                            <span v-if="syncLastTime!=0">{{getDateTime(syncLastTime)[6]}}</span>
                                        </div></el-col>
                                        <el-col :span="7" class="tal pl20"><div class="grid-content bg-purple-light">
                                            <!-- <span class="greyFont">下次同步成功时间:</span><span>{{"--"}}</span> -->
                                            &nbsp;
                                        </div></el-col>
                                        <el-col :span="6" class="tal pl20"><div class="grid-content bg-purple">
                                            <!-- <span class="greyFont">同步间隔时间:</span><span></span>
                                            <el-button class="small-btn" type="primary" @click="openSet()">设置</el-button> -->
                                            &nbsp;
                                        </div></el-col>
                                        <el-col :span="4" class="tar"><div class="grid-content bg-purple-light">
                                            <el-button class="small-btn" type="success" @click="sync()">手动同步</el-button>
                                        </div></el-col>
                                    </el-row>
                                </td>
                            </tr>
                            <tr class="f-s-14">
                                <td></td>
                                <td>序号</td>
                                <td>号包名称</td>
                                <td>号包类型</td>
                                <td>号包价格（元）</td>
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
                                    <a class="textDec" @click="getDetails(v)">{{v.productName}}
                                        <span v-if="v.productType==1">({{v.normalTotal+v.cuteTotal}})</span>
                                        <span v-if="v.productType==2">({{v.cuteTotal}})</span>
                                        <span v-if="v.productType==3">({{v.normalTotal}})</span>
                                    </a>
                                </td>
                                <td >
                                    <span v-if="v.productType==1">整号包</span>
                                    <span v-if="v.productType==2">靓号包</span>
                                    <span v-if="v.productType==3">普号包</span>
                                </td>
                                <td class="tac" style="width:140px">
                                    <div v-if="!off.changePrice[i+1]">
                                        <span v-if="!v.strikePrice">{{(v.totalPrice/100).toFixed(2)}}</span>
                                        <span v-if="v.strikePrice">{{(v.strikePrice/100).toFixed(2)}}</span>
                                        <el-button v-if="v.isInCart==1" class="small-btn" @click="changePrice(i)">修改</el-button>                                     
                                    </div>
                                    <div class="box" v-if="off.changePrice[i+1]">
                                        <span class="span1">
                                            <input v-focus @blur="closeInp(v,i)" type="text" class="input" v-model="translateSealPrice">
                                        </span>
                                        <span class="span2">
                                            <input  type="button" value="确定" class="button" @mousedown="changePriceYes(v,i)">
                                        </span>
                                    </div>
                                </td>
                                <td >
                                <span v-if="v.brand==1">远特</span>
                                <span v-if="v.brand==2">蜗牛</span>
                                <span v-if="v.brand==3">迪信通</span>
                                <span v-if="v.brand==4">极信</span>
                                <span v-if="v.brand==5">小米</span>
                                <span v-if="v.brand==6">海航</span>
                                <span v-if="v.brand==7">乐语</span>
                                <span v-if="v.brand==8">苏宁互联</span>
                                <span v-if="v.brand==9">国美</span>
                                <span v-if="v.brand==10">联想</span>
                                <span v-if="v.brand==11">蓝猫移动</span>
                                <span v-if="v.brand==12">长城</span>
                                </td>
                                <td >
                                <!-- <span v-if="v.isp==1,2,3">移动联通电信</span>                         -->
                                <span v-if="v.isp==1">移动</span>
                                <span v-if="v.isp==2">联通</span>
                                <span v-if="v.isp==3">电信</span>
                                </td>
                                <td >
                                    <!-- {{new Date(v.modifyTime).toLocaleString()}} -->
                                    <span v-if="v.modifyTime">
                                        {{getDateTime(v.modifyTime)[6]}}
                                    </span>
                                    <span v-if="!v.modifyTime">
                                        --
                                    </span>
                                </td>
                                <td >
                                {{v.operatorName}}
                                </td>
                                <td >
                                {{v.operatorPhone||'--'}}
                                </td>
                                <td >
                                <span v-if="v.productState==1">未上架</span>                        
                                <span v-if="v.productState==2">手动上架</span>
                                <span v-if="v.productState==3">手动下架</span>
                                <span v-if="v.productState==4">系统下架</span>
                                <span v-if="v.productState==5" class="fcred">已出售</span>
                                <span v-if="v.productState==6">购物车中</span>
                                </td>
                                <td v-show="false">
                                    {{v.productId}}
                                </td>
                            </tr>
                            <tr v-if="searchList.length>0">
                                <td colspan="11" style="text-align:left" class="pl20">
                                    选择 : <a href="javascript:void(0)" @click="doFilter('all')">  全选  </a> - <a href="javascript:void(0)" @click="doFilter('none')">  取消全选  </a>
                                    <!-- <a href="javascript:void(0)" @click="doFilter('all')">全选</a>-<a href="javascript:void(0)" @click="doFilter('on')">已上架</a>-<a href="javascript:void(0)" @click="doFilter('noton')">未上架</a>-<a href="javascript:void(0)" @click="doFilter('off')">已下架</a>-<a href="javascript:void(0)" @click="doFilter('seal')">已售</a> -->
                                </td>
                            </tr>
                            <tr v-if="searchList.length<=0">
                                <td colspan="11">
                                    暂无数据                                                        
                                </td>
                            </tr>
                        </table>
                    </div>       
                    <div class="listTitleFoot" v-if="searchList.length>0">
                        <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-pagination
                            layout="prev, pager, next"
                            :page-size="10"
                            @current-change="search"
                            :total="form.page">
                            </el-pagination>
                        </div></el-col>
                        <el-col :span="12" v-if="nowStatusHidden!=6">
                            <div class="grid-content bg-purple-light fr">操作 : <el-button size="mini" @click="doFounction(1)">上架</el-button><el-button size="mini" @click="doFounction(2)">下架</el-button></div>
                        </el-col>
                        </el-row>
                    </div>
                </div>
            </div>  
            <!-- 操作 -->
            <div v-if="off.modify">
                <div class="listTitleFoot">
                    <p style="text-align:right;color:red;font-size:14px">将已选择内容批量{{a}}</p>
                </div>
                <div class="listTitleFoot">
                    <el-input v-model="reason" placeholder="请输入原因，字数限制20个字符，必填" size="small" :maxlength="20"></el-input>
                </div> 
                <div class="listTitleFoot">
                    <p style="text-align:right">验证号码:{{user.phone}}
                        <el-input v-model="authCode" size="mini" style="width:30%" placeholder="请输入验证码" :maxlength="6"></el-input>
                        <el-button size="mini" type="primary" @click="getAuthCode()" :disabled="btnDisabled">{{count}}</el-button>
                    </p> 
                </div> 
                <div class="listTitleFoot">
                    <p style="float:right">
                    <el-button type="success" size="small" @click="btnYes()">确定</el-button>
                    </p>
                </div>
            </div> 
        </div>
        <!-- 同步时间弹框 -->
        <common-layer  v-if="off.layer"></common-layer>
        <!-- 卡详情 -->
        <card-Details  v-if="off.cardDetails" :listSwitch="listSwitch" :dataList="searchResData" :dataListLiang="searchLiang" :dataListPu="searchPu"></card-Details>	 
        <layer-confirm v-if="off.layerChangePrice" :layerType="layerType" :logisticsInfo="logistics"></layer-confirm>           
    </section>
</template>
<script>
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import { getDateTime,getUnixTime,errorDeal,getStore,checkMobile } from "../../config/utils.js";
import {requestMethod,requestgetSyncTime,requestModify_Price} from "../../config/service.js"; 
import layerSync from "../../components/layerSyncTime";
import layerConfirm from "../../components/layerConfirm";
import cardDetails from "../../components/cardDetails";
const cityOptions = ['远特', '蜗牛', '迪信通', '极信','小米','海航','乐语','苏宁互联','国美','联想','蓝猫移动','长城'],
 cityOptions1=['远特'],
 cityOptions2=[ '蜗牛'],
 cityOptions3=['迪信通'],
 cityOptions4=['极信'],
 cityOptions5=[ '小米'],
 cityOptions6=[ '海航'],
 cityOptions7=['乐语'],
 cityOptions8=['苏宁互联',],
 cityOptions9=['国美'],
 cityOptions10=['联想'],
 cityOptions11=['蓝猫移动'],
 cityOptions12=['长城'];
export default{
	data (){
		return {
            layerType:"",//弹框类型
            logistics:"",
            _copyData:"",
            newPrice:"",
            syncLastTime:'',//最后一次同步成功时间
            btnDisabled:false,
            count:"点击获取验证码",
            timer:null,
            checkAll: false,
            isIndeterminate:true,
            total:"",//号包总数
            listSwitch:{"allDetails":"","liang":"","pu":""},//详情页面开关
            searchResData:{},//号包详情查询结果
            searchLiang:[],//靓号详情查询结果
            searchPu:[],//谱号详情查询结果
            dataList:'',//号包详情页面
            dataListLiang:{},//号包详情页面
            dataListPu:{},//号包详情页面
            packagename:"",//号包名称
            cardType:"1,2,3",//号包类型
            nowStatus:"1,2,3,4,5,6",//号包状态
            nowStatusHidden:"",
            phone: "",//查询的手机号码
            radio: "1,2,3",//运营商
            name: "",//联系人姓名
            pageNumDetails:"",//子页面号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
            pa:'',//页码
            reason:"",//操作理由
            authCode:"",//验证码
            searchDataChangePrice:"",//修改价格
            translateSealPrice:"",
            checkedCities: ['远特', '蜗牛', '迪信通', '极信','小米','海航','乐语','苏宁互联','国美','联想','蓝猫移动','长城'],//虚商品牌
            cities: cityOptions,//选中的虚商
            cities1:cityOptions1,
            cities2:cityOptions2,
            cities3:cityOptions3,
            cities4:cityOptions4,
            cities5:cityOptions5,
            cities6:cityOptions6,
            cities7:cityOptions7,
            cities8:cityOptions8,
            cities9:cityOptions9,
            cities10:cityOptions10,
            cities11:cityOptions11,
            cities12:cityOptions12,
            startTime: "",
            endTime: "",
            cname: "",
            productType:"1",
            searchList:"",
            timeType:"a",
            searchData:"",
            dourl:'',
            a:'',//上架，下架
            newPrice:[],
			off:{
                layer:false,
                layerChangePrice:false,
                notCardDetails:true,//
                cardDetails:false,//卡详情
                setSync:false,//同步时间设置
                sync:false,//手动同步
                searchList:false,//查询结果
                modify:false,//编辑栏
                isCheckAll:true,//是否全选
                changePrice:[],
			},
			form:{
                page:0
            },
		}
    },
    computed:{

    },
	components:{
        "common-layer":layerSync,
        "card-Details":cardDetails,
        "layer-confirm":layerConfirm
    },
    created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
	},
	methods:{
        checkBoxClick(v){

        },handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
		getDetails(v){
            let vm=this,data={},url="/nms/w/number/getProductDetail";
            data.searchProductId=v.productId;
            data.sessionType="2";
            let load=Loading.service(options);
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    this.$set(vm.listSwitch,'allDetails',true)
                    vm.searchResData=data.data
                }
            }).then(
                Promise.all([new Promise((resolve,reject)=>{
                    if(v.productType==1||v.productType==2){
                        url="/nms/w/number/getProductCuteNumbers";
                        data.phoneLevel=2;
                        requestMethod(data,url)
                        .then((data)=>{
                            resolve('yes');
                            this.$set(vm.listSwitch,'liang',true)
                            vm.searchLiang=[]
                            for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                vm.searchLiang.push(data.data.numbers.slice(i,i+6));
                            }
                            vm.searchLiang.len=data.data.numbers.length;
                        }).catch(e=>errorDeal(e,load.close()))
                    }else{
                        vm.searchLiang=[]
                    }
                })]).then(
                    Promise.all([new Promise((resolve,reject)=>{
                        if(v.productType==1||v.productType==3){
                            url="/nms/w/number/getProductNumbers";
                            data.phoneLevel=1;
                            requestMethod(data,url)
                            .then((data)=>{
                                resolve('yes');                        
                                this.$set(vm.listSwitch,'pu',true)                                                      
                                vm.searchPu=[]
                                for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                    vm.searchPu.push(data.data.numbers.slice(i,i+6));
                                }
                                vm.searchPu.len=data.data.numbers.length;                        
                            }).catch(e=>errorDeal(e,function(){load.close()}))
                        }else{
                            vm.searchPu=[]
                        }
                    })]).then((result)=>{
                        load.close();
                        this.off.notCardDetails=false;
                        this.off.cardDetails=true;
            }))).catch(e=>errorDeal(e,()=>{load.close()}))       
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
            let vm=this;
            if(this.phone!=''){
                checkMobile(this.phone,function(){vm.searchList="";vm.total="";vm.form.page="";return false});
            }
            let checked=[],data={},url='/nms/w/number/productSearch';
            vm.pa=p||1;
            for(let i in vm.checkedCities){
                checked.push(cityOptions.indexOf(vm.checkedCities[i])+1);
            }
            checked=checked.join(",");
            data={
                "brand":checked,
                "isp":vm.radio,
                // "isp":0,
                "operatorName":vm.name,
                "operatorPhone":vm.phone,
                "productName":vm.packagename,
                "productType":vm.cardType,
                "productState":vm.nowStatus,
                "sessionType":2,
                "pageSize":10
                ,"pageNum":p||1}
            vm.searchData=data;
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    vm.searchList=data.data.products;
                    vm.total=data.data.total;
                    vm.form.page=data.data.total;
                    vm._copyData=vm.copyData(data.data.products);
                    vm.nowStatusHidden=vm.nowStatus;
                }else{
                    vm.searchList="";
                    vm.total="";
                    vm.form.page="";
                    errorDeal(data);
                }
            }).then(()=>{
                for(let v=0;v<vm.searchList.length;v++){
                    vm.$set(vm.searchList[v],'ischecked',false);
                }
                for(let i in vm.off.changePrice){
                    vm.$set(vm.off.changePrice,i,false)
                }
                vm.off.modify=false;
                this.resetTimer();
                this.getSyncTime();
            }).catch(e=>errorDeal(e,()=>{vm.searchList="";vm.total="";vm.form.page="";}));
        }
        ,copyData: function (dataSource) {  
            var obj={};  
            obj=JSON.parse(JSON.stringify(dataSource)); 
            return obj  
        }  
        ,doFilter(s){//状态过滤操作
            if(s=="all"){
                for(let v=0;v<this.searchList.length;v++){
                    this.$set(this.searchList[v],'ischecked',true);
                }
            }else if(s=="none"){
                for(let v=0;v<this.searchList.length;v++){
                    this.$set(this.searchList[v],'ischecked',false);
                }
            }else if(s=="off"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.searchList[v].productState=='3'){
                       this.$set(this.searchList[v],'ischecked',true);
                    }else{
                       this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="on"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.searchList[v].productState=='2'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="noton"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.searchList[v].productState=='1'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }else if(s=="seal"){
                for(let v=0;v<this.searchList.length;v++){
                    if(this.searchList[v].productState=='4'){
                        this.$set(this.searchList[v],'ischecked',true);
                    }else{
                         this.$set(this.searchList[v],'ischecked',false);
                    }
                }
            }
        },
         doFounction(val){
            let vm=this;
            vm.a="";
            for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    vm.off.modify=true;
                }
            }
            if(vm.off.modify==false){
                layer.open({
                    content:"请选择要操作的号包",
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            if(val=='2'){
                vm.dourl="/nms/w/number/pullOffProducts";
                this.a="下架";
            }else if(val=='1'){
                vm.dourl="/nms/w/number/putOnProducts";
                this.a="上架";
            } 
           setTimeout(()=>{
               this.funScrollTop()
           },50)
        },
        funScrollTop(){
            this.$parent.$refs.psec.scrollTop=this.$parent.$refs.psec.scrollHeight;
        }
        ,getAuthCode(){
            const TIME_COUNT = 120;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.btnDisabled=true;
                        this.count--;
                    } else {
                        this.resetTimer()
                    }
                }, 1000)
            }
            let data={},url='/ums/w/user/getAuthCode',vm=this;
            data={"phone":vm.user.phone}
            requestMethod(data,url)
            .then((data)=>{
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
            }).catch(e=>errorDeal(e));
        }
        ,btnYes(v){
            let dataReq={'operateProductIds':[]},vm=this;
            for(let v in vm.searchList){
                if(vm.searchList[v].ischecked==true){
                    dataReq.operateProductIds.push(vm.searchList[v].productId)
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
            dataReq.reason=vm.reason;//操作原因
            dataReq.authCode=vm.authCode;
            requestMethod(dataReq,vm.dourl)
            .then((data)=>{
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
            }).then(()=>{
                vm.reason="";
                vm.authCode="";
                this.resetTimer();               
                for(let v=0;v<vm.searchList.length;v++){
                    vm.$set(vm.searchList[v],'ischecked',false);
                }}
            ).catch(e=>errorDeal(e));
        },
        getSyncTime(){
            let vm=this;
            let data={recordType:3};
            requestgetSyncTime(data)
            .then((data)=>{
                if(data.code==200){
                    vm.syncLastTime=data.data.syncLastTime
                }else{
                    errorDeal(data)
                }
            }).catch(e=>errorDeal(e)); 
        },
        getDateTime:function(v){
            return getDateTime(v);
        },
        resetTimer(){
            this.btnDisabled=false;                        
            this.show = true;
            this.count="点击获取验证码"                    
            clearInterval(this.timer);
            this.timer = null;
        }
        ,changePrice(i){
            let vm=this;
            vm._copyData=vm.copyData(vm.searchList);
            for(let i in vm.off.changePrice){
                vm.$set(vm.off.changePrice,i,false)
            }
            vm.$set(vm.off.changePrice,i+1,true)
            if(!vm.searchList[i].strikePrice)
                vm.translateSealPrice=(vm.searchList[i].totalPrice/100).toFixed(2);
            else if(vm.searchList[i].strikePrice)
                vm.translateSealPrice=(vm.searchList[i].strikePrice/100).toFixed(2);
        },changePriceYes(i,v){
            let vm=this;
            vm.layerType="confirmModifyPrice";
            vm.logistics=i;
            vm.off.layerChangePrice=true;
            vm.searchDataChangePrice={"productId":i.productId,"buyerId":i.userId,"strikePrice":vm.translateSealPrice*100}
        },changePriceReq(){
            requestModify_Price(vm.searchDataChangePrice)
            .then((data)=>{
                for(let i in vm.off.changePrice){
                    vm.$set(vm.off.changePrice,i,false)
                }
                this.search();
            }).catch(e=>errorDeal(e));
        },closeInp(i,v){
            let vm=this;
            for(let i in vm.off.changePrice){
                vm.$set(vm.off.changePrice,i,false)
            }
            vm.searchList=vm._copyData;
        },confirm(v){
            let vm=this,data={};
        },
    },directives: {
        focus:{
            inserted: function (el) {
                el.focus()
            }
        }
    }
}
</script>

