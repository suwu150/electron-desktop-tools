// const _ = require('lodash/object');
// const originObject = {
//   A: 1,
//   B: 2,
//   C: 3,
//   D: 4
// };
// const newObject = _.pick(originObject, 'B', 'C');
// console.log('originObject:');
// console.log(originObject);
// console.log('newObject:');
// console.log(newObject);

// const _ = require('lodash/object');
// const originObject = {
//   A: 1,
//   B: 2,
//   C: 3,
//   D: 4
// };
// const newObject = _.omit(originObject, 'B', 'C');
// console.log('originObject:');
// console.log(originObject);
// console.log('newObject:');
// console.log(newObject);

// const _ = require('lodash');
// const originObject = {
//   A: 1,
//   B: 2,
//   C: 3,
//   D: 4,
//   E: '5',
//   F: true
// };
// const newObject = _.pickBy(originObject, _.isString);
// console.log('originObject:');
// console.log(originObject);
// console.log('newObject:');
// console.log(newObject);

const _ = require('lodash');
const originObject = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: '5',
  F: true
};
const newObject = _.omitBy(originObject, _.isString);
console.log('originObject:');
console.log(originObject);
console.log('newObject:');
console.log(newObject);



