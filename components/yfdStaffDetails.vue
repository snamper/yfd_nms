<style scoped>
    div.yfd{width: 100% ;height: 100%}
    .listTitleFoot{width: 96%;margin: 10px 38px;}
    .listTitleFoot label{display:block;width: 50%;}
    label.el-checkbox{display: inline}
    .detailsUlDiv{width: 90%;height: 90%;margin-left:40px;}
    .detailsUlDiv ul{border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-top: 1px solid #ccc}
    .detailsUlDiv ul li {padding: 6px 18px;border-bottom: 1px solid #ccc}
    .detailsUlDiv ul li:nth-child(even){background: #ccc;}
    div.el-row{line-height:30px}
    input.modifyInput{height: 28px;border-radius: 6px;outline: none;border: 1px solid #ccc;padding-left: 10px;}
</style>
<template>
    <div>
        <div class="yfd">
            <el-container>
                <el-header style="margin-right:1%;margin-left:1%;border-bottom: 1px solid #ccc;padding-top:6px;height:50px;">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">公司名称  :  <span style="color:blue">亚非达</span></div></el-col>
                        <!-- <el-col :span="6"><div class="grid-content bg-purple-light">联系人:<span>{{managerName}}</span></div></el-col> -->
                        <!-- <el-col :span="6"><div class="grid-content bg-purple">手机号码:<span>{{managerPhone}}</span></div></el-col> -->
                        <el-col :span="12"><div class="grid-content bg-purple-light fr" style="padding-right:40px"><a href="javascript:void(0)" @click="goBack()">返回列表</a></div></el-col>
                    </el-row>
                </el-header>         
            </el-container>
        </div>
        <div class="listTitleFoot">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple">员工列表</div></el-col>
            </el-row>        
        </div>
        <div class="detailsUlDiv">
            <ul>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">用户姓名:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
                            <p v-if="off.noModify">{{forms.username}}</p>
                            <input class="modifyInput" v-if="off.modify" type="text" v-model="forms.username">
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">手机号码:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
                            <p v-if="off.noModify">{{forms.phone}}</p>
                            <input class="modifyInput" :maxlength="11" v-if="off.modify" type="text" v-model="forms.phone">    
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">创建时间:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{new Date(forms.createTime).toLocaleString()}}</div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">修改时间:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{new Date(forms.modifyTime).toLocaleString()}}</div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">操作人:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.operatorName}}</div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">职务:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
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
                        <el-col :span="4"><div class="grid-content bg-purple">当前状态:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
                            <span v-if="forms.userState==1">正常</span>
                            <span v-if="forms.userState==2">黑名单</span>
                            <span v-if="forms.userState==3">注销</span>
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">最后登陆时间:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{new Date(forms.lastLoginTime).toLocaleString()}}</div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">登陆方式:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light"><span v-if="forms.sessionPlatform==1">Web在线</span><span v-if="forms.sessionPlatform==2">App在线</span></div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">在线平台:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light"><span v-if="forms.sessionType==1">业务平台</span><span v-if="forms.sessionType==2">管理平台</span></div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">IP:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light"></div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">登陆地址:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
                            {{forms.latitude}}--{{forms.longitude}}
                            <a href="javascript:void(0)" @click="toMap" >查看地图</a>
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">操作机型:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.phoneType}}</div></el-col>
                    </el-row>
                </li>
            </ul>
            <div class="mt8">
                <el-row v-if="off.noModify" >
                <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><el-button type="success" @click="checkBtn">修改</el-button></div></el-col>
                </el-row>
                <el-row v-if="off.modify" >
                    <el-col style="text-align:center" :span="24"><div class="grid-content bg-purple"><el-button type="danger" @click="checkNo">取消</el-button><el-button type="success" @click="checkYes(forms.userId)">确定</el-button></div></el-col>
                </el-row>
            </div>
        </div>
	</div>	 
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import {requestMethod} from "../src/config/service"; 
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
        let vm=this,userInfo=localStorage.getItem("KA_ECS_USER");
        let Info=JSON.parse(userInfo);
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
        }
        ,checkBtn(){
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
            let vm=this,url="/yfd-ums/w/user/updateUserDetail",data={};
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
                    let data={},url='/yfd-ums/w/user/getUserDetail',vm=this,load=Loading.service(options);
                    data=vm.$parent.searchDetailsYfdData;
                    requestMethod(data,url)
                    .then((data)=>{
                        if(data.code==200){
                            vm.off.searchStaff=false;
                            vm.off.staffDetails=true;
                            vm.$parent.searchRes=data.data;
                        }  
                    }).then(()=>{
                        load.close(); 
                    }).catch(e=>errorDeal(e));
                }else{
                    vm.forms.username=vm.oldName;
                    vm.forms.phone=vm.oldPhone;
                     layer.open({
                        content:data.msg,
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                } 
            }).then(()=>{

            }).catch(e=>errorDeal(e))
        },
        toMap(){//查看地图
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.forms.latitude);
            let longitude=parseFloat(vm.forms.longitude);
            debugger;
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		}
	}
}
</script>

