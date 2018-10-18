<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 38px;}
    .listTitleFoot label{display:block;width: 50%;}
    .detailsUlDiv{width: 90%;height: 90%;margin-left:40px;}
    .detailsUlDiv ul{border-left: 1px solid rgb(228, 228, 228);border-right: 1px solid rgb(228, 228, 228);border-top: 1px solid rgb(228, 228, 228)}
    .detailsUlDiv ul li {padding: 6px 18px;border-bottom: 1px solid rgb(228, 228, 228)}
    .detailsUlDiv ul li:nth-child(odd){background: #FFF;}
    input.modifyInput{height: 30px;border-radius: 4px;outline: none;border: 1px solid #ccc;padding-left: 15px;padding-right:8px; }
    div.modifyStaffInfo .change{border-radius:6px;padding:6px 40px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
    div.modifyStaffInfo .changeNo{border-radius:6px;padding:6px 40px;background: #C14752;border:1px solid #C14752;outline: none;color:#fff;}
    div.modifyStaffInfo .changeYes{margin-left: 10px;border-radius:6px;padding:6px 40px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;}
    .m-head-title{height: 45px;border-bottom: 1px solid #ccc;width: 98%;margin-left: 1%;display: flex}
    .m-head-title label{flex: 1}
    .m-head-title label:nth-child(1){text-align: left;padding-left: 1%}
    .m-head-title label:nth-child(1) a{line-height: 45px;font-size: 16px}
    .m-head-title label:nth-child(2){text-align: right;margin-right: 1%;}
    .m-head-title label:nth-child(2) a{line-height: 45px;color:#43AAD4;cursor: pointer;}
</style>
<template>
    <div>
        <div class="yfd">
            <!-- <el-container>
                <el-header class="headTitleNav">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">公司名称&nbsp;:&nbsp;<a class="c-blue" href="javascript:void(0)"  @click="goBack()">{{forms.departName}}</a></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fr " style="padding-right:40px"><a href="javascript:void(0)" class="fcaqua" @click="goBack()">返回列表</a></div></el-col>
                    </el-row>
                </el-header>         
            </el-container> -->
        <p class="m-head-title">
            <label>公司名称 : &nbsp;<a class="c-blue" href="javascript:void(0)"  @click="goBack()">{{forms.departName}}</a></label>
            <label><a @click="goBack()">返回列表</a></label>
        </p>
        </div>
        <div class="listTitleFoot" style="margin:0 38px;">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple"><h3 style="padding-left:20px;">员工详情</h3></div></el-col>
            </el-row> 
        </div>
        <div class="detailsUlDiv f-s-14">
            <ul>
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">用户姓名&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <p v-if="off.noModify">{{forms.username}}</p>
                            <input class="modifyInput" v-if="off.modify" type="text" v-model="forms.username">
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">手机号码&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <p v-if="off.noModify">{{forms.phone}}</p>
                            <input class="modifyInput" :maxlength="11" v-if="off.modify" type="text" v-model="forms.phone">    
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">角色&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col v-if="!off.modify"  :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <span v-for="(v,i) in forms.userRole.split(',')" :key="i">
                                {{translateRole(v,rolelist1)}} <span v-if="forms.userRole.split(',').length-1>i">,</span>
                            </span>
                        </div></el-col>
                        <!-- <el-col v-if="off.modify" :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <el-checkbox-group class="displayInline" v-model="role">
                                <el-checkbox v-if="userRoleSwitch==1" label=1>管理员</el-checkbox>
                                <el-checkbox v-if="userRoleSwitch==1" label=2>销售</el-checkbox>
                                <el-checkbox v-if="userRoleSwitch==1" label=6>提卡客服</el-checkbox>
                                <el-checkbox v-if="userRoleSwitch==1" label=7>开卡客服</el-checkbox>
                                <el-checkbox v-if="userRoleSwitch==2" label=4>采购员</el-checkbox>
                                <el-checkbox v-if="userRoleSwitch==2" label=5>业务员</el-checkbox>
                            </el-checkbox-group>
                        </div></el-col> -->
                        <el-col v-if="off.modify" :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <el-select size="mini" v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in rolelist"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">创建时间&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                                <span v-if="forms.createTime">
                                    {{getDateTime(forms.createTime)[6]}}
                                </span>
                                <span v-if="!forms.createTime">
                                    --
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">修改时间&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                                <span v-if="forms.modifyTime">
                                    {{getDateTime(forms.modifyTime)[6]}}
                                </span>
                                <span v-if="!forms.modifyTime">
                                    --
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">操作人&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">{{forms.operatorName}}</div></el-col>
                    </el-row>
                </li>
                
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">当前状态&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <span v-if="forms.userState==1" class="fcgreen">正常</span>
                            <span v-if="forms.userState==2" class="greyFont">黑名单</span>
                            <span v-if="forms.userState==3">注销</span>
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">最后登录时间&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                                <!-- {{new Date(forms.lastLoginTime).toLocaleString()}} -->
                                <span v-if="forms.lastLoginTime">
                                    {{getDateTime(forms.lastLoginTime)[6]}}
                                </span>
                                <span v-if="!forms.lastLoginTime">
                                    --
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">登录方式&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                                <span v-if="forms.sessionPlatform==1">Web在线</span>
                                <span v-if="forms.sessionPlatform==2">App在线</span>
                                <span v-if="!forms.sessionPlatform">--</span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">在线平台&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                                <span v-if="forms.sessionType==1">业务平台</span>
                                <span v-if="forms.sessionType==2">管理平台</span>
                                <span v-if="!forms.sessionPlatform">--</span>                                
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">IP&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light" v-if="forms.host">{{forms.host}}</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light" v-if="!forms.host">--</div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">登录地址&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <span v-if="forms.latitude"> 
                                {{forms.latitude}},{{forms.longitude}}
                                <a href="javascript:void(0)" @click="toMap" >【查看地图】</a>
                            </span>
                            <span v-if="!forms.latitude"> 
                               --
                            </span>
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">操作机型&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light" v-if="forms.phoneType">{{forms.phoneType}}</div>
                            <div class="grid-content bg-purple-light" v-if="!forms.phoneType">--</div>
                        </el-col>
                    </el-row>
                </li>
            </ul>
            <div class="mt8 modifyStaffInfo" >
                <el-row v-if="off.noModify" >
                <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><button class="change" @click="checkBtn" v-if="user.userRole!=2&&user.userRole!=3">修改</button></div></el-col>
                </el-row>
                <el-row v-if="off.modify" >
                    <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><button class="changeNo" @click="checkNo">取消</button><button class="changeYes"  @click="checkYes(forms.userId)">确定</button></div></el-col>
                </el-row>
            </div>
        </div>
	</div>	 
</template>
<script>
import {requestMethod} from "../config/service.js"; 
import {getDateTime,getStore,errorDeal,translateData, translateRole} from "../config/utils";
import {mapState} from 'vuex';
export default{
    props:{forms:Object},
	data (){
		return {
            oldName:"",
            oldPhone:"",
            name:'',
            phone:'',
            radio:'1',
            checked:true,
            checked2:true,
            reason:'',
            item:'',
            user:"",//登录信息
			off:{
                showSearch:"",
                addList:"",
                modify:false,
                noModify:true
			},
			form:{
                name:"张三",
                phone:"15666666666"
            },
            list: [
            {a: '', b: '',checked:false,checked2:true},
            {a: '', b: '',checked:true,checked2:false}
            ]
            ,userRoleSwitch:""
            ,value1: ''
            ,options:""
            ,value:""
		}
    },created:function(){
        let vm=this;
        vm.user=getStore("YFD_NMS_INFO");
        vm.topId=getStore('departId');
        if(vm.forms.departId==vm.topId){//一级部门
            vm.userRoleSwitch=1
        }else{//代理商
            vm.userRoleSwitch=2
        }
    },computed:{
        ...mapState([
            "rolelist",
            "rolelist1"
        ])
    },
    methods:{
		goBack(){
            let vm=this;
            this.$parent.off.staffDetails=false;
            this.$parent.off.searchStaff=true;
            this.$parent.search(vm.$parent.pa);
        }
        ,checkBtn(){
            if(this.forms.userRole.split(",").indexOf('3')>-1){
                layer.open({
                    content:"不允许修改店长信息",
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            let vm=this;
            if(vm.forms.userRole.split(",").length==1){
                vm.value1=vm.forms.userRole.split(",")[0]
            }
            vm.off.noModify=false;
            vm.off.modify=true;
            vm.oldName=vm.forms.username;
            vm.oldPhone=vm.forms.phone
        }
        ,checkNo(){
            let vm=this;
            vm.off.noModify=true;
            vm.off.modify=false;
            vm.forms.username=vm.oldName;
            vm.forms.phone=vm.oldPhone;
        }
        ,checkYes(v){
            let vm=this,url="/ums/w/user/updateUserDetail",data={};
            vm.off.noModify=true;
            vm.off.modify=false;
            data.newUsername=vm.forms.username;
            data.newPhone=vm.forms.phone;
            data.newUserRole=vm.value;
            data.searchUserId=v;
            requestMethod(data,url)
            .then((data)=>{
                if(data.code==200){
                    layer.open({
                        content:'操作成功',
                        skin: 'msg',
                        time: 2,
                        msgSkin:'success',
                    });
                    let data={},url='/ums/w/user/getUserDetail',vm=this
                    data=vm.$parent.searchDetailsYfdData;
                    requestMethod(data,url)
                    .then((data)=>{
                        if(data.code==200){
                            vm.off.searchStaff=false;
                            vm.off.staffDetails=true;
                            vm.$parent.searchRes=data.data;
                        }  
                    }).catch(e=>errorDeal(e));
                }else{
                    vm.forms.username=vm.oldName;
                    vm.forms.phone=vm.oldPhone;
                    layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    })
                } 
            }).catch(e=>errorDeal(e))
        },toMap(){//查看地图
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.forms.latitude);
            let longitude=parseFloat(vm.forms.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		},getDateTime(v){
            return getDateTime(v);
        },translateData(v,i){
            return translateData(v,i)
        },translateRole(v,i){
            return translateRole(v,i)
        }
	}
}
</script>


