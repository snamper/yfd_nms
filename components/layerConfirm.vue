<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:5px 30px;}
#detailsView table th{padding: 18px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.tdBtn span{ display: inline-block;width: 50%;height: 50px;padding: 20px;margin-top: 20px;box-sizing: border-box;cursor: pointer}
.tdBtn span:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red}
.tdBtn span:nth-child(2){border-top: 1px solid #ccc;color: green}
tbody tr{height: 36px;}
.tdBtn2 {cursor: pointer}
.tdBtn2 span{display: inline-block;width: 100%; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px; }
</style>
<template>
<section  id="detailsView" class="greyFont">
    <div>
        <table >
			<thead>
				<tr>
					<th v-if="layerType=='notice'" colspan="2">
						确认要删除此公告消息？
					</th>
				</tr>
			</thead>
			<tbody>
                <tr class="tdBtn" colspan="2">
                    <span @click="close()">取消</span>
                    <span @click="btnYes()">确认</span>
                </tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
    </div>
</section>
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import {requestMethod} from "../src/config/service.js"; 
import { errorDeal,getStore } from '../src/config/utils';
export default{
    props:{
        layerType:String,
        isSure:Boolean
    },
	data (){
		return {

		}		
    },
	created:function(){
        let vm=this,Info=getStore("YFD_NMS_INFO");
        vm.user=Info;
	},
	methods:{
        btnYes(){
           let vm=this;
           requestMethod(vm.$parent.cancelInfo,"/mns/w/msg/delete")
            .then((data)=>{
                if(data.code==200){
                    layer.open({
                        content:"删除公告消息成功",
                        skin:"msg",
                        time:2,
                        msgSkin:"success"
                    })
                }else{
                    layer.open({
                        content:data.msg,
                        skin:"msg",
                        time:2,
                        msgSkin:"error"
                    }) 
                }
               this.$parent.search(vm.$parent.pa);
               this.$parent.off.layer=false;
            }).catch(e=>errorDeal(e));
        },
		close:function(){
            var vm=this;
			vm.$parent.off.layer=false;
		},
	}
}
</script>

