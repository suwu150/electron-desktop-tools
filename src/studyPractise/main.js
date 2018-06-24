// /**
//  * Created by jkwu on 17-7-27.
//  */
// var fs = require("fs");
// var data = '';
//
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
//
// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');
//
// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//   data += chunk;
// });
//
// readerStream.on('end',function(){
//   console.log(data);
// });
//
// readerStream.on('error', function(err){
//   console.log(err.stack);
// });
//
// console.log("程序执行完毕");


// var fs = require("fs");
// var data = 'test dfddgfdgfdgfdgfd jkwu3';
// var writeStream = fs.createWriteStream('output.txt');
// writeStream.write(data,'UTF8');
// // 标记文件末尾
// writeStream.end();
//
// // 处理流事件 --> data, end, and error
// writeStream.on('finish', function() {
//   console.log("写入完成。");
// });
//
// writeStream.on('error', function(err){
//   console.log(err.stack);
// });
//
// console.log("程序执行完毕");


// var fs = require("fs");
//
// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');
//
// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');
//
// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
//
// console.log("程序执行完毕");

// var fs = require("fs");
// var zlib = require('zlib');
// var data = 'test dfddgfdgfdgfdgfd jkwu';
//
// // 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('input.txt.gz'));
// console.log("程序执行完毕");



var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input.txt'));

console.log("文件解压完成。");