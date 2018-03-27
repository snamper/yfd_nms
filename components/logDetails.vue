<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{padding: 20px; margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:5px;}
#detailsView table th{padding: 10px 0;background-color: #eee;border-radius: 4px 4px 0 0;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.tdBtn span{ display: inline-block;width: 100%;height: 50px;padding: 20px;margin-top: 20px;box-sizing: border-box;cursor: pointer}
.tdBtn span:nth-child(1){border-top: 1px solid #ccc;color: red}
tbody tr{height: 36px;}
</style>
<template>
<section  id="detailsView">
	<div>
		<table >
			<thead>
				<tr>
					
				</tr>
			</thead>
			<tbody v-if="true">
				<tr>
					<td>日志详情</td>
				</tr>
                <tr>
                    <td>号包名称：</td>
                </tr>
                <tr>
                    <td>号包类型：</td>
                </tr>
                <tr>
                    <td>码号数量：</td>
                </tr>
                <tr>
                    <td>归属品牌：</td>
                </tr>
                <tr>
                    <td>网络：</td>
                </tr>
                <tr>
                    <td>操作时间：</td>
                </tr>
                <tr>
                    <td>操作人：</td>
                </tr>
                <tr>
                    <td>手机号码：</td>
                </tr>
                <tr>
                    <td>操作类型：</td>
                </tr>
                <tr>
                    <td>操作结果：</td>
                </tr>
                <tr>
                    <td>失败原因：</td>
                </tr>
                <tr class="tdBtn" colspan="2">
                    <span @click="close()">确认</span>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
	</div>
</section>
</template>
<script>
export default{
	props:{
		type:Number,
		list:Object,
		dealerId:String
	},
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
		close:function(){
            var vm=this;
			vm.$parent.off.logDet=false;
		},
	}
}
</script>

