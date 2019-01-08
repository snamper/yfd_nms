<template>
  <section>
    <div class="m-search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <el-col class="f-ta-l" :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">归属渠道：</div>
            </el-col>
            <el-col :xs="14" :sm="10" :md="8" :lg="8" :xl="6">
              <el-select @change="getOpId(departId)" size="small" style="width:100%" clearable v-model="departId" placeholder="请选择查询的归属渠道">
                <el-option  v-for="item in options" :key="item.dealerId" :label="item.dealerIdName" :value="item.dealerId"
                  size="small">
                </el-option>
              </el-select>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="searchResult" class="m-searchlist">
      <table>
        <tr>
          <td>序号</td>
          <td>部门名称</td>
          <td>操作员工</td>
          <td>密码</td>
          <td>密钥</td>
          <td>账户类型</td>
          <td>操作</td>
        </tr>
        <tr v-for="(v,i) in searchResult" :key="i">
          <td>{{i+1}}</td>
          <td>{{v.dealerName}}</td>
          <td>
            <span v-if="!modifyop">{{v.operator}}</span>
            <el-input v-if="modifyop" type="text" size="mini" style="max-width:200px;" v-model="roperator"/>
          </td>
          <td>{{v.password}}</td>
          <td>{{v.secretKey}}</td>
          <td>{{v.type==1?'靓号':v.type==2?'普号':v.type==3?'其他':'--'}}</td>
          <td>
            <el-button type="success" size="mini" @click="operate(3,v)">设为开卡员工</el-button>
            <el-button v-if="!modifyop" type="primary" size="mini" @click="operate(2,v)">修改</el-button>
            <el-button v-if="modifyop" @click="operate('ok',v)" type="warning" size="mini" style="width:80px;">确定</el-button></td>
        </tr>
        <tr v-if="searchResult.length==0">
          <td colspan="6">暂无数据</td>
        </tr>
      </table>
    </div>
    <div class="m-dialog" v-if="off.dialog">
      <div class="m-newinfo">
        <p class="m-dialog-title">{{ruleForm.title}}<span class="m-icon-close" @click="operate(0)"></span></p>
        <div class="m-dialog-content">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="账号" prop="accountId">
              <el-input size="small" v-model="ruleForm.accountId"></el-input>
            </el-form-item>
            <el-form-item label="操作人">
              <el-input size="small" v-model="ruleForm.operator"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input size="small" v-model="ruleForm.pwd"></el-input>
            </el-form-item>
            <el-form-item label="密钥">
              <el-input size="small" v-model="ruleForm.key"></el-input>
            </el-form-item>
          </el-form>
          <p style="text-align:center"><el-button @click="operate('ok')" type="success" size="mini" style="width:80px;">确定</el-button></p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { requestOpenCardDepId,requestOpenCardOpId,updateOpenCardOp,updateOpenCardOpId } from "../../config/service.js";
import { errorDeal } from '../../config/utils.js';
export default {
  data() {
    return {
      searchResult: "",
      rules:{
        accountId: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        pwd:[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: /^[0-9a-zA-Z_]{1,}$/, message: '密码为字母数字下划线一种或多种组合'}
        ]
      },
      ruleForm:{
        accountId:"",
        operator:"",
        pwd:"",
        key:"",
        title:"",
        btnName:""
      },
      off:{
        dialog:false
      },
      options:"",
      departId:"",
      roperator:"",
      rdealerId:"",
      modifyop:false,
      opMainId:"",
    };
  },
  created: function() {
    this.getDepId()
  },
  methods: {
    getDepId(){
      let vm=this;
      requestOpenCardDepId()
      .then(res=>{
        if(res&&res.data){
          vm.options=res.data.list;
        }
      }).catch(e=>errorDeal(e))
    },
    getOpId(v){
      let vm=this;
      vm.modifyop=false;
      vm.rdealerId=v;
      requestOpenCardOpId({"dealerId":v})
      .then(res=>{
        if(res&&res.data){
          vm.searchResult=res.data.list;          
        }
      }).catch(e=>errorDeal(e))
    },
    operate(i,v){
      let vm=this;
      if(i===1){
        vm.off.dialog=true;
        vm.ruleForm={};
        vm.ruleForm.title="新增工号";
      }else if(i===2){
        let vm=this;
        vm.modifyop=true;
        vm.roperator=v.operator;
      }else if(i===3){
        updateOpenCardOp({"operator":v.operator})
        .then(res=>{
          if(res){
            vm.$message({
              message:'操作成功!',
              type:"success"
            });
          }
        }).then(()=>{
          vm.getOpId(vm.rdealerId);
        }).catch(e=>errorDeal(e,vm.modifyop=false))
      }else if(i==='ok'){
        let json;
        if(!vm.roperator){
          vm.$message({
            message:'操作人不能为空!',
            type:"error"
          });
        }
        json={
          "id": v.id,
          "operator": vm.roperator}
        updateOpenCardOpId(json)
        .then(res=>{
          if(res&&res.code==="200"){
            vm.$message({
              message:'操作成功!',
              type:"success"
            });
          }
        })
        .then(()=>{
          vm.getOpId(vm.rdealerId);
        })
        .catch(e=>errorDeal(e,vm.modifyop=false))
      }else if(i===0){
        vm.off.dialog=false;
      }
    },
  }
};
</script>
<style scoped>
    .m-title1{padding: 20px 40px;}
    .m-newinfo{ width: 500px; background: #fff; border: 5px solid #b4b4b4; border-radius: 5px; }
    .m-searchlist{width: 98%;margin: 0 auto}
    .m-searchlist table{width: 100%;text-align: center;border-collapse: collapse;border: 1px solid #eee;}
    .m-searchlist table tr{height: 40px;}
    .m-searchlist table tr:not(:last-child){border-bottom: 1px solid #eee}
    .m-searchlist table tr:nth-child(odd){background: #fafbfd; }
    .m-searchlist table tr:nth-child(even){background: #FFF}
    .m-searchlist table tr .powerId{display: inline-block;max-width: 200px;overflow: hidden;text-overflow: ellipsis}
    .m-searchlist table tr .roleDesc{display: inline-block;max-width: 200px;}
</style>

