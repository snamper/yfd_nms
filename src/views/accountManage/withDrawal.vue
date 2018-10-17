<template>
	<section class="m-withDrawal">
        <div class="m-details-page">
            <p class="m-head-title">
                <label><a>佣金账户提现</a></label>
                <label><a @click="back()">返回列表</a></label>
            </p>
        </div>
        <div class="m-withDrawalCon">
            <div class="m-withDrawalAccount">
                <label>提现账户：</label>
                <div :class="{'active':off.huafen}" @click="chooseType(1)">
                    <p>话分佣金</p>
                    <p><span>可提现金额 </span><span class="fcblue f-s-20">100.00元</span></p>
                    <span></span>
                    <a></a>
                </div><div :class="{'active':off.kaika}" @click="chooseType(2)">
                    <p>开卡激励</p>
                    <p><span>可提现金额 </span><span class="fcblue f-s-20">100.00元</span></p>
                    <span></span>
                    <a></a>
                </div>
            </div>
            <div class="m-withDrawalMoney">
                <p><span>提现金额：</span>
                    <input type="text" v-model="withdrawalMoney" placeholder="请输入提现金额">
                    <a class="fcblue" style="cursor: pointer" @click="allWithDrawal">全部提现</a>
                </p>
            </div>
            <div class="m-collectionAccount">
                <label>到账账户：</label>
                <div class="m-accountname">
                    <p>
                        <el-radio v-model="radio" label="1">业务账户</el-radio>
                    </p>
                    <p>
                        <el-radio v-model="radio" label="2">支付宝账号</el-radio>                        
                    </p>
                </div>
            </div>
            <p><button @click="collection">提交</button></p>
        </div>
        <layer v-if="off.layer" :layerType="layerType"></layer>
    </section>
</template>
<script>
import layer from '../../components/layerConfirm.vue';
export default{
	data (){
		return {
            radio:"2",
            withdrawalMoney:"",
            layerType:"",
            off:{
                huafen:false,
                kaika:true,
                layer:false
            }
		}
    },
    components:{
        layer
    },
    methods: {
        chooseType(v){
            let vm=this;
            vm.off.huafen=false;
            vm.off.kaika=false;
            if(v==1){
                vm.off.huafen=true;
            }else if(v==2){
                vm.off.kaika=true;
            }
        },allWithDrawal(){
            let vm=this;
            if(vm.off.huafen){

            }else if(vm.off.kaika){
                
            }else{
                return false;
            }
        },collection(){
            let vm=this;
            if(vm.off.huafen){

            }else if(vm.off.kaika){

            }else{
                return false
            }
            if(isNaN(vm.withdrawalMoney)){
                layer.open({
                    content:'请输入正确的提款金额',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }else{

            }
            vm.layerType="commissionWithdrawal";
            vm.off.layer=true;
        },back(){
            let vm=this;
            vm.$parent.off.withDrawal=false;
        }
    }
}
</script>
<style scoped>
    .m-head-title{height: 45px;border-bottom: 1px solid #ccc;width: 98%;margin-left: 1%;display: flex}
    .m-head-title label{flex: 1}
    .m-head-title label:nth-child(1){text-align: left;padding-left: 1%}
    .m-head-title label:nth-child(1) a{line-height: 45px;font-size: 16px}
    .m-head-title label:nth-child(2){text-align: right;margin-right: 1%;}
    .m-head-title label:nth-child(2) a{line-height: 45px;color:#43AAD4;cursor: pointer;}
    .m-withDrawalCon{position: absolute;width: 600px;height: 600px;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
    .m-withDrawalCon>p{text-align: center;}
    .m-withDrawalCon>p>button{width: 130px;height: 35px;background: #00A901;border: 1px solid #00A901;outline: none;color: #FFF}
    .m-withDrawalCon>p>button:active{box-shadow:0 0 5px #00A901}
    .m-withDrawalAccount{height: 100px;position: relative;}
    .m-withDrawalAccount>label{position: absolute;display: inline-block;height: 70px;}
    .m-withDrawalAccount>div{ cursor: pointer;position: relative;left:70px;display: inline-block;height: 70px;border: 1px solid #ccc;background: #fff;margin-right: 10px;}
    .m-withDrawalAccount>div.active{border: 1px solid #EB7A00}
    .m-withDrawalAccount>div.active>span{position: absolute;right: 0;bottom: 0;content: "";color: #fff;display: inline-block;width: 0;height: 0;border: 15px solid #EB7A00;border-top:15px solid transparent;border-left:15px solid transparent;} 
    .m-withDrawalAccount>div.active>a{position: absolute;right: 0;bottom: 0;width: 15px;height: 15px;background: url('../../assets/images/yes.png') no-repeat center;background-size: cover;} 
    .m-withDrawalAccount>div>p{padding:5px 30px 5px 10px;}
    .m-withDrawalMoney{height: 50px;}
    .m-withDrawalMoney p input{ height: 35px;width: 240px;padding-left: 15px;border:1px solid #ccc;outline: none}
    .m-collectionAccount{display: flex}
    .m-collectionAccount label{width: 70px;}
    .m-collectionAccount .m-accountname p{height: 30px;}
</style>
