import {
  getRoles,
  getDealerList
} from '../config/service';
import {
  GET_ROLE,
  GET_DEPART,
  SET_ACCOUNT_DEPID,
  SET_DEPNAME,
  SET_COMMISSION_RULES
} from './mutation-types';
export default {
  async getRolesInfo({ id, commit, state }) {
    let res = await getRoles(id);
    res && commit(GET_ROLE, res);
  },
  async getDepart({ commit, state }) {
    let res = await getDealerList();
    res && commit(GET_DEPART, res);
  },
  async setaccountDepId({commit},id) {
    commit(SET_ACCOUNT_DEPID,id);
  },
  async setDepName({commit},name){
    commit(SET_DEPNAME,name);
  },
  async setCommissionRules({commit},res){
    commit(SET_COMMISSION_RULES,res);
  }
}