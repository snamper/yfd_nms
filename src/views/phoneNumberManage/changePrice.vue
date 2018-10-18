<style>
    .button{height: 26px;width: 40px;font: normal 14px/14px "微软雅黑";background: #5daf34;color: #fff;outline: none}
    .el-checkbox-group{display: inline-block}
</style>
<template>
    <section ref="sec">
        <div v-if="off.searchList">
            <!-- 查询模块 -->
            <div class="dls greyFont">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">号包名称：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-input v-model="sectionId" size="small"  placeholder="请输入号包名称" :maxlength="15"></el-input>
                        </el-col>
                    </div></el-col>
                    <el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">号包类型：</div></el-col>
                        <el-checkbox v-model="checkListAll" @change="BtnCheckAllCardType">全部</el-checkbox>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox style="margin-left:30px" label="1">整号段</el-checkbox>
                            <el-checkbox  label="2">靓号包</el-checkbox>
                            <el-checkbox  label="3">普号包</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
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
                                <td>序号</td>
                                <td>号包名称</td>
                                <td>号包类型</td>
                                <td>售卖方式</td>
                                <td>归属品牌</td>
                                <td>运营商</td>
                                <td>超时时间</td>
                                <td>操作人</td>
                                <td>手机号码</td>
                                <td>号包价格(元)</td>
                                <td>操作</td>
                            </tr>
                            <tr v-for="(v,i) of searchList" :key="i">
                                <td>{{(pageNum-1)*20+(i+1)}}</td>
                                <td><a @click="getCartDetail(1,v)">{{v.productName}} ({{v.amount}}个)</a></td>
                                <td>{{translateData(2,v.productType)}}</td>
                                <td>
                                    <span v-if="v.splitFlag==1">整包</span><span v-if="v.splitFlag==2">拆包</span>
                                </td>
                                <td>{{translateData(4,v.brand)}}</td>
                                <td>{{translateData(1,v.isp)}}</td>
                                <td>{{getDateTime(v.expireTime)[6]}}</td>
                                <td>{{v.operatorName||'--'}}</td>
                                <td>{{v.operatorPhone||'--'}}</td>
                                <td>{{v.strikePrice/100}}</td>
                                <td><a @click="changePrice(v)">修改价格</a></td>
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
                                :current-page.sync="currentPage"                            
                                :total="total">
                                </el-pagination>
                            </div></el-col>
                        </el-row>
                    </div>
                </div>
            </div>  
        </div>
        <layer v-if="off.layer" :layerType="layerType" :info="changePrinceInfo"></layer>
        <cardList v-if="off.cardlistDetails" :listSwitch="listSwitch" :dataListLiang="searchLiang" :dataListPu="searchPu" ></cardList>
    </section>
</template>
<script>
import { requestMethod,requestGetCarts,requestGetCartDetail } from "../../config/service.js"
import { translateData,getDateTime,errorDeal } from '../../config/utils.js';
import { Loading } from 'element-ui';
import layerConfirm from '../../components/layerConfirm';
import cardList from "../../components/cardInCartDetailsList.vue";
export default{
	data (){
		return {
            total:1,
            currentPage:1,
            sectionId:"",
            checkList: ["1","2","3"],
            checkListAll:true,
            listSwitch:{"liang":false,"pu":false},//详情页面开关
            searchLiang:[],//靓号列表
            searchPu:[],//普号列表
            searchList:"",
            pageNum:"",
            layerType:"modifyPrice",
            changePrinceInfo:{},
            off:{
                searchList:true,
                layer:false,
                cardlistDetails:false
            }
		}
    },
	watch:{
        checkList(){
            if(this.checkList.length==3){
                this.checkListAll=true;
            }else{
                this.checkListAll=false;
            }
        }
    },
    components:{
        "layer":layerConfirm,
        "cardList":cardList
    },
	methods:{
        search(p){
            let vm=this,
            json={
                "productType": vm.checkList.join(','),
                "sectionId": vm.sectionId,
                "pageNum": p||1,
                "pageSize": 20}
                if(vm.checkListAll==true){
                    json.productType+=',4';
                }
                vm.currentPage=p||1;
            requestGetCarts(json)
            .then((data)=>{
                if(data.code==200){
                    vm.searchList=data.data.carts;
                    vm.total=data.data.total;
                    vm.pageNum=p||1;
                }
            }).catch(e=>errorDeal(e))
        },getCartDetail(p,v){
            let vm=this;
            vm.searchPu=[];
            vm.searchLiang=[]
            if(v.productType==3){//普号包详情
                let data={"id": v.id,
                pageNum:p||1,
                pageSize:60}
                requestGetCartDetail(data)
                .then((data)=>{
                    vm.off.searchList=false;
                    vm.off.layer=false;
                    vm.off.cardlistDetails=true;
                    this.$set(vm.listSwitch,'pu',true);
                    if(data.data.numbers instanceof Array){
                        for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                            vm.searchPu.push(data.data.numbers.slice(i,i+6));
                        }
                        vm.searchPu.total=data.data.total;
                    }
                }).catch((e)=>{
                    layer.open({
                        content:e.msg||e,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                })
            }else if(v.productType==1||v.productType==2){//整号包或靓号包
                let vm=this,data={},url="";
                vm.searchProductListId=v.productId;
                data.searchProductId=v.productId;
                data.sessionType="2";
                let load=Loading.service(options);
                let p1 = new Promise((resolve,reject)=>{
                    if(v.productType==1||v.productType==2){
                        url="/nms/w/number/getMngCuteNumbers";
                        data.phoneLevel=2;
                        data.pageNum=1;
                        data.pageSize=60;
                        requestMethod(data,url)
                        .then((data)=>{
                            this.$set(vm.listSwitch,'liang',true)
                            if(data.data.numbers instanceof Array){
                                for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                    vm.searchLiang.push(data.data.numbers.slice(i,i+6));
                                }
                                vm.searchLiang.total = data.data.total;
                            }
                            resolve('step');
                        }).catch((e)=>{
                            layer.open({
                                content:e||e.msg,
                                skin: 'msg',
                                time: 2,
                                msgSkin:'error',
                            });
                        })
                    }else{
                        vm.searchLiang = [];
                        resolve('step');
                    }
                });
                let p2 = new Promise((resolve,reject)=>{
                    if(v.productType==1){
                        url="/nms/w/number/getProductNumbers";
                        data.phoneLevel=1;
                        data.pageNum=1;
                        data.pageSize=60;
                        requestMethod(data,url)
                        .then((data)=>{
                            vm.searchPu=[]
                            this.$set(vm.listSwitch,'pu',true)                                                      
                            if(data.data.numbers instanceof Array){
                                for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                                    vm.searchPu.push(data.data.numbers.slice(i,i+6));
                                }
                                vm.searchPu.total=data.data.total;      
                            }
                            resolve('step1');                        
                        }).catch((e)=>{
                            layer.open({
                                content:e,
                                skin: 'msg',
                                time: 2,
                                msgSkin:'error',
                            });
                        })
                    }else{
                        vm.searchPu=[];
                        resolve('step1');                        
                    }
                });
                requestMethod(data,"/nms/w/number/getProductDetail")
                .then((data)=>{
                    if(data.code==200){
                        this.$set(vm.listSwitch,'allDetails',true)
                        vm.searchResData=data.data
                }})
                .then(Promise.all([p1,p2])
                .then((result)=>{
                    load.close();
                    vm.off.searchList=false;
                    vm.off.layer=false;
                    vm.off.cardlistDetails=true;
                })).catch(e=>errorDeal(e,()=>{load.close()}));
            }
        },
        changePrice(v){
            let vm=this;
            vm.off.layer=true;
            vm.changePrinceInfo=v;
        },
        BtnCheckAllCardType(){
            if(this.checkListAll==true){
                this.checkList=['1','2','3']
            }else{
                this.checkList=[]
            }
        },
        translateData(type,v){
            return translateData(type,v)
        },
        getDateTime(v){
            return getDateTime(v)
        }
    }
}
</script>

