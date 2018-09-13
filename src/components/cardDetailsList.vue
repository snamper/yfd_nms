<style scoped>
    table.numberInfo td:nth-child(odd){width: 200px;text-align: right}
    table.numberInfo td:nth-child(even){text-align: left;padding-left:20px; }
</style>
<template>
    <section>
        <div class="allDetails" v-if="listSwitch.allDetails">
            <div class="listTitleFoot">
                <h3><span v-if="!pickCardSwitch">号包详情</span><span><a href="javascript:void(0)" class="fr fcaqua" @click="goBack()">返回列表</a></span></h3>
            </div>
            <div v-if="!pickCardSwitch" class="detailsListDiv">
                <table class="searchTab numberInfo" style="width:100%;height:100%;">
                    <tr>
                        <td>号包名称 ：</td>
                        <td class="deepGreyFont f-s-14">{{dataList.productName||'--'}}</td>
                        <td>运&nbsp;&nbsp;营&nbsp;&nbsp;商 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14"> {{translateData(1,dataList.isp)}} </span> 
                        </td>
                    </tr>
                    <tr>
                        <td>号包类型 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14"> {{translateData(2,dataList.productType)}} </span>  
                        </td>
                        <td>当前状态 ： <!-- 1：未上架，2：手动上架，3：手动下架，4：系统下架，5：已出售, 6: 购物车中", --> </td>
                        <td>
                            <span class="deepGreyFont f-s-14"> {{translateData(3,dataList.productState)}} </span>
                        </td>
                    </tr>
                    <tr>
                        <td>码号数量 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14" v-if="!pickCardSwitch">
                                <span v-if="dataList.productType==1">普号数（{{dataListPu.total||'0'}}）+靓号数（{{dataListLiang.total||'0'}}）</span>
                                <span v-if="dataList.productType==2">靓号数（{{dataListLiang.total||'0'}}）</span>
                                <span v-if="dataList.productType==3">普号数（{{dataListPu.total||'0'}}）</span>
                            </span>
                            <span class="deepGreyFont f-s-14" v-if="pickCardSwitch">
                                <span v-if="listSwitch.liang">{{dataListLiang.total}}</span>
                                <span v-if="listSwitch.pu">{{dataListPu.total}}</span>
                            </span>
                        </td>
                        <td>修改时间 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14">
                                {{getDateTime(dataList.modifyTime)[6]}}
                            </span>
                        </td>
                        <!-- <td>修改时间 ：{{new Date(dataList.modifyTime).toLocaleString()||'--'}}</td> -->
                    </tr>
                    <tr>
                        <td>归属品牌 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14"> {{translateData(4,dataList.brand)}} </span>
                        </td>
                        <td>操&nbsp;&nbsp;作&nbsp;&nbsp;人 ： </td>
                        <td>
                            <span class="deepGreyFont f-s-14">
                                {{dataList.operatorName||'--'}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="liang" v-if="listSwitch.liang">
            <div class="listTitleFoot">
                <h3><span>靓号详情</span><span class="deepGreyFont"> ({{dataListLiang.total||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListLiang" :key="i">
                        <td v-for="(v,i) of dataListLiang[i]" :key="i">{{v.phone}}</td>
                        <!-- <td v-for="(v,i) of dataListLiang[i]" :key="i">
                            <el-popover
                            placement="right"
                            title="资费介绍"
                            width="200"
                            trigger="hover">
                            <div class="greyFont f-s-14">
                                <p>号卡名称：{{v.name||'--'}}</p>
                                <p>流&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量 ：{{v.sms||'--'}}</p>
                                <p>短&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信 ：</p>
                                <p>国内语音 ：{{v.voice||'--'}}</p>
                                <p>来电显示 ：{{v.showingCall||'--'}}</p>
                                <p>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消 ：{{v.lowConsume||'--'}}</p>
                            </div>
                            <el-button slot="reference">{{v.phone}}</el-button>
                            </el-popover>
                        </td> -->
                    </tr>
                    <tr v-if="!dataListLiang.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无靓号详情</td>
                    </tr>
                </table>
                <!-- <el-col>
                  <div class="grid-content bg-purple">
                      <el-pagination
                          layout="prev, pager, next"
                          :page-size="60"
                          @current-change="searchNumberListCute"
                          :current-page.sync="currentPage"                                                        
                          :total="dataList.cuteTotal">
                      </el-pagination>    
                  </div>
                </el-col> -->
            </div> 
            <el-row style="padding-left:16px;" v-if="dataListLiang.length">
                <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple">
                        <el-pagination
                            layout="prev, pager, next"
                            :page-size="60"
                            @current-change="searchNumberListCute"
                            :current-page.sync="currentPage1"                                                        
                            :total="dataListLiang.total">
                        </el-pagination>    
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="pu" v-if="listSwitch.pu">
            <div class="listTitleFoot">
                <h3><span>号包详情</span><span class="deepGreyFont"> ({{dataListPu.total||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListPu" :key="i">
                        <td v-for="(v,i) of dataListPu[i]" :key="i">{{v.phone}}</td>
                        <!-- <td v-for="(v,i) of dataListPu[i]" :key="i">
                            <el-popover
                            placement="right"
                            title="资费介绍"
                            width="200"
                            trigger="hover">
                            <div class="f-s-14 greyFont">
                                <p>号卡名称：{{v.name||'--'}}</p>
                                <p>流&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量 ：{{v.sms||'--'}}</p>
                                <p>短&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信 ：</p>
                                <p>国内语音 ：{{v.voice||'--'}}</p>
                                <p>来电显示 ：{{v.showingCall||'--'}}</p>
                                <p>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消 ：{{v.lowConsume||'--'}}</p>
                            </div>
                            <el-button slot="reference">{{v.phone}}</el-button>
                            </el-popover>
                        </td> -->
                    </tr>
                    <tr v-if="!dataListPu.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无普号详情</td>
                    </tr>
                </table>
            </div> 
            <el-row style="padding-left:16px;" v-if="dataListPu.length">
                <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple">
                        <el-pagination
                            layout="prev, pager, next"
                            :page-size="60"
                            @current-change="searchNumberList"
                            :current-page.sync="currentPage"                                                        
                            :total="dataListPu.total">
                        </el-pagination>    
                    </div>
                </el-col>
          </el-row>
        </div>  
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal,translateData } from "../config/utils.js";
import { requestMethod } from "../config/service.js"
export default{
    props:{dataList:Object,
    dataListLiang:Array,
    dataListPu:Array,
    listSwitch:Object,
    pickCardSwitch:Boolean},        
    data (){
		return {
            currentPage:0,
            currentPage1:0,
            pageNumDetails:"",//号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
			off:{
                layer:false
			},
			form:{
                page:0
			},
		}
    },
	methods:{
        goBack(){
            this.$parent.off.cardDetails=false;
            this.$parent.off.notCardDetails=true;
            if(this.$parent.off.searchList==true){
                this.$parent.search();
            }
        },getDateTime(v){
            return getDateTime(v)
        },searchNumberList(v){
          let vm=this, url="/nms/w/number/getProductNumbers",data={};
          data.searchProductId=vm.$parent.searchProductListId;
          data.sessionType="2";
          data.phoneLevel=1;
          data.pageNum=v||1;
          data.pageSize=60;
          requestMethod(data,url)
          .then((data)=>{
              this.$set(vm.$parent.listSwitch,'pu',true)                                                      
              vm.$parent.searchPu=[]
              for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                  vm.$parent.searchPu.push(data.data.numbers.slice(i,i+6));
              }
              vm.$parent.searchPu.total=data.data.total;                        
          }).catch(e=>errorDeal(e))
        },searchNumberListCute(v){
            let vm=this, url="/nms/w/number/getProductCuteNumbers",data={};
            data.searchProductId=vm.$parent.searchProductListId;
            data.sessionType="1";
            data.phoneLevel=1;
            data.pageNum=v||1;
            data.pageSize=60;
            requestMethod(data,url)
            .then((data)=>{
                this.$set(vm.$parent.listSwitch,'liang',true)                                                      
                vm.$parent.searchLiang=[]
                for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                    vm.$parent.searchLiang.push(data.data.numbers.slice(i,i+6));
                }
                vm.$parent.searchLiang.total=data.data.total;                        
            }).catch(e=>errorDeal(e))
          },translateData(type,v){
              return translateData(type,v)
          }
    }
}
</script>

