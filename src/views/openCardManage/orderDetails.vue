<template>
   <section class="g-list-box" id="details">
        <header class="g-lis-head">
            <a class="u-icon-back"></a>
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
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>来源：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>生成时间：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>用户姓名：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>电话号码：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>运营网络：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>证件类型：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>证件号码：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>证件地址：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>证件期限：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>操作人：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>操作人IP：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>开卡方式：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>开卡结果：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>位置信息：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>渠道ID：</td>
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>商户名称：</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="m-meida-640up m-box-img">
                            <!-- <ImgZoom :imgData="imgData"></ImgZoom> -->
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
import {ImgZoom} from "../../components/ImgZoom";
   export default {
       data() {
           return {
               imgData:{}
       }
    },
   components: {

   }
}
</script>

<style scoped>
#details { padding: 0.15rem;}
.g-lis-head{background-color: #fff; width: 100%; padding: 0.12rem 0.1rem; -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1); box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 4px;}
.g-list-box, #details, .g-list-table, .g-inner-table, .g-box {width: 100%; height: 98%;}
.g-box{padding-top: 10px;}
.g-list-table, .g-inner-table{border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
.g-list-table{background-color: #fff;}
.g-list-table>tbody>tr>td{border:1px solid #dfe6ec;}
.g-inner-table>tbody>tr>td:first-child, .g-list-table.transfer td span:first-child{width:1.1rem;text-align:right;color:#666;}

</style>
