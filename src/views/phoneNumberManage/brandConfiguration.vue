<template>
  <section ref="sec">
    <div class="m-search">
      <div class="greyFont">
        <el-row class="f-mt-10">
          <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" >
            <div class="grid-content bg-purple">
              <el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">查询条件</div></el-col>
                </el-row>
                <el-row :span="24">
                  <el-col>
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">排序方式：</span></label>
                      </el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="20">
                        <el-radio v-model="cardType" label="1,2">全部</el-radio>
                        <el-radio v-model="cardType" label="1">SIM号</el-radio>
                        <el-radio v-model="cardType" label="2">号码</el-radio>
                      </el-col>
                    </div>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col>
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">在售品牌：</span></label>
                      </el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="20">
                        <el-checkbox text-color="#48576a" style="display:inline;" :indeterminate="isIndeterminate" v-model="checkAll"
                          @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group style="display:inline" v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities4" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities5" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities6" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities7" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities8" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities9" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities10" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities11" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities12" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities13" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities14" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities15" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                  <el-button type="success" size="small" @click="search()">搜索</el-button>
                </el-row>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchlist.length" class="m-details">
        <p class="m-searchlist-title"><span>查询结果</span><span>
          <el-button v-if="!off.brand" size="mini" style="padding:5px !important;margin-right:10px" @click="setBrand(1)" type="success">
            品牌配置
          </el-button>
          <el-button v-if="off.brand" size="mini" style="padding:5px !important;margin-right:10px" @click="setBrand(2,searchlist)" type="success">
            修改配置
          </el-button>
          </span></p>
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr>
            <td>序号</td>
            <td>品牌名称</td>
            <td>排序方式</td>
          </tr>
          <tr v-for="(v,i) of searchlist" :key="i">
            <td>{{i+1}}</td>
            <td>{{translateData(4,v.brand)}}</td>
            <td>
              <label v-if="!off.brand">{{v.order==1?'sim号':v.order==2?'号码':'--'}}</label>
              <label v-if="off.brand">
                <input type="radio"  value=1 v-model="v.order"> SIM号&nbsp;&nbsp; 
                <input  type="radio"  value=2 v-model="v.order"> 号码
              </label>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
  import { getBrandOrder,setBrandOrder } from '../../config/service.js';
  import { getTimeFunction, getStore, errorDeal, getDateTime,translateData } from '../../config/utils';
  const cityOptions = ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'],
    cityOptions1 = ['远特'],
    cityOptions2 = ['蜗牛'],
    cityOptions3 = ['迪信通'],
    cityOptions4 = ['极信'],
    cityOptions5 = ['小米'],
    cityOptions6 = ['海航'],
    cityOptions7 = ['乐语'],
    cityOptions8 = ['苏宁互联'],
    cityOptions9 = ['国美'],
    cityOptions10 = ['联想'],
    cityOptions11 = ['蓝猫移动'],
    cityOptions12 = ['长城'],
    cityOptions13 = ['中邮'],
    cityOptions14 = ['鹏博士'],
    cityOptions15 = ['天音'];
  export default {
    data() {
      return {
        searchlist:"",
        setOrder:[],
        isIndeterminate:false,
        searchJson:"",
        form:{
          searchKind:1
        },
        off:{
          brand:false
        },
        cardType:"1,2",
        checkAll:true,
        checkedCities: ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'], //虚商品牌
        cities: cityOptions, //选中的虚商
        cities1: cityOptions1,
        cities2: cityOptions2,
        cities3: cityOptions3,
        cities4: cityOptions4,
        cities5: cityOptions5,
        cities6: cityOptions6,
        cities7: cityOptions7,
        cities8: cityOptions8,
        cities9: cityOptions9,
        cities10: cityOptions10,
        cities11: cityOptions11,
        cities12: cityOptions12,
        cities13: cityOptions13,
        cities14: cityOptions14,
        cities15: cityOptions15,
      }
    },
    methods: {
      search(i){
        let vm=this,json,ids;
        if(!i){
          if(vm.form.searchKind==1){
            if(vm.cardType=='1,2'){
              ids=[];
            }else{
              ids=vm.cardType.split(',')
            }
            json={
              orders:ids,
              brands:[]
            };
          }else if(vm.form.searchKind==2){
            if(vm.checkAll==true){
              ids=[];
            }else{
              ids=[];
              for (let i in vm.checkedCities) {
                ids.push(cityOptions.indexOf(vm.checkedCities[i]) + 1);
              }
            }
            json={
              orders:[],
              brands:ids
            };
          }
          vm.searchJson=json;
        }
        getBrandOrder(vm.searchJson)
        .then(res=>{
          if(res&&res.data){
            vm.searchlist=res.data.list;
          }
        }).catch(e=>errorDeal(e))
      },
      setBrand(i,v){
        let vm=this;
        if(i==1){
          vm.off.brand=true;
        }else if(i==2){
          setBrandOrder({list:v})
          .then(res=>{
            if(res&&res.code==200){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              vm.off.brand=false;
              vm.search(2);
            }
          }).catch(e=>errorDeal(e))
        }
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cities.length;
      },
      translateData(i,v){
        return translateData(i,v)
      },
      getDateTime(t){
        return getDateTime(t)
      }
    }
  }
</script>

