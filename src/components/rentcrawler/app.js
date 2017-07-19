/**
 * Created by jkwu on 17-7-10.
 */

// const async = require('async-es');
const axios = require('axios');
const async = require('async');
const cheerio = require('cheerio');
const jieba = require('nodejieba');
// function fetchSingleDoubleList(start) {
//     // let res = axios.get(
//     //     'https://www.douban.com/group/shanghaizufang/discussion?start=${start}');
//     let resBaidu = {};
//     resBaidu = axios.get('https://www.baidu.com')
//         .then(function (response) {
//             console.log(response);
//             console.log(response.data);
//             console.log(response.status);
//             console.log(response.statusText);
//             console.log(response.headers);
//             console.log(response.config);
//         })
//         .catch(function (error) {
//             console.log(error + '--');
//         });
//     console.log(resBaidu);
//     console.log(resBaidu.data);
//     console.log(start);
//     let res = [];
//         res = axios.get('https://www.douban.com/group/shanghaizufang/discussion?start='+start)
//         .then(response => {
//             console.log(response);
//             console.log(response.data);
//             console.log(response.status);
//             console.log(response.statusText);
//             console.log(response.headers);
//             console.log(response.config);
//         })
//         .catch(function (error) {
//             console.log(error + '--');
//         });
//     console.log(res + ':res');
//     let htmlText = res.data;
//     console.log(htmlText + ':htmlText');
//     const $ = cheerio.load(res);
//     const rs = $('a[title]');
//     let resultList = [];
//     for (let i = 0; i < rs.length; i++) {
//         resultList.push({
//             title: rs.eg(i).attr('title'),
//             url: rs.eg(i).attr('href'),
//         })
//     }
//     return resultList;
// }
//
// (() => {
//     let res = [];
//     res = axios.get('https://www.douban.com/group/shanghaizufang/discussion?start='+100)
//         .then(response => {
//             console.log(response);
//             console.log(response.data);
//             console.log(response.status);
//             console.log(response.statusText);
//             console.log(response.headers);
//             console.log(response.config);
//         })
//         .catch(function (error) {
//             console.log(error + '--');
//         });
//     console.log(res + ':res');
//     let htmlText = res.data;
//     console.log(htmlText + ':htmlText');
//     const $ = cheerio.load(res);
//     const rs = $('a[title]');
//     let resultList = [];
//     for (let i = 0; i < rs.length; i++) {
//         resultList.push({
//             title: rs.eg(i).attr('title'),
//             url: rs.eg(i).attr('href'),
//         })
//     }
// })()
//     .then(r => {
//         console.log('done');
//         process.exit(0);
//     })
//     .catch ( e =>{
//         console.log(e);
//         process.exit(1);
//     });
//     let resBaidu = {};
//     resBaidu = axios.get('https://www.douban.com/group/shanghaizufang/discussion?start=100')
//         .then(function (response) {
//             // console.log(response);
//             console.log(response.data);
//             // console.log(response.status);
//             // console.log(response.statusText);
//             // console.log(response.headers);
//             // console.log(response.config);
//         })
//         .catch(function (error) {
//             console.log(error + '--');
//         });
    // console.log(resBaidu);
    // console.log(resBaidu.data);
for (let i =0 ; i< 1 ; i++){
  new Promise((resolve, reject) => {
    let resBaidu = {};
    resBaidu = axios.get('https://www.douban.com/group/shanghaizufang/discussion?start='+i)
        .then(function (response) {
          // console.log(response);
          console.log(response.data);
          // console.log(response.status);
          // console.log(response.statusText);
          // console.log(response.headers);
          // console.log(response.config);
        })
        .catch(function (error) {
          console.log(error + '--');
        });
    resolve(resBaidu);
  })
}
