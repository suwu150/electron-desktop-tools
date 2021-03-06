
const { app, BrowserWindow, Menu, Tray, dialog, nativeImage } = require('electron'); // eslint-disable-line
const path = require('path');
const debug = require('debug');
const { createMenu } = require('./main/menu');
const { installDevTools } = require('./main/devTools');
const Ipc = require('./main/ipc');
const { updateHandle } = require('./main/autoUpdate');

const log = debug('mx-dsl:main');
log('main process begins initialize');

let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (isDev) {
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'src', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 900,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      webSecurity: false,
      preload: path.resolve(path.join(__dirname, '../resources/lib/preload.js'))
    },
  });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log('** loadURL: ', `file://${__dirname}/public/index.html`);
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  } else {
    // eslint-disable-next-line no-console
    console.log('** loadURL: ', `file://${__dirname}/index.html`);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // await installExtensions();
  installDevTools(mainWindow);

  Menu.setApplicationMenu(createMenu(mainWindow));
  Ipc.init(mainWindow);
  updateHandle(mainWindow);
};

app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});
