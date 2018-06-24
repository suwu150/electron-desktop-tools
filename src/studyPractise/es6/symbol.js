/**
 * Created by jkwu on 17-12-26.
 */
log = data => console.log(data);


//
// let s = Symbol();
// log(typeof s);

// var mySymbol = Symbol();
// var a = {};
// Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// log(a);


// let mySymbol = Symbol();
// let a = {};
// Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// // 以上写法都得到同样结果
// log(a[mySymbol]) // "Hello!"

// const shapeType = {
//   triangle: Symbol()
// };
//
// function getArea(shape, options) {
//   let area = 0;
//
//   switch (shape) {
//     case shapeType.triangle: // 魔术字符串
//       area = .5 * options.width * options.height;
//       break;
//     /* ... more code ... */
//   }
//
//   return area;
// }
//
// const Triangle = getArea(shapeType.triangle, { width: 100, height: 100 }); // 魔术字符串
// log(Triangle);
// log(shapeType.triangle);
let size = Symbol();
class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size] ++;
  }

  static sizeOf(instance) {
    log(instance);
    log(this);
    return instance[size];
  }
}

let x = new Collection();
log(Collection.sizeOf(x));

x.add('foo');
log(Collection.sizeOf(x)) // 1

log(Object.keys(x)) // ['0']
log(Object.getOwnPropertyNames(x)) // ['0']
log(Object.getOwnPropertySymbols(x)) // [Symbol(size)]