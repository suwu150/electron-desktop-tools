/**
 * Created by jkwu on 17-8-3.
 */
const fs = require('fs');
const _lang = require('lodash/lang');// 获取lodash中的lang对象
const _array = require('lodash/array');
const http = require('http');

// const nodejieba = require('nodejieba');
// var nodejieba = require("nodejieba");
// var result = nodejieba.cut("南京市长江大桥");
// console.log(result);
// //["南京市","长江大桥"]

var data = '';
// 创建可读流
var readerStream = fs.createReadStream('ChineseToEnglishFile.js');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {

  console.log(chunk);

  console.log(_lang.toArray(chunk));// 将字符串转换为单个字符的数组并进行输出
  const chunkArray = _lang.toArray(chunk);
  const finalData = [];
  const filterArray = ['/', '*' , '\n', ' ', '_', '.', '-',':',
    'a', 'b', 'c' ,'d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C' ,'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0','1','2','3','4','5','6','7','8','9'];
  const temp = [];
  _array.difference(chunkArray, filterArray).map((item, index) => {
    if (item.charCodeAt() >= 128) {
      temp.push(item);
    } else {
      console.log('不符合条件');
    }
    // finalData.push({index :temp});
    // delete temp;
  });

  console.log(finalData);
  const stringChinese = temp.join('');
  console.log(stringChinese);

  // const result = nodejiebboin(''));
// console.log(result);
// //["南京市","长江大桥"]
 data += chunk;
});
readerStream.on('end',function(){
  console.log(data);
});
readerStream.on('error', function(err){
  console.log(err.stack);
});
console.log("程序执行完毕");
