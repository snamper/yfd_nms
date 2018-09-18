import { getRoles,getDealerList } from '../config/service';
import { GET_ROLE,GET_DEPART } from './mutation-types';
export default {    
    async getRolesInfo({commit,state}){
        let res = await getRoles();
            res&&commit(GET_ROLE,res);
    },
    async getDepart({commit,state}){
        let res = await getDealerList();
            res&&commit(GET_DEPART,res);
    }
}