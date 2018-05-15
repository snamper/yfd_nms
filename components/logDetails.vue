<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{width:400px;height:500px;padding: 20px; margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table thead{width:100%}
#detailsView table td{padding:5px;}
#detailsView table td:nth-child(2){text-align: left}
#detailsView table td:nth-child(1){text-align: right;color: grey}
#detailsView table th{padding: 10px 0;border-radius: 4px 4px 0 0;width:100%}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.tdBtn span{ display: inline-block;width: 100%;height: 50px;padding: 20px;margin-top: 20px;box-sizing: border-box;cursor: pointer}
.tdBtn span:nth-child(1){border-top: 1px solid #ccc;color: red}
tbody tr{height: 36px;}
a.IconOff{font-size:16px;color:black;cursor: pointer}
</style>
<template>
<section  id="detailsView">
	<div>
		<table>
            <thead>
                <tr>
                    <td colspan="3" style="text-align:center;padding:10px 10px 0 0;line-height:20px;height:46px;"><h3>日志详情<a class="fr IconOff" @click="closeLayer()">x</a></h3></td>
                </tr>
            </thead>
			<tbody v-if="layerType=='number'">
                <tr>
                    <td>号包名称：</td>
                    <td colspan="2">{{detailsData.productName}}</td>
                </tr>
                <tr>
                    <td>号包类型：</td>
                    <td colspan="2">
                        <span v-if="detailsData.productType==1">整号包</span>
                        <span v-if="detailsData.productType==2">靓号包</span>
                        <span v-if="detailsData.productType==3">普号包</span>
                    </td>
                </tr>
                <tr>
                    <td>码号数量：</td>
                    <td colspan="2">
                        <span v-if="detailsData.productType==1">{{detailsData.normalTotal+detailsData.cuteTotal}}</span>
                        <span v-if="detailsData.productType==2">{{detailsData.cuteTotal}}</span>
                        <span v-if="detailsData.productType==3">{{detailsData.normalTotal}}</span>
                    </td>
                </tr>
                <tr>
                    <td>归属品牌：</td>
                    <td>
                        <span v-if="detailsData.brand==2">蜗牛</span>
                        <span v-if="detailsData.brand==3">迪信通</span>
                        <span v-if="detailsData.brand==4">极信</span>
                        <span v-if="detailsData.brand==5">小米</span>
                        <span v-if="detailsData.brand==6">海航</span>
                        <span v-if="detailsData.brand==7">乐语</span>
                        <span v-if="detailsData.brand==8">苏宁互联</span>
                        <span v-if="detailsData.brand==9">国美</span>
                        <span v-if="detailsData.brand==10">联想</span>
                        <span v-if="detailsData.brand==11">蓝猫移动</span>
                        <span v-if="detailsData.brand==12">长城</span></td>
                    </td>
                </tr>
                <tr>
                    <td>网络：</td>
                    <td colspan="2">
                        <span v-if="detailsData.isp==1">移动</span>
                        <span v-if="detailsData.isp==2">联通</span>
                        <span v-if="detailsData.isp==3">电信</span>
                    </td>
                </tr>
                <tr>
                    <td>操作时间：</td>
                    <td colspan="2">
                        <!-- {{new Date(detailsData.modifyTime).toLocaleString()}} -->
                        <span v-if="detailsData.modifyTime">
                            {{new Date(detailsData.modifyTime).toLocaleString()}}
                        </span>
                        <span v-if="!detailsData.modifyTime">
                            --
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>操作人：</td>
                    <td colspan="2">{{detailsData.operatorName}}</td>
                </tr>
                <tr>
                    <td>手机号码：</td>
                    <td colspan="2">{{detailsData.operatorPhone}}</td>
                </tr>
                <tr>
                    <td>操作类型：</td>
                    <td>
                        <span v-if="detailsData.productState==2">上架</span>
                        <span v-if="detailsData.productState==3">下架</span>
                    </td>
                </tr>
                <tr>
                    <td>操作结果：</td>
                    <td colspan="2">
                        <span v-if="detailsData.recordResult==1">成功</span>
                        <span v-if="detailsData.recordResult==2">失败</span>
                    </td>                 
                </tr>
                <tr v-if="detailsData.recordResult==2">
                    <td >失败原因：</td>
                    <td colspan="2">{{detailsData.reason}}</td>
                </tr>
			</tbody>
            <tbody v-if="layerType=='login'">
                <tr>
                    <td>操作人：</td>
                    <td colspan="2">{{detailsData.operatorName||'--'}}</td>
                </tr>
                <tr>
                    <td>手机号码：</td>
                    <td colspan="2">{{detailsData.phone||'--'}}</td>
                </tr>
                <tr>
                    <td>公司名称：</td>
                    <td colspan="2">{{detailsData.departName||'--'}}</td>
                </tr>
                <tr>
                    <td>操作时间：</td>
                    <td colspan="2">
                        <!-- {{new Date(detailsData.operatorTime).toLocaleString()||'--'}} -->
                        <span v-if="detailsData.operatorTime">
                            {{new Date(detailsData.operatorTime).toLocaleString()}}
                        </span>
                        <span v-if="!detailsData.operatorTime">
                            --
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>操作类型：</td>
                    <td colspan="2">
                        <span v-if="detailsData.recordType==1">登录</span>
                        <span v-if="detailsData.recordType==2">登出</span>
                    </td>
                </tr>
                <tr>
                    <td>登录方式：</td>
                     <td colspan="2">
                        <span v-if="detailsData.sessionPlatform==1">PC</span>
                        <span v-if="detailsData.sessionPlatform==2">APP</span>
                    </td>
                </tr>
                <tr>
                    <td>操作机型：</td>
                    <td colspan="2">{{detailsData.phoneType||'--'}}</td>
                </tr>
                <tr>
                    <td >登录版本号/IP：<span></span></td>
                </tr>
                <tr>
                    <td>登录地址：</td>
                    <td colspan="2">
                        <!-- <a href="javascript:void(0)"  @click="toMap">【查看地图】</a> -->
                        <span v-if="detailsData.latitude"> 
                            {{detailsData.latitude}},{{detailsData.longitude}}
                            <a href="javascript:void(0)" @click="toMap" >【查看地图】</a>
                        </span>
                        <span v-if="!detailsData.latitude"> 
                            --
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>操作结果：<span></span></td>
                     <td colspan="2">
                        <span v-if="detailsData.recordResult==1">成功</span>
                        <span v-if="detailsData.recordResult==2">失败</span>
                    </td>
                </tr>
                <tr>
                    <td>当前状态：<span>{{"--"}}</span></td>
                </tr>
                <tr v-if="detailsData.recordResult==2">
                    <td>失败原因：
                        <span class="c-red"></span>
                        <span>{{'--'}}</span>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="layerType=='sync'&&syncLogType=='3'">
                <tr>
                    <td>商户总数：</td>
                    <td colspan="2">{{detailsData.dbDealerCount||'--'}}</td>
                </tr>
                <tr>
                    <td>新增商户数：</td>
                    <td colspan="2">{{detailsData.addDealerCount||'--'}}</td>
                </tr>
                <tr>
                    <td>用户总数：</td>
                    <td colspan="2">{{detailsData.dbUserCount||'--'}}</td>
                </tr>
                <tr>
                    <td>修改用户数：</td>
                    <td colspan="2">{{detailsData.modifyUserCount||'--'}}</td>
                </tr>
                <tr>
                    <td>新增用户数：</td>
                    <td colspan="2">{{detailsData.addUserCount||'--'}}</td>
                </tr>
                <tr>
                    <td>删除用户数：</td>
                     <td colspan="2">
                        {{detailsData.delUserCount}}
                    </td>
                </tr>
                <tr>
                    <td>亚飞达用户数：</td>
                    <td colspan="2">{{detailsData.addUserCount||'--'}}</td>
                </tr>
                <tr>
                    <td >删除商户数：</td>
                    <td colspan="2">{{detailsData.delDealerCount}}</td>
                </tr>
                <tr>
                    <td>修改商户数：</td>
                    <td colspan="2">{{detailsData.modifyDealerCount}}</td>
                </tr>
                <tr>
                    <td>亚飞达商户数：<span></span></td>
                     <td colspan="2">
                       {{detailsData.yfdDealerCount}}
                    </td>
                </tr>
            </tbody>
            <tbody v-if="layerType=='sync'&&syncLogType=='4'">
                <tr>
                    <td>部门总数：</td>
                    <td colspan="2">{{detailsData.dbSectionTotal||'--'}}</td>
                </tr>
                <tr>
                    <td>亚飞达号码总数：</td>
                    <td colspan="2">{{detailsData.yfdPhoneTotal||'--'}}</td>
                </tr>
                <tr>
                    <td>修改部门总数：</td>
                    <td colspan="2">{{detailsData.modifySectionTotal||'--'}}</td>
                </tr>
                <tr>
                    <td>新增部门总数：</td>
                    <td colspan="2">{{detailsData.addSectionTotal||'--'}}</td>
                </tr>
                <tr>
                    <td>删除部门数：</td>
                    <td colspan="2">{{detailsData.delSectionTotal||'--'}}</td>
                </tr>
            </tbody>
		</table>
		<div class="lay-mask"></div>
	</div>
</section>
</template>
<script>
export default{
	props:['detailsData','layerType','syncLogType','getSyncTime'],
	data (){
		return {
			title:'',
            off:{
               
            }
		}
		
	},
	created:function(){
        let vm=this;
	},
	methods:{
		closeLayer:function(){
            var vm=this;
			vm.$parent.off.logDet=false;
        },
        toMap(){//查看地图
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.detailsData.latitude);
            let longitude=parseFloat(vm.detailsData.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		} 
	}
}
</script>

