<template>
   <section class="g-list-box" id="details">
        <header class="g-lis-head">
            <a @click="backUp" class="u-icon-back"></a>
        </header>
        <div class="g-box">
            <table class="g-list-table">
                <tbody>
                    <tr>
                        <td>
                            <table class="g-inner-table">
                                <tbody>
                                    <tr>
                                        <td>订单号码：</td>
                                        <td>{{detailsData.sysOrderId||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>来源：</td>
                                        <td>{{translateData(7,detailsData.docTransferType)}}</td>
                                    </tr>
                                    <tr>
                                        <td>生成时间：</td>
                                        <td>{{getDateTime(detailsData.createTime)[6]}}</td>
                                    </tr>
                                    <tr>
                                        <td>用户姓名：</td>
                                        <td>{{detailsData.idcardName||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>电话号码：</td>
                                        <td>{{detailsData.phone||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>所属品牌：</td>
                                        <td>{{translateData(4,detailsData.brand)}}</td>
                                    </tr>
                                    <tr>
                                        <td>运营网络：</td>
                                        <td>{{translateData(1,detailsData.isp)}}</td>
                                    </tr>
                                    <tr>
                                        <td>证件类型：</td>
                                        <td>{{translateData(8,detailsData.idcardType)}}</td>
                                    </tr>
                                    <tr>
                                        <td>证件号码：</td>
                                        <td>{{detailsData.idcardNumber||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>证件地址：</td>
                                        <td>{{detailsData.idcardAddress||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>证件期限：</td>
                                        <td>{{detailsData.idcardPeriod||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>操作人：</td>
                                        <td>{{detailsData.operatorName||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>操作人IP：</td>
                                        <td>{{detailsData.ip||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>开卡方式：</td>
                                        <td>{{translateData(5,detailsData.terminalType)}}</td>
                                    </tr>
                                    <tr>
                                        <td>开卡结果：</td>
                                        <td>{{translateData(6,detailsData.openCardResult)}}</td>
                                    </tr>
                                    <tr>
                                        <td>位置信息：</td>
                                        <td>{{detailsData.longitude||'--'}}°E，{{detailsData.latitude||'--'}}°N</td>
                                    </tr>
                                    <tr>
                                        <td>图片来源：</td>
                                        <td>
                                            <span>正面：{{translateData(9,detailsData.imageSubmit.split(',')[0])}}/</span>
                                            <span>背面：{{translateData(9,detailsData.imageSubmit.split(',')[1])}}/</span>
                                            <span>手持：{{translateData(9,detailsData.imageSubmit.split(',')[2])}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商户名称：</td>
                                        <td>{{detailsData.dealerIdName||'--'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="m-meida-640up m-box-img">
                            <ImgZoom :imgData="imgData"></ImgZoom>
                        </td>
                    </tr>
                    <!-- <tr class="m-box-img m-meida-640down">
                        <img v-for="(item,i) in imgData" :src="item.src" :key="i">
                    </tr> -->
                </tbody>
            </table>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
import ImgZoom from "../../components/ImgZoom";
import {getDateTime,translateData} from "../../config/utils";
    export default {
        props: {detailsData:Object},
        data() {
            return {
                imgData:[]
            }
        },
        watch:{
            detailsData(){
                let vm=this;
                vm.imgData=[];
                vm.imgData[0]={src:vm.detailsData.frontImg,name:"身份证正面照"}
                vm.imgData[1]={src:vm.detailsData.backImg,name:"身份证反面照"}
                vm.imgData[2]={src:vm.detailsData.handImg,name:"身份证手持照"}
            }
        },
        created:function(){
            let vm=this;
            vm.imgData=[];
            vm.imgData[0]={src:vm.detailsData.frontImg,name:"身份证正面照"}
            vm.imgData[1]={src:vm.detailsData.backImg,name:"身份证反面照"}
            vm.imgData[2]={src:vm.detailsData.handImg,name:"身份证手持照"}
        },
        components: {
            ImgZoom
        },
        methods:{
            backUp(){
                let vm=this.$parent;
                vm.off.details=false;
            },
            getDateTime(v){
                return getDateTime(v)
            },translateData(v,i){
                return translateData(v,i)
            }
        }
    }
</script>
<style scoped>
    #details { padding: 0.15rem;}
    .g-lis-head{background-color: #fff; width: 100%; padding: 0.12rem 0.1rem; -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1); box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 4px;}
    .g-list-box, #details, .g-list-table, .g-inner-table, .g-box {width: 100%; height: 100%;}
    .g-box{padding-top: 10px;height: 94% !important;}
    .g-list-table, .g-inner-table{border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
    .g-list-table{background-color: #fff;}
    .g-list-table>tbody>tr>td{border:1px solid #dfe6ec;}
    .g-inner-table>tbody>tr>td:first-child, .g-list-table.transfer td span:first-child{width:1.1rem;text-align:right;color:#666;}
    .g-list-table>tbody>tr .g-inner-table tr:nth-child(even){background: #FAFAFA}
    .g-list-table>tbody>tr .g-inner-table tr{border-bottom: 1px solid #dfe6ec;}
    .m-box-img{position: relative;}
</style>
