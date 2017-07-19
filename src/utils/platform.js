
import debug from 'debug';
import git from 'simple-git';
import electron from 'electron'; // eslint-disable-line
import context from 'electron-contextmenu-middleware';
import input from 'electron-input-menu';
import { trimStart } from 'lodash/string';

import config from '../constant/config';
import { addTab } from '../actions/ui';

const log = debug('mx-dsl:utils/platform');

const { app } = electron.remote;

const appPath = app.getAppPath();
const userDataPath = app.getPath('userData');
const appConfigPath = userDataPath + '/' + config.configFile;
log('app.getAppPath() ==> ', appPath);
log('app.getPath(userData) ==> ', userDataPath);
log('appConfigPath ==> ', appConfigPath);

function isMenu(node) {
  if (node.matches('a')) {
    const parent = node.parentElement;
    return parent.matches('li') && parent.getAttribute('role') === 'menuitem';
  }
  return false;
}

function generateMenuTemplate(route, dispatch) {
  return {
    label: 'Open in New Tab',
    click: () => {
      log('Open in New Tab => ', route);
      dispatch(addTab(trimStart(route, '#')));
    }
  };
}

function linkableMenu(dispatch) {
  return (ctx, next) => {
    let node = ctx.elm;

    while (node) {
      if (isMenu(node)) {
        const { menu } = ctx;
        menu.push(generateMenuTemplate(node.getAttribute('href'), dispatch));
        break;
      }
      node = node.parentElement;
    }

    next();
  };
}

function initContextMenu(_dispatch) {
  context.use(input);
  context.use(linkableMenu(_dispatch));

  if (process.env.NODE_ENV === 'development') {
    const debugMenu = require('debug-menu'); // eslint-disable-line
    context.use(debugMenu.middleware);
  }

  context.activate();
}

export {
  git,
  appPath,
  userDataPath,
  appConfigPath,
  initContextMenu,
};
