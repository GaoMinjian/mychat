import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../assets/js/storage'

Vue.use(Vuex)

var state = {
  username: '',
  account: '',
  password: '',
  allusers: [], // name not username
  usersinfo: [],
  friends: [],
  theother: {username: '', account: '', privateHistory: []}   // 当前私聊对象
}

// 方法
var mutations = {
  setStorage (state) {
    storage.set('state', state)
  },
  setUsername (state, username) {
    storage.set('username', username)
  },
  getUsername (state) {
    state.username = storage.get('username')
    console.log('store' + storage.get('username'))
  },
  getStorage (state) {
    state = storage.get('state')
  }
}

const store = new Vuex.Store({
  state,
  mutations
})
export default store
