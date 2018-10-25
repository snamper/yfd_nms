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
};