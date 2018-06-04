<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 38px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .detailsUlDiv{width: 90%;height: 90%;margin-left:40px;}
    .detailsUlDiv ul{border-left: 1px solid rgb(228, 228, 228);border-right: 1px solid rgb(228, 228, 228);border-top: 1px solid rgb(228, 228, 228)}
    .detailsUlDiv ul li {padding: 6px 18px;border-bottom: 1px solid rgb(228, 228, 228)}
    .detailsUlDiv ul li:nth-child(odd){background: #FFF;}
    input.modifyInput{height: 28px;border-radius: 6px;outline: none;border: 1px solid #ccc;padding-left: 10px;}
</style>
<template>
    <div>
        <div class="yfd f-s-16">
            <el-container>
                <el-header class="headTitleNav">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">公司名称&nbsp;:&nbsp;<a class="c-blue" href="javascript:void(0)"  @click="goBack()">好亚飞达总部</a></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fr " style="padding-right:40px"><a href="javascript:void(0)" class="fcaqua" @click="goBack()">返回列表</a></div></el-col>
                    </el-row>
                </el-header>         
            </el-container>
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
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">创建时间&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19">
                            <div class="grid-content bg-purple-light">
                            <!-- {{new Date(forms.createTime).toLocaleString()}} -->
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
                                <!-- {{new Date(forms.modifyTime).toLocaleString()}} -->
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
                        <el-col :xs="7" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple fr">职务&nbsp;&nbsp;:&nbsp;&nbsp;</div></el-col>
                        
                        <el-col :xs="12" :sm="18" :md="18" :lg="19" :xl="19"><div class="grid-content bg-purple-light">
                            <span v-for="(v,i) in forms.userRole" :key="i">
                                <span v-if="v==1">管理员</span>
                                <span v-if="v==2">销售</span>
                                <span v-if="v==3">店长</span>
                                <span v-if="v==4">采购员</span>
                                <span v-if="v==5">业务员</span>
                            </span>
                        </div></el-col>
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
            <div class="mt8">
                <el-row v-if="off.noModify" >
                <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><el-button type="success" @click="checkBtn" v-if="user.userRole!=2&&user.userRole!=3">修改</el-button></div></el-col>
                </el-row>
                <el-row v-if="off.modify" >
                    <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><el-button type="danger" @click="checkNo">取消</el-button><el-button type="success" @click="checkYes(forms.userId)">确定</el-button></div></el-col>
                </el-row>
            </div>
        </div>
	</div>	 
</template>
<script>
import { Loading } from 'element-ui';
import {requestMethod} from "../config/service.js"; 
import {getDateTime,getStore,errorDeal} from "../config/utils";
export default{
    props:{forms:Object},
	data (){
		return {
            oldName:"",
            oldPhone:"",
            company:"",
            managerName:"",
            managerPhone:"",
            company:"",
            name:'',
            phone:'',
            radio:'1',
            checked:true,
            checked2:true,
            reason:'',
            item:'',
            user:"",//登录信息
            ix:[{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'}],            
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
		}
	},
	components:{
       
	},
	created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
        vm.company=vm.$parent.company;        
        vm.managerName=vm.$parent.managerName;
        vm.managerPhone=vm.$parent.managerPhone;
    },
	methods:{
		goBack(){
            let vm=this;
            this.$parent.off.staffDetails=false;
            this.$parent.off.searchStaff=true;
            this.$parent.search(vm.$parent.pa);
        }
        ,checkBtn(){
            for(let v in this.forms.userRole){
                if(this.forms.userRole=='3'){
                    layer.open({
                        content:"不允许修改店长信息",
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    return false;
                }
            }
            let vm=this;
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
                    let data={},url='/ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
                    data=vm.$parent.searchDetailsYfdData;
                    requestMethod(data,url,()=>{load.close()})
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
        }
	}
}
</script>

