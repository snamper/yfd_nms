webpackJsonp([7],{FonU:function(t,e,s){var a=s("PPhx");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("66de8b58",a,!0,{})},PPhx:function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\n#detailsView[data-v-1d29d198]{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;\n}\n#detailsView>div[data-v-1d29d198]{display: table-cell;vertical-align: middle;\n}\n#detailsView table[data-v-1d29d198]{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;\n}\n#detailsView table td[data-v-1d29d198]{padding:0px 10px;\n}\n#detailsView table th[data-v-1d29d198]{padding: 18px 0;border-radius: 4px 4px 0 0;color: #545454;font-size: 16px;\n}\n#detailsView table td>.fl[data-v-1d29d198]{width:1rem;text-align: right;\n}\n#detailsView table td>.fright[data-v-1d29d198]{margin-left: 1.05rem;text-align: left;\n}\n.lay-mask[data-v-1d29d198]{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;\n}\n.tdBtn span[data-v-1d29d198]{ display: inline-block;width: 50%;height: 40px;padding-top: 11px;margin-top: 20px;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: pointer\n}\n.tdBtn span[data-v-1d29d198]:nth-child(1){border-top: 1px solid #ccc;border-right: 1px solid #ccc;color: red\n}\n.tdBtn span[data-v-1d29d198]:nth-child(2){border-top: 1px solid #ccc;color: green\n}\ntbody tr[data-v-1d29d198]{height: 36px;\n}\n.tdBtn2[data-v-1d29d198] {cursor: pointer\n}\n.tdBtn2 span[data-v-1d29d198]{display: inline-block;width: 100%; -webkit-box-sizing: border-box; box-sizing: border-box;border-top:1px solid #ccc;padding-top: 10px;\n}\n.w84[data-v-1d29d198]{width:84px\n}\n.pdl12[data-v-1d29d198]{padding-left:12px\n}\r\n",""])},VtWV:function(t,e,s){"use strict";function a(t){s("FonU")}function n(t){s("ozCq")}Object.defineProperty(e,"__esModule",{value:!0});var i=s("PdJF"),l=s.n(i),r=s("04Cm"),o=s("R2SV"),c={data:function(){return{count:"获取验证码",timer:null,show:!0,date:"",time:"",value:"",authCode:"",phone:"",userId:"",authCodeUrl:"",syncUrl:"",user:"",btnDisabled:!1,searchType:"",off:{set:!1,sync:!1,rsync:!1}}},created:function(){var t=this,e=Object(o.getStore)("YFD_NMS_INFO");t.user=e,t.searchType=t.$parent.searchType,1==t.$parent.off.setSync?(t.off.set=!0,t.off.sync=!1):1==t.$parent.off.sync&&(t.off.sync=!0,t.off.set=!1)},methods:{getAuthCode:function(t){var e=this;this.timer||(this.count=120,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=120?(e.btnDisabled=!0,e.count--):e.resetTimer()},1e3));var s=this,a={userId:s.user.userId,phone:s.user.phone||""};s.authCodeUrl="/ums/w/user/getAuthCode",Object(r.requestMethod)(a,s.authCodeUrl).then(function(t){t.hasOwnProperty("code")&&200==t.code?layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"success"}):t.hasOwnProperty("code")&&200!=t.code?layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"}):layer.open({content:t,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(o.errorDeal)(t)})},btnYes:function(t){var e=this,s=this,a={};if(a=s.$parent.addUsersData,a.authCode=s.authCode,""==s.authCode)return layer.open({content:"请输入验证码",skin:"msg",time:2,msgSkin:"error"}),!1;this.resetTimer(),s.authCode="",Object(r.requestMethod)(a,"/ums/w/user/addUsers").then(function(t){s.$parent.off.layer=!1,200==t.code?(layer.open({content:"操作成功",skin:"msg",time:2,msgSkin:"success"}),e.$parent.list=[],e.$parent.list.push({username:"",phone:"",checked:!1,checked2:!1,checked3:!1,departName:"好亚飞达总部"}),1==s.$parent.off.searchList&&e.$parent.search()):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(o.errorDeal)(t)})},close:function(){this.$parent.off.layer=!1},resetTimer:function(){this.btnDisabled=!1,this.show=!0,this.count="获取验证码",clearInterval(this.timer),this.timer=null}}},d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"greyFont",attrs:{id:"detailsView"}},[t.off.sync?s("div",[s("table",[t._m(0),t._v(" "),s("tbody",[s("tr",{attrs:{colspan:"2"}},[s("td",{staticClass:"fl"},[s("p",{staticClass:"pdl12"},[t._v("验证号码 : "),s("span",{model:{value:t.user.phone,callback:function(e){t.$set(t.user,"phone",e)},expression:"user.phone"}},[t._v(t._s(t.user.phone))])])])]),t._v(" "),s("tr",{attrs:{colspan:"2"}},[s("td",[s("el-input",{staticStyle:{width:"60%"},attrs:{size:"mini",maxlength:6,placeholder:"请输入短信验证码"},model:{value:t.authCode,callback:function(e){t.authCode=e},expression:"authCode"}}),s("el-button",{staticClass:"w84",attrs:{size:"mini",type:"primary",disabled:t.btnDisabled},on:{click:function(e){t.getAuthCode(t.userId)}},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}},[t._v(t._s(t.count))])],1)]),t._v(" "),s("tr",{staticClass:"tdBtn",attrs:{colspan:"2"}},[s("span",{on:{click:function(e){t.close()}}},[t._v("取消")]),t._v(" "),s("span",{on:{click:function(e){t.btnYes(2)}}},[t._v("确认")])])])]),t._v(" "),s("div",{staticClass:"lay-mask"})]):t._e()])},u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{colspan:"2"}},[t._v("\r\n\t\t\t\t\t\t添加员工\r\n\t\t\t\t\t")])])])}],p={render:d,staticRenderFns:u},h=p,f=s("Z0/y"),v=a,m=f(c,h,!1,v,"data-v-1d29d198",null),_=m.exports,g=s("hyii"),b={data:function(){return{user:"",currentPage:0,detailsList:"",name:"",phone:"",radio:"1,2",pa:"",searchDetailsYfdData:"",searchRes:"",addAble:0,list:[{username:"",phone:"",checked2:!1,checked3:!1,departName:"好亚飞达总部"}],off:{showSearch:"",searchList:!1,staffDetails:!1,searchStaff:!0,addList:!1,layer:!1},form:{page:1}}},components:{yfdStaff:g.a,"common-layer":_},created:function(){var t=this,e=Object(o.getStore)("YFD_NMS_INFO");t.user=e},methods:{AddList:function(){this.list.push({username:"",phone:"",checked2:!1,checked3:!1,departName:"好亚飞达总部"})},AddStaffDiv:function(){this.off.addList=!this.off.addList},AddStaff:function(){for(var t={newUsers:[],authCode:""},e=0;e<this.list.length;e++)this.list[e].userRole="",(""!=this.list[e].username&&""!=this.list[e].phone&&1==this.list[e].checked||1==this.list[e].checked2||1==this.list[e].checked3)&&(1==this.list[e].checked2&&(this.list[e].userRole="1"),1==this.list[e].checked3&&(1==this.list[e].checked2?this.list[e].userRole+=",2":0==this.list[e].checked2&&(this.list[e].userRole="2")),t.newUsers.push(this.list[e]));for(var s=0;s<t.newUsers.length;s++)delete t.newUsers[s].checked2,delete t.newUsers[s].checked3,this.addAble="1";if("0"==this.addAble)return layer.open({content:"请输入添加的员工信息",skin:"msg",time:2,msgSkin:"error"}),!1;this.off.layer=!0,this.off.sync=!0,this.off.userAdd=!0,this.addUsersData=t},search:function(t){var e={},s=this;s.pa=t||1,s.currentPage=t||1,""!=s.phone&&Object(o.checkMobile)(s.phone,function(){return!1}),e={searchDepartId:"1803160000",username:s.name,phone:s.phone,userState:s.radio,pageSize:15,pageNum:t||1};var a=l.a.service(options);Object(r.requestMethod)(e,"/ums/w/user/getDepartDetail",function(){a.close()}).then(function(t){200==t.code?(s.off.searchList=!0,s.form.page=t.data.total,s.detailsList=t.data.users):layer.open({content:t.msg,skin:"msg",time:2,msgSkin:"error"})}).catch(function(t){return Object(o.errorDeal)(t)})},getStaffDetails:function(t){var e={},s=this,a=l.a.service(options);e={searchUserId:t.userId,sessionType:"2"},s.searchDetailsYfdData=e,Object(r.requestMethod)(e,"/ums/w/user/getUserDetail",function(){a.close()}).then(function(t){200==t.code?(s.off.searchStaff=!1,s.off.staffDetails=!0,s.searchRes=t.data):Object(o.errorDeal)(t)}).catch(function(t){return Object(o.errorDeal)(t)})},getDateTime:function(t){return Object(o.getDateTime)(t)}}},x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.off.searchStaff?a("div",[a("div",{staticClass:"ygcx greyFont"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple-dark searchTitleStyle black"},[t._v("搜索条件")])])],1),t._v(" "),a("el-row",[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("联系人：")])]),t._v(" "),a("el-col",{attrs:{xs:16,sm:14,md:14,lg:16,xl:16}},[a("el-input",{attrs:{maxlength:10,size:"small",placeholder:"请输入查询的联系人姓名"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)]),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:6,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("手机号码：")])]),t._v(" "),a("el-col",{attrs:{xs:16,sm:14,md:14,lg:16,xl:16}},[a("el-input",{attrs:{type:"tel",maxlength:11,size:"small",placeholder:"请输入查询的手机号码"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),a("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),a("el-row",{staticClass:"marginTop"},[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-col",{attrs:{xs:5,sm:3,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-dark textR inputTitle"},[t._v("当前状态：")])]),t._v(" "),a("el-col",{attrs:{xs:16,sm:16,md:14,lg:16,xl:16}},[a("el-radio",{attrs:{label:"1,2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("全部")]),t._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("正常")]),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("黑名单")])],1),t._v(" "),a("el-col",{attrs:{xs:1,sm:1,md:4,lg:4,xl:4}})],1)])],1),t._v(" "),a("el-row",{staticClass:"marginTop",staticStyle:{"text-align":"center"}},[a("button",{staticClass:"searchBtn",on:{click:function(e){t.search()}}},[t._v("搜索")])])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{float:"right"},attrs:{xs:4,sm:4,md:4,lg:2,xl:2}},[a("div",{staticClass:"grid-content bg-purple-light"},[2!=t.user.userRole&&3!=t.user.userRole?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){t.AddStaffDiv()}}},[t.off.addList?t._e():a("span",[t._v("添加员工")]),t.off.addList?a("span",[t._v("隐藏")]):t._e()]):t._e()],1)])],1),t._v(" "),t.off.addList?a("div",{staticClass:"listTitleFoot addList"},[a("el-row",[a("el-col",{attrs:{xs:18,sm:18,md:18,lg:22,xl:22}},t._l(t.list,function(e,s){return a("div",{key:s,staticClass:"mt8"},[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:8,xl:8}},[a("span",[t._v("用户姓名 : ")]),a("el-input",{staticStyle:{width:"80%"},attrs:{size:"small",maxlength:10,placeholder:"请输入内容"},model:{value:t.list[s].username,callback:function(e){t.$set(t.list[s],"username",e)},expression:"list[i].username"}})],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:8,xl:8}},[a("span",[t._v("手机号码 : ")]),a("el-input",{staticStyle:{width:"80%"},attrs:{size:"small",maxlength:11,placeholder:"请输入内容"},model:{value:t.list[s].phone,callback:function(e){t.$set(t.list[s],"phone",e)},expression:"list[i].phone"}})],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:24,lg:8,xl:8}},[a("span",[t._v("职       务 :  ")]),a("el-checkbox",{attrs:{xs:24},model:{value:t.list[s].checked2,callback:function(e){t.$set(t.list[s],"checked2",e)},expression:"list[i].checked2"}},[t._v("管理员")]),a("el-checkbox",{model:{value:t.list[s].checked3,callback:function(e){t.$set(t.list[s],"checked3",e)},expression:"list[i].checked3"}},[t._v("销售")])],1)],1)})),t._v(" "),a("el-col",{attrs:{xs:6,sm:4,md:4,lg:2,xl:2}},[a("div",{staticStyle:{float:"right"}},[a("button",{staticClass:"buttonAddStaff",staticStyle:{display:"block"},on:{click:function(e){t.AddList()}}},[t._v("增加一行")]),t._v(" "),a("button",{staticClass:"buttonAddStaff",on:{click:function(e){t.AddStaff()}}},[t._v("确定添加")])])])],1)],1):t._e(),t._v(" "),t.detailsList?a("div",[a("div",[a("div",{staticClass:"listTitleFoot"},[a("el-row",[a("el-col",{staticStyle:{height:"35px"},attrs:{span:20}},[a("div",{staticClass:"grid-content bg-purple"},[a("h3",[t._v("员工列表"),a("span",{staticClass:"fontWeight greyFont"},[t._v(" ("+t._s(t.form.page||"0")+")")])])])])],1)],1),t._v(" "),a("div",{staticClass:"detailsListDiv"},[a("table",{staticClass:"searchTab",staticStyle:{width:"100%",height:"100%"}},[t._m(0),t._v(" "),t._l(t.detailsList,function(e,n){return a("tr",{key:n,class:{greyFont:3==e.departState}},[a("td",[t._v("\n                          "+t._s(15*(t.pa-1)+(n+1))+"\n                      ")]),t._v(" "),a("td",[a("p",{staticStyle:{float:"left","margin-left":"36%"}},[t._l(e.userRole,function(e,n){return a("span",{key:n},[3==e?a("img",{staticClass:"adminIcon",attrs:{src:s("iXw6")}}):t._e()])}),t._v("\n                              "+t._s(e.username)+"\n                          ")],2)]),t._v(" "),a("td",[a("a",{staticClass:"textDec",on:{click:function(s){t.getStaffDetails(e)}}},[t._v(t._s(e.phone))])]),t._v(" "),a("td",[e.createTime?a("span",[t._v("\n                              "+t._s(t.getDateTime(e.createTime)[6])+"\n                          ")]):t._e(),t._v(" "),e.createTime?t._e():a("span",[t._v("\n                              --\n                          ")])]),t._v(" "),a("td",t._l(e.userRole,function(s,n){return a("span",{key:n},[1==s?a("span",[t._v("管理员"),e.userRole.indexOf(2)>-1||e.userRole.indexOf(3)>-1||e.userRole.indexOf(4)>-1||e.userRole.indexOf(5)>-1?a("b",[t._v("、")]):t._e()]):t._e(),2==s?a("span",[e.userRole.indexOf(3)>-1||e.userRole.indexOf(4)>-1||e.userRole.indexOf(5)>-1?a("b",[t._v("、")]):t._e(),t._v("销售")]):t._e(),3==s?a("span",[t._v("店长"),e.userRole.indexOf(4)>-1||e.userRole.indexOf(5)>-1?a("b",[t._v("、")]):t._e()]):t._e(),4==s?a("span",[t._v("采购员"),e.userRole.indexOf(5)>-1?a("b",[t._v("、")]):t._e()]):t._e(),5==s?a("span",[t._v("业务员")]):t._e()])})),t._v(" "),a("td",[1==e.userState?a("span",[t._v("正常")]):t._e(),t._v(" "),2==e.userState?a("span",[t._v("黑名单")]):t._e(),t._v(" "),3==e.userState?a("span",[t._v("注销")]):t._e()]),t._v(" "),a("td",[e.lastLoginTime?a("span",[t._v("\n                              "+t._s(t.getDateTime(e.lastLoginTime)[6])+"\n                          ")]):t._e(),t._v(" "),e.lastLoginTime?t._e():a("span",[t._v("\n                              --\n                          ")])])])}),t._v(" "),0==t.detailsList.length?a("tr",[a("td",{staticClass:"tac",attrs:{colspan:"8"}},[t._v("\n                          暂无数据                            \n                      ")])]):t._e()],2)]),t._v(" "),t.detailsList.length>0?a("div",{staticClass:"listTitleFoot"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":15,"current-page":t.currentPage,total:t.form.page},on:{"current-change":t.search,"update:currentPage":function(e){t.currentPage=e}}})],1)])],1)],1):t._e()])]):t._e()],1):t._e(),t._v(" "),t.off.staffDetails?a("yfdStaff",{attrs:{forms:t.searchRes}}):t._e(),t._v(" "),t.off.layer?a("common-layer"):t._e()],1)},k=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",{staticStyle:{"font-size":"14px"}},[s("td",[t._v("序号")]),t._v(" "),s("td",[t._v("用户姓名")]),t._v(" "),s("td",[t._v("手机号码")]),t._v(" "),s("td",[t._v("创建时间")]),t._v(" "),s("td",[t._v("职务")]),t._v(" "),s("td",[t._v("当前状态")]),t._v(" "),s("td",[t._v("最后登录时间")])])}],y={render:x,staticRenderFns:k},w=y,C=s("Z0/y"),S=n,D=C(b,w,!1,S,"data-v-788bcd6b",null);e.default=D.exports},ozCq:function(t,e,s){var a=s("yqf1");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("3f3969f8",a,!0,{})},yqf1:function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"\n.addList[data-v-788bcd6b]{border: 1px solid #c0c4cc;min-height: 100px;padding: 10px;background: white;border-radius: 4px\n}\n/* .addList span{display:inline-block;width:60px;} */\n/* table tr td{text-align: left;padding-left: 20px;}  */\n",""])}});