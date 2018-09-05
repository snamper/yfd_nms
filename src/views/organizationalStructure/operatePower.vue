<template>
    <section>
        <section>
            <div class="f-fs16 m-title1 f-displayFlex">
                <p style="flex:1">
                    <span v-if="ctype=='change'">修改角色</span>
                    <span v-else-if="ctype=='add'">增加角色</span>
                    <span v-else="ctype=='plist'">角色权限详情</span>
                </p>
                <p style="flex:1;text-align:right">
                    <a @click="close" class="m-jumplink">返回列表</a>
                </p>
            </div>
            <div class="m-content">
                <p>角色名称：
                    <span class="f-fs-16" v-if="ctype=='plist'||ctype=='change'">{{roleName}}</span>
                    <input v-model="powerName" v-if="ctype=='add'" type="text" class="m-input-add">
                </p>
                <div>
                    <span v-if="ctype=='change'||ctype=='add'">当前权限：</span>
                    <ul>
                        <li v-if="ctype=='change'||ctype=='add'" v-for="(v,i) in powers" :key="i">
                            <span :class="{'m-powerlist':i>0}">
                                <el-checkbox v-model="v.isChecked"></el-checkbox>
                                <b style="padding-left:10px;">{{v.privilegeId}}</b>
                                <b style="padding-left:5px;">【<label style="color:#00AA01">{{v.privilegeName}}</label>：<label>{{v.description}}</label>】</b>
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <span v-if="ctype=='plist'">当前权限：</span>
                    <ul>
                        <li v-for="(v,i) in powers" :key="i" v-if="ctype=='plist'&&v.isChecked">
                            <span v-if="v.isChecked" :class="{'m-powerlist':i>0}">
                                <b style="padding-left:10px;">{{v.privilegeId}}</b>
                                <b style="padding-left:5px;">【<label style="color:#00AA01">{{v.privilegeName}}</label>：<label>{{v.description}}</label>】</b>
                            </span>
                        </li>
                    </ul>
                </div>
                <p style="text-align:center">
                    <button @click="powerModiefy(ctype)" class="m-btn" :class="ctypeClass()">
                        <span v-if="ctype=='add'">添加</span>
                        <span v-else-if="ctype=='change'">修改</span>
                        <span v-else="ctype=='plist'">修改</span>
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
    props:['ctype','roleName'],
    data (){
        return {
            powers:"",
            powerName:""
        }
    },
    created:function(){
        let vm=this;
        getPrivileges()
        .then((data)=>{
            vm.powers=data.data.list;
            vm.powers.map(function(v,i){
                vm.$set(vm.powers[i],'isChecked',false)
            })
            vm.$parent.hasId.map(function(v,i){
                vm.powers.map(function(x,y){
                    if(x.privilegeId==v){
                        vm.$set(vm.powers[y],'isChecked',true);
                    }
                })
            })
        }).catch(e=>errorDeal(e))
    },
    methods:{
        powerModiefy(v){
            let vm=this;
            if(v=='change'){
                let powerId=[];
                vm.powers.map(function(value,index){
                    if(value.hasOwnProperty('isChecked')&&value.isChecked==true){
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
                            content:"修改角色权限成功",
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
            }else if(v=='plist'){
                vm.$parent.ltype='change';
            }
        },ctypeClass(){
            let vm=this;
            if(vm.ctype=='add'||vm.ctype=='change'){
                return 'm-btn-orange'
            }else if(vm.ctype=='plist'){
                return 'm-btn-green'
            }else{
                return ''
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
.m-content p, .m-content div{width: 92%;margin: 0 auto}
.m-content p{margin-bottom: 10px;}
.m-content div{display: flex;}
.m-content div span{flex: 1;min-width: 74px;}
.m-content div ul{flex: 17;}
.m-content ul li{margin-bottom: 10px;}
.m-input-add{height: 30px;border: 1px solid #e2e2e2;width: 200px;padding-left: 15px;}
</style>


