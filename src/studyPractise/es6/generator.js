// /**
//  * Created by jkwu on 18-1-3.
//  */
// function *foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }
//
// for (let v of foo()) {
//   console.log(v);
// }
// // 1 2 3 4 5

// function* genFuncWithReturn() {
//   yield 'a';
//   yield 'b';
//   return 'The result';
// }
// function* logReturned(genObj) {
//   let result = yield* genObj;
//   console.log(result);
// }
//
// console.log([...logReturned(genFuncWithReturn())]);

// function* iterTree(tree) {
//   if (Array.isArray(tree)) {
//     for(let i=0; i < tree.length; i++) {
//       yield* iterTree(tree[i]);
//     }
//   } else {
//     yield tree;
//   }
// }
//
// const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
//
// for(let x of iterTree(tree)) {
//   console.log(x);
// }

// // 下面是二叉树的构造函数，
// // 三个参数分别是左树、当前节点和右树
// function Tree(left, label, right) {
//   this.left = left;
//   this.label = label;
//   this.right = right;
// }
//
// // 下面是中序（inorder）遍历函数。
// // 由于返回的是一个遍历器，所以要用generator函数。
// // 函数体内采用递归算法，所以左树和右树要用yield*遍历
// function* inorder(t) {
//   if (t) {
//     yield* inorder(t.left);
//     yield t.label;
//     yield* inorder(t.right);
//   }
// }
//
// // 下面生成二叉树
// function make(array) {
//   // 判断是否为叶节点
//   if (array.length == 1) return new Tree(null, array[0], null);
//   return new Tree(make(array[0]), array[1], make(array[2]));
// }
//
//
// let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
//
// // 遍历二叉树
// var result = [];
// for (let node of inorder(tree)) {
//   result.push(node);
// }
//
// console.log(result)
// // ['a', 'b', 'c', 'd', 'e', 'f', 'g']


function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();