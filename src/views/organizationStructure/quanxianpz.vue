<template>
<section>
  <section v-if="off.searchlist">
    <div class="f-fs16 m-title1 f-display-f">
      <p style="flex:1"><span>角色列表</span></p>
      <p style="flex:1;text-align:right"><button class="m-btn-green m-btn-small"  @click="add">添加角色</button></p>
    </div>
    <div class="m-searchlist">
      <table>
        <tr>
          <td>序号</td>
          <td>角色名称</td>
          <td>创建时间</td>
          <td><span class="roleDesc">角色描述</span></td>
          <td><a class="powerId">权限ID</a></td>
          <td>操作</td>
        </tr>
        <tr v-for="(v,i) in rolelist" :key="i">
          <td>{{i+1}}</td>
          <td>{{v.roleName}}</td>
          <td>{{getDateTime(v.createTime)[6]}}</td>
          <td><span class="roleDesc">{{v.description||'--'}}</span></td>
          <td><a @click="getpowerlist(v)" class="m-jumplink powerId">{{v.privilege}}</a></td>
          <td>
            <a @click="changePower(v)" style="color:#29B038;text-decoration:underline;margin-right:20px" href="javascript:void(0)">修改</a>
            <a @click="cancel(v)" style="color:#DB1E1E;text-decoration:underline" href="javascript:void(0)">删除</a>
          </td>
        </tr>
        <tr v-if="rolelist.length==0">
          <td colspan="6">
            暂无数据
          </td>
        </tr>
      </table>
    </div>
  </section>
  <layerconfirm v-if="off.layer" :layerType="layerType"></layerconfirm>
  <changePower :ctype="ltype" :roleName="roleName" :roleDesc="roleDesc" v-if="off.changePower"></changePower>
</section>
</template>

<script>
import layerconfirm from '../../components/layerConfirm';
import changePower from './operatePower';
import {
  getRoles,
  deleteRole
} from '../../config/service.js';
import {
  errorDeal,
  getDateTime,
  getStore
} from '../../config/utils';
export default {
  name: 'powerDeploy',
  data() {
    return {
      total: "",
      rolelist: "",
      layerType: "",
      ltype: "",
      roleId: "",
      hasId: "",
      roleName: "",
      roleDesc: "",
      off: {
        searchlist: true,
        layer: false,
        changePower: false
      }
    }
  },
  created: function () {
    let vm = this;
    vm.fgetRole();
  },
  components: {
    layerconfirm,
    changePower
  },
  methods: {
    fgetRole() {
      let vm = this,
        Info = getStore("YFD_NMS_INFO");
      getRoles({
          userId: Info.userId
        })
        .then((data) => {
          if (data.data.hasOwnProperty('roles')) {
            vm.rolelist = data.data.roles;
            vm.total = data.data.roles.length;
          } else {
            vm.rolelist = "";
            vm.total = 0;
          }
        }).catch(e => errorDeal(e))
    },
    cancel(v) {
      let vm = this,
        data = {
          id: v.id
        };
      this.$confirm('删除角色可能会导致数据出现错误，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(data)
          .then(res => {
            if (res && res.code == 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              vm.fgetRole();
            }
          }).catch(e => errorDeal(e))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });
      });
    },
    getpowerlist(v) {
      let vm = this;
      vm.off.layer = false;
      vm.off.searchlist = false;
      vm.off.changePower = true;
      vm.ltype = "plist";
      vm.roleId = v.id;
      vm.roleName = v.roleName;
      vm.roleDesc = v.description;
      vm.hasId = v.privilege.split(',');
    },
    changePower(v) {
      let vm = this;
      vm.off.layer = false;
      vm.off.searchlist = false;
      vm.off.changePower = true;
      vm.ltype = "change";
      vm.roleId = v.id;
      vm.roleName = v.roleName;
      vm.roleDesc = v.description;
      vm.hasId = v.privilege.split(',');
    },
    add() {
      let vm = this;
      vm.off.layer = false;
      vm.off.searchlist = false;
      vm.off.changePower = true;
      vm.ltype = "add";
      vm.hasId = [];
    },
    getDateTime(v) {
      return getDateTime(v)
    }
  }
}
</script>

<style scoped>
.m-title1 {
  padding: 20px 40px;
}

/* .m-title1 button{width: 90px;height: 25px;border-radius: 4px;outline: none;border: 1px solid #00AA01;background: #00AA01;color: #fff} */
.m-searchlist {
  width: 98%;
  margin: 0 auto
}

.m-searchlist table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border: 1px solid #eee;
}

.m-searchlist table tr {
  height: 40px;
}

.m-searchlist table tr:not(:last-child) {
  border-bottom: 1px solid #eee
}

.m-searchlist table tr:nth-child(odd) {
  background: #fafbfd;
}

.m-searchlist table tr:nth-child(even) {
  background: #FFF
}

.m-searchlist table tr .powerId {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis
}

.m-searchlist table tr .roleDesc {
  display: inline-block;
  max-width: 200px;
}
</style>
