##### 46  electron的继续学习----如何构建一个最简单的electron应用
  下面,我们就来进行构建一个hello World项目
  ###### 1 准备工作
   一个最基本的 Electron application 需要这些文件:
      
      - `package.json` - 处理应用的以来和说明性信息.
      - `main.js` - 入口页面和渲染html页面. 这个文件是应用的 **main process**.--主进程
      - `index.html` - 要渲染的页面,这个页面是应用的 **renderer process**--渲染进程.            

  ###### 2 构建和运行
   现在我们进行项目的创建,创建我们所需要的项目,命名为helloworld_electron,然后在项目中创建如下图所示的目录结构
   [结构目录](/home/jkwu/图片/Screenshot from 2017-03-26 15-10-53.png)
   在文件中的内容分别如下所示:
   `index.html`
   ```
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <title>Hello World!</title>
   </head>
   <body>
   <h1>Hello World!</h1>
   We are using Node.js <script>document.write(process.versions.node)</script>,
   Chromium <script>document.write(process.versions.chrome)</script>,
   and Electron <script>document.write(process.versions.electron)</script>.
   </body>
   </html>

   ```
   `main.js`
   ```
   const electron = require('electron')
   // Module to control application life.
   const app = electron.app
   // Module to create native browser window.
   const BrowserWindow = electron.BrowserWindow
   
   const path = require('path')
   const url = require('url')
   
   // Keep a global reference of the window object, if you don't, the window will
   // be closed automatically when the JavaScript object is garbage collected.
   let mainWindow
   
   function createWindow () {
       // Create the browser window.
       mainWindow = new BrowserWindow({width: 800, height: 600})
   
       // and load the index.html of the app.
       mainWindow.loadURL(url.format({
           pathname: path.join(__dirname, './src/index.html'),
           protocol: 'file:',
           slashes: true
       }))
   
       // Open the DevTools.
       mainWindow.webContents.openDevTools()
   
       // Emitted when the window is closed.
       mainWindow.on('closed', function () {
           // Dereference the window object, usually you would store windows
           // in an array if your app supports multi windows, this is the time
           // when you should delete the corresponding element.
           mainWindow = null
       })
   }
   
   // This method will be called when Electron has finished
   // initialization and is ready to create browser windows.
   // Some APIs can only be used after this event occurs.
   app.on('ready', createWindow)
   
   // Quit when all windows are closed.
   app.on('window-all-closed', function () {
       // On OS X it is common for applications and their menu bar
       // to stay active until the user quits explicitly with Cmd + Q
       if (process.platform !== 'darwin') {
           app.quit()
       }
   })
   
   app.on('activate', function () {
       // On OS X it's common to re-create a window in the app when the
       // dock icon is clicked and there are no other windows open.
       if (mainWindow === null) {
           createWindow()
       }
   })
   
   // In this file you can include the rest of your app's specific main process
   // code. You can also put them in separate files and require them here.

   ```
   `package.json`
   ```$xslt
{
  "name": "helloworld_electron",
  "version": "1.0.0",
  "description": "'A test for electron, a desktop tool'",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "jkwu",
  "license": "ISC",
  "keywords": [
    "Electron",
    "start",
    "demo"
  ],
  "devDependencies": {
    "electron": "~1.6.2"
  }
}


```
在实现上面过程之后,我们就能够进行调试,首先我们需要运行命令
```
npm install
```
进行安装依赖,也就是安装下面内容:
```
   "devDependencies": {
     "electron": "~1.6.2"
   }
```
安装之后,我们就能够通过命令
```
npm start
```
来进行启动,如下图所示L:是我的启动结果

  ###### 3 打包处理
  通过上面的流程,我们能够实现一个最基本的打包,但是,这还不能够跨平台像一个应用软件一样,那么,我们如何
  进行打包成这样??
  具体步骤如下所示:
  安装打包依赖:
  ```
  npm install electron-packager --save-dev

  ```
  将会安装`"electron-packager": "^8.6.0"`到依赖库中,这是package.json将会自动变化为下面代码
  还有为了方便,我在scripts中直接添加了packager项,主要是运行打包命令
  ```
  {
       "name": "helloworld_electron",
       "version": "1.0.0",
       "description": "'A test for electron, a desktop tool'",
       "main": "main.js",
       "scripts": {
         "start": "electron .",
         "packager": "electron-packager ./ helloworld_electron --linux "
       },
       "author": "jkwu",
       "license": "ISC",
       "keywords": [
         "Electron",
         "start",
         "demo"
       ],
       "devDependencies": {
         "electron": "~1.6.2",
         "electron-packager": "^8.6.0"
       }
     }
     ```
     最后,我们执行命令
     
     ```
     npm run packager
     
     ```
     即可完成打包,打包结果如下图所示,进入文件夹,双击程序就能够正常运行
     https://github.com/electron/electron/blob/master/docs-translations/zh-CN/tutorial/application-distribution.md