// const fs = require('fs');
// const myData = {
//   name:'test',
//   version:'1.0',
//   description: 'this is a test project'
// };
// const outputFilename = './my.json';
// fs.writeFile(outputFilename, JSON.stringify(myData, null, 'yyyyyyyyy'), function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("JSON saved to " + outputFilename);
//   }
// });


var str = 'ab1234';
console.log(Object.keys(str));  //[0,1,2,3,4,5]

Object.keys(str).map(function (index) {
  console.log(str[index]);
});

