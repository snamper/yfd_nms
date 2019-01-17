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
                        <label><span class="text greyFont">排序方式：</span></label>
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
                        <label><span class="text greyFont">在售品牌：</span></label>
                      </el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="20">
                        <el-checkbox text-color="#48576a" style="display:inline;" :indeterminate="isIndeterminate" v-model="checkAll"
                          @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group style="display:inline" v-model="checkedbrands" @change="handleCheckedbrandsChange">
                          <el-checkbox v-for="brand in brands1" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands2" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands3" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands4" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands5" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands6" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands7" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands8" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands9" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands10" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands11" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands12" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands13" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands14" :label="brand" :key="brand">{{brand}}</el-checkbox>
                          <el-checkbox v-for="brand in brands15" :label="brand" :key="brand">{{brand}}</el-checkbox>
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
          <el-button v-if="off.brand" size="mini" style="padding:5px !important;" @click="setBrand(3)" type="danger">
            取消
          </el-button><el-button v-if="off.brand" size="mini" style="padding:5px !important;margin-right:10px" @click="setBrand(2,searchlist)" type="success">
            确定
          </el-button>
          </span></p>
        <table class="m-searchTab" style="width:100%;height:100%;margin-top:10px;">
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
  const brandOptions = ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'],
    brandOptions1 = ['远特'],
    brandOptions2 = ['蜗牛'],
    brandOptions3 = ['迪信通'],
    brandOptions4 = ['极信'],
    brandOptions5 = ['小米'],
    brandOptions6 = ['海航'],
    brandOptions7 = ['乐语'],
    brandOptions8 = ['苏宁互联'],
    brandOptions9 = ['国美'],
    brandOptions10 = ['联想'],
    brandOptions11 = ['蓝猫移动'],
    brandOptions12 = ['长城'],
    brandOptions13 = ['中邮'],
    brandOptions14 = ['鹏博士'],
    brandOptions15 = ['天音'];
  export default {
    data() {
      return {
        searchlist:"",
        setOrder:[],
        isIndeterminate:false,
        searchJson:"",
        off:{
          brand:false
        },
        cardType:"1,2",
        checkAll:true,
        checkedbrands: ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'], //虚商品牌
        brands: brandOptions, //选中的虚商
        brands1: brandOptions1,
        brands2: brandOptions2,
        brands3: brandOptions3,
        brands4: brandOptions4,
        brands5: brandOptions5,
        brands6: brandOptions6,
        brands7: brandOptions7,
        brands8: brandOptions8,
        brands9: brandOptions9,
        brands10: brandOptions10,
        brands11: brandOptions11,
        brands12: brandOptions12,
        brands13: brandOptions13,
        brands14: brandOptions14,
        brands15: brandOptions15,
      }
    },
    methods: {
      search(i){
        let vm=this,json,brandOrder=[],brandSeal=[];
        if(!i){
          if(vm.cardType!='1,2'){
            brandOrder=vm.cardType.split(',')
          }

          if(vm.checkAll!=true){
            for(let i in vm.checkedbrands){
              brandSeal.push(brandOptions.indexOf(vm.checkedbrands[i]) + 1);
            }
          }
          json={
            brands:brandSeal,
            orders:brandOrder
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
        }else if(i==3){
          vm.off.brand=false;
          vm.search(2);
        }
      },
      handleCheckAllChange(val) {
        this.checkedbrands = val ? brandOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedbrandsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.brands.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.brands.length;
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

