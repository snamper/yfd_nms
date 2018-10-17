<style scoped>
@import "../../assets/css/layer2.css";
</style>
<template>
    <section id="detailsView" class="greyFont">
        <!-- 代理商管理自动同步时间设置 -->
        <div v-if="off.set" class="autoSync">
            <table>
                <thead>
                    <tr>
                        <th colspan="2">
                            同步设置
                        </th>
                    </tr>
                </thead>
                <tbody v-if="true">
                    <tr>
                        <td>
                            <span class="demonstration">同步开始日期&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <el-date-picker v-model="date" size="small" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="demonstration">同步开始时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <el-time-select editable v-model="time" size="small" :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '23:45'}" placeholder="选择时间">
                            </el-time-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="demonstration">同步间隔时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                            <el-select style="width:220px"  v-model="value" size="small" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="tdBtn" colspan="2">
                        <span @click="close()">取消</span>
                        <span @click="btnYes(1)">确认</span>
                    </tr>
                </tbody>
            </table>
            <div class="lay-mask"></div>
        </div>
        <!-- 代理商管理手动同步 -->
        <div v-if="off.sync">
            <table style="width:260px;">
                <thead>
                    <tr>
                        <th colspan="2">
                            <img style="width:50px;height:50px" src="../../assets/images/questionMark.png" alt="">
                        </th>
                    </tr>
                </thead>
                <tbody v-if="true">
                    <tr>
                        <td colspan="2">
                            <h3>是否要执行手动同步</h3>
                        </td>
                    </tr>
                    <tr class="tdBtn">
                        <td colspan="2" style="padding:0">
                            <span @click="close()">取消</span><span @click="btnYes(2)">确认</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="lay-mask"></div>
        </div>
    </section>
</template>
<script>
import { requestMethod, requestsetSyncTime } from "../../config/service.js";
import { getStore } from "../../config/utils/uutils";
import { errorDeal,getDateTime } from "../../config/utils";
export default {
  data() {
    return {
      count: "获取验证码",
      timer: null,
      show: true,
      date: "", //日期选择器
      time: "", //时间选择器
      value: 1, //同步间隔时间
      authCode: "", //验证码
      phone: "",
      userId: "",
      authCodeUrl: "", //验证码url
      syncUrl: "", //同步时间url
      user: "", //token的值
      btnDisabled: false,
      numberSection:"",
      off: {
        set: false, //同步时间设置
        sync: false, //手动同步
        syncNumberSection:false,//号段同步
        rsync: false, //手动同步操作结果
        numberSection:false
      },
      options: [ { value: 1, label: "1小时" }, { value: 2, label: "2小时" }, { value: 3, label: "3小时" }, { value: 4, label: "4小时" }, { value: 5, label: "5小时" }, { value: 6, label: "6小时" }, { value: 7, label: "7小时" }, { value: 8, label: "8小时" }, { value: 9, label: "9小时" }, { value: 10, label: "10小时" }, { value: 11, label: "11小时" }, { value: 12, label: "12小时" }, { value: 13, label: "13小时" }, { value: 14, label: "14小时" }, { value: 15, label: "15小时" }, { value: 16, label: "16小时" }, { value: 17, label: "17小时" }, { value: 18, label: "18小时" }, { value: 19, label: "19小时" }, { value: 20, label: "20小时" }, { value: 21, label: "21小时" },{ value: 22, label: "22小时" }, { value: 23, label: "23小时" }, { value: 24, label: "24小时" } ]
    };
  },
    created: function() {
        let vm = this,
            Info = getStore("YFD_NMS_INFO");
            vm.user = Info;
            vm.off.sync=false;
        if (vm.$parent.off.setSync == true) {
            vm.off.set = true;
            vm.off.sync = false;
        } else if (vm.$parent.off.sync == true) {//用户同步
            vm.off.sync = true;
            vm.off.set = false;
        }else if (vm.$parent.off.syncNumberSection == true) {
            vm.off.syncNumberSection = true;
            vm.off.set = false;
        }
        var st = vm.$parent.nextSyncTime;
        vm.date=getDateTime(st)[8];
        vm.time=getDateTime(st)[7];
    },
  methods: {
    getAuthCode(v) {//获取验证码
        const TIME_COUNT = 120;
        if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.btnDisabled = true;
                    this.count--;
                } else {
                    this.btnDisabled = false;
                    this.show = true;
                    this.count = "获取验证码";
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 1000);
        }
        let vm = this,
        data = { userId: vm.user.userId, phone: vm.user.phone || "" };
        vm.authCodeUrl = "/uus/w/user/getAuthCode";
        requestMethod(data, vm.authCodeUrl)
        .then(data => {
          if (data.hasOwnProperty("code") && data.code == 200) {
            layer.open({
              content: data.msg,
              skin: "msg",
              time: 2,
              msgSkin: "success"
            });
          } else if (data.hasOwnProperty("code") && data.code != 200) {
            layer.open({
              content: data.msg,
              skin: "msg",
              time: 2,
              msgSkin: "error"
            });
          } else{
                layer.open({
                    content: data,
                    skin: "msg",
                    time: 2,
                    msgSkin: "error"
                });
          }
        }).catch(e => errorDeal(e, function() { vm.$parent.off.layer = false; })
        );
    },
    btnYes(v) {//同步时间设置确认
        let vm = this;
        vm.$parent.off.layer=false;
        if(v==1){//自动同步设置
            var date = vm.date,
            time = vm.time,
            time = time.split(":"),
            nY = new Date(date).getFullYear(),
            nM = new Date(date).getMonth(),
            nD = new Date(date).getDate(),
            startT = new Date(nY, nM, nD, time[0], time[1]);
            requestsetSyncTime({ syncStartTime: new Date(startT).getTime(), syncInterval: vm.value },()=>{vm.$parent.off.layer=false})
            .then(data => {
                if (data.code == 200) {
                    layer.open({
                        content: "同步成功",
                        skin: "msg",
                        time: 2,
                        msgSkin: "success"
                    });
                    vm.$parent.search();
                }
            }).catch(e => errorDeal(e,()=>{vm.$parent.off.layer=false; vm.$parent.off.setSync=false; vm.$parent.off.sync=true;}));
        }else if(v==2){//手动同步
            this.resetTimer();
            let data = {
                phone: vm.user.phone,
            };
            vm.syncUrl = "/uus/w/user/sync";
            requestMethod(data,vm.syncUrl)
            .then((data)=>{
                vm.$parent.off.layer=false;
                if(data.hasOwnProperty('code')&&data.code==200){
                    vm.off.sync=false;
                    vm.off.rsync=true;
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    vm.$parent.search();
                }else if(data.hasOwnProperty('code')&&data.code!=200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }else(
                    layer.open({
                        content:data,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    })
                )
            }).catch(e=>errorDeal(e));
        }else if(v==3){//号段同步
            let vm=this;
            if(vm.numberSection==""||vm.numberSection.length!=7){
                layer.open({
                    content: "请输入正确的号段",
                    skin: "msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }
            this.resetTimer();
            vm.syncNumberSectionData = {
                phone: vm.user.phone,
                numberSection:vm.numberSection
            };
            vm.syncUrl = "/uus/w/number/syncSection";
            vm.off.syncNumberSection=false;
            vm.off.numberSection=true;
        }else if(v=='hdtb'){
            requestMethod(vm.syncNumberSectionData,vm.syncUrl)
            .then((data)=>{
                vm.$parent.off.layer=false;
                if(data.hasOwnProperty('code')&&data.code==200){
                    vm.off.sync=false;
                    vm.off.rsync=true;
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    vm.$parent.search();
                }else if(data.hasOwnProperty('code')&&data.code!=200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }else(
                    layer.open({
                        content:data,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    })
                )
            }).catch(e=>errorDeal(e));
        }
    },close() {
      var vm = this;
      vm.$parent.off.layer = false;
    },resetTimer() {
      this.btnDisabled = false;
      this.show = true;
      this.count = "获取验证码";
      clearInterval(this.timer);
      this.timer = null;
    },getDateTime(v){
        return getDateTime(v)
    }
  }
};
</script>
<style scoped>
    .m-module-manualInput{ padding-left:12px;height:30px;display: flex;}
    .m-module-manualInput>input{height:30px;width:180px;padding-left:10px;border-radius:4px 0 0 4px;outline:none;border:1px solid #DDDDDD}
    .m-module-manualInput>input:focus{border:1px solid #409EFF}
    .m-module-manualInput>button{height:30px;width:80px;border-radius:0 4px 4px 0;border:1px solid #409EFF;background:#409EFF;color:#fff}
</style>


