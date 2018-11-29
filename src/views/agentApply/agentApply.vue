<template>
  <section>
    <div class="agentApply">
      <div class="greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">选择时间：</div>
              </el-col>
              <el-col :xs="18" :sm="18" :md="20" :lg="18" :xl="18">
                <div class="f-display-ib">
                  <el-date-picker v-model="startTime" size="small" type="datetime" :clearable=false :editable=false placeholder="选择开始时间">
                  </el-date-picker><el-date-picker v-model="endTime" size="small" type="datetime" :clearable=false :editable=false placeholder="选择结束时间">
                  </el-date-picker>
                </div>
                &nbsp;&nbsp;( <el-radio v-model="timeType" label="1">修改时间</el-radio>
                <el-radio v-model="timeType" label="2">创建时间</el-radio> )
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">手机号码：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-input v-model="phone" :maxlength="11" size="small" placeholder="请输入查询的联系人手机号码"></el-input>
              </el-col>
              <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4">
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-input v-model="name" :maxlength="20" size="small" placeholder="请输入查询的联系人姓名"></el-input>
              </el-col>
              <el-col :xs="24" :sm="7" :md="7" :lg="4" :xl="4">
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-radio v-model="status" label="">全部</el-radio>
                <el-radio v-model="status" label="1">未审核</el-radio>
                <el-radio v-model="status" label="2">已通过</el-radio>
                <el-radio v-model="status" label="3">已拒绝</el-radio>
              </el-col>
              <el-col :xs="24" :sm="2" :md="7" :lg="4" :xl="4"></el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">代理商类型：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-radio v-model="ctype" label="">全部</el-radio>
                <el-radio v-model="ctype" label="2">个人</el-radio>
                <el-radio v-model="ctype" label="1">企业</el-radio>
              </el-col>
              <el-col :xs="24" :sm="2" :md="7" :lg="4" :xl="4"></el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search(1,1)">搜索</button>
        </el-row>
      </div>
      <div v-if="searchList">
        <div class="m-listTitleFoot">
          <h3>代理商列表<span class="f-fw greyFont">({{page||'0'}})</span></h3>
        </div>
        <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr class="f-s-14">
              <td>序号</td>
              <td>创建时间</td>
              <td>类型</td>
              <td>公司名称</td>
              <td>营业执照编号</td>
              <td>联系人</td>
              <td>手机号码</td>
              <td>证件号码</td>
              <td>照片信息</td>
              <td>修改时间</td>
              <td>当前状态</td>
              <td>操作</td>
              <td></td>
            </tr>
            <tr v-for="(v,i) in searchList.list" :key="i">
              <td>{{(currentPage-1)*15+(i+1)}}</td>
              <td>{{getDateTime(v.createTime)[6]}}</td>
              <td>{{v.type==1?'公司':v.type==2?'个人':'--'}}</td>
              <td>{{v.companyName||'--'}}</td>
              <td>{{v.licenseNumber||'--'}}</td>
              <td>{{v.username||'--'}}</td>
              <td>{{v.phone||'--'}}</td>
              <td>{{v.idNumber||'--'}}</td>
              <td><a @click="toview(v)">查看照片</a></td>
              <td>{{getDateTime(v.modifyTime)[6]}}</td>
              <td>{{v.state==1?'未审核':v.state==2?'通过':v.state==3?'拒绝':'--'}}</td>
              <td><a v-if="v.state==1" @click="tomodify(v)">编辑</a><a v-else>--</a></td>
              <td><button v-if="v.state==1" @click="review(v,2)" class="m-btn-green m-btn-small">同意</button>&nbsp;&nbsp;<button v-if="v.state==1" @click="review(v,3)" class="m-btn-red m-btn-small">拒绝</button></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="m-listTitleFoot" v-if="searchList.length!=0">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-pagination layout="prev, pager, next" :page-size="pageSize" @current-change="search(currentPage,1)" :current-page.sync="currentPage" :total="page">
              </el-pagination>
            </div>
          </el-col>
          <el-col v-if="false" :span="12">
            <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div>
          </el-col>
        </el-row>
      </div>
      <div class="m-dialog" v-if="off.dialog">
        <div class="m-newinfo">
          <p class="m-dialog-title">修改审核资料<span class="m-icon-close" @click="closemidify()"></span></p>
          <div class="m-dialog-content">
            <el-form label-width="80px">
              <el-form-item label="类型">
                <el-radio-group v-model="cotype">
                  <el-radio :label="1">公司</el-radio>
                  <el-radio :label="2">个人</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="cotype==1" label="公司名称">
                <el-input size="small" v-model="cname"></el-input>
              </el-form-item>
              <el-form-item v-if="cotype==1" label="营业执照">
                <el-input size="small" v-model="businesslicense"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input size="small" v-model="mname"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input size="small" :maxlength="11" v-model="mphone"></el-input>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input size="small" :maxlength="50" v-model="idCardNum"></el-input>
              </el-form-item>
              <el-form-item label="照片">
                <p class="grey f-s-12">( 请上传清晰的{{cotype==2?'身份证手持':cotype==1?'营业执照':'--'}}，身份证正面以及身份证背面照片 )</p>
                <div class="upload-img">
                  <div class="up-img-left">
                    <el-upload
                      class="avatar-uploader"
                      action="/ums/w/application/upload"
                      name="files"
                      :headers="upinfo"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload1">
                      <img v-if="imageUrlhand" :src="imageUrlhand" class="avatar">
                      <i v-else class="avatar-uploader-icon">{{cotype==2?'正面手持照':cotype==1?'营业执照':'--'}}</i>
                    </el-upload>
                  </div>
                  <div class="up-img-right">
                    <el-upload
                      class="avatar-uploader"
                      action="/ums/w/application/upload"
                      name="files"
                      :headers="upinfo"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload2">
                      <img v-if="imageUrlfront" :src="imageUrlfront" class="avatar">
                      <i v-else class="avatar-uploader-icon">身份证正面</i>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      action="/ums/w/application/upload"
                      name="files"
                      :headers="upinfo"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
                      :before-upload="beforeAvatarUpload3">
                      <img v-if="imageUrlback" :src="imageUrlback" class="avatar">
                      <i v-else class="avatar-uploader-icon">身份证背面</i>
                    </el-upload>
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <p style="text-align:center"><button @click="saveForm" class="m-btn-green m-btn-search">确认修改</button></p>
          </div>
        </div>
      </div>
      <div class="m-dialog" v-if="off.picinfo">
        <div class="m-pic">
          <p class="m-dialog-title">修改审核资料<span class="m-icon-close" @click="closeview()"></span></p>
          <div class="m-picinfo">
            <div class="pic-left">
              <p>手持照片</p>
              <img :src="pichand" alt="">
            </div>
            <div class="pic-right">
              <p>正面照</p>
              <img :src="picfront" alt="">
              <p>背面照</p>
              <img :src="picback" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getTimeFunction,getDateTime,errorDeal,getStore } from "@/config/utils";
import { applicationlist,updateAgentInfo,applyReview } from "@/config/service.js";
export default {
  name: "agentApply",
  data() {
    return {
      no_img:require('../../assets/images/no-img.png'),
      timeType:"1",
      startTime:"",
      endTime:"",
      phone:"",
      name:"",
      status:"",
      ctype:"",
      currentPage:0,
      total:0,
      page:0,
      pageSize:15,
      searchList:"",
      searchJson:"",
      off:{
        dialog:false,
        picinfo:false
      },
      cname:"",
      mphone:"",
      businesslicense:"",
      mname:"",
      idCardNum:"",
      idNum:"",
      cotype:"",
      pichand:"",
      picfront:"",
      picback:"",
      imageUrlhand:"",
      imageUrlfront:"",
      imageUrlback:"",
      imagehand:"",
      imagefront:"",
      imageback:"",
      upinfo:{},
    };
  },
  created: function() {
    getTimeFunction(this);
    let vm=this,userInfo,packageName,timestamp,token,userId;
    userInfo = getStore("YFD_NMS_INFO");
    packageName = userInfo.packageName;
    timestamp = userInfo.timestamp;
    token = userInfo.token;
    userId = userInfo.userId;
    Object.assign(vm.upinfo,{packageName},{timestamp},{token},{userId}); 
  },
  methods: {
    search(p,i){
      let vm=this,json,states,types;
      if(i==1){
        if(vm.status){
          states=vm.status.split(',')
        }else{
          states=[]
        }
        if(vm.ctype){
          types=vm.ctype.split(',')
        }else{
          types=[]
        }
        json={"endTime": new Date(vm.endTime).getTime(),
          "pageNum": p||1,
          "pageSize": vm.pageSize,
          "phone": vm.phone,
          "startTime": new Date(vm.startTime).getTime(),
          "states": states,
          "timeType": vm.timeType,
          "types": types,
          "username":vm.name
        }
        vm.currentPage=p||1;
        vm.searchJson = json;
      }
      applicationlist(vm.searchJson)
      .then((data)=>{
        vm.searchList=data.data;
        vm.page=data.data.total;
      }).catch(e=>errorDeal(e))
    },saveForm(){
      let vm=this,json;
      json={"type": vm.cotype,
        "username": vm.mname,
        "phone": vm.mphone,
        "idNumber": vm.idCardNum,
        "frontImg": vm.imagefront,
        "backImg": vm.imageback,
        "id":vm.idNum,
        "handImg": "",
        "licenseImg": "",
        "licenseNumber": "",
        "companyName": ""
      }
      if(vm.cotype==1){
        Object.assign(json,{"licenseImg":vm.imagehand,"licenseNumber": vm.businesslicense,"companyName": vm.cname}) 
      }else{
        Object.assign(json,{"handImg":vm.imagehand}) 
      }
      updateAgentInfo(json)
      .then((data)=>{
        if(data&&data.code==200){
          layer.open({
            content: "修改申请信息成功",
            skin: "msg",
            time: 2,
            msgSkin: "success"
          });
          vm.closemidify();
          vm.search(vm.currentPage,2);
        }
      })
    },toview(v){
      let vm=this;
      vm.off.picinfo=true;
      vm.pichand = v.handImg||vm.no_img;
      vm.picfront = v.frontImg||vm.no_img;
      vm.picback = v.backImg||vm.no_img;
    },closeview(){
      let vm=this;
      vm.off.picinfo=false;
    },tomodify(v){
      let vm=this;
      vm.off.dialog=true;
      vm.cotype = v.type;
      vm.cname = v.companyName;
      vm.businesslicense = v.licenseNumber;
      vm.mname = v.username;
      vm.mphone = v.phone;
      vm.idCardNum = v.idNumber;
      vm.idNum = v.id;
      // this.imageUrlhand=v.handImg;
      // this.imageUrlfront=v.frontImg;
      // this.imageUrlback=v.backImg;
    },closemidify(){
      let vm=this;
      vm.off.dialog=false;
      vm.resetImg();
    },review(v,i){
      let vm=this,json;
      json={
        "id": v.id,
        "remark": "",
        "state": i
      }
      applyReview(json)
      .then((data)=>{
        if(data&&data.code==200){
          layer.open({
            content: "审核操作成功",
            skin: "msg",
            time: 2,
            msgSkin: "success"
          });
          vm.search(vm.currentPage,2);
          vm.resetImg();
        }
      }).catch(e=>errorDeal(e))
    }, handleAvatarSuccess1(res, file) {
      this.imageUrlhand = URL.createObjectURL(file.raw);
      this.imagehand = res.data.imagePath;
      if(res.code==200){
        this.$message('上传照片成功!');
      }else{
        this.$message.error('上传照片失败!');
      }
    },handleAvatarSuccess2(res, file) {
      this.imageUrlfront = URL.createObjectURL(file.raw);
      this.imagefront = res.data.imagePath;
      if(res.code==200){
        this.$message('上传照片成功!');
      }else{
        this.$message.error('上传照片失败!');
      }
    },handleAvatarSuccess3(res, file) {
      this.imageUrlback = URL.createObjectURL(file.raw);
      this.imageback = res.data.imagePath;
      if(res.code==200){
        this.$message('上传照片成功!');
      }else{
        this.$message.error('上传照片失败!');
      }
    },
    beforeAvatarUpload1(file) {
      Object.assign(this.upinfo,{side:1});
      const isJPG = (file.type).match(/image\/*/);
      if (!isJPG) {
        this.$message.error('图片格式有问题!');
      }
      return isJPG;
    },beforeAvatarUpload2(file) {
      Object.assign(this.upinfo,{side:2});
      const isJPG = (file.type).match(/image\/*/);
      if (!isJPG) {
        this.$message.error('图片格式有问题!');
      }
      return isJPG;
    },beforeAvatarUpload3(file) {
      Object.assign(this.upinfo,{side:3});
      const isJPG = (file.type).match(/image\/*/);
      if (!isJPG) {
        this.$message.error('图片格式有问题!');
      }
      return isJPG;
    },getDateTime(v) {
      return getDateTime(v);
    },resetImg(){
      let vm=this;
      vm.imageUrlhand="";
      vm.imageUrlfront="";
      vm.imageUrlback="";
      vm.imagehand="";
      vm.imagefront="";
      vm.imageback="";
    }
  }
};
</script>
<style>
.m-pic{
  width: 500px;
  background: #fff;
  border: 5px solid #b4b4b4;
  border-radius: 5px;
}
.m-picinfo{
  padding: 10px;
  display: flex;
  width: 500px;
}
.m-newinfo{
  width: 500px;
  background: #fff;
  border: 5px solid #b4b4b4;
  border-radius: 5px;
}
.pic-left{
  flex:1;
}
.pic-left>img{
  width: 200px;
}
.pic-right{
  flex:1;
}
.pic-right>img{
  width: 200px;
}
.el-form-item{
  margin-bottom: 10px;
}
.upload-img{
  display: flex;
  height: 200px;
}
/* .upload-img>.up-img-left{box-sizing: border-box;flex:1;border: 1px dashed #b8b8b8;border-radius: 4px;} */
.upload-img>.up-img-left{flex:1;};
.upload-img>.up-img-right{flex:1;padding:0 20px;}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.up-img-left .avatar-uploader-icon {
  display: inline-block;
  font-size: 20px;
  color: #8c939d;
  width: 150px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.up-img-right .avatar-uploader-icon {
  display: inline-block;
  font-size: 20px;
  color: #8c939d;
  width: 170px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.up-img-left .avatar {
  width: 150px;
  height: 178px;
  display: block;
}
.up-img-right .avatar {
  width: 170px;
  height: 80px;
  display: block;
}
</style>

