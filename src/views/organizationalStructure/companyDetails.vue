<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 38px;}
    .listTitleFoot label{display:block;width: 50%;}
    .m-company-detail table{width: 100%;border-collapse: collapse;border: 1px solid #e4e4e4}
    .m-company-detail table tr{height: 50px;}
    /* .m-company-detail table tr:nth-child(odd){background: #EAEAEA} */
    .m-company-detail table tr:nth-child(even){background: #fff}
    .m-company-detail table tr{border-top: 1px solid #e4e4e4}
    .m-company-detail table tr td:nth-child(1){width: 200px;text-align: right;padding-right: 20px;}
    /* .m-company-detail table tr td:nth-child(2){padding-left: 10px;} */
</style>
<template>
    <div>
        <div class="yfd f-s-16">
            <el-container>
                <el-header class="headTitleNav">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">部门名称&nbsp;:&nbsp;<a class="c-blue" href="javascript:void(0)">{{lists.departName}}</a></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fr " style="padding-right:40px"><a href="javascript:void(0)" class="fcaqua" @click="goBack()">返回列表</a></div></el-col>
                    </el-row>
                </el-header>         
            </el-container>
        </div>
        <div class="listTitleFoot" style="margin:0 38px;">
            <el-row>
                <el-col :span="20"><div class="grid-content bg-purple"><h3>公司详情</h3></div></el-col>
            </el-row>        
        </div>
        <div style="width:95%;margin-left:30px" class="m-company-detail f-s-14">
            <table>
                <tr>
                    <td>创建时间 : </td>
                    <td>{{getDateTime(lists.createTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门名称 : </td>
                    <td>{{lists.departName}}({{lists.departId}})</td>
                </tr>
                <tr>
                    <td>部门状态 : </td>
                    <td>{{translateData('userState',lists.departState)}}</td>
                </tr>
                <tr>
                    <td>联系人姓名 : </td>
                    <td>{{lists.managerName||'--'}}</td>
                </tr>
                <tr>
                    <td>部门信息修改时间 : </td>
                    <td>{{getDateTime(lists.modifyTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门联系人手机号码 : </td>
                    <td>{{lists.phone||'--'}}</td>
                </tr>
                <tr>
                    <td>代理商名称 : </td>
                    <td>{{lists.dealerName||'--'}}</td>
                </tr>
                <tr>
                    <td>代理商ID : </td>
                    <td>{{lists.dealerId||'--'}}</td>
                </tr>
                <tr>
                    <td>售卡区域 : </td>
                    <td>{{lists.region||'--'}}</td>
                </tr>
                <tr>
                    <td>客户门店地址 : </td>
                    <td>{{lists.storefront||'--'}}</td>
                </tr>
                <tr>
                    <td>最后与客户沟通时间 : </td>
                    <td>{{lists.lastTime||'--'}}</td>
                </tr>
                <tr>
                    <td>售卡区域 : </td>
                    <td>{{lists.soldProvince||'--'}}，{{lists.soldCity||'--'}}，{{lists.soldCounty||'--'}}</td>
                </tr>
            </table>
        </div>
	</div>	 
</template>
<script>
import {requestMethod} from "../../config/service.js"; 
import {getDateTime,getStore,errorDeal,translateData} from "../../config/utils";
export default{
    props:['lists'],
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
            ],
            role:[]
            ,userRoleSwitch:""
            
		}
	},created:function(){
        let vm=this;
        vm.user=getStore("YFD_NMS_INFO");
        vm.topId=getStore('departId');
        
    },methods:{
		goBack(){
            let vm=this;
            this.$parent.off.companyDetails=false;
            this.$parent.off.notDlsDetails=true;
            // this.$parent.search(vm.$parent.pa);
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
            vm.role=vm.forms.userRole.split(",");
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
            data.newUserRole=vm.role.join(',');
            data.searchUserId=v;
            debugger;
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
        }
	}
}
</script>

