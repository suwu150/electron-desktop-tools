// /**
//  * Created by jkwu on 18-1-22.
//  */
// var type = 'rock';
// var heat = '50%';
// var music = {
//   type: type,
//   heat: heat,
//   description: function() {
//     return '当前音乐风格为' + this.type + ',' + this.heat + '都喜欢';
//   }
// }
// console.log(music.description()); // 当前音乐风格为rock,50%都喜欢
//
// //////////
//
var type = 'rock';
var heat = '50%';
var music = {
  type,
  heat,
  description() {
    return '当前音乐风格为' + this.type + ',' + this.heat + '都喜欢';
  }
};
console.log(music.description()); // 当前音乐风格为rock,50%都喜欢


// function _defineProperty(obj, key, value) {
//   if (key in obj) {
//     Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
//   } else {
//     obj[key] = value;
//   }
//   return obj;
// };
// var heat = '50%';
// var field = 'rock';
// var music = _defineProperty({}, field, heat);
// console.log(music);


// var heat = '50%';
// var field = 'Rock and Roll';
// var music = {
//   [field.toLowerCase()]: heat
// }
// console.log(music); // Object {rock and roll: "50%"}



// let people = [20, 25, 30];
// let music = {
//   people,
//   [people]: 'They all love rock and roll',
//   [people.length]: 'object key is 3',
//   [{}]: 'empty object'
// }
// console.log(music);
// console.log(music.people);
// console.log(music['people']);
// console.log(music[people]);
// console.log(music[people.length]);
// console.log(music['[object Object]']);
// console.log(music[music]);
/*
 Object {3: "object key is 3", people: Array[3], 20,25,30: "They all love rock and roll", [object Object]: "empty object"}
 [20, 25, 30]
 [20, 25, 30]
 They all love rock and roll
 object key is 3
 empty object
 empty object
 */
//
// let music = {
//   type: 'rock',
//   heat: '50%'
// }
// let { type: newType, heat: newHeat } = music;
// console.log(newType, newHeat); // rock 50%


// function getMusic({ type, heat }) {
//   console.log(type, heat);
// }
// getMusic({ type: 'rock', heat: '80%'}); // rock 80%