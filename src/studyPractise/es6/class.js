/**
 * Created by jkwu on 18-1-5.
 */
// class MyClass {
//   constructor() {
//     // ...
//   }
//   get prop() {
//     return 'getter';
//   }
//   set prop(value) {
//     console.log('setter: '+value);
//   }
//
//   get test() {
//     return 'test';
//   }
//   set test(value) {
//     console.log('test: '+value);
//   }
// }
//
// let inst = new MyClass();
//
// inst.prop = 123;
// // setter: 123
//
// console.log(inst.prop);
//
// inst.test = 1234567890;
// // setter: 123
//
// console.log(inst.test);


// class Rectangle {
//   constructor(length, width) {
//     console.log(new.target === Rectangle);
//     console.log(new.target === Square);
//     // ...
//   }
// }
//
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length);
//   }
// }
//
// var obj = new Square(3); // 输出 false,true

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }
//
// class ColorPoint extends Point {
//   constructor(x, y, color) {
//     super(x, y);
//     this.color = color; //
//     this.color = color; // 正确
//   }
// }
//
//
// console.log(Object.getPrototypeOf(ColorPoint));

console.log(__proto__);