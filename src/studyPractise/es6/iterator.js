/**
 * Created by jkwu on 17-12-29.
 */
log = data => console.log(data);

// let myIterable = {
//   [Symbol.iterator]: function* () {
//     // log(Symbol.iterator);
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// }
//   log([...myIterable]) // [1, 2, 3]


let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}