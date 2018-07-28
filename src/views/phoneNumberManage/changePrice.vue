<style>
    .button{height: 26px;width: 40px;font: normal 14px/14px "微软雅黑";background: #5daf34;color: #fff;outline: none}
    .el-checkbox-group{display: inline-block}

</style>
<template>
    <section ref="sec">
        <div>
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
                               <td>{{v.productName}} ({{v.amount}}个)</td>
                               <td>{{'--'}}</td>
                               <td>{{'--'}}</td>
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
    </section>
</template>
<script>
import { requestGetCarts } from "../../config/service.js"
import { translateData,getDateTime,errorDeal } from '../../config/utils.js';
import layer from '../../components/layerConfirm';
export default{
	data (){
		return {
            sectionId:"",
            checkList: ["1","2","3"],
            checkListAll:true,
            searchList:"",
            pageNum:"",
            total:"",
            layerType:"modifyPrice",
            changePrinceInfo:{},
            off:{
                layer:false
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
        "layer":layer
    },
	methods:{
        search(p){
            let vm=this,
            json={
                "productType": vm.checkList.join(','),
                "sectionId": vm.sectionId,
                "pageNum": p||1,
                "pageSize": 20,
            }
            requestGetCarts(json)
            .then((data)=>{
                if(data.code==200){
                    vm.searchList=data.data.carts;
                    vm.total=data.data.total;
                    vm.pageNum=p||1;
                }
            }).catch(e=>errorDeal(e))
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

