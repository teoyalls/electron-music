const state = {
  main: 0,
  username: '我是张三',
  nowPlayMusic: {
    fileName: 'music.mp3'
  }
}

const mutations = {
  ENTER_FILENAME(state, name) {
    state.nowPlayMusic.fileName = name;
  }
}

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  enter_filename({ commit }, name) {
    console.log('bbb')
    commit('enter_filename', name);
  }
}

export default {
  state,
  mutations,
  actions
}
