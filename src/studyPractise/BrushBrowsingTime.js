/**
 * Created by jkwu on 10/11/17.
 */
const axios = require('axios');

const UrlData = [
  {
    name: '基于打包工具Webpack进行项目开发',
    url: 'http://blog.csdn.net/suwu150/article/details/77270404'
  }
];

function fetchBlog() {
  UrlData.map((urlItem, index) => {
    axios({
      method:'get',
      url: urlItem.url,
      responseType:'json'
    })
      .then(response => {
        // console.log(response);
        // console.log('=======data========');
        console.log(response.data);
        // console.log('=======status========');
        // console.log(response.status);
        // console.log('========statusText=======');
        // console.log(response.statusText);
        // console.log('======headers=========');
        // console.log(response.headers);
        // console.log('=======config========');
        // console.log(response.config);
        // console.log('当前顺序:' + index);
      })
      .catch(error => {
        console.log(error);
      });
  });
}

fetchBlog();
