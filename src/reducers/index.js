// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import profile from './profile';
// import subdomains from './subdomains';
// import bpms from './bpms';
// import ui from './ui';
// import exceldata from './exceldata';

const rootReducer = combineReducers({
  routing,
  profile
});

export default rootReducer;
