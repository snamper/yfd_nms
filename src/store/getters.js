export default {
  getrolelist: state => {
    let rolelist = state.rolelist;
    return rolelist;
  },
  getdepart: state => {
    let departlist = state.depart;
    return departlist;
  },
  account_depId: state => {
    let account_depId = state.account_depId;
    return account_depId;
  },
  account_depName:state=>{
    let account_depName = state.account_depName;
    return account_depName;
  },
  commission_rules:state=>{
    let commission_rules = state.commission_rules;
    return commission_rules;
  },
  
};