<template>
    <section ref="sec">
        <div class="m-search" v-if="off.list">
            <div class="dls greyFont">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-input v-model="name" size="small"  placeholder="请输入查询的联系人姓名" :maxlength="10"></el-input>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人号码：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-input v-model="phone" size="small"  placeholder="请输入联系人号码" :maxlength="11"></el-input>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">公司名称：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-input v-model="company" size="small"  placeholder="请输入查询的公司名称" :maxlength="15"></el-input>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">归属渠道：</div></el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                            <el-select size="small" style="width:100%" v-model="department" placeholder="请选择查询的归属渠道">
                                <el-option
                                v-for="item in options"
                                :key="item.areaPinYing"
                                :label="item.areaCn"
                                :value="item.areaCn"
                                size="small">
                                </el-option>
                            </el-select>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                    <button class="searchBtn" @click="search()">搜索</button>
                </el-row>
            </div> 
            <!-- 查询结果列表 -->
            <div v-if="searchList">
                <div class="listTitleFoot">
                    <el-row>
                        <p><h3>账户列表<span class="fontWeight greyFont">({{total||'0'}})</span></h3></p>                    
                    </el-row>        
                </div>
                <div class="detailsListDiv">
                    <table class="searchTab" style="width:100%;height:100%;">
                        <tr>
                            <td>序号</td>
                            <td>公司名称</td>
                            <td>联系人</td>
                            <td>手机号码</td>
                            <td>部门状态</td>
                            <td>归属渠道</td>
                            <td>账户余额（元）</td>
                            <td>佣金账户余额（元）</td>
                            <td>佣金账户累计提现（元）</td>
                        </tr>
                        <tr v-for="(v,i) of searchList">
                            <td>{{(currentPage-1)*15+(i+1)}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><a @click="details(1)">1</a></td>
                            <td><a @click="details(2)">1</a></td>
                            <td><a @click="details(3)">1</a></td>
                        </tr>
                    </table>
                </div> 
            </div>
        </div>
        <balance v-if="off.balance" :list="detailedData"></balance>
        <commission v-if="off.commission" :list="detailedData"></commission>
        <commissionWithdrawal v-if="off.commissionWithdrawal" :list="detailedData"></commissionWithdrawal>
    </section>
</template>
<script>
import balance from './balance.vue';
import commission from './commission.vue';
import commissionWithdrawal from './commissionWithdrawal.vue';
import { requestMethod } from '../../config/service.js';
import { errorDeal } from '../../config/utils';
export default{
	data(){
		return{
            name:"",
            phone:"",
            company:"",
            department:"",
            total:0,
            currentPage:0,
            detailedData:"",
            searchList:[{}],
            options:{},
            off:{
                list:true,
                balance:false,
                commission:false,
                commissionWithdrawal:false
            }
        }
    },
	components:{
      balance,
      commission,
      commissionWithdrawal
    },
	methods:{
        search(p){
            let vm=this,json={};
            if(isNaN(vm.phone)){
                layer.open({
                    content:'请输入正确的手机号码',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }else{

            }
            requestMethod(json)
            .then((data)=>{
                vm.searchList=data.data;
                vm.currentPage=p||1;
            }).catch(e=>errorDeal(e))
        },
        details(i){
            let vm=this,json={};
            requestMethod(json)
            .then((data)=>{

            }).catch(e=>errorDeal(e))
            vm.off.list=false;
            vm.off.balance=false;
            vm.off.commission=false;
            vm.off.commissionWithdrawal=false;
            if(i===1){
                vm.off.balance=true;
            }else if(i===2){
                vm.off.commission=true;
            }else if(i===3){
                vm.off.commissionWithdrawal=true;
            }else{
                return false
            }
        },
        
    }
}
</script>
<style scoped>

</style>

