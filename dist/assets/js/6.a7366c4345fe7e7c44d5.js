webpackJsonp([6],{"2Aus":function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\ndiv.yfd[data-v-b40a6fd2]{width: 100% ;height: 100%\n}\n.listTitleFoot[data-v-b40a6fd2]{width: 96%;margin: 10px 38px;\n}\n.listTitleFoot label[data-v-b40a6fd2]{display:block;width: 50%;\n}\nlabel.el-checkbox[data-v-b40a6fd2]{display: inline\n}\n.detailsUlDiv[data-v-b40a6fd2]{width: 90%;height: 90%;margin-left:40px;\n}\n.detailsUlDiv ul[data-v-b40a6fd2]{border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-top: 1px solid #ccc\n}\n.detailsUlDiv ul li[data-v-b40a6fd2] {padding: 6px 18px;border-bottom: 1px solid #ccc\n}\n.detailsUlDiv ul li[data-v-b40a6fd2]:nth-child(even){background: #ccc;\n}\ndiv.el-row[data-v-b40a6fd2]{line-height:30px\n}\ninput.modifyInput[data-v-b40a6fd2]{height: 28px;border-radius: 6px;outline: none;border: 1px solid #ccc;padding-left: 10px;\n}\n",""])},BOkn:function(t,e,s){var a=s("2Aus");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("0428961f",a,!0,{})},EdZQ:function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\n.listTitleFoot[data-v-f1b0873a]{width: 96%;margin: 10px 18px;\n}\n.addList[data-v-f1b0873a]{border: 1px solid #ccc;min-height: 100px;padding: 10px;background: white\n}\n",""])},LqBy:function(t,e,s){var a=s("d2F1");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("27ea56c6",a,!0,{})},VtWV:function(t,e,s){"use strict";function a(t){s("LqBy")}function n(t){s("BOkn")}function i(t){s("d2p8")}Object.defineProperty(e,"__esModule",{value:!0});var r=s("vHnB"),o=s.n(r),l=s("04Cm"),c=s("R2SV"),d={text:"正在加载"},p={data:function(){return{count:"点击获取验证码",timer:null,show:!0,date:"",time:"",value:"",authCode:"",phone:"",userId:"",authCodeUrl:"",syncUrl:"",user:"",btnDisabled:!1,searchType:"",off:{set:!1,sync:!1,rsync:!1}}},created:function(){var t=this,e=Object(c.getStore)("YFD_NMS_INFO");t.user=e,t.searchType=t.$parent.searchType,1==t.$parent.off.setSync?(t.off.set=!0,t.off.sync=!1):1==t.$parent.off.sync&&(t.off.sync=!0,t.off.set=!1)},methods:{getAuthCode:function(t){var e=this;this.timer||(this.count=120,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=120?(e.btnDisabled=!0,e.count--):(e.btnDisabled=!1,e.show=!0,e.count="点击获取验证码",clearInterval(e.timer),e.timer=null)},1e3));var s=this,a={userId:s.user.userId,phone:s.user.phone||""};s.authCodeUrl="/yfd-ums/w/user/getAuthCode",Object(l.requestMethod)(a,s.authCodeUrl).then(function(t){t.hasOwnProperty("code")&&200==t.code?layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"success"}):t.hasOwnProperty("code")&&200!=t.code?layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"}):layer.open({content:t,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(c.errorDeal)(t)})},btnYes:function(t){var e=this,s=this,a={},n=o.a.service(d);if(a=s.$parent.addUsersData,a.authCode=s.authCode,""==s.authCode)return layer.open({content:"请输入验证码",skin:"msg",time:2,msgSkin:"error"}),!1;Object(l.requestMethod)(a,"/yfd-ums/w/user/addUsers").then(function(t){s.$parent.off.layer=!1,200==t.code?(layer.open({content:"操作成功",skin:"msg",time:2,msgSkin:"success"}),e.$parent.list=[],e.$parent.list.push({username:"",phone:"",checked:!1,checked2:!1,checked3:!1,departName:"好亚飞达总部"}),1==s.$parent.off.searchList&&e.$parent.search()):(e.$parent.list=[],e.$parent.list.push({username:"",phone:"",checked:!1,checked2:!1,checked3:!1,departName:"好亚飞达总部"}),layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"}))}).then(function(){n.close()}).catch(function(t){return Object(c.errorDeal)(t)})},close:function(){this.$parent.off.layer=!1}}},f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"greyFont",attrs:{id:"detailsView"}},[t.off.sync?s("div",[s("table",[t._m(0),t._v(" "),s("tbody",[s("tr",{attrs:{colspan:"2"}},[s("td",{staticClass:"fl"},[s("p",[t._v("验证号码:"),s("span",{model:{value:t.user.phone,callback:function(e){t.$set(t.user,"phone",e)},expression:"user.phone"}},[t._v(t._s(t.user.phone))])])])]),t._v(" "),s("tr",{attrs:{colspan:"2"}},[s("el-input",{staticStyle:{width:"60%"},attrs:{size:"mini",maxlength:6,placeholder:"请输入短信验证码"},model:{value:t.authCode,callback:function(e){t.authCode=e},expression:"authCode"}}),s("el-button",{staticStyle:{width:"112px"},attrs:{size:"mini",type:"primary",disabled:t.btnDisabled},on:{click:function(e){t.getAuthCode(t.userId)}},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}},[t._v(t._s(t.count))])],1),t._v(" "),s("tr",{staticClass:"tdBtn",attrs:{colspan:"2"}},[s("span",{on:{click:function(e){t.close()}}},[t._v("取消")]),t._v(" "),s("span",{on:{click:function(e){t.btnYes(2)}}},[t._v("确认")])])])]),t._v(" "),s("div",{staticClass:"lay-mask"})]):t._e()])},u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{colspan:"2"}},[t._v("\r\n\t\t\t\t\t\t添加员工\r\n\t\t\t\t\t")])])])}],v={render:f,staticRenderFns:u},h=v,g=s("Z0/y"),m=a,_=g(p,h,!1,m,"data-v-040aaf44",null),b=_.exports,x=s("a3Yh"),y=s.n(x),k={text:"正在加载"},w={props:{forms:Object},data:function(){var t;return t={oldName:"",oldPhone:"",company:"",managerName:"",managerPhone:""},y()(t,"company",""),y()(t,"name",""),y()(t,"phone",""),y()(t,"radio","1"),y()(t,"checked",!0),y()(t,"checked2",!0),y()(t,"reason",""),y()(t,"item",""),y()(t,"user",""),y()(t,"ix",[{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"}]),y()(t,"off",{showSearch:"",addList:"",modify:!1,noModify:!0}),y()(t,"form",{name:"张三",phone:"15666666666"}),y()(t,"list",[{a:"",b:"",checked:!1,checked2:!0},{a:"",b:"",checked:!0,checked2:!1}]),t},components:{},created:function(){var t=this,e=Object(c.getStore)("YFD_NMS_INFO");t.user=e,t.company=t.$parent.company,t.managerName=t.$parent.managerName,t.managerPhone=t.$parent.managerPhone},methods:{goBack:function(){var t=this;this.$parent.off.staffDetails=!1,this.$parent.off.searchStaff=!0,this.$parent.search(t.$parent.pa)},checkBtn:function(){var t=this;t.off.noModify=!1,t.off.modify=!0,t.oldName=t.forms.username,t.oldPhone=t.forms.phone},checkNo:function(){var t=this;t.off.noModify=!0,t.off.modify=!1,t.forms.username=t.oldName,t.forms.phone=t.oldPhone},checkYes:function(t){var e=this,s=this,a={};s.off.noModify=!0,s.off.modify=!1,a.newUsername=s.forms.username,a.newPhone=s.forms.phone,a.searchUserId=t,Object(l.requestMethod)(a,"/yfd-ums/w/user/updateUserDetail").then(function(t){if(200==t.code){layer.open({content:"操作成功",skin:"msg",time:2,msgSkin:"success"});var a={},n=e,i=o.a.service(k);a=n.$parent.searchDetailsYfdData,Object(l.requestMethod)(a,"/yfd-ums/w/user/getUserDetail").then(function(t){200==t.code&&(n.off.searchStaff=!1,n.off.staffDetails=!0,n.$parent.searchRes=t.data)}).then(function(){i.close()}).catch(function(t){return errorDeal(t)})}else s.forms.username=s.oldName,s.forms.phone=s.oldPhone,layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).then(function(){}).catch(function(t){return errorDeal(t)})}}},C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"yfd"},[s("el-container",[s("el-header",{staticStyle:{"margin-right":"1%","margin-left":"1%","border-bottom":"1px solid #ccc","padding-top":"6px",height:"50px"}},[s("el-row",[s("el-col",{attrs:{span:12}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("公司名称 : "),s("a",{staticClass:"c-blue",attrs:{href:"javascript:void(0)"},on:{click:function(e){t.goBack()}}},[t._v("好亚飞达总部")])])]),t._v(" "),s("el-col",{attrs:{span:12}},[s("div",{staticClass:"grid-content bg-purple-light fr",staticStyle:{"padding-right":"40px"}},[s("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){t.goBack()}}},[t._v("返回列表")])])])],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"listTitleFoot"},[s("el-row",[s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("员工列表")])])],1)],1),t._v(" "),s("div",{staticClass:"detailsUlDiv"},[s("ul",[s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("用户姓名:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.off.noModify?s("p",[t._v(t._s(t.forms.username))]):t._e(),t._v(" "),t.off.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.forms.username,expression:"forms.username"}],staticClass:"modifyInput",attrs:{type:"text"},domProps:{value:t.forms.username},on:{input:function(e){e.target.composing||t.$set(t.forms,"username",e.target.value)}}}):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("手机号码:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.off.noModify?s("p",[t._v(t._s(t.forms.phone))]):t._e(),t._v(" "),t.off.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.forms.phone,expression:"forms.phone"}],staticClass:"modifyInput",attrs:{maxlength:11,type:"text"},domProps:{value:t.forms.phone},on:{input:function(e){e.target.composing||t.$set(t.forms,"phone",e.target.value)}}}):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("创建时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(new Date(t.forms.createTime).toLocaleString()))])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("修改时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(new Date(t.forms.modifyTime).toLocaleString()))])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("操作人:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.forms.operatorName))])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("职务:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},t._l(t.forms.userRole,function(e,a){return s("span",{key:a},[1==e?s("span",[t._v("管理员")]):t._e(),t._v(" "),2==e?s("span",[t._v("销售")]):t._e(),t._v(" "),3==e?s("span",[t._v("店长")]):t._e(),t._v(" "),4==e?s("span",[t._v("采购员")]):t._e(),t._v(" "),5==e?s("span",[t._v("业务员")]):t._e()])}))])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("当前状态:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.userState?s("span",[t._v("正常")]):t._e(),t._v(" "),2==t.forms.userState?s("span",[t._v("黑名单")]):t._e(),t._v(" "),3==t.forms.userState?s("span",[t._v("注销")]):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("最后登录时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(new Date(t.forms.lastLoginTime).toLocaleString()))])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("登录方式:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.sessionPlatform?s("span",[t._v("Web在线")]):t._e(),2==t.forms.sessionPlatform?s("span",[t._v("App在线")]):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("在线平台:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.sessionType?s("span",[t._v("业务平台")]):t._e(),2==t.forms.sessionType?s("span",[t._v("管理平台")]):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("IP:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"})])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("登录地址:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v("\n                            "+t._s(t.forms.latitude)+","+t._s(t.forms.longitude)+"\n                            "),s("a",{attrs:{href:"javascript:void(0)"},on:{click:t.toMap}},[t._v("查看地图")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("操作机型:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.forms.phoneType))])])],1)],1)]),t._v(" "),s("div",{staticClass:"mt8"},[t.off.noModify?s("el-row",[s("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[2!=t.user.userRole&&3!=t.user.userRole?s("el-button",{attrs:{type:"success"},on:{click:t.checkBtn}},[t._v("修改")]):t._e()],1)])],1):t._e(),t._v(" "),t.off.modify?s("el-row",[s("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-button",{attrs:{type:"danger"},on:{click:t.checkNo}},[t._v("取消")]),s("el-button",{attrs:{type:"success"},on:{click:function(e){t.checkYes(t.forms.userId)}}},[t._v("确定")])],1)])],1):t._e()],1)])])},S=[],D={render:C,staticRenderFns:S},$=D,L=s("Z0/y"),T=n,F=L(w,$,!1,T,"data-v-b40a6fd2",null),I=F.exports,N={text:"正在加载"},U={data:function(){return{user:"",currentPage:0,detailsList:"",name:"",phone:"",radio:"1,2",pa:"",searchDetailsYfdData:"",searchRes:"",addAble:0,list:[{username:"",phone:"",checked2:!1,checked3:!1,departName:"好亚飞达总部"}],off:{showSearch:"",searchList:!1,staffDetails:!1,searchStaff:!0,addList:!1,layer:!1},form:{page:1}}},components:{yfdStaff:I,"common-layer":b},created:function(){var t=this,e=Object(c.getStore)("YFD_NMS_INFO");t.user=e},methods:{AddList:function(){this.list.push({username:"",phone:"",checked2:!1,checked3:!1,departName:"好亚飞达总部"})},AddStaffDiv:function(){this.off.addList=!this.off.addList},AddStaff:function(){for(var t={newUsers:[],authCode:""},e=0;e<this.list.length;e++)this.list[e].userRole="",(""!=this.list[e].username&&""!=this.list[e].phone&&1==this.list[e].checked||1==this.list[e].checked2||1==this.list[e].checked3)&&(1==this.list[e].checked2&&(this.list[e].userRole="1"),1==this.list[e].checked3&&(1==this.list[e].checked2?this.list[e].userRole+=",2":0==this.list[e].checked2&&(this.list[e].userRole="2")),delete this.list[e].checked2,delete this.list[e].checked3,t.newUsers.push(this.list[e]),this.addAble="1");if("0"==this.addAble)return layer.open({content:"请输入添加的员工信息",skin:"msg",time:2,msgSkin:"error"}),!1;this.off.layer=!0,this.off.sync=!0,this.off.userAdd=!0,this.addUsersData=t},search:function(t){var e=o.a.service(N),s={},a=this;a.pa=t||1,a.currentPage=t||1,s={searchDepartId:"1803160000",username:a.name,phone:a.phone,userState:a.radio,pageSize:15,pageNum:t||1},Object(l.requestMethod)(s,"/yfd-ums/w/user/getDepartDetail").then(function(t){200==t.code?(a.off.searchList=!0,a.form.page=t.data.total,a.detailsList=t.data.users,a.off.addList=!1):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).then(function(){e.close()}).catch(function(t){return Object(c.errorDeal)(t)},e.close())},getStaffDetails:function(t){var e={},s=this,a=o.a.service(N);e={searchUserId:t.userId,sessionType:"2"},s.searchDetailsYfdData=e,Object(l.requestMethod)(e,"/yfd-ums/w/user/getUserDetail").then(function(t){s.off.searchStaff=!1,s.off.staffDetails=!0,s.searchRes=t.data,t.code}).then(function(){a.close()}).catch(function(t){return Object(c.errorDeal)(t)})}}},O=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.off.searchStaff?s("div",[s("div",{staticClass:"ygcx greyFont"},[s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple-dark searchTitleStyle black"},[t._v("搜索条件")])])],1),t._v(" "),s("el-row",[s("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[s("div",{staticClass:"grid-content bg-purple-light"},[s("el-col",{attrs:{xs:6,sm:4,md:4,lg:4,xl:4}},[s("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("联系人：")])]),t._v(" "),s("el-col",{attrs:{xs:14,sm:16,md:16,lg:16,xl:16}},[s("el-input",{attrs:{maxlength:10,size:"small",placeholder:"请输入查询的联系人姓名"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),s("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)]),t._v(" "),s("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[s("div",{staticClass:"grid-content bg-purple-light"},[s("el-col",{attrs:{xs:6,sm:6,md:4,lg:4,xl:4}},[s("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("手机号码：")])]),t._v(" "),s("el-col",{attrs:{xs:14,sm:14,md:16,lg:16,xl:16}},[s("el-input",{attrs:{maxlength:11,size:"small",placeholder:"请输入查询的手机号码"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),s("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),s("el-row",{staticClass:"marginTop"},[s("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[s("div",{staticClass:"grid-content bg-purple-light"},[s("el-col",{attrs:{xs:6,sm:2,md:4,lg:4,xl:4}},[s("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("当前状态：")])]),t._v(" "),s("el-col",{attrs:{xs:17,sm:16,md:16,lg:16,xl:16}},[s("el-radio",{attrs:{label:"1,2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("全部")]),t._v(" "),s("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("正常")]),t._v(" "),s("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("黑名单")])],1),t._v(" "),s("el-col",{attrs:{xs:1,sm:1,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),s("el-row",{staticClass:"marginTop",staticStyle:{"text-align":"center"}},[s("button",{staticClass:"searchBtn",on:{click:function(e){t.search()}}},[t._v("搜索")])])],1),t._v(" "),s("el-row",[s("el-col",{staticStyle:{float:"right"},attrs:{span:2}},[s("div",{staticClass:"grid-content bg-purple-light"},[2!=t.user.userRole&&3!=t.user.userRole?s("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){t.AddStaffDiv()}}},[t._v("添加员工")]):t._e()],1)])],1),t._v(" "),t.off.addList?s("div",{staticClass:"listTitleFoot addList"},[s("div",{staticStyle:{float:"right"}},[s("button",{staticClass:"buttonAddStaff",staticStyle:{display:"block"},on:{click:function(e){t.AddList()}}},[t._v("增加一行")]),t._v(" "),s("button",{staticClass:"buttonAddStaff",on:{click:function(e){t.AddStaff()}}},[t._v("确定添加")])]),t._v(" "),t._l(t.list,function(e,a){return s("div",{key:a,staticClass:"mt8"},[t._v("\n          用户姓名 : "),s("el-input",{staticStyle:{width:"25%"},attrs:{size:"small",maxlength:10,placeholder:"请输入内容"},model:{value:t.list[a].username,callback:function(e){t.$set(t.list[a],"username",e)},expression:"list[i].username"}}),t._v("\n             手机号码 : "),s("el-input",{staticStyle:{width:"25%"},attrs:{size:"small",maxlength:11,placeholder:"请输入内容"},model:{value:t.list[a].phone,callback:function(e){t.$set(t.list[a],"phone",e)},expression:"list[i].phone"}}),t._v("\n             职务 :  "),s("el-checkbox",{model:{value:t.list[a].checked2,callback:function(e){t.$set(t.list[a],"checked2",e)},expression:"list[i].checked2"}},[t._v("管理员")]),s("el-checkbox",{model:{value:t.list[a].checked3,callback:function(e){t.$set(t.list[a],"checked3",e)},expression:"list[i].checked3"}},[t._v("销售")])],1)})],2):t._e(),t._v(" "),t.detailsList?s("div",[t.detailsList.length>0?s("div",[s("div",{staticClass:"listTitleFoot"},[s("el-row",[s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("员工列表"),t.form.page>0?s("span",{staticClass:"fontWeight greyFont"},[t._v(" ("+t._s(t.form.page)+")")]):t._e()])])],1)],1),t._v(" "),s("div",{staticClass:"detailsListDiv"},[s("table",{staticClass:"searchTab",staticStyle:{width:"100%",height:"100%"}},[t._m(0),t._v(" "),t._l(t.detailsList,function(e,a){return s("tr",{key:a,class:{greyFont:3==e.departState}},[s("td",[t._v("\n                          "+t._s(15*(t.pa-1)+(a+1))+"\n                      ")]),t._v(" "),s("td",[s("a",{attrs:{href:"javascript:void(0)"},on:{click:function(s){t.getStaffDetails(e)}}},[t._v(t._s(e.username))])]),t._v(" "),s("td",[t._v("\n                      "+t._s(e.phone)+"\n                      ")]),t._v(" "),s("td",[t._v("\n                      "+t._s(new Date(e.createTime).toLocaleString())+"\n                      ")]),t._v(" "),s("td",t._l(e.userRole,function(e,a){return s("span",{key:a},[1==e?s("span",[t._v("管理员")]):t._e(),t._v(" "),2==e?s("span",[t._v("销售")]):t._e(),t._v(" "),3==e?s("span",[t._v("店长")]):t._e(),t._v(" "),4==e?s("span",[t._v("采购员")]):t._e(),t._v(" "),5==e?s("span",[t._v("业务员")]):t._e()])})),t._v(" "),s("td",[1==e.userState?s("span",[t._v("正常")]):t._e(),t._v(" "),2==e.userState?s("span",[t._v("黑名单")]):t._e(),t._v(" "),3==e.userState?s("span",[t._v("注销")]):t._e()]),t._v(" "),s("td",[t._v("\n                      "+t._s(new Date(e.lastLoginTime).toLocaleString())+"\n                      ")])])})],2)]),t._v(" "),s("div",{staticClass:"listTitleFoot"},[s("el-row",[s("el-col",{attrs:{span:12}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-pagination",{attrs:{layout:"prev, pager, next","page-size":15,"current-page":t.currentPage,total:t.form.page},on:{"current-change":t.search,"update:currentPage":function(e){t.currentPage=e}}})],1)])],1)],1)]):t._e(),t._v(" "),0==t.detailsList.length?s("div",{staticClass:"searchResultInfoNone"},[t._v("\n        查询结果为空!\n      ")]):t._e()]):t._e()],1):t._e(),t._v(" "),t.off.staffDetails?s("yfdStaff",{attrs:{forms:t.searchRes}}):t._e(),t._v(" "),t.off.layer?s("common-layer"):t._e()],1)},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",[t._v("序号")]),t._v(" "),s("td",[t._v("用户姓名")]),t._v(" "),s("td",[t._v("手机号码")]),t._v(" "),s("td",[t._v("创建时间")]),t._v(" "),s("td",[t._v("职务")]),t._v(" "),s("td",[t._v("当前状态")]),t._v(" "),s("td",[t._v("最后登录时间")])])}],P={render:O,staticRenderFns:R},j=P,A=s("Z0/y"),M=i,B=A(U,j,!1,M,"data-v-f1b0873a",null);e.default=B.exports},d2F1:function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\n#detailsView[data-v-040aaf44]{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;\n}\n#detailsView>div[data-v-040aaf44]{display: table-cell;vertical-align: middle;\n}\n#detailsView table[data-v-040aaf44]{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;\n}\n#detailsView table td[data-v-040aaf44]{padding:5px 30px;\n}\n#detailsView table th[data-v-040aaf44]{padding: 18px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;\n}\n#detailsView table td>.fl[data-v-040aaf44]{width:1rem;text-align: right;\n}\n#detailsView table td>.fright[data-v-040aaf44]{margin-left: 1.05rem;text-align: left;\n}\n.lay-mask[data-v-040aaf44]{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;\n}\n.tdBtn span[data-v-040aaf44]{ display: inline-block;width: 50%;height: 50px;padding: 20px;margin-top: 20px;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: pointer\n}\n.tdBtn span[data-v-040aaf44]:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red\n}\n.tdBtn span[data-v-040aaf44]:nth-child(2){border-top: 1px solid #ccc;color: green\n}\ntbody tr[data-v-040aaf44]{height: 36px;\n}\n.tdBtn2[data-v-040aaf44] {cursor: pointer\n}\n.tdBtn2 span[data-v-040aaf44]{display: inline-block;width: 100%; -webkit-box-sizing: border-box; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px;\n}\r\n",""])},d2p8:function(t,e,s){var a=s("EdZQ");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("edec8b14",a,!0,{})}});