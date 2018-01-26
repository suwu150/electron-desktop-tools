/**
 * Created by jkwu on 18-1-4.
 */
/*
* 通过Generator函数逐行读取文件
* */
// const FileReader = require('jsdom/lib/jsdom/browser/Window.js');


function* numbers(filepath) {
  let file = new FileReader(filepath);
  // console.log(file);
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}

module.exports = { numbers };