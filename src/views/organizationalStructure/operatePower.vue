<template>
    <section>
        <section>
            <div class="f-fs16 m-title1 f-displayFlex">
                <p style="flex:1">
                    <span v-if="type=='change'">修改角色</span>
                    <span v-if="type=='add'">增加角色</span>
                    <span v-if="type=='details'">角色权限详情</span>
                </p>
                <p style="flex:1;text-align:right">
                    <a @click="close" class="m-jumplink">返回列表</a>
                </p>
            </div>
            <div class="m-content">
                <p>角色名称：
                    <span  v-if="type=='change'||type=='details'"></span>
                    <input v-model="powerName" v-if="type=='add'" type="text" class="m-input-add">
                </p>
                <ul>
                    <li v-if="type=='change'||type=='add'" v-for="(v,i) of powers" :key="i">
                        <span v-if="i==0">当前权限：</span>
                        <span :class="{'m-powerlist':i>0}">
                            <el-checkbox v-model="v.isChecked" ></el-checkbox>
                            <b style="padding-left:10px;">{{v.privilegeId}}</b>
                            <b style="padding-left:5px;">【<label style="color:#00AA01">{{v.privilegeName}}</label>：<label>{{v.description}}</label>】</b>
                        </span>
                    </li>
                    <li v-if="type=='details'" v-for="(v,i) of powers" :key="i">
                        <span v-if="i==0">当前权限：</span>
                        <span :class="{'m-powerlist':i>0}">
                            <b style="padding-left:10px;">{{v.privilegeId}}</b>
                            <b style="padding-left:5px;">【<label style="color:#00AA01">{{v.privilegeName}}</label>：<label>{{v.description}}</label>】</b>
                        </span>
                    </li>
                </ul>
                <p style="text-align:center">
                    <button @click="powerModiefy(type)" class="m-btn">
                        <span class="m-btn-orange" v-if="type=='add'">添加</span>
                        <span class="m-btn-orange" v-if="type=='change'">修改</span>
                        <span class="m-btn-green" v-if="type=='details'">修改</span>
                    </button>
                </p>
            </div>
        </section>
    </section>
</template>
<script>
import { getPrivileges,addRole,updateRolePrivilege } from '../../config/service.js';
import { errorDeal } from '../../config/utils.js';
export default{
    name:'changePower',
    props:['type'],
    data (){
        return {
            powers:[ { "description": "权限描述", "id": 0, "privilegeId": "权限id", "privilegeName": "权限名称" },{ "description": "权限描述", "id": 0, "privilegeId": "权限id", "privilegeName": "权限名称" },{ "description": "权限描述", "id": 0, "privilegeId": "权限id", "privilegeName": "权限名称" } ],
            powerName:""
        }
    },
    created:function(){
        let vm=this;
        getPrivileges()
        .then((data)=>{
            vm.powers=data.data.list;
            vm.$parent.hasId.map(function(v,i){
                vm.powers.map(function(x,y){
                    if(x.privilegeId==v){
                        x.isChecked=true;
                    }
                })
            })
        }).catch(e=>errorDeal(e))
    },
    components:{
       
    },
    methods:{
        powerModiefy(v){
            let vm=this;
            if(v=='change'){
                let powerId=[];
                vm.powers.map(function(v,i){
                    if(v.hasOwnProperty('isChecked')&&v.isChecked==true){
                        if(value.hasOwnProperty('isChecked')&&value.isChecked==true){
                            powerId.push(value.privilegeId);                        
                        }
                    }
                })
                let json={
                    "privilege":powerId.join(","),
                    "id":vm.$parent.roleId
                };
                updateRolePrivilege(json)
                .then((data)=>{
                    if(data.code==200){
                    layer.open({
                            content:"新增角色成功",
                            skin:"msg",
                            time:2,
                            msgSkin:"success"
                        })
                    }
                    vm.$parent.fgetRole();
                    vm.close();
                }).catch(e=>errorDeal(e))
            }else if(v=='add'){
                let powerId=[];
                vm.powers.map(function(value,index){
                    if(value.hasOwnProperty('isChecked')&&value.isChecked==true){
                        powerId.push(value.privilegeId);                        
                    }
                })
                let json={
                    "description": "",
                    "privilege":powerId.join(","),
                    "roleName": vm.powerName,
                };
                addRole(json)
                .then((data)=>{
                    if(data.code==200){
                    layer.open({
                        content:"新增角色成功",
                        skin:"msg",
                        time:2,
                        msgSkin:"success"
                    })
                }
                vm.$parent.fgetRole();
                vm.close();
                }).catch(e=>errorDeal(e))
            }else{

            }
        },
        close(){
            let vm=this.$parent;
            vm.off.layer=false;
            vm.off.searchlist=true;
            vm.off.changePower=false;
        }
    }
}
</script>
<style scoped>
.m-content p, .m-content ul{width: 92%;margin: 0 auto}
.m-content p{margin-bottom: 10px;}
.m-content ul li{height: 30px;}
.m-content ul li span.m-powerlist{display: inline-block;margin-left: 69px}
.m-input-add{height: 30px;border: 1px solid #e2e2e2;width: 200px;padding-left: 15px;}
</style>


