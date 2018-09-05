<style scoped>
    table.numberInfo td:nth-child(odd){width: 200px;text-align: right}
    table.numberInfo td:nth-child(even){text-align: left;padding-left:20px; }
    .headTitle{height: 50px;padding: 10px 20px}
</style>
<template>
    <section>
        <div class="allDetails">
            <div class="headTitle f-s-16">
                <span class="fl">订单详情</span><span><a href="javascript:void(0)" class="fr fcaqua" @click="goBack()">返回列表</a></span>
            </div>
        </div>
        <div class="liang" v-if="listSwitch.liang">
            <div class="listTitleFoot">
                <h3><span>靓号详情</span><span class="deepGreyFont"> ({{dataInfo.l||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListLiang" :key="i">
                        <td v-for="(v,i) of dataListLiang[i]" :key="i">{{v.phone}}</td>
                    </tr>
                    <tr v-if="!dataListLiang.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无靓号详情</td>
                    </tr>
                </table>
            </div> 
            <el-row v-if="dataListLiang.length">
              <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="grid-content bg-purple" style="padding:10px 16px">
                      <el-pagination
                          layout="prev, pager, next"
                          :page-size="90"
                          @current-change="details"
                          :current-page.sync="currentPage"                                                        
                          :total="dataInfo.l">
                      </el-pagination>    
                  </div>
              </el-col>
          </el-row>
        </div>
        <div class="pu" v-if="listSwitch.pu">
            <div class="listTitleFoot">
                <h3><span>普号详情</span><span class="deepGreyFont"> ({{dataInfo.p||'0'}})</span></h3>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr v-for="(v,i) of dataListPu" :key="i">
                        <td v-for="(v,i) of dataListPu[i]" :key="i">{{v.phone}}</td>
                    </tr>
                    <tr v-if="!dataListPu.length">
                        <td class="tac deepGreyFont f-s-14">此号包下暂无普号详情</td>
                    </tr>
                </table>
            </div> 
            <el-row v-if="dataListPu.length">
              <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="grid-content bg-purple" style="padding:10px 16px">
                      <el-pagination
                          layout="prev, pager, next"
                          :page-size="90"
                          @current-change="details"
                          :current-page.sync="currentPage"                                                        
                          :total="dataInfo.p">
                      </el-pagination>    
                  </div>
              </el-col>
          </el-row>
        </div>  
    </section>
</template>
<script>
import { getDateTime,getUnixTime,errorDeal,translateData } from "../config/utils.js";
import { requestgetOrderSplitNumbers } from "../config/service.js"
export default{
    props:{dataInfo:Object,dataListLiang:Array,dataListPu:Array,listSwitch:Object,pickCardSwitch:Boolean},        
    data (){
		return {
            currentPage:0,
            pageNumDetails:"",//号包详情
            pageNumLiang:"",//靓号详情
            pageNumPu:"",//普号详情
			off:{
                layer:false,
                dlsDetails:false,
                notDlsDetails:true,
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
        },
        getDateTime(v){
            return getDateTime(v)
        },
        details(p){
            let vm=this.$parent,
            json=vm.searchJson;
            json.pageNum=p||1;
            requestgetOrderSplitNumbers(json)
            .then((data)=>{
                if(data.code==200){
                    if(vm.searchJson.phoneLevel=='0,1,2,3,4,5,6'){
                        this.$set(vm.listSwitch,'pu',false)
                        this.$set(vm.listSwitch,'liang',true)   
                        vm.numberTotal.l=data.data.total;                         
                        vm.searchLiang=[]
                        for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                            vm.searchLiang.push(data.data.numbers.slice(i,i+6));
                        }
                        vm.searchLiang.len=data.data.numbers.length;
                    }else if(vm.searchJson.phoneLevel=='-1'){
                        this.$set(vm.listSwitch,'liang',false)                            
                        this.$set(vm.listSwitch,'pu',true)
                        vm.numberTotal.p=data.data.total;
                        vm.searchPu=[]     
                        for(var i=0,len=data.data.numbers.length;i<len;i+=6){
                            vm.searchPu.push(data.data.numbers.slice(i,i+6));
                        }
                        vm.searchPu.len=data.data.numbers.length;                       
                    }
                    this.off.notCardDetails=false;
                    this.off.cardDetails=true;
                }else{
                    layer.open({
                        content:"data.msg",
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }
            })
        },
        translateData(type,v){
            return translateData(type,v)
        }
    }
}
</script>

