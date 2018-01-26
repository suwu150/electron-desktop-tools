/**
 * Created by jkwu on 17-12-27.
 */
log = data => console.log(data);
// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//   });
// }
//
// timeout(5000).then((value) => {
//   console.log(value);
// });

// 定义时立即执行
// const p1 = new Promise(function (resolve, reject) {
//   log('p1');
//   resolve({data: 'from p1'});
//   // ...
// });
// //
// const p2 = new Promise(function (resolve, reject) {
//   // ...
//   log('p2');
//   resolve(p1.then(rers => { console.log(rers.data)}));
// });

/*
*
* p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。
* 由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的
* then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
* */
// const p1 = new Promise(function (resolve, reject) {
//   log('p1')
//   setTimeout(() => reject(new Error('fail')), 3000)
// })
//
// const p2 = new Promise(function (resolve, reject) {
//   log('p2')
//   setTimeout(() => resolve(p1), 1000)
// })
//
// p2
//   .then(result => console.log(result))
//   .catch(error => console.log(error))

//注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。
//
// new Promise((resolve, reject) => {
//   resolve(1);
//   // return resolve(1);
//   console.log(2);
// }).then(r => {
//   console.log('then:' + r);
// });
// // 2
// // 1
//
//

// getJSON("/post/1.json").then(function(post) {
//   return getJSON(post.commentURL);
// }).then(function funcA(comments) {
//   console.log("resolved: ", comments);
// }, function funcB(err){
//   console.log("rejected: ", err);
// });

//所有的full才算full
// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// })
//   .then(result => result)
//   .catch(e => e);
//
// const p2 = new Promise((resolve, reject) => {
//   throw new Error('p2:报错了!');
// })
//   .then(result => result)
//   .catch(e => e);
//
// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(e => console.log('all:' + e));

// function getFoo () {
//   return new Promise(function (resolve, reject){
//     resolve('foo');
//   });
// }
//
//Promise.race()--有一个实例率先改变状态，p的状态就跟着改变
//
//
//
// const g = function* () {
//   try {
//     const foo = yield getFoo();
//     console.log(foo);
//   } catch (e) {
//     console.log(e);
//   }
// };
//
// function run (generator) {
//   const it = generator();
//
//   function go(result) {
//     if (result.done) return result.value;
//
//     return result.value.then(function (value) {
//       return go(it.next(value));
//     }, function (error) {
//       return go(it.throw(error));
//     });
//   }
//
//   go(it.next());
// }
//
// run(g);

// const f = () => console.log('now');
// (async () => f())();
// console.log('next');