<template>
  <section class="main-win" @drop="addmusic">
    <MainHead></MainHead>
    <section class="main-cont">
      <audio :src="audio.audioUrl" controls="controls" ref="audio" crossorigin="anonymous"></audio>
      <section class="vcd-wrap">
        <div :class="['vcd-mode', {'vcd-playing': audio.playing, 'vcd-paused': audio.paused}]">
          <div class="vcd-bg"></div>
          <div class="vcd-pic"></div>
          <button class="audio-play-btn" @click="playHandle" type="button">
            <i class="iconfont icon-kaishi" v-if="audio.paused"></i>
            <i class="iconfont icon-zanting" v-else></i>
          </button>
        </div>
      </section>
      <section class="music-handle">
        <p class="music-name">{{ $store.state.Music.nowPlayMusic.fileName }}</p>
      </section>
      <section class="music-footer">
        <div class="music-fastener">
          <button class="music-btn" @click="playHandle" type="button">
            <i class="iconfont icon-kaishi" v-if="audio.paused"></i>
            <i class="iconfont icon-zanting" v-else></i>
          </button>
        </div>
        <div class="music-prog">
          <div class="prog-wrap">
            <em :class="audio.paused ? '' : 'prog-doing'" :style="{width: setProgWidth}"></em>
            <button :class="['prog-btn', (audio.paused ? '' : 'prog-btn-doing')]" :style="{left: setProgWidth}"></button>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import store from '@/store';
import { mapState, mapMutations } from 'vuex';
import MainHead from '@/components/MainHead';
import { clearInterval } from 'timers';
const {ipcRenderer: ipc} = require('electron');
const fs = require('fs');

export default {
  name: 'Main',
  components: {
    MainHead
  },
  data() {
    return {
      goTime: 0,
      audio: {
        audioUrl: '',
        playing: false,
        paused: true,
        plan: 0,
        time: 0
      }
    }
  },
  computed: {
    setProgWidth() {
      return this.audio.plan * 100 + '%';
    }
  },
  methods: {
    addmusic(e) {
      e.preventDefault();
      e.stopPropagation();
      for (let f of e.dataTransfer.files) {
        let url = f.path;
        ipc.send('music', url);
      }
    },
    playHandle() {
      const audioPlay = this.$refs.audio;
      if (this.audio.paused) {
        this.audio.paused = false;
        this.audio.playing = true;
        audioPlay.play();
        this.progGo();
      } else {
        this.audio.paused = true;
        audioPlay.pause();
        clearTimeout(this._timer);
      }
    },
    progGo() {
      this.goTime++;
      if (this.goTime >= this.audio.time) {
        this.goTime = 0;
        this.audio.plan = 1;
        clearTimeout(this._timer);
      } else {
        this.audio.plan = this.goTime / this.audio.time;
        this._timer = setTimeout(() => {
          this.progGo();
        }, 1000);
      }
    }
  },
  mounted() {
    var audioPlay = this.$refs.audio;
    ipc.on('musicEnd', (e, config) => {
      this.audio.audioUrl = `http://127.0.0.1:${config.port}/#/${config.url}`;
      // 监听音频准备就绪
      this.goTime = 0;
      this.audio.plan = 0;
      this.audio.playing = false;
      this.audio.paused = true;
      audioPlay.addEventListener("loadeddata", () => {
        this.audio.playing = true;
        this.audio.paused = false;
        this.audio.time = Math.ceil(audioPlay.duration);
        clearTimeout(this._timer);
        this.progGo();
        audioPlay.play();
      }, false);
      // 把歌曲名设置到vuex
      this.$store.commit('ENTER_FILENAME', this.audio.audioUrl.replace(/(.*\/)*([^.]+).*/ig,"$2"));
      // 监听播歌曲结束
      audioPlay.addEventListener("ended", () => {
        this.audio.playing = false;
        this.audio.paused = true;
      }, false);
    });
  },
  store
}
</script>

<style lang="scss" scoped>
  .main-win {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 34px;
    background: linear-gradient(#5d687a, #e56f3f, #eba34f);
  }
  .vcd-wrap {
    position: relative;
    width: 100%;
  }
  .vcd-mode {
    position: relative;
    margin: 0 auto;
    width:  237px;
    height: 237px;
    &.vcd-playing {
      .vcd-bg {
        animation: vcdPlayer 8s linear infinite;
      }
    }
    &.vcd-paused {
      .vcd-bg {
        animation-play-state: paused;
      }
    }
    .vcd-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("../assets/images/player/cd-1.png") no-repeat center;
    }
    .vcd-pic {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 121px;
      height: 121px;
      background: url("../assets/images/player/cd-2.png") no-repeat center;
    }
  }
  .audio-play-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 46px;
    height: 46px;
    text-align: center;
    background: rgba(255, 255, 255, 0);
    .iconfont {
      font-size: 28px;
      color: #fff;
      line-height: 46px;
    }
  }
  .music-handle {
    position: relative;
    width: 100%;
    .music-name {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      padding: 0 20px;
    }
  }
  .music-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 0 210px 0 100px;
    .music-fastener {
      position: absolute;
      top: 0;
      left: 30px;
      width: 50px;
      height: 50px;
    }
    .music-btn {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid #fff;
      .iconfont {
        font-size: 28px;
        color: #fff;
        line-height: 48px;
      }
    }
  }
  .music-prog {
    position: relative;
    width: 100%;
    height: 4px;
    margin-top: 23px;
    background-color: rgba(0, 0, 0, .3);
    em {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: #fff;
      &.prog-doing {
        transition: width 1s linear;
      }
    }
    .prog-btn {
      position: absolute;
      top: -2px;
      margin-left: -4px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 3px #fff;
      &.prog-btn-doing {
        transition: left 1s linear;
      }
    }
  }
  @keyframes vcdPlayer {
    form {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
