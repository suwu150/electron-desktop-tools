/**
 * Created by jkwu on 17-12-27.
 */
log = data => console.log(data);
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

log(Reflect.get(myObject, 'baz', myReceiverObject)) // 8
log(Reflect.get(myObject, 'baz', myObject)) // 8