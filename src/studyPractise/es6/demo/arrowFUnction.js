/**
 * Created by jkwu on 18-1-22.
 */
// var logUpperCase = function() {
//   var _this = this;
//
//   this.string = this.string.toUpperCase();
//   return function () {
//     return console.log(_this.string);
//   }
// };
//
// logUpperCase.call({ string: 'ES6 rocks' })();


// var logUpperCase = function() {
//   this.string = this.string.toUpperCase();
//   return () => console.log(this.string);
// }
// logUpperCase.call({ string: 'ES6 rocks' })();



// function insert(value) {
//   return {into: function (array) {
//     return {after: function (afterValue) {
//       array.splice(array.indexOf(afterValue) + 1, 0, value);
//       return array;
//     }};
//   }};
// }
//
// let result = insert(2).into([1, 3]).after(1); //[1, 2, 3]
// console.log(result);

////

// let insert = (value) => ({into: (array) => ({after: (afterValue) => {
//   array.splice(array.indexOf(afterValue) + 1, 0, value);
//   return array;
// }})});
//
// let result = insert(2).into([1, 3]).after(1); //[1, 2, 3]
// console.log(result);
