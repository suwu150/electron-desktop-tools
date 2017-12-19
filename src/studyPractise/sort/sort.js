/**
 * Created by jkwu on 17-12-14.
 */
var data = ['魅族', '小', '华为', '苹果' , '乐视'];
// // var data = ['魅', '小', '华', '苹' , '乐'];
//
// // sort(data);
//
// console.log(data.sort());
var itemMap = {};
for (var item of data) {
  var first = Number.isNaN(item.charCodeAt(0)) ? 0 : item.charCodeAt(0);
  var second = Number.isNaN(item.charCodeAt(1)) ? 0 : item.charCodeAt(1);
  itemMap[first + second] = item;
}

console.log(itemMap);