import { getRoles } from '../config/service';
import { GET_ROLE } from './mutation-types';
export default {    
    async getRolesInfo({commit,state}){
        let res = await getRoles();
            res&&commit(GET_ROLE,res);
    }
}