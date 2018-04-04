<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:5px 30px;}
#detailsView table th{padding: 18px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.tdBtn span{ display: inline-block;width: 50%;height: 50px;padding: 20px;margin-top: 20px;box-sizing: border-box;cursor: pointer}
.tdBtn span:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red}
.tdBtn span:nth-child(2){border-top: 1px solid #ccc;color: green}
tbody tr{height: 36px;}
.tdBtn2 {cursor: pointer}
.tdBtn2 span{display: inline-block;width: 100%; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px; }
</style>
<template>
<section  id="detailsView" class="greyFont">
	<!-- 同步时间设置 -->
    <div v-if="off.set">
		<table >
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
                        <el-date-picker
                        v-model="date"
                        size="small"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>				
					</td>
				</tr>
                <tr>
                    <td>
						<span class="demonstration">同步开始时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>                        
                        <el-time-select
                        v-model="time"
                        size="small"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                        }"
                        placeholder="选择时间">
                        </el-time-select>
                    </td>
                </tr>
                <tr>
                    <td>
						<span class="demonstration">同步间隔时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>                                                
                        <el-select v-model="value" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
    <!-- 手动同步 -->
    <div v-if="off.sync">
        <table >
			<thead>
				<tr>
					<th colspan="2">
						添加员工
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
                <tr colspan="2">
                    <td class="fl"><p>验证号码:<span v-model="user.phone">{{user.phone}}</span></p></td>
                </tr>
                <tr colspan="2">
					<el-input v-model="authCode" size="mini" :maxlength="6" style="width:60%" placeholder="请输入短信验证码"></el-input><el-button style="width:112px" v-model="count" size="mini" type="primary" @click="getAuthCode(userId)" :disabled="btnDisabled">{{count}}</el-button>
				</tr>
                <tr class="tdBtn" colspan="2">
                    <span @click="close()">取消</span>
                    <span @click="btnYes(2)">确认</span>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
    <!-- 手动同步操作结果 -->
    <div v-if="off.rsync">
        <table >
			<tbody v-if="true">
                <tr colspan="2">
                    <img src="../src/assets/images/icon_wenhao.png" alt="">
                </tr>
                <tr colspan="2">
					码号手动同步已受理，请耐心等待结果
				</tr>
                <tr class="tdBtn2" colspan="2">
                    <span @click="close()">确认</span>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
</section>
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import {requestMethod} from "../src/config/service.js"; 
import { errorDeal } from '../src/config/utils';
export default{
	data (){
		return {
            count: '点击获取验证码',
            timer: null,
            show:true,
            date:'',//日期选择器
            time:'',//时间选择器
            value:'',//同步间隔时间
            authCode:'',//验证码
            phone:'',
            userId:'',
            authCodeUrl:'',//验证码url
            syncUrl:'',//同步时间url
            user:'',//token的值
            btnDisabled:false,
            searchType:'',//
             options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            off:{
                set:false,//同步时间设置
                sync:false,//手动同步
                rsync:false,//手动同步操作结果
            }
		}
		
    },
	created:function(){
        let vm=this,userInfo=localStorage.getItem("KA_ECS_USER");
        let Info=JSON.parse(userInfo);
        vm.user=Info;
        vm.searchType=vm.$parent.searchType;
		if(vm.$parent.off.setSync==true){
            vm.off.set=true;
            vm.off.sync=false;
        }else if(vm.$parent.off.sync==true){
            vm.off.sync=true;
            vm.off.set=false;
        }
	},
	methods:{
        getAuthCode(v){//获取验证码
            const TIME_COUNT = 120;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.btnDisabled=true;
                    this.count--;
                    } else {
                    this.btnDisabled=false;                        
                    this.show = true;
                    this.count="点击获取验证码"
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
            let vm=this, 
            // data={"userId":vm.user.username,"phone":15684765209};
            data={"userId":vm.user.userId,"phone":vm.user.phone||""};
                vm.authCodeUrl="/yfd-ums/w/user/getAuthCode";
            requestMethod(data,vm.authCodeUrl)
            .then((data)=>{
                if(data.hasOwnProperty('code')&&data.code==200){
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
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
        ,btnYes(v){//确认添加员工
            let vm=this,url='/yfd-ums/w/user/addUsers',data='',load=Loading.service(options);
            data=vm.$parent.addUsersData;
            // data={'searchDepartId':vm.$parent.$parent.searchDepartId,userState:vm.$parent.radio,username:vm.$parent.name,phone:vm.$parent.phone,pageNum:v||1,pageSize:"10"};            
            if(vm.authCode==''){
                layer.open({
                    content:'请输入验证码',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                })
                return false;
            }
            data.authCode=vm.authCode;
            requestMethod(data,url)
            .then((data)=>{
                vm.$parent.off.layer=false;
                if(data.code==200){
                    layer.open({
                        content:'操作成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    this.$parent.list=[],
                    this.$parent.list.push({username: '', phone: '',checked:false,checked2:false})
                    if(this.searchType!=1){
                        this.search();
                    }else if(this.searchType==1){
                        let vm=this,data={},url='/yfd-ums/w/user/getDepartDetail',load=Loading.service(options);
                        vm.searchDetailsType=1;
                        vm.searchDepartId=vm.$parent.searchDepartId;
                        // data={'searchDepartId':vm.searchDepartId};
                        data={'searchDepartId':vm.$parent.searchDepartId,userState:vm.$parent.radio,username:vm.$parent.name,phone:vm.$parent.phone,pageNum:1,pageSize:"10"};            
                        vm.companyName=v.departName;
                        vm.managerName=v.managerName;
                        vm.managerPhone=v.phone;
                        requestMethod(data,url)
                        .then((data)=>{
                            load.close();
                            if(data.code==200){
                                if(data.data.users.length>0){
                                    vm.$parent.off.notDlsDetails=false;
                                    vm.$parent.off.dlsDetails=true;
                                    vm.$parent.$parent.detailsList=data.data.users;
                                }else{
                                    vm.$parent.off.notDlsDetails=false;
                                    vm.$parent.off.dlsDetails=true;
                                    vm.$parent.$parent.detailsList=data.data.users;                                    
                                }
                            }else{
                                errorDeal(data);
                            }
                        }).catch(e=>errorDeal(e));
                    } 
                }else{
                    //    this.list[i].username="",
                    //    this.list[i].phone="",
                    //    this.list[i].checked=false,
                    //    this.list[i].checked2=false


                       this.$parent.list=[],
                       this.$parent.list.push({username: '', phone: '',checked:false,checked2:false})
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                }  
            }).then(()=>{
                load.close();
            }).catch(e=>errorDeal(e))
        },
		close:function(){
            var vm=this;
			vm.$parent.off.layer=false;
		},
	}
}
</script>

