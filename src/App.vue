<style>
    .el-button--mini, .el-button--mini.is-round{padding: 7px 5px !important;}
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    created:function(){
        window.addEventListener('beforeunload',()=>{
            localStorage.setItem('store',JSON.stringify(this.$store.state.rolelist));
        })
        if(localStorage.getItem('store')){
            this.$store.state.rolelist=JSON.parse(localStorage.getItem('store'));
        }
    }
}
</script>
