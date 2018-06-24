/**
 * Created by jkwu on 17-7-26.
 */
const Promise = require('promise');
doSomeThing = () => {
  new Promise();
};

doSomeThing().then(function () {
  return doSomeThing();
});