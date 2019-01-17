import {
  SIGN_OUT,
  SET_USERINFO,
  GET_ROLE,
  GET_DEPART,
  SET_ACCOUNT_DEPID,
  SET_DEPNAME,
  SET_COMMISSION_RULES
} from './mutation-types.js';

import {
  setStore,
  removeStore,
} from '../config/utils';

export default {
  //设置用户信息
  [SET_USERINFO](state, res) {
    state.userInfo = res;
    setStore("YFD_NMS_INFO", res);
  },
  //登出
  [SIGN_OUT](state) {
    state.userInfo = {};
    removeStore("YFD_NMS_INFO");
    removeStore("departId");
    window.location.href = '#/login';
  },
  //权限列表
  [GET_ROLE](state, res) {
    state.rolelist1 = [].concat(res.data.roles);
    state.rolelist = Object.assign({}, res.data.roles);
  },
  //渠道列表
  [GET_DEPART](state, res) {
    state.depart = [].concat(res.data.list);
  },
  [SET_ACCOUNT_DEPID](state,id){
    state.account_depId = id;
  },
  [SET_DEPNAME](state,name){
    state.account_depName = name;
  },
  [SET_COMMISSION_RULES](state,res){
    state.commission_rules.type = res.type;
    state.commission_rules.time = res.time;
  }
};
