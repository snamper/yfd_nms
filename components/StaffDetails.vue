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
</style>
<template>
    <div>
        <div class="yfd">
            <el-container>
                <el-header style="margin-right:1%;margin-left:1%;border-bottom: 1px solid #ccc;padding-top:6px;height:50px;">
                    <el-row>
                        <el-col :span="6"><div class="grid-content bg-purple">公司名称:<span>{{headCompany}}</span></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">联系人:<span>{{headUserName}}</span></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">手机号码:<span>{{headPhone}}</span></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"><a href="javascript:void(0)" @click="goBack()">返回列表</a></div></el-col>
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
                            <input v-if="off.modify" type="text" v-model="forms.username">
                        </div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">手机号码:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">
                            <p v-if="off.noModify">{{forms.phone}}</p>
                            <input v-if="off.modify" type="text" v-model="forms.phone">    
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
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.userRole}}</div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">当前状态:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.userState}}</div></el-col>
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
                        <el-col :span="20"><div class="grid-content bg-purple-light"></div></el-col>
                    </el-row>
                </li>
                <li>
                     <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">登陆版本号/IP:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.osVersion}}</div></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">登陆地址:</div></el-col>
                        <el-col :span="20"><div class="grid-content bg-purple-light">{{forms.latitude}}--{{forms.longitude}}</div></el-col>
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
            company:"",
            headUserName:"",
            headPhone:"",
            company:"",
            headerUser:"",
            name:'',
            phone:'',
            radio:'1',
            checked:true,
            checked2:true,
            reason:'',
            item:'',
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
        let vm=this;
        vm.company=vm.$parent.company;        
        vm.headPhone=vm.$parent.headPhone;
        vm.headUserName=vm.$parent.headUserName;
    },
	methods:{
		goBack(){
            let vm=this;
            this.$parent.off.staffD=false;
            this.$parent.off.noStaffd=true;
        }
        ,checkBtn(){
            let vm=this;
            vm.off.noModify=false;
            vm.off.modify=true;
        }
        ,checkNo(){
            let vm=this;
            vm.off.noModify=true;
            vm.off.modify=false;
        }
        ,checkYes(v){
            let vm=this,url="";
            vm.off.noModify=true;
            vm.off.modify=false;
            url="/yfd-ums/w/user/updateUserDetail";
            data.newName=vm.forms.username;
            data.newPhone=vm.forms.phone;
            data.searchUserId=v;
            requestMethod(data,url)
            .then(()=>{

            }).then(()=>{

            }).catch(e=>errorDeal(e))
        }
	}
}
</script>

