webpackJsonp([12],{"+QEP":function(t,e,a){var n=a("uoAK");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("FIqI")("bbc336b0",n,!0,{})},mmxT:function(t,e,a){var n=a("oMRM");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("FIqI")("59f21f61",n,!0,{})},oGQr:function(t,e,a){"use strict";function n(t){a("mmxT")}function i(t){a("+QEP")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("4YfN"),r=a.n(s),o=a("rVsN"),d=a.n(o),l=a("04Cm"),c=a("9rMa"),p=a("R2SV"),f={props:["layer","operationType"],data:function(){return{timer:null,show:!0,date:"",time:"",value:"",phone:"",userId:"",syncUrl:"",user:"",btnDisabled:!1,searchType:"",off:{set:!1,sync:!1,rsync:!1}}},created:function(){var t=this,e=Object(p.getStore)("YFD_NMS_INFO");t.user=e,t.searchType=t.$parent.searchType,1==t.$parent.off.setSync?(t.off.set=!0,t.off.sync=!1):1==t.$parent.off.sync&&(t.off.sync=!0,t.off.set=!1)},methods:{btnYes:function(t){var e=this;if(2===t){var a=this.$parent;this.close(),Object(l.requestMethod)(a.operationJson,a.doUrl).then(function(t){a.reason="",a.authCode="",a.off.modify=!1,200==t.code?(layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"success"}),a.search()):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(p.errorDeal)(t)})}else if(1===t){var n=this,i={};i=n.$parent.addUsersData,this.close(),Object(l.requestMethod)(i,"/ums/w/user/addUsers").then(function(t){n.$parent.off.layer=!1,200==t.code?(layer.open({content:"操作成功",skin:"msg",time:2,msgSkin:"success"}),e.$parent.list=[],e.$parent.off.addList=!1,e.$parent.list.push({username:"",phone:"",role:[],departName:"好亚飞达"}),1==n.$parent.off.searchList&&e.$parent.search()):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(p.errorDeal)(t)})}},close:function(){this.$parent.off.layer=!1}}},u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"greyFont",attrs:{id:"detailsView"}},["operationStaff"==t.layer?a("div",[a("table",{staticStyle:{width:"260px"}},[t._m(0),t._v(" "),a("tbody",[t._m(1),t._v(" "),a("tr",{staticClass:"tdBtn"},[a("td",{attrs:{colspan:"2"}},[a("span",{on:{click:function(e){t.close()}}},[t._v("取消")]),a("span",{on:{click:function(e){t.btnYes(1)}}},[t._v("确认")])])])])]),t._v(" "),a("div",{staticClass:"lay-mask"})]):t._e(),t._v(" "),"addStaff"==t.layer?a("div",[a("table",{staticStyle:{width:"260px"}},[t._m(2),t._v(" "),a("tbody",[a("tr",[a("td",{attrs:{colspan:"2"}},[a("h3",["HMD"==t.operationType?a("span",[t._v("是否将选中的员工加入黑名单")]):t._e(),t._v(" "),"JC"==t.operationType?a("span",[t._v("是否将选中的员工从黑名单中解除")]):t._e(),t._v(" "),"SC"==t.operationType?a("span",[t._v("是否删除选中的员工")]):t._e()])])]),t._v(" "),a("tr",{staticClass:"tdBtn"},[a("td",{attrs:{colspan:"2"}},[a("span",{on:{click:function(e){t.close()}}},[t._v("取消")]),a("span",{on:{click:function(e){t.btnYes(2)}}},[t._v("确认")])])])])]),t._v(" "),a("div",{staticClass:"lay-mask"})]):t._e()])},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{colspan:"2"}},[n("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:a("VORR"),alt:""}})])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{attrs:{colspan:"2"}},[a("h3",[t._v("是否要添加新员工")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{colspan:"2"}},[n("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:a("VORR"),alt:""}})])])])}],v={render:u,staticRenderFns:h},m=v,b=a("Z0/y"),g=n,_=b(f,m,!1,g,"data-v-c011a250",null),x=_.exports,y=a("GN9a"),w={data:function(){return{user:"",currentPage:0,detailsList:"",name:"",phone:"",radio:"1,2,3,4",pa:"",searchDetailsYfdData:"",searchRes:"",list:[{username:"",phone:"",role:[]}],topDepartmentId:"",btnDisabled:!1,layerType:"",operationType:"",typeTitle:"",operationJson:"",doUrl:"",off:{showSearch:"",searchList:!1,staffDetails:!1,searchStaff:!0,addList:!1,layer:!1,modify:!1},form:{page:1},options:"",value:""}},components:{staffDetails:y.a,layerConfirm:x},created:function(){var t=this,e=this,a=Object(p.getStore)("YFD_NMS_INFO");e.user=a;var n=window.localStorage.getItem("departId");e.topDepartmentId=n;var i=e.$route.query.dealerName;if(!i)return!1;e.name=i,new d.a(function(e,a){var n={},i=t;i.pa=1,i.currentPage=1,t.$router.push({name:"yfd",params:{type:"yfdList"}}),""!=i.phone&&Object(p.checkMobile)(i.phone,function(){return i.off.searchList=!1,i.form.page="",i.detailsList="",!1}),n={searchDepartId:"1803160000",username:i.name,phone:i.phone,userState:i.radio,pageSize:15,pageNum:1},Object(l.requestMethod)(n,"/ums/w/user/getDepartDetail").then(function(t){if(e("success!"),200==t.code)return i.off.searchList=!0,i.form.page=t.data.total,i.detailsList=t.data.users,!0;i.off.searchList=!1,i.form.page="",i.detailsList="",layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).then(function(){for(var t=0;t<i.detailsList.length;t++)i.$set(i.detailsList[t],"ischecked",!1)}).catch(function(t){return Object(p.errorDeal)(t,function(){i.off.searchList=!1,i.form.page="",i.detailsList=""})})}).then(function(){e.getStaffDetails(e.detailsList[0])})},computed:r()({},Object(c.mapState)(["rolelist","rolelist1"])),methods:{AddList:function(){this.list.push({username:"",phone:"",role:[]})},AddStaffDiv:function(){this.off.addList=!this.off.addList},deleteLine:function(t){var e=this;if(e.list.length<=1)return!1;e.list.splice(t,1)},AddStaff:function(){for(var t={newUsers:[]},e=this,a=0;a<this.list.length;a++){if(""==this.list[a].username||""==this.list[a].phone||""==this.list[a].value)return layer.open({content:"请填写完整的员工信息",skin:"msg",time:2,msgSkin:"error"}),!1;Object(p.checkMobile)(this.list[a].phone,function(){return!1}),this.list[a].userRole=this.list[a].value,this.list[a].departId=e.topDepartmentId,this.list[a].userHierachy=1,t.newUsers.push(this.list[a])}this.off.layer=!0,this.off.sync=!0,this.layerType="operationStaff",this.addUsersData=t},search:function(t){var e={},a=this;a.pa=t||1,a.currentPage=t||1,this.$router.push({name:"yfd",params:{type:"yfdList"}}),""!=a.phone&&Object(p.checkMobile)(a.phone,function(){return a.off.searchList=!1,a.form.page="",a.detailsList="",!1}),e={searchDepartId:"1803160000",username:a.name,phone:a.phone,userState:a.radio,pageSize:15,pageNum:t||1},Object(l.requestMethod)(e,"/ums/w/user/getDepartDetail").then(function(t){if(200==t.code)return a.off.searchList=!0,a.form.page=t.data.total,a.detailsList=t.data.users,!0;a.off.searchList=!1,a.form.page="",a.detailsList="",layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).then(function(){for(var t=0;t<a.detailsList.length;t++)a.$set(a.detailsList[t],"ischecked",!1)}).catch(function(t){return Object(p.errorDeal)(t,function(){a.off.searchList=!1,a.form.page="",a.detailsList=""})})},getStaffDetails:function(t){var e={},a=this;e={searchUserId:t.userId,sessionType:"2"},a.searchDetailsYfdData=e,Object(l.requestMethod)(e,"/ums/w/user/getUserDetail").then(function(t){200==t.code?(a.off.searchStaff=!1,a.off.staffDetails=!0,a.searchRes=t.data):Object(p.errorDeal)(t)}).catch(function(t){return Object(p.errorDeal)(t)})},doFilter:function(t){if("all"==t)for(var e=0;e<this.detailsList.length;e++)this.$set(this.detailsList[e],"ischecked",!0);else if("on"==t)for(var a=0;a<this.detailsList.length;a++)this.$set(this.detailsList[a],"ischecked",!1)},doFunction:function(t){var e=this,a={operateUserIds:[]},n="";e.off.modify=!1;for(var i in e.detailsList)1==e.detailsList[i].ischecked&&(a.operateUserIds.push(e.detailsList[i].userId),n+=e.detailsList[i].username+",",e.off.modify=!0);if(n=n.substring(0,n.length-1),0==e.off.modify)return layer.open({content:"请选择要操作的用户",skin:"msg",time:2,msgSkin:"error"}),!1;"offLine"==t?(e.doUrl="/ums/w/user/kickoutUsers",e.typeTitle="强制离线("+n+")"):"addBlack"==t?(e.doUrl="/ums/w/user/blacklistUsers",e.typeTitle="加入黑名单("+n+")",e.operationType="HMD"):"cancelBlack"==t?(e.doUrl="/ums/w/user/unblacklistUsers",e.typeTitle="解除黑名单("+n+")",e.operationType="JC"):"delete"==t&&(e.doUrl="/ums/w/user/delUsers",e.typeTitle="删除("+n+")",e.operationType="SC"),e.operationJson=a,e.btnYes()},btnYes:function(){var t=this;t.off.layer=!0,t.layerType="addStaff";var e={operateUserIds:[]};for(var a in t.detailsList)1==t.detailsList[a].ischecked&&e.operateUserIds.push(t.detailsList[a].userId)},translateData:function(t,e){return Object(p.translateData)(t,e)},translateRole:function(t,e){return Object(p.translateRole)(t,e)},getDateTime:function(t){return Object(p.getDateTime)(t)}}},k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.off.searchStaff?n("div",[n("div",{staticClass:"ygcx greyFont"},[n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"grid-content bg-purple-dark m-search-title black"},[t._v("搜索条件")])])],1),t._v(" "),n("el-row",[n("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[n("div",{staticClass:"grid-content bg-purple-light"},[n("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[n("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[t._v("联系人：")])]),t._v(" "),n("el-col",{attrs:{xs:16,sm:14,md:14,lg:16,xl:16}},[n("el-input",{attrs:{maxlength:10,size:"small",placeholder:"请输入查询的联系人姓名"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),n("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)]),t._v(" "),n("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[n("div",{staticClass:"grid-content bg-purple-light"},[n("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[n("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[t._v("手机号码：")])]),t._v(" "),n("el-col",{attrs:{xs:16,sm:14,md:14,lg:16,xl:16}},[n("el-input",{attrs:{type:"tel",maxlength:11,size:"small",placeholder:"请输入查询的手机号码"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),n("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),n("el-row",{staticClass:"marginTop"},[n("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[n("div",{staticClass:"grid-content bg-purple-light"},[n("el-col",{attrs:{xs:5,sm:3,md:6,lg:4,xl:4}},[n("div",{staticClass:"grid-content bg-purple-dark f-ta-r inputTitle"},[t._v("当前状态：")])]),t._v(" "),n("el-col",{attrs:{xs:16,sm:16,md:14,lg:16,xl:16}},[n("el-radio",{attrs:{label:"1,2,3,4"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("全部")]),t._v(" "),n("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("正常")]),t._v(" "),n("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("黑名单")]),t._v(" "),n("el-radio",{attrs:{label:"3,4"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("注销")])],1),t._v(" "),n("el-col",{attrs:{xs:1,sm:1,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),n("el-row",{staticClass:"marginTop",staticStyle:{"text-align":"center"}},[n("button",{staticClass:"m-btn-orange",on:{click:function(e){t.search()}}},[t._v("搜索")])])],1),t._v(" "),n("el-row",[n("el-col",{staticStyle:{float:"right"},attrs:{xs:4,sm:4,md:4,lg:2,xl:2}},[n("div",{staticClass:"grid-content bg-purple-light addStaffDiv"},[2!=t.user.userRole&&3!=t.user.userRole?n("button",{on:{click:function(e){t.AddStaffDiv()}}},[t.off.addList?t._e():n("span",[t._v(" 添加员工 ")]),t.off.addList?n("span",[t._v(" 关闭 ")]):t._e()]):t._e()])])],1),t._v(" "),n("div",{staticClass:"m-addStaff-out"},[t.off.addList?n("div",{staticClass:"m-addStaff"},[t._l(t.list,function(e,a){return n("div",{key:a,staticStyle:{width:"100%"}},[n("b",[n("span",[t._v("用户姓名：")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.list[a].username,expression:"list[i].username"}],staticClass:"u-input",attrs:{placeholder:"请输入用户姓名",maxlength:10,type:"text"},domProps:{value:t.list[a].username},on:{input:function(e){e.target.composing||t.$set(t.list[a],"username",e.target.value)}}})]),t._v(" "),n("b",[n("span",[t._v("手机号码：")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.list[a].phone,expression:"list[i].phone"}],staticClass:"u-input",attrs:{placeholder:"请输入手机号码",maxlength:11,type:"text"},domProps:{value:t.list[a].phone},on:{input:function(e){e.target.composing||t.$set(t.list[a],"phone",e.target.value)}}})]),t._v(" "),n("b",[n("span",[t._v("角色：")]),t._v(" "),n("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:t.list[a].value,callback:function(e){t.$set(t.list[a],"value",e)},expression:"list[i].value"}},t._l(t.rolelist,function(t){return n("el-option",{key:t.id,attrs:{label:t.roleName,value:t.id}})}))],1),t._v(" "),n("b",[n("span",{staticClass:"u-icon-del",on:{click:function(e){t.deleteLine(a)}}})])])}),t._v(" "),n("div",{staticClass:"m-addStaff-btn"},[n("div",{staticClass:"m-addStaff-btn-in"},[n("button",{on:{click:function(e){t.AddList()}}},[t._v("新增一条")]),t._v(" "),n("button",{on:{click:function(e){t.AddStaff()}}},[t._v("确定添加")])])])],2):t._e()]),t._v(" "),t.detailsList?n("div",[n("div",[n("div",{staticClass:"m-listTitleFoot"},[n("el-row",[n("el-col",{staticStyle:{height:"35px"},attrs:{span:20}},[n("div",{staticClass:"grid-content bg-purple"},[n("h3",[t._v("员工列表"),n("span",{staticClass:"f-fw greyFont"},[t._v(" ("+t._s(t.form.page||"0")+")")])])])])],1)],1),t._v(" "),n("div",{staticClass:"m-details"},[n("table",{staticClass:"m-searchTab",staticStyle:{width:"100%",height:"100%"}},[t._m(0),t._v(" "),t._l(t.detailsList,function(e,i){return n("tr",{key:i,class:{greyFont:3==e.departState}},[n("td",[n("el-checkbox",{model:{value:e.ischecked,callback:function(a){t.$set(e,"ischecked",a)},expression:"v.ischecked"}})],1),t._v(" "),n("td",[t._v("\n                          "+t._s(15*(t.pa-1)+(i+1))+"\n                      ")]),t._v(" "),n("td",[n("p",{staticStyle:{float:"left","margin-left":"36%"}},[t._l(e.userRole,function(e,i){return n("span",{key:i},[3==e?n("img",{staticClass:"m-adminIcon",attrs:{src:a("iXw6")}}):t._e()])}),t._v("\n                              "+t._s(e.username)+"\n                          ")],2)]),t._v(" "),n("td",[n("a",{on:{click:function(a){t.getStaffDetails(e)}}},[t._v(t._s(e.phone))])]),t._v(" "),n("td",[e.createTime?n("span",[t._v("\n                              "+t._s(t.getDateTime(e.createTime)[6])+"\n                          ")]):t._e(),t._v(" "),e.createTime?t._e():n("span",[t._v("\n                              --\n                          ")])]),t._v(" "),n("td",t._l(e.userRole.split(","),function(a,i){return n("span",[t._v("\n                              "+t._s(t.translateRole(a,t.rolelist))+" "),e.userRole.split(",").length-1>i?n("span",[t._v(",")]):t._e()])})),t._v(" "),n("td",[n("span",{class:1==e.userState?"green":2==e.userState?"red":3==e.userState||4==e.userState?"grey":"--"},[t._v(t._s(t.translateData("userState",e.userState)))])]),t._v(" "),n("td",[1==e.userOrigin?n("span",[t._v("手动加入")]):2==e.userOrigin?n("span",[t._v("系统同步")]):n("span",[t._v("--")])]),t._v(" "),n("td",[e.lastLoginTime?n("span",[t._v("\n                              "+t._s(t.getDateTime(e.lastLoginTime)[6])+"\n                          ")]):t._e(),t._v(" "),e.lastLoginTime?t._e():n("span",[t._v("\n                              --\n                          ")])])])}),t._v(" "),0==t.detailsList.length?n("tr",[n("td",{staticClass:"f-ta-c",attrs:{colspan:"9"}},[t._v("\n                          暂无数据                            \n                      ")])]):t._e(),t._v(" "),t.detailsList.length>0?n("tr",[n("td",{staticClass:"f-pl-10",attrs:{colspan:"9"}},[n("span",{staticClass:"fl"},[t._v("选择 : "),n("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){t.doFilter("all")}}},[t._v("全选 ")]),t._v("-"),n("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){t.doFilter("on")}}},[t._v(" 取消全选 ")])])])]):t._e()],2)]),t._v(" "),t.detailsList.length>0?n("div",{staticClass:"m-listTitleFoot"},[n("el-row",[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple"},[n("el-pagination",{attrs:{layout:"prev, pager, next","page-size":15,"current-page":t.currentPage,total:t.form.page},on:{"current-change":t.search,"update:currentPage":function(e){t.currentPage=e}}})],1)]),t._v(" "),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple-light fr operate"},[t._v("操作 :"),t._e(),n("button",{on:{click:function(e){t.doFunction("addBlack")}}},[t._v("加入黑名单")]),n("button",{on:{click:function(e){t.doFunction("cancelBlack")}}},[t._v("解除黑名单")]),n("button",{on:{click:function(e){t.doFunction("delete")}}},[t._v("删除")])])])],1)],1):t._e()])]):t._e()],1):t._e(),t._v(" "),t.off.staffDetails?n("staffDetails",{attrs:{forms:t.searchRes}}):t._e(),t._v(" "),t.off.layer?n("layerConfirm",{attrs:{layer:t.layerType,operationType:t.operationType}}):t._e()],1)},S=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticStyle:{"font-size":"14px"}},[a("td"),t._v(" "),a("td",[t._v("序号")]),t._v(" "),a("td",[t._v("用户姓名")]),t._v(" "),a("td",[t._v("手机号码")]),t._v(" "),a("td",[t._v("创建时间")]),t._v(" "),a("td",[t._v("角色")]),t._v(" "),a("td",[t._v("当前状态")]),t._v(" "),a("td",[t._v("用户数据来源")]),t._v(" "),a("td",[t._v("最后登录时间")])])}],L={render:k,staticRenderFns:S},D=L,T=a("Z0/y"),C=i,I=T(w,D,!1,C,"data-v-467b7a81",null);e.default=I.exports},oMRM:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,"\n#detailsView[data-v-c011a250]{position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;\n}\n#detailsView>div[data-v-c011a250]{display: table-cell;vertical-align: middle;\n}\n#detailsView table[data-v-c011a250]{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;\n}\n#detailsView table td[data-v-c011a250]{padding:0px 10px;\n}\n#detailsView table th[data-v-c011a250]{padding: 15px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;\n}\n#detailsView table td>.fl[data-v-c011a250]{width:1rem;text-align: right;\n}\n#detailsView table td>.fright[data-v-c011a250]{margin-left: 1.05rem;text-align: left;\n}\n.lay-mask[data-v-c011a250]{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;\n}\n.tdBtn span[data-v-c011a250]{ display: inline-block;width: 50%;height: 40px;padding-top: 11px;margin-top: 20px;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: pointer\n}\n.tdBtn span[data-v-c011a250]:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red\n}\n.tdBtn span[data-v-c011a250]:nth-child(2){border-top: 1px solid #ccc;color: green\n}\ntbody tr[data-v-c011a250]{height: 36px;\n}\n.tdBtn2[data-v-c011a250] {cursor: pointer\n}\n.tdBtn2 span[data-v-c011a250]{display: inline-block;width: 100%; -webkit-box-sizing: border-box; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px;\n}\n.w84[data-v-c011a250]{width:84px\n}\n.pdl12[data-v-c011a250]{padding-left:12px\n}\n.m-input-phone p[data-v-c011a250]{width: 100%\n}\n.m-input-phone p input[data-v-c011a250]{width:100%;padding: 0 10px;height: 30px;outline: none;border: 1px solid #e9e9e9;border-radius: 3px\n}\n.m-input-phone p input[data-v-c011a250]:focus{border:1px solid #409EFF\n}\n.m-module-manualInput>input[data-v-c011a250]::-webkit-input-placeholder, .m-input-phone p input[data-v-c011a250]::-webkit-input-placeholder{\r\n    color:#bdbdbd;\n}\n.m-module-manualInput>input[data-v-c011a250]::-moz-placeholder, .m-input-phone p input[data-v-c011a250]::-moz-placeholder{   /* Mozilla Firefox 19+ */\r\n    color:#bdbdbd;\n}\n.m-module-manualInput>input[data-v-c011a250]:-moz-placeholder, .m-input-phone p input[data-v-c011a250]:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */\r\n    color:#bdbdbd;\n}\n.m-module-manualInput>input[data-v-c011a250]:-ms-input-placeholder, .m-input-phone p input[data-v-c011a250]:-ms-input-placeholder{  /* Internet Explorer 10-11 */ \r\n    color:#bdbdbd;\n}\n.m-input-authCode[data-v-c011a250]{height:28px\n}\n#detailsView table td[data-v-c011a250]{padding: 0\n}\r\n",""])},uoAK:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,"\n.m-addStaff-out[data-v-467b7a81]{width: 100%\n}\n.m-addStaff[data-v-467b7a81]{margin: 0 auto;border: 1px solid #c0c4cc;min-height: 100px;padding: 10px;background: white;border-radius: 4px;width:98%\n}\n.m-addStaff b[data-v-467b7a81]{height: 30px;display: inline-block;\n}\n.m-addStaff b span[data-v-467b7a81]{display: inline-block;width: 65px;text-align: justify;text-align-last: justify\n}\n.m-addStaff b span.u-icon-del[data-v-467b7a81]{width: 20px\n}\n.m-addStaff b input[data-v-467b7a81]{border: 1px solid #E8E8E8;height: 30px;border-radius: 4px;width: 80%;padding-left: 2%\n}\n.m-addStaff-btn button[data-v-467b7a81]{padding: 2px 10px;border-radius: 4px;outline:none;color: #fff;font-size: 14px\n}\n.m-addStaff-btn button[data-v-467b7a81]:nth-child(1){background: #00AA01;border: 1px solid #00AA01\n}\n.m-addStaff-btn button[data-v-467b7a81]:nth-child(2){background: #193163;border: 1px solid #193163\n}\n.m-addStaff-btn button[data-v-467b7a81]:active{-webkit-box-shadow: 0 0 5px grey;box-shadow: 0 0 5px grey\n}\n.m-addStaff-btn-in[data-v-467b7a81]{text-align: center;margin-top: 15px\n}\n@media screen and (min-width: 1400px){\n.m-addStaff b[data-v-467b7a81]:nth-child(1){\n        width: 30%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(2){\n        width: 30%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(3){\n        width: 35%\n}\n}\n@media screen and (min-width:1200px) and (max-width:1400px){\n.m-addStaff b input[data-v-467b7a81]{width: 65%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(1){\n        width: 25%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(2){\n        width: 25%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(3){\n        width: 45%\n}\n}\n@media screen and (min-width:600px) and (max-width:1200px){\n.m-addStaff b input[data-v-467b7a81]{width: 65%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(1){\n        width: 45%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(2){\n        width: 45%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(3){\n        margin-top: 10px;\n        width: 90%\n}\n}\n@media screen and (max-width: 600px){\n.m-addStaff b[data-v-467b7a81]:not(:first-child){\n        margin-top: 10px;\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(1){\n        width: 100%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(2){\n        width: 100%\n}\n.m-addStaff b[data-v-467b7a81]:nth-child(3){\n        width: 95%\n}\n}\ndiv.addStaffDiv button[data-v-467b7a81]{border-radius:4px;padding:3px 10px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;\n}\ndiv.operate button[data-v-467b7a81]{ padding: 4px 10px;margin-left: 10px;border-radius: 4px;outline: none;color: #000\n}\ndiv.operate button[data-v-467b7a81]:active{-webkit-box-shadow: 0 0 5px grey;box-shadow: 0 0 5px grey\n}\ndiv.borderTopModifyStaffState[data-v-467b7a81]{margin-left: 1%;width: 98%;border-top: 2px solid rgb(202, 202, 202)\n}\ndiv.modifyStaffStateDiv .buttonModifyYes[data-v-467b7a81]{border-radius:4px;padding:5px 20px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;\n}\ndiv.modifyStaffStateDiv .buttonModifyYes[data-v-467b7a81]:active{-webkit-box-shadow: 0 0 5px green;box-shadow: 0 0 5px green\n}\ndiv.addStaffDiv button[data-v-467b7a81]{border-radius:4px;padding:3px 6px;background: #00AA01;border:1px solid #00AA01;outline: none;color:#fff;\n}\n",""])}});