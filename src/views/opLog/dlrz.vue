<style>
@import "../../assets/css/search.css";
div.listTitleFoot{width: 96%;height: 28px;margin: 10px 18px;}
div.detailsListDiv tr td{text-align: center;}
</style>
<template>
  <section >
      <div class="dls">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle">搜索条件</div></el-col>
        </el-row>
        <el-row style="height:40px;line-height:40px" >
            <el-col :span="12"><div class="grid-content bg-purple">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">操作时间：</div></el-col>
                <el-col :span="18">
                    <el-date-picker
                    v-model="startTime"
                    size="mini"
                    type="datetime"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span>——</span>
                    <el-date-picker
                    v-model="endTime"
                    size="mini"
                    type="datetime"
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="2"></el-col> 
            </div></el-col>
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
             <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="optype"  label="1">全部</el-radio>
                    <el-radio v-model="optype"  label="2">登录</el-radio>
                    <el-radio v-model="optype"  label="3">登出</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :span="18">
                     <el-input v-model="name" size="mini" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">登录方式：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="opcontent"  label="qb">全部</el-radio>
                    <el-radio v-model="opcontent"  label="mh">PC</el-radio>
                    <el-radio v-model="opcontent"  label="kj">App</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-col :span="4"><div class="grid-content bg-purple-dark textR inputTitle">操作结果：</div></el-col>
                <el-col :span="18">
                    <el-radio v-model="radio"  label="a">全部</el-radio>
                    <el-radio v-model="radio"  label="s">成功</el-radio>
                    <el-radio v-model="radio"  label="f">失败</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search('dls')">搜索</button>
        </el-row>
      </div>
      <div class="listTitleFoot"><span>日志列表</span><el-button class="fr" type="success" size="mini">导出数据</el-button></div>
	  <div class="detailsListDiv">
			<table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td>序号</td>
                    <td>号包名称</td>
                    <td>操作时间</td>
                    <td>操作人</td>
                    <td>手机号码</td>
                    <td>操作类型</td>
                    <td>操作结果</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(v,i) of ix" :key="i">
                    <td>
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td >
                       {{v.color}}
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="openDetails()">查看详情</a>
                    </td>
                </tr>
			</table>
        </div>
        <log-details v-if="off.logDet"></log-details>
  	</section>
</template>
<script>
import { getDateTime } from "../../config/utils";
import logDet from "../../../components/logDetails";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      cname: "",
      phone: "",
      name: "",
      radio: "a",
      optype:"2",
      opcontent:"qb",
      timeType:"a",
      ix:[{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'}],                  
      off: {
        showSearch: "",
        logDet:false
      }
    };
  },
  created: function() {
    let vm = this;
    vm.off.showSearch = vm.$route.name;
  },
  beforeDestroy: function() {},
  mounted: function() {},
  computed: {

  },
  components: {
      "log-details":logDet
  },
  methods: {
    search(t) {
      let vm = this;
      if (t == "dls") {
        let json = {
            cname: vm.cname,
            name: vm.name,
            st: vm.startTime,
            et: vm.endTime,
            phone: vm.phone,
            radio: vm.radio
          },
          url = "";
        console.log(json, url);
      } else if (t == "yfd") {
        let json = { name: vm.name, phone: vm.phone, radio: vm.radio },
          url = "";
        console.log(json, url);
      }
    },
    openDetails(){
        let vm=this;
        vm.off.logDet=true;
    },
  }
};
</script>

