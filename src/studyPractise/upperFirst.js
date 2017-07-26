// const UpFirstString = 'abcdefghijklmn';
// captureNameFunction = (string) => {
//   return string.substring(0,1).toUpperCase() + string.substring(1);
// };
// console.log(captureNameFunction(UpFirstString));
//

// const _string = require('lodash/string');
// const UpFirstString = 'abcdefghijklmn';
// console.log(_string.upperFirst(UpFirstString));


const _lang = require('lodash/lang');// 获取lodash中的lang对象
const UpFirstString = 'abcdefghijklmn';
console.log(_lang.toArray(UpFirstString));// 将字符串转换为单个字符的数组并进行输出
/*
* fromCharCode:将ascii码转化为字符串
* charCodeAt: 将单个char转化为ascii码
* */
console.log(_lang.toArray(UpFirstString)[0].charCodeAt());
console.log(String.fromCharCode(_lang.toArray(UpFirstString)[0].charCodeAt() - 32));
console.log(String.fromCharCode(UpFirstString.charCodeAt() - 32));