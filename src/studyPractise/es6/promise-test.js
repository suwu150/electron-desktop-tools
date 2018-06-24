/**
 * Created by jkwu on 18-1-4.
 */
// const fs = require('fs');
// fs.readFile('./symbol.js', 'utf-8', function (err, data) {
//   if (err) throw err;
//   console.log(data);
// });

// var readFile = require('fs-readfile-promise');
//
// readFile('./promise-test-file1.js')
//   .then(function (data) {
//     console.log(data.toString());
//   })
//   .then(function () {
//     return readFile('./promise-test-file2.js');
//   })
//   .then(function (data) {
//     console.log(data.toString());
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// var fetch = require('node-fetch');
//
// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   console.log('gen1');
//   var result = yield fetch(url);
//   console.log('gen2');
//   console.log(result.bio);
// }
//
// var g = gen();
// var result = g.next();
//
// result.value.then(function(data){
//   console.log('then1');
//   return data.json();
// }).then(function(data){
//   console.log('then2');
//   g.next(data);
// });

// const Thunk = function(fn) {
//   return function (...args) {
//     return function (callback) {
//       return fn.call(this, ...args, callback);
//     }
//   };
// };
//
// function f(a, cb) {
//   cb(a);
// }
// const ft = Thunk(f);
//
// const add = b => console.log(b*b);
//
// ft(2)(add) // 1

// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);
//
// var gen = function* (){
//   var r1 = yield readFileThunk('/etc/fstab');
//   console.log(r1.toString());
//   var r2 = yield readFileThunk('/etc/shells');
//   console.log(r2.toString());
// };

var fetch = require('node-fetch');
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}

var urls = ['http://blog.csdn.net/suwu150/article/details/51596584', 'http://blog.csdn.net/suwu150/article/details/51596584'];

logInOrder(urls);