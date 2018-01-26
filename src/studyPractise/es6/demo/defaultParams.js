/**
 * Created by jkwu on 18-1-22.
 */
log = (data) => console.log('输出结果为：' + data);
// var link = function (height, color, url) {
//   var height = height || 50;
//   var color = color || 'red';
//   var url = url || 'http://www.baidu.com';
//   log(height);
//   log(color);
//   log(url);
// };
//
// link();
// link(23,'blue', 'www.jkwu.club');
// link(0,0,0);

///////////es6语法中的默认参数///////

var link = function (height = 50, color = 'red', url = 'http://www.baidu.com') {
  log(height);
  log(color);
  log(url);
};

link();
link(23,'blue', 'www.jkwu.club');
link(0,0,0);

////////////