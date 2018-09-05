<template>
    <section>
        <section v-if="off.searchlist">
            <div class="f-fs16 m-title1 f-displayFlex">
                <p style="flex:1"><span>角色列表</span></p><p style="flex:1;text-align:right"><button @click="add">添加角色</button></p>
            </div>
            <div class="m-searchlist">
                <table>
                    <tr>
                        <td>序号</td>
                        <td>角色名称</td>
                        <td>创建时间</td>
                        <td>角色描述</td>
                        <td>权限ID</td>
                        <td>操作</td>
                    </tr>
                    <tr v-for="(v,i) in rolelist">
                        <td>{{i+1}}</td>
                        <td>{{v.roleName}}</td>
                        <td>{{getDateTime()[6]}}</td>
                        <td>{{v.description}}</td>
                        <td><a @click="getpowerlist(v)" class="m-jumplink">{{v.id}}</a></td>
                        <td>
                            <a @click="changePower(v)" style="color:#29B038;text-decoration:underline;margin-right:20px" href="javascript:void(0)">修改</a>
                            <a @click="cancel(v)" style="color:#DB1E1E;text-decoration:underline" href="javascript:void(0)">删除</a>
                        </td>
                    </tr>
                    <tr v-if="rolelist.length==0">
                        <td colspan="6">
                            暂无数据
                        </td>
                    </tr>
                </table>
            </div>
        </section>
        <layerconfirm v-if="off.layer" :layerType="layerType"></layerconfirm>
        <changePower :type="ctype" :power="power" v-if="off.changePower"></changePower>
    </section>
</template>
<script>
import layerconfirm from '../../components/layerConfirm';
import changePower from './operatePower';
import { getRoles } from '../../config/service.js';
import { errorDeal,getDateTime } from '../../config/utils';
export default{
    name:'powerDeploy',
    data (){
        return {
             total:"",
             rolelist: [ { "description": "角色描述", "id": "角色ID", "roleName": "角色名称" },{ "description": "角色描述", "id": "角色ID", "roleName": "角色名称" },{ "description": "角色描述", "id": "角色ID", "roleName": "角色名称" } ],
             layerType:"",
             ctype:"",
             power:"",
             roleId:"",
             hasId:[101001,102001],
             off:{
                 searchlist:true,
                 layer:false,
                 changePower:false
             }
        }
    },
    created:function(){
        let vm=this;
        vm.fgetRole();
    },
    components:{
        layerconfirm,
        changePower
    },
    methods:{
        fgetRole(){
            let vm=this;
            getRoles()
            .then((data)=>{
                if(data.data.hasOwnProperty('roles')){
                    vm.rolelist=data.data.roles;
                    vm.total=data.data.roles.length;
                }else{
                    vm.rolelist="";
                    vm.total=0;
                }
            }).catch(e=>errorDeal(e))
        },cancel(v){
            let vm=this;
            vm.off.layer=true;
            vm.layerType='deletePower';
            vm.roleId=v.id;
        },getpowerlist(v){
            let vm=this;
            vm.hasId=v.id.split(",");
        },changePower(v){
            let vm=this;
            vm.off.layer=false;
            vm.off.searchlist=false;
            vm.off.changePower=true;
            vm.ctype="change";
        },add(){
            let vm=this;
            vm.off.layer=false;
            vm.off.searchlist=false;
            vm.off.changePower=true;
            vm.ctype="add";
        },getDateTime(v){
            return getDateTime(v)
        }
    }
}
</script>
<style scoped>
    .m-title1 button{width: 90px;height: 25px;border-radius: 4px;outline: none;border: 1px solid #00AA01;background: #00AA01;color: #fff}
    .m-searchlist{width: 98%;margin: 0 auto}
    .m-searchlist table{width: 100%;text-align: center;border-collapse: collapse;border: 1px solid #eee}
    .m-searchlist table tr{height: 40px;}
    .m-searchlist table tr:not(:last-child){border-bottom: 1px solid #eee}
    .m-searchlist table tr:nth-child(odd){background: #fafbfd; }
    .m-searchlist table tr:nth-child(even){background: #FFF}
</style>


