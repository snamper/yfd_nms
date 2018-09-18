<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 38px;}
    .listTitleFoot label{display:block;width: 50%;}
    .m-company-detail table{width: 100%;border-collapse: collapse;border: 1px solid #e4e4e4}
    .m-company-detail table tr{height: 50px;}
    .m-company-detail table tr:nth-child(even){background: #fff}
    .m-company-detail table tr{border-top: 1px solid #e4e4e4}
    .m-company-detail table tr td:nth-child(1){width: 200px;text-align: right;padding-right: 20px;}
    .m-btn-green{padding: 2px 4px;outline:none ;border-radius: 4px;}
    .departChange{width: 100%;height: 100%;position: absolute;top: 0;left: 0;}
    .departChange .m-departChange-con{width: 400px;height:200px;padding: 20px;border-radius: 6px;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;box-shadow: 0 0 30px grey;}
    .departChange ul{width: 100%;height: 100%;overflow: auto;}
    .departChange ul::-webkit-scrollbar{width: 4px;height: 4px;}
    .departChange ul::-webkit-scrollbar-thumb {border-radius: 5px; -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); background: rgba(0,0,0,0.2); }
    .departChange ul li{height: 35px;line-height: 35px;}
    .departChange p{height: 20px;line-height: 20px;text-align: center;position: absolute;top: 5px;left: 130px;}
    .departChange p span{display: inline-block;width: 10px;height: 10px;cursor: pointer;position: absolute;top: 5px;right: -175px;background: url('../../assets/images/icon_close.png') no-repeat right;background-size: 10px;}
    .m-btn-group{position:absolute;height:28px;left:395px;border-radius: 0 4px 4px 0;}
</style>
<template>
    <div>
        <div class="yfd f-s-16">
            <el-container>
                <el-header class="headTitleNav">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">部门名称&nbsp;:&nbsp;<a class="c-blue" href="javascript:void(0)">{{lists.departName}}</a></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fr " style="padding-right:40px"><a href="javascript:void(0)" class="fcaqua" @click="goBack()">返回列表</a></div></el-col>
                    </el-row>
                </el-header>         
            </el-container>
        </div>
        <div class="listTitleFoot" style="margin:0 38px;">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple"><h3>公司详情</h3></div></el-col>
            </el-row>        
        </div>
        <div style="width:95%;margin-left:30px" class="m-company-detail f-s-14">
            <table>
                <tr>
                    <td>创建时间 : </td>
                    <td>{{getDateTime(lists.createTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门名称 : </td>
                    <td>{{lists.departName}}({{lists.departId}})</td>
                </tr>
                <tr>
                    <td>部门状态 : </td>
                    <td>{{translateData('userState',lists.departState)}}</td>
                </tr>
                <tr>
                    <td>联系人姓名 : </td>
                    <td>{{lists.managerName||'--'}}</td>
                </tr>
                <tr>
                    <td>部门信息修改时间 : </td>
                    <td>{{getDateTime(lists.modifyTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门联系人手机号码 : </td>
                    <td>{{lists.phone||'--'}}</td>
                </tr>
                <tr>
                    <td>归属渠道 : </td>
                    <td v-if="!change">{{lists.dealerIdName||'--'}}【{{lists.dealerId||'--'}}】
                        <a href="javascript:void(0)" @click="details">查看渠道变更记录</a>
                        <button class="m-btn-green" @click="fchange(lists)">修改渠道</button>
                    </td>
                    <td v-if="change">
                        <p style="height:100%;position:relative">
                            <el-select  style="width:400px;" size="mini" v-model="value1" placeholder="请选择修改的渠道">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="`${item.dealerIdName}`+`【${item.dealerId}】`">
                                </el-option>
                            </el-select>
                            <button class="m-btn-green m-btn-group" @click="fdetermine">确定</button>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>客户门店地址 : </td>
                    <td>{{lists.storefront||'--'}}</td>
                </tr>
                <tr>
                    <td>最后与客户沟通时间 : </td>
                    <td>{{lists.lastTime||'--'}}</td>
                </tr>
                <tr>
                    <td>售卡区域 : </td>
                    <td>{{lists.soldProvince||'--'}}，{{lists.soldCity||'--'}}，{{lists.soldCounty||'--'}}</td>
                </tr>
            </table>
        </div>
        <div  v-if="departChangelist" class="departChange">
            <div class="m-departChange-con">
                <p>渠道修改详情<span class="icon-close" @click="closeDetails"></span></p>
                <ul>
                    <li v-for="(v,i) of departChange" v-if="departChange.length">
                        <span>{{getDateTime(v.createTime)[8]}}</span>&nbsp;&nbsp;<span style="font-size:12px;color:grey">{{getDateTime(v.createTime)[5]}}</span>
                        &nbsp;&nbsp;<span>{{v.dealerIdName}}{{v.dealerId}}</span>
                    </li>
                    <li v-if="!departChange.length">
                        暂无渠道变更记录
                    </li>
                </ul>
            </div>
            
        </div>
        <layerConfirm v-if="off.layer" :layerType="layerType"></layerConfirm>
	</div>	 
</template>
<script>
import { getDateTime,getStore,errorDeal,translateData } from "../../config/utils";
import { requestMethod,getDepart,departChangeHistory } from "../../config/service.js"; 
import { mapState,mapMutations,mapActions } from 'vuex';
import layerConfirm from '../../components/layerConfirm';
export default{
    props:['lists'],
	data (){
		return {    
            departChangelist:false,
            departChange:"",
            change:false,
            options: [{"dealerId": "代理商ID","dealerIdName": "代理商名称"}],
            mdedealerName:"",
            mdealerId:"",
            mdepartId:"",
            changeDepartInfo:{},
            layerType:'',
            value1: '',
            off:{
                layer:false
            }
		}
	},components:{
        layerConfirm
    },computed:{
        ...mapState([
            "depart"
        ])
    },created:function(){
        let vm=this;
        vm.user=getStore("YFD_NMS_INFO");
        vm.topId=getStore('departId');
        vm.init();
    },methods:{
        ...mapActions([
            "getDepart"
        ]),
        async init(){
            let vm=this;
            vm.getDepart()
            .then(()=>{
                vm.options=vm.depart;
            });
        },details(){
            let vm=this;
            departChangeHistory({departId:vm.lists.departId})
            .then((data)=>{
                if(data.code==200){
                    vm.departChange=data.data.list;
                }
            }).catch(e=>errorDeal(e))
            vm.departChangelist=true;
        },fchange(v){
            let vm=this;
                vm.change=true;
                vm.value1=v.dealerIdName+'【'+v.dealerId+'】'
        },fdetermine(){
            let vm=this;
                vm.off.layer=true;
                vm.layerType="modifyDepart";
                vm.changeDepartInfo={
                    departId :vm.lists.departId,
                    dealerId:vm.value1.split('【')[1].split('】')[0],
                    dealerIdName:vm.value1.split('【')[0]
                };
        },goBack(){
            let vm=this;
            this.$parent.off.companyDetails=false;
            this.$parent.off.notDlsDetails=true;
        },closeDetails(){
            let vm=this;
                vm.departChangelist=false;
        },getDateTime(v){
            return getDateTime(v);
        },translateData(v,i){
            return translateData(v,i)
        }
	}
}
</script>

