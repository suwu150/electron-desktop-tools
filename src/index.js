/**
 * Created by jkwu on 17-7-15.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routers from './routes';
import configureStore from './store/configureStore';
import analytics from './service/analytics';

import { appLoadingStart, initApp } from './actions/global';

import './styles';

const store = configureStore();
store.dispatch(appLoadingStart('系统正在初始化，请稍后 ...'));
store.dispatch(initApp());

const history = syncHistoryWithStore(hashHistory, store);
history.listen(location => {
  analytics.track(location.pathname);
});

render(
/* eslint-disable */
  <Provider store={store}>
    <Router history={history} routes={routers} />
  </Provider>,
  document.getElementById('root')
);
