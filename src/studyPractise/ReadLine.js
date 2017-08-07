/**
 * Created by jkwu on 17-8-3.
 */
"use strict";
const readline = require('readline');
const fs = require('fs');
const os = require('os');
const _lang = require('lodash/lang');

const fReadName = './ChineseToEnglishFile.js';
const fWriteName = './ChineseToEnglishFile.js.log';
const fRead = fs.createReadStream(fReadName);
const fWrite = fs.createWriteStream(fWriteName);

var enableWriteIndex = true;
fRead.on('end', ()=>{
  console.log('end');
  enableWriteIndex = false;
});

var objReadline = readline.createInterface({
  input: fRead,
  output: fWrite,
  terminal: true
});


var index = 1;
fWrite.write('line' + index.toString() +':');
objReadline.on('line', (line)=>{
  console.log(index + '=', line);
  // 在这里进行中英文的切换
  const lineToArray = _lang.toArray(line);
  const length = lineToArray.length;

  const reg = /^(')*(')$/;
  line.match(reg);
  console.log(line.match(reg) + '=+++');

  if (enableWriteIndex) {
    // 由于readline::output是先写入后调用的on('line')事件，
    // 所以已经读取文件完毕时就不需要再写行号了... sodino.com
    index ++;
    var tmp = 'line' + index.toString() + ':';
    // fWrite.write(tmp);
  }
});



objReadline.on('close', ()=>{
  console.log('readline close...');
});