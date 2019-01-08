<template>
  <section>
    <div class="f-fs16 m-title1 f-display-f">
      <p style="flex:1"><span>工号列表</span></p><p v-if="false" style="flex:1;text-align:right"><el-button type="success" size="mini" @click="operate(1)">添加工号</el-button></p>
    </div>
    <div class="m-searchlist">
      <table>
        <tr>
          <td>序号</td>
          <td>账号</td>
          <td>操作人</td>
          <td>密码</td>
          <td>密钥</td>
          <td>操作</td>
        </tr>
        <tr v-for="(v,i) in searchResult" :key="i">
          <td>{{i+1}}</td>
          <td>{{v.dealerId}}</td>
          <td>{{v.operator}}</td>
          <td>{{v.password}}</td>
          <td>{{v.secretKey}}</td>
          <td><el-button type="success" size="mini" @click="operate(2,v)">修改</el-button></td>
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
import { requestOpenCardOpId,updateOpenCardOpId } from "../../config/service.js";
import { errorDeal } from '../../config/utils.js';
export default {
  data() {
    return {
      searchResult: "",
      // ruleForm:{
      //   raccountId:"",
      //   rpwd:""
      // },
      rules:{
        accountId: [
          { required: true, message: '账户ID不能为空', trigger: 'blur' }
        ],
        pwd:[
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
      opMainId:""
    };
  },
  created: function() {
    this.getOpId()
  },
  methods: {
    getOpId(){
      let vm=this;
      requestOpenCardOpId()
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
        vm.off.dialog=true;
        vm.ruleForm.title="修改工号信息";
        vm.ruleForm.accountId=v.dealerId;
        vm.ruleForm.operator=v.operator;
        vm.ruleForm.key=v.secretKey;
        vm.ruleForm.pwd=v.password;
        vm.opMainId = v.id;
      }else if(i==='ok'){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let json;
            json={
              "id": vm.opMainId,
              "dealerId": vm.ruleForm.accountId,
              "operator": vm.ruleForm.operator,
              "password": vm.ruleForm.pwd,
              "secretKey": vm.ruleForm.key}
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
              vm.off.dialog=false;
              vm.getOpId();
            })
            .catch(e=>errorDeal(e,vm.off.dialog=false))
          } else {
            return false;
          }
        });
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

