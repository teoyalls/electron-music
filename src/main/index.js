import { app, BrowserWindow, ipcMain } from 'electron'
const path = require('path')
const fs = require('fs')
const http = require('http')
const ms = require('mediaserver')
const dataPath = (app).getPath('userData')
const filePath = 'D://my-test-electron'
// const fileUrl = path.join(dataPath, 'config.json')
let config;

// 检查创建音频文件列表
fs.readdir(filePath, (err, files) => {
  if (err) {
    fs.mkdir(filePath, (err) => {
      console.log(err);
    })
  } else {

  }
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let fileUrl
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 430,
    // width: '100%',
    height: 330,
    // height: '100%',
    useContentSize: true,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../renderer/assets/icon.png')
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 创建音频服务
  startMusicServer((port) => {
    console.log('创建成功')
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 触发关闭窗口
ipcMain.on('winClose', e => mainWindow.close());
// 触发最小化窗口
ipcMain.on('winMin', e => mainWindow.minimize());
// 触发最大化窗口
ipcMain.on('winMax', e => mainWindow.maximize());
// 触发还原窗口
ipcMain.on('winNor', e => mainWindow.unmaximize());
// 调整窗口为780×500大小
ipcMain.on('mainWin', (e) => {
  mainWindow.setContentSize(780, 500);
  mainWindow.center();
  e.sender.send('mainWin-reply');
});

// 读取音频文件列表
// if (fs.existSync(fileUrl)) {
//   config = JSON.parse(fs.readFileSync(fileUrl));
// } else {
//   config = {};
//   fs.writeFileSync(fileUrl, '{}');
// }

// 创建一个音频服务
function startMusicServer(callback) {
  const server = http.createServer((req, res) => {
    ms.pipe(req, res, fileUrl)
  }).listen(3000, () => {
    callback(server.address());
  });
  return server;
}

// 提供解码服务
ipcMain.on('music', (e, url) => {
  let config = {}
  let stat
  fileUrl = url;
  config.port = 3000;
  config.url = fileUrl.replace(/\\/g, '/');
  stat = fs.statSync(fileUrl);
  config.stat = stat;
  e.sender.send('musicEnd', config);
});


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
