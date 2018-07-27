<style scoped>
   @import "../../assets/css/notice.css";
</style>
<template>
    <section>
        <div class="imgBigDiv">
            <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
        </div>
        <div v-if="addMsg==true">
            <div class="messageBox">
                <el-row :gutter="10">
                    <el-col class="w70"><span>发送对象 :</span></el-col>
                    <el-col class="w240">
                        <span>
                            <el-radio v-model="radio" label="1">全部</el-radio>
                            <el-radio v-model="radio" label="2">店长</el-radio>
                            <el-radio v-model="radio" label="3">手动输入</el-radio>
                        </span>
                    </el-col>   
                    <el-col :xs="24" :sm="14" :md="16" :lg="16" :xl="18">
                        <el-col>
                            <el-input :disabled="radio==1||radio==2" v-model="input" size="small" placeholder="输入发送对象手机号码,可输入多个号码,以逗号隔开"></el-input>
                        </el-col>
                    </el-col>   
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" class="w70"><span>消息内容 :</span></el-col>
                    <p class="textareaBox">
                        <el-col :xs="18" :sm="20" :md="21" :lg="22" :xl="22" >
                        <el-input
                            type="textarea"
                            rows=3
                            resize=none
                            placeholder="输入消息内容"
                            maxlength="140"
                            v-model="textarea3">
                        </el-input>
                        <span>{{textarea3.length}}/140</span>
                        </el-col>   
                    </p>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" class="w70"><span>链接地址 :</span></el-col>
                    <el-col :xs="18" :sm="20" :md="21" :lg="22" :xl="22">
                        <el-input v-model="inputLink" size="small" placeholder="输入链接地址"></el-input>
                    </el-col>   
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="0" :sm="0" :md="0" :lg="2" :xl="2">&nbsp;</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="22">
                        <!-- <el-col :xs="0" :sm="0" :md="0" :lg="2" :xl="2"></el-col> -->
                        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="10" class="upImgBox">
                            <a href="javascript:void(0)" class="upLoada">
                                <input type="file" ref="file" name="file" id="file" accept="image/*" @change="handleBeforeUpload()">
                                <span>{{imgFileName||'(注:上传图片大小100k内)'}}</span>
                            </a>
                            <img v-bind:src="valuesrc" :class="upLoad==true?'upS':'upF'" v-if="off.imgIcon">
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="6"  >
                            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                                消息类型 : 
                                <el-form-item>
                                    <el-select v-model="formInline.region" placeholder="请选择消息类型" style="line-height:45px">
                                    <el-option  label="系统消息" value="600"></el-option>
                                    <el-option  label="政策消息" value="200"></el-option>
                                    <el-option  label="优惠促销" value="500"></el-option>
                                    <el-option  label="新货上架" value="400"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="6" >
                            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                                <div class="block">
                                    <span class="demonstration">有效期 : </span>
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    size="small"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </el-form>
                        </el-col>                    
                    </el-col>   
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="18" :sm="18" :md="20" :lg="20" :xl="20" >&nbsp;</el-col>
                    <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"  style="text-align:right"><el-button @click="upload()" type="success" size="small">发送</el-button></el-col>
                </el-row>
                <div class="borderBottomBox"></div>
            </div>
            <div class="noticeHistory" v-if="searchList.length>0">
                <h3>历史公告<span class="fontWeight greyFont">({{form.page}})</span></h3>
                <table style="width:100%;height:100%">
                    <tr v-for="(v,i) of searchList" :key="i">
                        <td>
                            <el-checkbox v-model="v.ischecked" :checked="v.ischecked" ></el-checkbox>
                        </td>
                        <td>
                            <div class="msgTime"><span class="timeBig">{{getDateTime(v.createTime)[2]}}日</span> {{getDateTime(v.createTime)[1]}}月 {{getDateTime(v.createTime)[0]}}年&nbsp;&nbsp;{{getDateTime(v.createTime)[5]}}<span class="fr">有效期 ：{{getDateTime(v.expTime)[0]}}年{{getDateTime(v.expTime)[1]}}月{{getDateTime(v.expTime)[2]}}日</span></div>
                            <div class="msgInfo">
                                <p v-if="v.content"><img class="icon" src="../../assets/images/icon/book.svg" alt="" /><span class="c-green"><span v-if="v.type=='600'">(系统消息)</span><span v-if="v.type=='200'">(政策消息)</span><span v-if="v.type=='500'">(优惠消息)</span><span v-if="v.type=='400'">(新货上架)</span></span><span v-if="v.content!=''">{{v.content}}</span></p>
                                <p v-if="v.redirectUrl"><img class="icon" src="../../assets/images/icon/link1.svg" alt="" /><a v-if="v.redirectUrl!=''" :href=v.redirectUrl target="_blank" class="c-blue textDec">{{v.redirectUrl}}</a></p>
                                <p>
                                    <label  v-if="v.annex.length>0">
                                        <img class="icon" src="../../assets/images/icon/link.svg" alt="" />
                                        附件&nbsp;:&nbsp;<a v-if="v.annex.length>0" :href="v.annex[0].fileUrl" target=_blank class="c-yellow textDec">{{v.annex[0].fileName}}</a>                                    
                                    </label>
                                    <span class="fr">
                                        发送对象:<a v-if="v.receiverType==1" href="javascript:void(0)" @click="checkSendUser(1,v)">全部</a>
                                        <a v-if="v.receiverType==2" href="javascript:void(0)" @click="checkSendUser(1,v)">店长</a>
                                        <a v-if="v.receiverType==3" href="javascript:void(0)" @click="checkSendUser(1,v)">手动输入</a>
                                    </span> 
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" > <a href="javascript:void(0)" @click="doFilter('all')">全选</a>  <a href="javascript:void(0)" @click="doFilter('none')">取消</a> <el-button size="small" style="height:26px;" @click="cancelMsg()"> 删除 </el-button></el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8"  style="text-align:right;"><el-col>
                        <div class="grid-content bg-purple" style="vertical-align:middle">
                            <el-pagination
                                layout="prev, pager, next"
                                :page-size="15"
                                @current-change="search"
                                :total="form.page">
                            </el-pagination>    
                        </div></el-col></el-col>
                </el-row>
            </div>
            <div class="noNoticeHistory" v-if="searchList.length<=0">
                历史消息记录为空
            </div>
        </div>
        <div v-if="addMsg==false">
            <div v-if="usersInfoArray.length>0">    
                <div class="listTitleFoot">
                    <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple">员工列表<span v-if="form.page>0" class="fontWeight greyFont"> ({{userTotal}})</span><a href="javascript:void(0)" class="fr" @click="goBack">返回</a></div></el-col>
                    </el-row>        
                </div>
                <div class="detailsListDiv">
                    <table class="searchTab" style="width:100%;height:100%;">
                        <tr>
                            <td>序号</td>
                            <td>接收人</td>
                            <td>手机号码</td>
                            <td>公司名称</td>
                        </tr>
                        <tr v-for="(v,i) of usersInfoArray" :key="i" :class="{'greyFont':v.departState==3}">
                            <td>
                                {{((pa-1)*20+(i+1))}}                                
                            </td>
                            <td>
                                {{v.username}}
                            </td>
                            <td >
                                <span href="javascript:void(0)">{{v.phone}}</span>
                            </td>
                            <td >
                                {{v.departName}}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="listTitleFoot">
                    <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-pagination
                            layout="prev, pager, next"
                            :page-size="20"
                            @current-change="checkSendUser"
                            :total="form.page2">
                        </el-pagination>    
                    </div></el-col>
                    </el-row>
                </div>
            </div>
            <div v-if="usersInfoArray.length==0" class="searchResultInfoNone">
            查询结果为空!
            </div>
        </div>
        <layer-confirm v-if="off.layer" :layerType="layerT"></layer-confirm>
    </section>
</template>
<script>
import {ImgToBase64} from "../../config/utils/ImgToBase64"
import { Loading } from 'element-ui';
import {requestMethod} from "../../config/service.js"; 
import { errorDeal,getDateTime } from '../../config/utils';
import layerConfirm from "../../components/layerConfirm";
import imgBiger from "../../components/ImgBiger";
import successIcon from "../../assets/images/icon/success-circle.svg"
import errorIcon from "../../assets/images/icon/ava_error.svg"
export default {
    data(){
        return{
            showImg:false,
            imgSrc: '',
            imgBase64:"",
            pa:1,
            cancelInfo:"",
            layerT:"notice",
            usersInfoArray:"",
            usersTotal:"",
            addMsg:true,
            upLoad:"",
            valuesrc:"",
            radio:"1",//发送对象
            input:"",//手动输入发送对象
            textarea3:"",//
            inputLink:"",//链接地址
            value1:"",//日期
            formInline:{region:"600"},//消息类型
            imgFile:"",
            fileList:[],
            isCancel:false,//删除公告
            checkSendUserData:"",
            imgFileName:"",
            off:{
                layer:false,
                isConfirm:false,
                imgIcon:false
            },
            form:{
                page:0,
                page2:0
            },
            searchList:"",

            showImg:false,
    　　　　 imgSrc: ''
        }
    },  
    components:{
        "layer-confirm":layerConfirm,
        'big-img':imgBiger
    },
    created:function(){
        let vm=this;
        vm.search(1);
        let d=new Date().getTime();
        d+=30*24*60*60*1000;
        vm.value1=new Date(d).getTime()
    },
    computed:{

    },
    methods: {
        reSet(){
            let vm=this;
            vm.radio="1";
            vm.textarea3="";
            vm.inputLink="";
            vm.formInline.region="600";
            vm.value1="";
            vm.imgFileName="";
            vm.off.imgIcon=false;
            vm.$refs.file.value="";
            let d=new Date().getTime();
            d+=30*24*60*60*1000;
            vm.value1=new Date(d).getTime();
        },
        upload(){
            let vm=this, sendData= {
                "appicationId": "",
                "body": {
                    "annex": [],
                    "category": "",
                    "channel": "",
                    "content": vm.textarea3,
                    "redirectUrl": vm.inputLink,
                    "title": "",
                    "type":vm.formInline.region,
                },
                "expTime": new Date(vm.value1).getTime()||"",
                "msgType":"",
                "recipientType":vm.radio,
                "recipients": "",
                "sender": "",
            }
            if(vm.radio==3&&vm.input==""){
                layer.open({
                    content:"请输入要发送对象的手机号码",
                    skin:"msg",
                    time:2,
                    msgSkin:"error"
                })
                return false
            }else{
                let arr=vm.input.split(",");
                sendData.recipients=arr;
            }
            if(vm.textarea3==""){
                layer.open({
                    content:"请输入消息内容,不超过140字",
                    skin:"msg",
                    time:2,
                    msgSkin:"error"
                })
                return false
            }
            // if(vm.inputLink==""){
            //     layer.open({
            //         content:"请输入链接地址",
            //         skin:"msg",
            //         time:2,
            //         msgSkin:"error"
            //     })
            //     return false
            // }
            if(vm.formInline.region==""){
                layer.open({
                    content:"请选择消息类型",
                    skin:"msg",
                    time:2,
                    msgSkin:"error"
                })
                return false
            }
            if(vm.value1==""){
                layer.open({
                    content:"请选择日期",
                    skin:"msg",
                    time:2,
                    msgSkin:"error"
                })
                return false
            }
            if(vm.imgFile!=""){
                sendData.body.annex.push(vm.imgFile);
            }
            requestMethod(sendData,"/mns/w/msg/add")
            .then((data)=>{
                if(data.code==200){
                    this.search(vm.pa);
                    // this.$refs.file.value="";
                    // vm.off.imgIcon=false;
                    // vm.textarea3=="";
                    // vm.inputLink=="";
                    // vm.formInline.region=="";
                    // vm.value1=="";
                    layer.open({
                        content:"发送成功",
                        skin:"msg",
                        time:2,
                        msgSkin:"success"
                    })
                    this.reSet();
                }else{
                errorDeal(data)
                }
            }).catch(e=>errorDeal(e));
        },
        handleBeforeUpload(e){//上传图片
            let file=this.$refs.file.files[0];
            let vm=this;
            ImgToBase64(file,1000,function(base64){
                let data={"image":base64},url="/mns/w/msg/imgUpload";
                requestMethod(data,url)
                .then((resdata)=>{
                        vm.valuesrc=successIcon;
                        vm.off.imgIcon=true;
                        vm.upLoad=false;
                        vm.imgFile=resdata.data;
                        vm.imgFileName=file.name;
                    if(resdata.code==200){
                        layer.open({
                            content:'图片上传成功',
                            skin: 'msg',
                            time: 3,
                            msgSkin:'success',
                        })
                    }else{
                        vm.valuesrc=errorIcon;
                        vm.off.imgIcon=true;                      
                        vm.upLoad=false;
                        layer.open({
                            content:'图片上传失败,请联系管理员',
                            skin: 'msg',
                            time: 3,
                            msgSkin:'error',
                        })
                    }
                }).catch(e=>errorDeal(e));
            })
        },
        doFilter(type){//全选/取消
            let vm=this;
            if(type=="all"){
                for(let i=0;i<vm.searchList.length;i++){
                    this.$set(vm.searchList[i],'ischecked',true)
                }
            }else if(type=="none"){
                for(let i=0;i<vm.searchList.length;i++){
                    this.$set(vm.searchList[i],'ischecked',false)
                }
            }
        },cancelMsg(){
            let vm=this,
            data={msgIds:[]};
            vm.off.layer=false;
            vm.off.isConfirm=false;
            vm.isCancel=false;
            for(let i=0;i<vm.searchList.length;i++){
                if(vm.searchList[i].ischecked==true){
                    data.msgIds.push(vm.searchList[i].msgId);
                    vm.isCancel=true;
                }
            }
            vm.cancelInfo=data;
            if(vm.isCancel==false){
                layer.open({
                    content:'请选择要删除的公告消息',
                    skin: 'msg',
                    time: 3,
                    msgSkin:'error',
                })
                return false;
            }else if(vm.isCancel==true){
                vm.off.layer=true;
            }
        },search(index){
            let vm=this;
            vm.pa=index||1;
            requestMethod({pageSize:15,pageNum:index},"/mns/w/msg/searchBulletin")
            .then((data)=>{
                if(data.code==200){
                    vm.form.page=data.data.total;
                    vm.searchList=data.data.bulletins;
                    this.doFilter("none");
                }else{
                    errorDeal(data.code);
                }
                
            }).catch(e=>errorDeal(e));
        },checkSendUser(p,v){//查看公告发送对象信息
            let vm=this;
            vm.pa=p||1;
            if(v!=undefined){
            let data={"msgId":v.msgId,"recipientType":v.receiverType,pageSize:20};
            vm.checkSendUserData=data;
            }
            vm.checkSendUserData.pageNum=p||1
            requestMethod(vm.checkSendUserData,"/mns/w/msg/searchReceivers")
            .then((data)=>{
            if(data.code==200){
                vm.addMsg=false;
                vm.form.page2=data.data.total;
                vm.userTotal=data.data.total;
                vm.usersInfoArray=data.data.users;
            }else{
                layer.open({
                    content:data.msg,
                    skin: 'msg',
                    time: 3,
                    msgSkin:'error',
                })
            }
            }).catch(e=>errorDeal(e));
        },getDateTime(v){
            return getDateTime(v);
        },
        goBack(){
            this.addMsg=true;
        },
        clickImg(e) {
            this.showImg = true;// 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
        imgBigFunction(e){
            let vm=this,imgSrc=e.annex[0].base64String;
            for(let i in vm.$refs.imgBigFunction){
                if(vm.$refs.imgBigFunction[i].src==imgSrc){
                    this.$refs.imgBigFunction[i].click();
                }
            }
        }
    }
}
</script>
