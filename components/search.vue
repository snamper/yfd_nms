<style>
@import "../src/assets/css/search.css";
</style>
<template>
  <section class="grey">

    <div class="dls" v-if="off.showSearch=='card'">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">号包名称：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入号包名称"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">号包类型：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">整号段</el-radio>
                    <el-radio v-model="radio"  label="3">靓号包</el-radio>
                    <el-radio v-model="radio"  label="4">普号包</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="phone" size="mini" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
       <el-row class="marginTop">
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">未上架</el-radio>
                    <el-radio v-model="radio"  label="3">已上架</el-radio>
                    <el-radio v-model="radio"  label="4">已售</el-radio>
                    <el-radio v-model="radio"  label="5">已下架</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
           <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">运营商：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="1">全部</el-radio>
                    <el-radio v-model="radio"  label="2">移动</el-radio>
                    <el-radio v-model="radio"  label="3">联通</el-radio>
                    <el-radio v-model="radio"  label="4">电信</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="24"><div class="grid-content bg-purple-light">
                <el-col :span="2"><div class="grid-content bg-purple-dark textR inputTitle">运营商：</div></el-col>
                <el-col :span="18">
                    <el-checkbox v-model="yt">远特通信</el-checkbox>
                    <el-checkbox v-model="wn">蜗牛通信</el-checkbox>
                    <el-checkbox v-model="dxt">迪信通</el-checkbox>                    
                    <el-checkbox v-model="jx">极信通信</el-checkbox>
                    <el-checkbox v-model="xm">小米通信</el-checkbox>
                    <el-checkbox v-model="hh">海航通信</el-checkbox>
                    <el-checkbox v-model="ly">乐语通信</el-checkbox>
                    <el-checkbox v-model="sn">苏宁互联</el-checkbox>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search('dls')">搜索</button>
        </el-row>
      </div>
  </section>
</template>
<script>
import { getDateTime } from "../src/config/utils";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      cname: "",
      phone: "",
      name: "",
      radio: "2",
      timeType:"a",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      off: {
        showSearch: ""
      }
    };
  },
  created: function() {
    let vm = this;
    vm.off.showSearch = vm.$route.name;
  },
  beforeDestroy: function() {},
  mounted: function() {},
  computed: {},
  methods: {
 
    search(t) {
        this.$emit('child-say',this.ix);
        if (t == "dls") {
        let vm = this;
        let json = {cname: vm.cname,name: vm.name,st: vm.startTime,et: vm.endTime,phone: vm.phone,radio: vm.radio,timeType:vm.timeType},url = "";
        let pro=this.$parent;
        pro.off.dlsList=true;
        pro.details=this.ix;
      }else if(t=="staff"){
        let vm = this;

      }
    }
  }
};
</script>

