/**
 * Created by jkwu on 17-12-11.
 */
log = (data) => {
  console.log(data);
}
// var a = [];
// for (var i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }
//
//
//
//
//
// // console.log(a[9]);
// // console.log(a[6]);
// a[5]();

// var a = [];
// let i = 0
// for (; i < 3; i++) {
//   let i = 'abc';
//   console.log(i);
//   a[i]=i;
// }
//
// console.log(a);
//
// console.log(foo); // 输出undefined
// var foo = 2;
//
// // let 的情况
// console.log(bar); // 报错ReferenceError
// let bar = 2;

// var tmp = 123;
//
// if (true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// if (true) {
//   // TDZ开始
//   tmp = 'abc'; // ReferenceError
//   console.log(tmp); // ReferenceError
//
//   let tmp; // TDZ结束
//   console.log(tmp); // undefined
//
//   tmp = 123;
//   console.log(tmp); // 123
// }

// // 不报错
// var x = x;
//
// // 报错
// let x = x;

// 报错
// function func1() {
//
//   var a = 1;
//   var a = 10;
//   console.log(a);
// }
//
// // 报错
// function func2() {
//   let a = 10;
//   let a = 1;
// }
//
// func1();func2();

// function func1(arg) {
//   let arg; // 报错
// }
//
// //func1()
//
// function func2(arg) {
//   {
//     let arg; // 不报错
//   }
// }
//
// func2()

// var tmp = new Date();
//
// function f() {
//   console.log(tmp);
//   if (true) {
//     var tmp = 'hello world';
//   }
// }
//
// f();


// var s = 'hello';
//
// for (let i = 0; i < s.length; i++) {
//   console.log(s[i]);
// }

//console.log(i);

// setTimeout(function () {
//   console.log("heolojid")
// }, 0);
// console.log("dfg");

// var a = [];
// for (let i = 0; i < 3; i++) {
//   let ii=i;
//   {let i = 'abc';
//     a[ii] = i;}
// }
// console.log(a)

// function f() { console.log('I am outside!'); }
//
// (function () {
//   if (false) {
//     // 重复声明一次函数f
//     function f() { console.log('I am inside!'); }
//   }
//
//   f();
// }());

// var a = 1;
// // 如果在 Node 的 REPL 环境，可以写成 global.a
// // 或者采用通用方法，写成 this.a
// console.log(window.a) // 1
//
// let b = 1;
// console.log(window.b) // undefined

// let [foo] = [];console.log(foo);
// let [bar, foo] = [1];console.log(bar);console.log(foo);


// let [bar, foo, ...alent] = [1];console.log(bar);console.log(foo);console.log(alent);

// let [a,[b], d] = [1,[2,3],4];console.log(b);

// let [x,y,z] = new Set(['a', 'b', 'c']);console.log(x);console.log(y);console.log(z);

// let obj = {first: 'hello', last: 'world'};
// let {f, l} = obj;
//
// console.log(obj);
// console.log(first);
// console.log(l);

// let x = 1;
// let y = 2;
//
// [x,y]=[y,x];
// console.log(x);
// console.log(y);

// console.log('\uD842\uDFB7');
// console.log('\u{20BB7}');

// log = (data) => {
//   console.log(data);
// }
//
//
// var s = '𠮷';
// log(s);
// log(s.length);

// log(String.fromCodePoint(0x20bb7));
//
// log(String.fromCharCode(0x20bb7))

// for(let i of 'string is me---吴继康𠮷') {
//   log((i.codePointAt().toString(16)));
// }

// var text = String.fromCodePoint(0x20bb7);
// for(let i = 0 ; i< text.length; i++) {
//   log(text[i]);
// }
//
// for(let i of text) {
//   log(i + '-----');
// }

// var s = 'wuj ji  kang';
//
// // log(s.endsWith('i  kang'));
//
// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;
//
// function compile(template){
//   const evalExpr = /<%=(.+?)%>/g;
//   const expr = /<%([\s\S]+?)%>/g;
//
//   template = template
//     .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//     .replace(expr, '`); \n $1 \n  echo(`');
//
//   template = 'echo(`' + template + '`);';
//
//   let script =
//     `(function parse(data){
//     let output = "";
//
//     function echo(html){
//       output += html;
//     }
//
//     ${ template }
//
//     return output;
//   })`;
//
//   return script;
// }
//
// let parse = eval(compile(template));
// // div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
// log(parse({ supplies: [ "broom", "mop", "cleaner" ] }));
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
//
// alert`123`
// // 等同于
// alert(123)

// let a = 5;
// let b = 10;
//
// function tag(s, v1, v2) {
//   console.log(s[0]);
//   console.log(s[1]);
//   console.log(s[2]);
//   console.log(v1);
//   console.log(v2);
//
//   return "OK";

// }
//
// tag`Hello ${ a + b } world tt ${ a * b}`;
// // tag `a+ b ${a}`

// let total = 30;
// let msg = passthru `The total is ${total} (${total*1.05} with tax)`;
//
// function passthru(literals) {
//   log(literals);
//   log(arguments);
//   let result = '';
//   let i = 0;
//
//   while (i < literals.length) {
//     result += literals[i++];
//     log(result);
//     if (i < arguments.length) {
//       result += arguments[i];
//     }
//   }
//
//   return result;
// }
//
// log(msg) // "The total is 30 (31.5 with tax)"
// log(/^\uD83D/u.test('\uD83D\uDC2A')) // false
// log(/^\uD83D/.test('\uD83D')) // true

const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
log(matchObj);