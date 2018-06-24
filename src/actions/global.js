/**
 * Created by jkwu on 17-11-17.
 */
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
// import debounce from 'lodash/debounce';
// import debug from 'debug';
// import { fork } from 'child_process';

// import { appPath, appConfigPath, userDataPath, git } from '../utils/platform';
import * as types from '../constant/dictActions';
// import { fileExist, saveFilePromise, readFileSync, getFilesByDirSync, readFilePromise,
//     getDirNamePromise } from '../utils/json';

// const log = debug('mx-dsl:actions/global');

const appInit = createAction(types.APP_INIT);
const appInitEnd = createAction(types.APP_INIT_END);

// let start = null;

export const appLoadingStart = createAction(types.APP_LOADING_START);
export const appLoadingEnd = createAction(types.APP_LOADING_END);
export const initApp = () => (dispatch) => {
  const tuLingApiUrl = 'http://www.tuling123.com/openapi/api';
  dispatch(batchActions([
    appInit({}),
    appLoadingEnd(),
    appInitEnd(),
  ]));
  dispatch(batchActions([
    appInit({
      profile:
        {
          tuLingApiUrl
        },
    }),
    appLoadingEnd(),
    appInitEnd(),
  ]));
};
