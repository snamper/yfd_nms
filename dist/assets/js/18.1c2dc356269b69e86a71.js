webpackJsonp([18],{emNm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("R2SV"),s=a("8Jld"),l=a("04Cm"),n={data:function(){return{currentPage:0,detRecordType:"",pa:1,startTime:"",endTime:"",operatorPhone:"",syncType:"0",recordType:"0",recordResult:"0",openLayer:"sync",getSyncTime:"",operatorName:"",off:{showSearch:"",logDet:!1},form:{page:0,detailsList:"",searchList:"",syncLogType:""},pickerOptionsS:{disabledDate:function(e){var t=(new Date).getTime(),a=new Date(t).getFullYear(),r=new Date(t).getMonth()+1,s=r-5,l=a;s<0&&(s+=12,l=a-1);var n=(new Date(t).getDate(),r+1),o=l+"/"+s+"/1",i=a+"/"+n+"/1",c=new Date(i)-864e5;return o=new Date(o).getTime(),e.getTime()>c||e.getTime()<o}},pickerOptionsE:{disabledDate:function(e){var t=(new Date).getTime(),a=new Date(t).getFullYear(),r=new Date(t).getMonth()+1,s=r-5,l=a;s<0&&(s+=12,l=a-1);var n=(new Date(t).getDate(),r+1),o=l+"/"+s+"/1",i=a+"/"+n+"/1",c=new Date(i)-864e5;return o=new Date(o).getTime(),e.getTime()>c||e.getTime()<o}}}},created:function(){Object(r.getTimeFunction)(this)},beforeDestroy:function(){},mounted:function(){},computed:{},components:{"log-details":s.a},methods:{search:function(e){var t=this;t.currentPage=e||1,""!=this.operatorPhone&&Object(r.checkMobile)(this.operatorPhone,function(){return t.form.page="",t.form.searchList="",!1});var a=new Date(t.startTime).getFullYear(),s=new Date(t.startTime).getMonth(),n=new Date(t.endTime).getFullYear(),o=new Date(t.endTime).getMonth();if(a!=n||s!=o)return layer.open({content:"开始和结束日期不能跨月",skin:"msg",time:2,msgSkin:"error"}),!1;if(new Date(t.startTime).getTime()>new Date(t.endTime).getTime())return layer.open({content:"开始时间必须小于结束时间",skin:"msg",time:2,msgSkin:"error"}),!1;t.pa=e||1;var i={startOperateTime:new Date(t.startTime).getTime(),endOperateTime:new Date(t.endTime).getTime(),operatorName:t.operatorName,operatorPhone:t.operatorPhone,pageNum:e||1,pageSize:15,syncType:t.syncType,recordType:t.recordType,recordResult:t.recordResult};Object(l.requestSyncLogSearch)(i).then(function(e){200==e.code?(t.form.page=e.data.total,t.form.searchList=e.data.records):(t.form.page="",t.form.searchList="",Object(r.errorDeal)(e))}).catch(function(e){return Object(r.errorDeal)(e,function(){t.form.page="",t.form.searchList=""})})},details:function(e,t){var a=this;a.recordType;a.form.detailsList=e,a.off.logDet=!0,a.detRecordType=t},changeTimeS:function(e){var t=this,a=Object(r.disableTimeRange6)(),s=a.next,l=a.nextYesterday,n=new Date(e).getTime();n<s&&(t.startTime=s),n>l&&(t.startTime=l),Object(r.getTimeFunction)(this,[e,1])},changeTimeE:function(e){var t=this,a=Object(r.disableTimeRange6)(),s=a.next,l=a.nextYesterday,n=new Date(e).getTime();n<s&&(t.endTime=s),n>l&&(t.endTime=l),Object(r.getTimeFunction)(this,[e,2])},getDateTime:function(e){return Object(r.getDateTime)(e)}}},o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{staticClass:"greyFont"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple-dark m-search-title black"},[e._v("搜索条件")])])],1),e._v(" "),a("el-row",{staticStyle:{height:"40px","line-height":"40px"}},[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("操作时间：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{size:"small",type:"datetime",clearable:!1,editable:!1,"picker-options":e.pickerOptionsS,placeholder:"选择开始时间"},on:{change:e.changeTimeS},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),a("el-date-picker",{attrs:{size:"small",type:"datetime",clearable:!1,editable:!1,"picker-options":e.pickerOptionsE,placeholder:"选择结束时间"},on:{change:e.changeTimeE},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1)]),e._v(" "),a("el-col",{attrs:{span:2}})],1)]),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("操作人姓名：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("el-input",{attrs:{size:"small",maxlength:6,placeholder:"请输入查询的联系人姓名"},model:{value:e.operatorName,callback:function(t){e.operatorName=t},expression:"operatorName"}})],1),e._v(" "),a("el-col",{attrs:{span:2}})],1)])],1),e._v(" "),a("el-row",{staticClass:"marginTop"},[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("手机号码：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("el-input",{attrs:{maxlength:11,size:"small",placeholder:"请输入查询的手机号码"},model:{value:e.operatorPhone,callback:function(t){e.operatorPhone=t},expression:"operatorPhone"}})],1),e._v(" "),a("el-col",{attrs:{span:2}})],1)]),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("操作类型：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("el-radio",{attrs:{label:"0"},model:{value:e.syncType,callback:function(t){e.syncType=t},expression:"syncType"}},[e._v("全部")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.syncType,callback:function(t){e.syncType=t},expression:"syncType"}},[e._v("手动同步")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.syncType,callback:function(t){e.syncType=t},expression:"syncType"}},[e._v("自动同步")])],1),e._v(" "),a("el-col",{attrs:{span:2}})],1)])],1),e._v(" "),a("el-row",{staticClass:"marginTop"},[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("同步内容：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("el-radio",{attrs:{label:"0"},model:{value:e.recordType,callback:function(t){e.recordType=t},expression:"recordType"}},[e._v("全部")]),e._v(" "),a("el-radio",{attrs:{label:"3"},model:{value:e.recordType,callback:function(t){e.recordType=t},expression:"recordType"}},[e._v("框架")]),e._v(" "),a("el-radio",{attrs:{label:"4"},model:{value:e.recordType,callback:function(t){e.recordType=t},expression:"recordType"}},[e._v("号码")])],1),e._v(" "),a("el-col",{attrs:{span:2}})],1)]),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:4,sm:4,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[e._v("操作结果：")])]),e._v(" "),a("el-col",{attrs:{xs:18,sm:18,md:12,lg:16,xl:16}},[a("el-radio",{attrs:{label:"0"},model:{value:e.recordResult,callback:function(t){e.recordResult=t},expression:"recordResult"}},[e._v("全部")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.recordResult,callback:function(t){e.recordResult=t},expression:"recordResult"}},[e._v("成功")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.recordResult,callback:function(t){e.recordResult=t},expression:"recordResult"}},[e._v("失败")])],1),e._v(" "),a("el-col",{attrs:{span:2}})],1)])],1),e._v(" "),a("el-row",{staticClass:"marginTop",staticStyle:{"text-align":"center"}},[a("button",{staticClass:"m-btn-orange",on:{click:function(t){e.search()}}},[e._v("搜索")])])],1),e._v(" "),e.form.searchList?a("div",[a("div",[a("div",{staticClass:"m-listTitleFoot"},[a("h3",[e._v("日志列表"),a("span",{staticClass:"f-fw greyFont"},[e._v("("+e._s(e.form.page||"0")+")")])])]),e._v(" "),a("div",{staticClass:"m-details"},[a("table",{staticClass:"m-searchTab",staticStyle:{width:"100%",height:"100%"}},[e._m(0),e._v(" "),e._l(e.form.searchList,function(t,r){return a("tr",{key:r},[a("td",[e._v(e._s(15*(e.pa-1)+(r+1)))]),e._v(" "),a("td",[e._v(e._s(t.recordId||"--"))]),e._v(" "),a("td",[0==t.recordType?a("span",[e._v("全部")]):e._e(),e._v(" "),3==t.recordType?a("span",[e._v("框架")]):e._e(),e._v(" "),4==t.recordType?a("span",[e._v("号码")]):e._e()]),e._v(" "),a("td",[t.recordTime?a("span",[e._v("\n                                  "+e._s(e.getDateTime(t.recordTime)[6])+"\n                              ")]):e._e(),e._v(" "),t.recordTime?e._e():a("span",[e._v("\n                                  --\n                              ")])]),e._v(" "),a("td",[0==t.syncType?a("span",[e._v("全部")]):e._e(),e._v(" "),1==t.syncType?a("span",[e._v("手动同步")]):e._e(),e._v(" "),2==t.syncType?a("span",[e._v("自动同步")]):e._e()]),e._v(" "),a("td",["1"==t.syncProtocol?a("span",[e._v("接口")]):"2"==t.syncProtocol?a("span",[e._v("文件")]):a("span",[e._v("--")])]),e._v(" "),a("td",[e._v(e._s(t.operatorId||"--"))]),e._v(" "),a("td",[e._v(e._s(t.operatorName||"--"))]),e._v(" "),a("td",[e._v(e._s(t.operatorPhone||"--"))]),e._v(" "),a("td",[1==t.syncState?a("span",[e._v("成功")]):e._e(),e._v(" "),2==t.syncState?a("span",[e._v("失败")]):e._e(),e._v(" "),t.syncState?e._e():a("span",[e._v("--")])]),e._v(" "),a("td",[a("a",{on:{click:function(a){e.details(t.introduct,t.recordType)}}},[e._v("详情")])])])}),e._v(" "),e.form.searchList.length<=0?a("tr",[a("td",{attrs:{colspan:"10"}},[e._v("\n                              暂无数据                                                        \n                          ")])]):e._e()],2)]),e._v(" "),e.form.searchList.length>0?a("div",{staticClass:"m-listTitleFoot"},[a("el-row",[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":15,"current-page":e.currentPage,total:e.form.page},on:{"current-change":e.search,"update:currentPage":function(t){e.currentPage=t}}})],1)])],1)],1):e._e()])]):e._e(),e._v(" "),e.off.logDet?a("log-details",{attrs:{layerType:e.openLayer,getSyncTime:e.getSyncTime,detailsData:e.form.detailsList,syncLogType:e.detRecordType}}):e._e()],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",{staticClass:"f-s-14"},[a("td",[e._v("序号")]),e._v(" "),a("td",[e._v("日志ID")]),e._v(" "),a("td",[e._v("日志类型")]),e._v(" "),a("td",[e._v("日志时间")]),e._v(" "),a("td",[e._v("同步类型")]),e._v(" "),a("td",[e._v("同步协议")]),e._v(" "),a("td",[e._v("操作人ID")]),e._v(" "),a("td",[e._v("操作人姓名")]),e._v(" "),a("td",[e._v("操作人手机号码")]),e._v(" "),a("td",[e._v("操作结果")]),e._v(" "),a("td")])}],c={render:o,staticRenderFns:i},d=c,p=a("Z0/y"),m=p(n,d,!1,null,null,null);t.default=m.exports}});