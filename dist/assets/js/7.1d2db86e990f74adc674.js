webpackJsonp([7],{"1Pkk":function(t,e,s){var a=s("Al5O");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("37772aaf",a,!0,{})},"3APz":function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\ndiv.yfd[data-v-7d00190b]{width: 100% ;height: 100%\n}\n.listTitleFoot[data-v-7d00190b]{width: 96%;margin: 10px 38px;\n}\n.listTitleFoot label[data-v-7d00190b]{display:block;width: 50%;\n}\nlabel.el-checkbox[data-v-7d00190b]{display: inline\n}\n.detailsUlDiv[data-v-7d00190b]{width: 90%;height: 90%;margin-left:40px;\n}\n.detailsUlDiv ul[data-v-7d00190b]{border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-top: 1px solid #ccc\n}\n.detailsUlDiv ul li[data-v-7d00190b] {padding: 6px 18px;border-bottom: 1px solid #ccc\n}\n.detailsUlDiv ul li[data-v-7d00190b]:nth-child(even){background: #ccc;\n}\ninput.modifyInput[data-v-7d00190b]{height: 28px;border-radius: 6px;outline: none;border: 1px solid #ccc;padding-left: 10px;\n}    \n",""])},Al5O:function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\n.listTitleFoot[data-v-bf6bbf72]{width: 96%;margin: 10px 18px;\n}\ntable tr td[data-v-bf6bbf72]{text-align: left;padding-left: 20px;\n}\n",""])},KeuS:function(t,e,s){var a=s("3APz");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("b29cdbbe",a,!0,{})},s6Ha:function(t,e,s){"use strict";function a(t){s("KeuS")}function n(t){s("1Pkk")}Object.defineProperty(e,"__esModule",{value:!0});var r=s("vHnB"),o=s.n(r),i=s("04Cm"),l=s("R2SV"),c={props:{forms:Object},data:function(){return{user:"",company:"",headerUser:"",name:"",phone:"",radio:"1",checked:!0,checked2:!0,reason:"",item:"",searchData:"",ix:[{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"},{color:"red",age:18,sex:"girl"}],off:{showSearch:"",addList:"",modify:!1,noModify:!0},form:{name:"张三",phone:"15666666666"},list:[{a:"",b:"",checked:!1,checked2:!0},{a:"",b:"",checked:!0,checked2:!1}]}},components:{},created:function(){var t=this,e=Object(l.getStore)("YFD_NMS_INFO");t.user=e,t.searchData=t.$parent.searchData,t.company=t.$parent.StaffdepartName},methods:{goBack:function(){var t=this;this.$parent.off.staffDetails=!1,this.$parent.off.searchStaff=!0,this.$parent.search(t.$parent.pa)},checkBtn:function(){for(var t in this.forms.userRole)if("3"==this.forms.userRole)return layer.open({content:"不允许修改店长信息",skin:"msg",time:2,msgSkin:"error"}),!1;var e=this;e.off.noModify=!1,e.off.modify=!0,e.oldName=e.forms.username,e.oldPhone=e.forms.phone},checkNo:function(){var t=this;t.off.noModify=!0,t.off.modify=!1,t.forms.username=t.oldName,t.forms.phone=t.oldPhone},checkYes:function(t){var e=this,s=this,a="",n={};s.off.noModify=!0,s.off.modify=!1,a="/ums/w/user/updateUserDetail",n.newUsername=s.forms.username,n.newPhone=s.forms.phone,n.searchUserId=s.$parent.searchUserId,Object(i.requestMethod)(n,a).then(function(t){if(200==t.code){layer.open({content:"请求成功",skin:"msg",time:2,msgSkin:"success"});var a="",n=e,r=o.a.service(options);a=n.$parent.searchDetailsYfdData,Object(i.requestMethod)(a,"/ums/w/user/getUserDetail").then(function(t){n.off.searchStaff=!1,n.off.staffDetails=!0,200==t.code&&(n.$parent.searchRes=t.data)}).then(function(){r.close()}).catch(function(t){return Object(l.errorDeal)(t)})}else s.forms.username=s.oldName,s.forms.phone=s.oldPhone,layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(l.errorDeal)(t)})},toMap:function(){var t=document.documentElement.clientWidth,e="",s=this,a=parseFloat(s.forms.latitude),n=parseFloat(s.forms.longitude);e=t<640?"http://map.baidu.com/mobile/?latlng="+a+","+n:"http://map.baidu.com/?latlng="+a+","+n,window.open(e)}}},d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"yfd"},[s("el-container",[s("header",{staticClass:"borderBottom"},[s("el-row",[s("el-col",{attrs:{span:9}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("公司名称 : "),s("span",{staticClass:"c-blue"},[t._v(" "+t._s(t.company))])])]),t._v(" "),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v("联系人 : "),s("span",[t._v(" "+t._s(t.forms.username))])])]),t._v(" "),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("手机号码 : "),s("span",[t._v(t._s(t.forms.phone))])])]),t._v(" "),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"grid-content bg-purple-light fr"},[s("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){t.goBack()}}},[t._v("返回列表")])])])],1)],1)])],1),t._v(" "),s("div",{staticClass:"listTitleFoot"},[s("el-row",[s("p"),s("h3",[t._v("员工详情")]),s("p")])],1),t._v(" "),s("div",{staticClass:"detailsUlDiv"},[s("ul",[s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("用户姓名:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.off.noModify?s("p",[t._v(t._s(t.forms.username))]):t._e(),t._v(" "),t.off.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.forms.username,expression:"forms.username"}],staticClass:"modifyInput",attrs:{type:"text"},domProps:{value:t.forms.username},on:{input:function(e){e.target.composing||t.$set(t.forms,"username",e.target.value)}}}):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("手机号码:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.off.noModify?s("p",[t._v(t._s(t.forms.phone))]):t._e(),t._v(" "),t.off.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.forms.phone,expression:"forms.phone"}],staticClass:"modifyInput",attrs:{type:"text"},domProps:{value:t.forms.phone},on:{input:function(e){e.target.composing||t.$set(t.forms,"phone",e.target.value)}}}):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("创建时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.forms.createTime?s("span",[t._v("\n                                    "+t._s(new Date(t.forms.createTime).toLocaleString())+"\n                                ")]):t._e(),t._v(" "),t.forms.createTime?t._e():s("span",[t._v("\n                                    --\n                                ")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("修改时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.forms.modifyTime?s("span",[t._v("\n                                    "+t._s(new Date(t.forms.modifyTime).toLocaleString())+"\n                                ")]):t._e(),t._v(" "),t.forms.modifyTime?t._e():s("span",[t._v("\n                                    --\n                                ")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("操作人:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.forms.operatorName))])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("职务:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},t._l(t.forms.userRole,function(e,a){return s("span",{key:a},[1==e?s("span",[t._v("管理员")]):t._e(),t._v(" "),2==e?s("span",[t._v("销售")]):t._e(),t._v(" "),3==e?s("span",[t._v("店长")]):t._e(),t._v(" "),4==e?s("span",[t._v("采购员")]):t._e(),t._v(" "),5==e?s("span",[t._v("业务员")]):t._e()])}))])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("当前状态:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.userState?s("span",{staticClass:"fcgreen"},[t._v("正常")]):t._e(),t._v(" "),2==t.forms.userState?s("span",{staticClass:"greyFont"},[t._v("黑名单")]):t._e(),t._v(" "),3==t.forms.userState?s("span",[t._v("注销")]):t._e()])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("最后登录时间:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.forms.lastLoginTime?s("span",[t._v("\n                                    "+t._s(new Date(t.forms.lastLoginTime).toLocaleString())+"\n                                ")]):t._e(),t._v(" "),t.forms.lastLoginTime?t._e():s("span",[t._v("\n                                    --\n                                ")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("登录方式:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.sessionPlatform?s("span",[t._v("Web在线")]):t._e(),t._v(" "),2==t.forms.sessionPlatform?s("span",[t._v("App在线")]):t._e(),t._v(" "),t.forms.sessionPlatform?t._e():s("span",[t._v("--")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("在线平台:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[1==t.forms.sessionType?s("span",[t._v("业务平台")]):t._e(),t._v(" "),2==t.forms.sessionType?s("span",[t._v("管理平台")]):t._e(),t._v(" "),t.forms.sessionPlatform?t._e():s("span",[t._v("--")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("IP:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t.forms.host?s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.forms.host))]):t._e()]),t._v(" "),s("el-col",{attrs:{span:20}},[t.forms.host?t._e():s("div",{staticClass:"grid-content bg-purple-light"},[t._v("--")])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("登录地址:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticClass:"grid-content bg-purple-light"},[t.forms.latitude?s("span",[t._v(" \n                                "+t._s(t.forms.latitude)+","+t._s(t.forms.longitude)+"\n                                "),s("a",{attrs:{href:"javascript:void(0)"},on:{click:t.toMap}},[t._v("【查看地图】")])]):t._e(),t._v(" "),t.forms.latitude?t._e():s("span",[t._v(" \n                               --\n                            ")])])])],1)],1),t._v(" "),s("li",[s("el-row",[s("el-col",{attrs:{span:4}},[s("div",{staticClass:"grid-content bg-purple"},[t._v("操作机型:")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t.forms.phoneType?s("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.forms.phoneType))]):t._e(),t._v(" "),t.forms.phoneType?t._e():s("div",{staticClass:"grid-content bg-purple-light"},[t._v("--")])])],1)],1)]),t._v(" "),s("div",{staticClass:"mt8"},[t.off.noModify?s("el-row",[s("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[2!=t.user.userRole&&3!=t.user.userRole?s("el-button",{attrs:{type:"success"},on:{click:function(e){t.checkBtn()}}},[t._v("修改")]):t._e()],1)])],1):t._e(),t._v(" "),t.off.modify?s("el-row",[s("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-button",{attrs:{type:"danger"},on:{click:function(e){t.checkNo()}}},[t._v("取消")]),s("el-button",{attrs:{type:"success"},on:{click:function(e){t.checkYes(t.forms.userId)}}},[t._v("确定")])],1)])],1):t._e()],1)])])},p=[],v={render:d,staticRenderFns:p},_=v,f=s("Z0/y"),u=a,m=f(c,_,!1,u,"data-v-7d00190b",null),g=m.exports,h={data:function(){return{currentPage:0,detailsList:"",name:"",phone:"",radio:"1,2",pa:"",searchData:"",searchDetailsYfdData:"",searchUserId:"",searchRes:"",StaffdepartName:"",off:{showSearch:"",searchList:!1,staffDetails:!1,searchStaff:!0},form:{page:1}}},components:{dlsStaff:g},created:function(){},methods:{search:function(t){""!=this.phone&&Object(l.checkMobile)(this.phone,function(){return!1});var e=o.a.service(options),s={},a=this;a.pa=t||1,a.currentPage=t||1,s={username:a.name,phone:a.phone,userState:a.radio,pageSize:15,pageNum:t||1},Object(i.requestMethod)(s,"/ums/w/user/userSearch").then(function(t){200==t.code?(a.off.searchList=!0,a.form.page=t.data.total,a.detailsList=t.data.users):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).then(function(){e.close()}).catch(function(t){return Object(l.errorDeal)(t)},e.close())},getDetails:function(t){},getStaffDetails:function(t){var e={},s=this,a=o.a.service(options);e={searchUserId:t.userId,sessionType:"2"},s.searchUserId=t.userId,s.searchDetailsYfdData=e,s.StaffdepartName=t.departName,Object(i.requestMethod)(e,"/ums/w/user/getUserDetail").then(function(t){s.off.searchStaff=!1,s.off.staffDetails=!0,200==t.code&&(s.searchRes=t.data)}).then(function(){a.close()}).catch(function(t){return Object(l.errorDeal)(t)})}}},b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.off.searchStaff?a("div",[a("div",{staticClass:"ygcx greyFont"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple-dark searchTitleStyle black"},[t._v("搜索条件")])])],1),t._v(" "),a("el-row",[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("联系人：")])]),t._v(" "),a("el-col",{attrs:{xs:19,sm:12,md:12,lg:16,xl:16}},[a("el-input",{attrs:{maxlength:10,size:"small",placeholder:"请输入查询的联系人姓名"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("手机号码：")])]),t._v(" "),a("el-col",{attrs:{xs:19,sm:12,md:12,lg:16,xl:16}},[a("el-input",{attrs:{maxlength:11,size:"small",placeholder:"请输入查询的手机号码"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1)],1)])],1),t._v(" "),a("el-row",{staticClass:"marginTop"},[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("当前状态：")])]),t._v(" "),a("el-col",{attrs:{xs:19,sm:18,md:12,lg:16,xl:16}},[a("el-radio",{attrs:{label:"1,2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("全部")]),t._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("正常")]),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("黑名单")])],1)],1)])],1),t._v(" "),a("el-row",{staticClass:"marginTop",staticStyle:{"text-align":"center"}},[a("button",{staticClass:"searchBtn",on:{click:function(e){t.search()}}},[t._v("搜索")])])],1),t._v(" "),t.detailsList?a("div",[a("div",[a("div",{staticClass:"listTitleFoot"},[a("el-row",[a("p"),a("h3",[t._v("员工列表"),a("span",{staticClass:"fontWeight greyFont"},[t._v("("+t._s(t.form.page||"0")+")")])]),a("p")])],1),t._v(" "),a("div",{staticClass:"detailsListDiv"},[a("table",{staticClass:"searchTab",staticStyle:{width:"100%",height:"100%"}},[t._m(0),t._v(" "),t._l(t.detailsList,function(e,n){return a("tr",{key:n,class:{greyFont:3==e.departState}},[a("td",[t._v("\n                          "+t._s(15*(t.pa-1)+(n+1))+"\n                      ")]),t._v(" "),a("td",[t._v(" ")]),t._v(" "),a("td",{staticClass:"nameIcon"},[a("p",[a("span",[t._l(e.userRole,function(e,n){return a("span",{key:n},[3==e?a("img",{staticClass:"adminIcon",attrs:{src:s("iXw6")}}):t._e()])}),t._v("\n                                  "+t._s(e.username)+"\n                              ")],2)])]),t._v(" "),a("td",[a("a",{staticClass:"textDec",on:{click:function(s){t.getStaffDetails(e)}}},[t._v(t._s(e.phone))])]),t._v(" "),a("td",[e.createTime?a("span",[t._v("\n                              "+t._s(new Date(e.createTime).toLocaleString())+"\n                          ")]):t._e(),t._v(" "),e.createTime?t._e():a("span",[t._v("\n                              --\n                          ")])]),t._v(" "),a("td",t._l(e.userRole,function(e,s){return a("span",{key:s},[1==e?a("span",[t._v("管理员")]):t._e(),t._v(" "),2==e?a("span",[t._v("销售")]):t._e(),t._v(" "),3==e?a("span",[t._v("店长")]):t._e(),t._v(" "),4==e?a("span",[t._v("采购员")]):t._e(),t._v(" "),5==e?a("span",[t._v("业务员")]):t._e()])})),t._v(" "),a("td",[1==e.userState?a("span",{staticClass:"fcgreen"},[t._v("正常")]):t._e(),t._v(" "),2==e.userState?a("span",{staticClass:"greyFont"},[t._v("黑名单")]):t._e(),t._v(" "),3==e.userState?a("span",[t._v("注销")]):t._e()]),t._v(" "),a("td",[e.lastLoginTime?a("span",[t._v("\n                              "+t._s(new Date(e.lastLoginTime).toLocaleString())+"\n                          ")]):t._e(),t._v(" "),e.lastLoginTime?t._e():a("span",[t._v("\n                              --\n                          ")])])])}),t._v(" "),t.detailsList.length<=0?a("tr",[a("td",{staticClass:"tac",attrs:{colspan:"8"}},[t._v("\n                          暂无数据                                                        \n                      ")])]):t._e()],2)]),t._v(" "),t.detailsList.length>0?a("div",{staticClass:"listTitleFoot"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":15,"current-page":t.currentPage,total:t.form.page},on:{"current-change":t.search,"update:currentPage":function(e){t.currentPage=e}}})],1)])],1)],1):t._e()])]):t._e()]):t._e(),t._v(" "),t.off.staffDetails?a("dlsStaff",{attrs:{forms:t.searchRes}}):t._e()],1)},C=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",[t._v("序号")]),t._v(" "),s("td",[t._v(" ")]),t._v(" "),s("td",{staticClass:"nameIcon"},[t._v("用户姓名")]),t._v(" "),s("td",[t._v("手机号码")]),t._v(" "),s("td",[t._v("创建时间")]),t._v(" "),s("td",[t._v("职务")]),t._v(" "),s("td",[t._v("当前状态")]),t._v(" "),s("td",[t._v("最后登录时间")])])}],x={render:b,staticRenderFns:C},y=x,k=s("Z0/y"),w=n,S=k(h,y,!1,w,"data-v-bf6bbf72",null);e.default=S.exports}});