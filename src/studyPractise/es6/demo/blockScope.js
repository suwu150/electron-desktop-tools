/**
 * Created by jkwu on 18-1-22.
 */
// function calculateTotalAmount (vip) {
//   var amount = 0;
//   if (vip) {
//     var amount = 1;
//   }
//   { // more crazy blocks!
//     var amount = 100;
//     {
//       var amount = 1000;
//     }
//   }
//   return amount;
// }
// console.log(calculateTotalAmount(true));


// function calculateTotalAmount (vip) {
//   var amount = 0; // probably should also be let, but you can mix var and let
//   if (vip) {
//     let amount = 1; // first amount is still 0
//   }
//   { // more crazy blocks!
//     let amount = 100; // first amount is still 0
//     {
//       let amount = 1000; // first amount is still 0
//     }
//   }
//   return amount;
// }
//
// console.log(calculateTotalAmount(true));


// function calculateTotalAmount (vip) {
//   const amount = 0;
//   if (vip) {
//     const amount = 1;
//   }
//   { // more crazy blocks!
//     const amount = 100 ;
//     {
//       const amount = 1000;
//     }
//   }
//   return amount;
// }
// console.log(calculateTotalAmount(true));



function add(a,b)
{
  console.log(a+b);
}
function sub(a,b)
{
  console.log(a-b);
}

add.call(sub,3,1);
add.call(3,1);