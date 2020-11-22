import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    modules: {
      user,
    },
    getters
})

export default store
