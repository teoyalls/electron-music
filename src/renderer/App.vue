<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-vue-demo',
    created() {
      document.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
      document.addEventListener('dragenter', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
      document.addEventListener('dragstart', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
      document.addEventListener('dragend', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
      document.addEventListener('dragover', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
    }
  }
</script>

<style lang="scss">
@charset "utf-8";
@import "./commonStyle/mixin";
@font-face {
    font-family: PingFang SC;
    src:url('./assets/font/PFBZ.ttf')
}
*,
:before,
:after {
  padding: 0;
  margin: 0;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
body,
input,
textarea,
button,
section {
  color: #333;
  font-size: $fontNor;
  font-family: $fontFamily !important;
  font-style: normal;
}
ul,
li {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: #333;
  text-decoration: none;
  cursor: pointer;
}
a:hover,
a:active {
  text-decoration: underline;
}
img,
input[type="checkbox"],
input[type="radio"],
button {
  border: 0;
}
input[type="text"],
input[type="password"],
input[type="email"],
input[type="search"],
input[type="tel"],
input[type="number"] {
  padding: 4px 5px;
  line-height: 1;
  vertical-align: middle;
}
textarea {
  padding: 4px 5px;
  resize: none;
}
button {
  cursor: pointer;
}
.clear {
  clear: both;
}
.clear:after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  clear: both;
  overflow: hidden;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 12px;
  background: transparent;
  display: none;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #c7d8e0;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: transparent;
}

// 重置layui的样式
body {
  .bj-layer-frame {
    border-radius: 4px;
    .layui-layer-title {
      height: 46px;
      line-height: 46px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .layui-btn {
    border-radius: 4px;
  }
  .layui-btn-normal {
    background-color: $blue;
  }
  .layui-laydate {
    margin-top: 0;
    box-shadow: 0 0 5px #ccc;
  }
  .laydate-month-list>li {
    margin: 10px 0;
  }
  .layui-laydate-list {
    padding: 0 10px;
  }
  .layui-laydate-list>li {
    height: 30px;
    line-height: 30px;
  }
  .layui-laydate-header {
    padding-top: 5px;
    border-bottom: 0;
  }
  .layui-laydate-header i {
    top: 5px;
    font-size: 14px;
  }
  .layui-laydate-content {
    padding: 0 10px;
  }
  .layui-laydate-content th {
    color: #888;
  }
  .layui-laydate-content td,
  .layui-laydate-content th {
    height: 24px;
    padding: 5px 0;
  }
  .layui-laydate .layui-this {
    background-color: #4696f9 !important;
    border-radius: 3px;
  }
  .layui-laydate-header i:hover,
  .layui-laydate-header span:hover {
    color: $blue;
  }
  .layui-laydate-content td.laydate-selected {
    background-color: #c6dfff;
  }
  .layui-laydate-footer span:hover {
    color: $blue;
  }
  .layui-btn {
    height: 36px;
    line-height: 1;
  }
  .layui-btn-normal {
    background-color: #008aff;
    &:hover {
      opacity: 1;
      background-color: #418be7;
    }
    &:active {
      background-color: #337ace;
    }
  }
  .layui-btn-normal {
    background-color: #008aff;
    &:hover {
      opacity: 1;
      background-color: #418be7;
    }
    &:active {
      opacity: 1;
      background-color: #337ace;
    }
  }
  .layui-btn-primary {
    background-color: #fff;
    border-color: #dde0e6;
    &:hover {
      opacity: 1;
      color: #418be7;
      border-color: #418be7;
    }
    &:active {
      opacity: 1;
      color: #337ace;
      border-color: #337ace;
    }
  }
}
</style>
