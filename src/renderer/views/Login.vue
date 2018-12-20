<template>
  <section class="login-wrap">
    <section class="win-mode">
      <div class="win-btn-wrap">
        <button class="win-min-btn" type="button" @click="minWin()" title="最小化">
          <i class="iconfont icon-zuixiaohua"></i>
        </button>
        <button class="win-close-btn" type="button" @click="closeWin()" title="关闭">
          <i class="iconfont icon-guanbi"></i>
        </button>
      </div>
    </section>
    <section class="main-cont">
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPwd">
            <el-input type="password" v-model="form.pwd" placeholder="请输入密码，由八位数字或字母组成"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </section>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    };
    return {
      winState: true,
      form: {
        name: '',
        pwd: ''
      },
      rules: {
        checkPwd: [
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      }
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
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      ipc.on('mainWin-reply', () => {
        loading.close();
      });
      setTimeout(() => {
        this.$router.push({
          path:'/main'
        });
        ipc.send('mainWin');
      }, 2000);
    }
  }
}
</script>

<style lang="scss">
  @import '../commonStyle/mixin';
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 182px;
    background: url("../assets/images/login/login-bg.png") no-repeat left top #f5f9fc;
    overflow: hidden;
    .el-form-item__label {
      line-height: 30px;
    }
    .el-form-item__content {
      height: 30px;
      line-height: 30px;
    }
    .el-input__inner {
      height: 30px;
      border-radius: 2px;
      border: 1px solid #a0a0a0;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-button--primary {
      width: 100%;
      height: 29px;
      padding: 0;
      line-height: 1;
      border-radius: 2px;
      background-color: #0c75e2;
      border: 0;
      &:hover {
        background-color: #2a83e0;
      }
      &:focus {
        background-color: #0c75e2;
      }
    }
  }
  .win-mode {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 28px;
    padding: 0 0 0 6px;
    text-align: right;
    -webkit-app-region: drag;
    * {
      -webkit-app-region: no-drag;
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
  .main-cont {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .win-close-btn {
    .iconfont {
      font-size: 10px;
      color: $blue;
    }
  }
  .win-max-btn {
    .iconfont {
      font-size: 10px;
      color: $blue;
    }
  }
  .win-min-btn {
    .iconfont {
      font-size: 10px;
      color: $blue;
    }
  }
  .win-nor-btn {
    .iconfont {
      font-size: 16px;
      color: $blue;
    }
  }
  .login-form {
    position: relative;
    width: 366px;
    padding: 15px 40px 0 0;
    margin: 0 auto;
  }
</style>


