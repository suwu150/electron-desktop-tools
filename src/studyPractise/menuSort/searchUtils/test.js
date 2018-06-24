/**
 * Created by jkwu on 17-12-15.
 */
// var mockData = require('./mock-data');
var { menuData } = require('./mock-data-01.js');
var { saveFileSync } = require('../../../utils/json-es5.js');

console.log(menuData);

var { flat2Tree, depthFirstSearch, removeLevelMore } = require('./structureTransform');

// const flat2TreeData = flat2Tree(menuData);
// console.log(flat2TreeData);

const removeMoreData = removeLevelMore(flat2Tree(menuData).data);
var result = [];
depthFirstSearch(removeMoreData, function (item) {
  result.push(item);
});
console.log("result:" + result);
saveFileSync([...result], './result.json');