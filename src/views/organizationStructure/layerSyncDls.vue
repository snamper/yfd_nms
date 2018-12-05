
<template>
  <section id="detailsView" class="greyFont" >
    <!-- 代理商管理自动同步时间设置 -->
    <div v-if="off.set" class="autoSync" >
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
              <el-date-picker v-model="date" size="small" type="date" placeholder="选择日期" >
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td>
              <span class="demonstration">同步开始时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>
              <el-time-select
                editable
                v-model="time"
                size="small"
                :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '23:45'}"
                placeholder="选择时间"
              >
              </el-time-select>
            </td>
          </tr>
          <tr>
            <td>
              <span class="demonstration">同步间隔时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>
              <el-select
                style="width:182px"
                v-model="value"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr
            class="tdBtn"
            colspan="2"
          >
            <span @click="close()">取消</span>
            <span @click="btnYes(1)">确认</span>
          </tr>
        </tbody>
      </table>
      <div class="lay-mask"></div>
    </div>
  </section>
</template>
<script>
import { requestMethod, requestsetSyncTime } from "../../config/service.js";
import { errorDeal, getDateTime } from "../../config/utils";
import { getStore } from "../../config/utils/uutils";
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
      numberSection: "",
      off: {
        set: false, //同步时间设置
        sync: false, //手动同步
        syncNumberSection: false, //号段同步
        rsync: false, //手动同步操作结果
        numberSection: false
      },
      options: [
        { value: 1, label: "1小时" },
        { value: 2, label: "2小时" },
        { value: 3, label: "3小时" },
        { value: 4, label: "4小时" },
        { value: 5, label: "5小时" },
        { value: 6, label: "6小时" },
        { value: 7, label: "7小时" },
        { value: 8, label: "8小时" },
        { value: 9, label: "9小时" },
        { value: 10, label: "10小时" },
        { value: 11, label: "11小时" },
        { value: 12, label: "12小时" },
        { value: 13, label: "13小时" },
        { value: 14, label: "14小时" },
        { value: 15, label: "15小时" },
        { value: 16, label: "16小时" },
        { value: 17, label: "17小时" },
        { value: 18, label: "18小时" },
        { value: 19, label: "19小时" },
        { value: 20, label: "20小时" },
        { value: 21, label: "21小时" },
        { value: 22, label: "22小时" },
        { value: 23, label: "23小时" },
        { value: 24, label: "24小时" }
      ]
    };
  },
  created: function() {
    let vm = this,
      Info = getStore("YFD_NMS_INFO");
    vm.user = Info;
    vm.off.sync = false;
    if (vm.$parent.off.setSync == true) {
      vm.off.set = true;
      vm.off.sync = false;
    } else if (vm.$parent.off.sync == true) {
      //用户同步
      vm.off.sync = true;
      vm.off.set = false;
    } else if (vm.$parent.off.syncNumberSection == true) {
      vm.off.syncNumberSection = true;
      vm.off.set = false;
    }
    var st = vm.$parent.nextSyncTime;
    vm.date = getDateTime(st)[8];
    vm.time = getDateTime(st)[7];
  },
  methods: {
    btnYes(v) {
      //同步时间设置确认
      let vm = this;
      vm.$parent.off.layer = false;
      if (v == 1) {
        //自动同步设置
        var date = vm.date,
          time = vm.time,
          time = time.split(":"),
          nY = new Date(date).getFullYear(),
          nM = new Date(date).getMonth(),
          nD = new Date(date).getDate(),
          startT = new Date(nY, nM, nD, time[0], time[1]);
        requestsetSyncTime(
          { syncStartTime: new Date(startT).getTime(), syncInterval: vm.value },
          () => {
            vm.$parent.off.layer = false;
          }
        )
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
          })
          .catch(e =>
            errorDeal(e, () => {
              vm.$parent.off.layer = false;
              vm.$parent.off.setSync = false;
              vm.$parent.off.sync = true;
            })
          );
      }
    },
    close() {
      var vm = this;
      vm.$parent.off.layer = false;
    },
    resetTimer() {
      this.btnDisabled = false;
      this.show = true;
      this.count = "获取验证码";
      clearInterval(this.timer);
      this.timer = null;
    },
    getDateTime(v) {
      return getDateTime(v);
    }
  }
};
</script>
<style scoped>
.m-module-manualInput {
  padding-left: 12px;
  height: 30px;
  display: flex;
}
.m-module-manualInput > input {
  height: 30px;
  width: 180px;
  padding-left: 10px;
  border-radius: 4px 0 0 4px;
  outline: none;
  border: 1px solid #dddddd;
}
.m-module-manualInput > input:focus {
  border: 1px solid #409eff;
}
.m-module-manualInput > button {
  height: 30px;
  width: 80px;
  border-radius: 0 4px 4px 0;
  border: 1px solid #409eff;
  background: #409eff;
  color: #fff;
}
#detailsView{position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:0px 10px;}
#detailsView table th{padding: 15px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.tdBtn span{ display: inline-block;width: 50%;height: 40px;padding-top: 11px;margin-top: 20px;box-sizing: border-box;cursor: pointer}
.tdBtn span:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red}
.tdBtn span:nth-child(2){border-top: 1px solid #ccc;color: green}
tbody tr{height: 36px;}
.tdBtn2 {cursor: pointer}
.tdBtn2 span{display: inline-block;width: 100%; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px; }
.w84{width:84px}
.pdl12{padding-left:12px}
.m-input-phone p{width: 100%}
.m-input-phone p input{width:100%;padding: 0 10px;height: 30px;outline: none;border: 1px solid #e9e9e9;border-radius: 3px}
.m-input-phone p input:focus{border:1px solid #409EFF}
.m-module-manualInput>input::-webkit-input-placeholder, .m-input-phone p input::-webkit-input-placeholder{
    color:#bdbdbd;
}
.m-module-manualInput>input::-moz-placeholder, .m-input-phone p input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#bdbdbd;
}
.m-module-manualInput>input:-moz-placeholder, .m-input-phone p input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#bdbdbd;
}
.m-module-manualInput>input:-ms-input-placeholder, .m-input-phone p input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#bdbdbd;
}
.m-input-authCode{height:28px}

</style>


