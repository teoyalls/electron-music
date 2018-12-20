<template>
  <section class="win-mode">
    <p class="win-title">
      <img src="../assets/icon.png" class="win-logo">
      <span class="t">{{ title }}</span>
    </p>
    <div class="win-btn-wrap">
      <button class="win-min-btn" type="button" @click="minWin()" title="最小化">
        <i class="iconfont icon-zuixiaohua"></i>
      </button>
      <button :class="(winState ? 'win-max-btn' : 'win-nor-btn')" type="button" @click="maxWin()" :title="(winState ? '最大化' : '最小化')">
        <i class="iconfont icon-zuidahua3" v-if="winState"></i>
        <i class="iconfont icon-zuidahua2" v-else></i>
      </button>
      <button class="win-close-btn" type="button" @click="closeWin()" title="关闭">
        <i class="iconfont icon-guanbi"></i>
      </button>
    </div>
  </section>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
export default {
  name: 'MainHead',
  data() {
    return {
      title: '老唱片音乐盒',
      winState: true
    }
  },
  methods: {
    closeWin() {
      ipc.send('winClose');
    },
    maxWin() {
      if (this.winState === true) {
        this.winState = false;
        ipc.send('winMax');
      } else {
        this.winState = true;
        ipc.send('winNor');
      }
    },
    minWin() {
      ipc.send('winMin');
    }
  }
}
</script>

<style lang="scss">
  @import '../commonStyle/mixin';
  .win-mode {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 34px;
    padding: 0 0 0 10px;
    text-align: right;
    -webkit-app-region: drag;
    * {
      -webkit-app-region: no-drag;
    }
  }
  .win-title {
    position: relative;
    float: left;
    height: 100%;
    color: #fff;
    .win-logo {
      height: 24px;
      margin-right: 1px;
      vertical-align: middle;
    }
    .t {
      font-size: 16px;
      line-height: 34px;
      vertical-align: middle;
    }
  }
  .win-btn-wrap {
    float: right;
    position: relative;
    height: 100%;
    > button {
      width: 26px;
      height: 26px;
      line-height: 1;
      -webkit-app-region: no-drag;
      vertical-align: middle;
      background: transparent;
      opacity: .5;
      transition: opacity .3s, background-color .3s;
      .iconfont {
        color: #fff;
      }
      &:hover {
        opacity: 1;
        background-color: #1374d8;
      }
    }
  }
  .win-close-btn {
    .iconfont {
      font-size: 10px;
      color: $blue;
    }
  }
  .win-max-btn {
    .iconfont {
      font-size: 12px;
      color: $blue;
    }
  }
  .win-min-btn {
    .iconfont {
      font-size: 12px;
      color: $blue;
    }
  }
  .win-nor-btn {
    .iconfont {
      font-size: 12px;
      color: $blue;
    }
  }
</style>
