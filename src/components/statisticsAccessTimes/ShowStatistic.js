/**
 * Created by Administrator on 2017/11/26.
 */
import React from 'react';
// import { Button } from 'antd';
import { Gaxios } from '../../utils/axios';

const UrlData = [
  {
    name: '基于jsp的文章',
    url: 'http://blog.csdn.net/suwu150/article/details/51596584'
  },
  {
    name: 'Atom如何实时渲染界面(markdown,html)',
    url: 'http://blog.csdn.net/suwu150/article/details/65937423'
  },
  {
    name: ' Linux操作系统的安装',
    url: 'http://blog.csdn.net/suwu150/article/details/51506194'
  },
  {
    name: '百度富文本编辑器的使用',
    url: 'http://blog.csdn.net/suwu150/article/details/51470097'
  },
  {
    name: '如何使用babel进行es6文件的编译',
    url: 'http://blog.csdn.net/suwu150/article/details/77198968'
  },
  {
    name: 'Linux常用命令介绍',
    url: 'http://blog.csdn.net/suwu150/article/details/51527555'
  },
  {
    name: 'myBatits增删改查实例',
    url: 'http://blog.csdn.net/suwu150/article/details/52888392'
  },
  {
    name: '基于打包工具Webpack进行项目开发',
    url: 'http://blog.csdn.net/suwu150/article/details/77270404'
  }
];

class ShowChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchBlog = () => {
    UrlData.map((urlItem) => {
      Gaxios(urlItem.url)
        .then(response => {
          // console.log(response);
          // console.log('=======data========');
          console.log('结果' + JSON.stringify(response.data));
          // console.log('=======status========');
          // console.log(response.status);
          // console.log('========statusText=======');
          // console.log(response.statusText);
          // console.log('======headers=========');
          // console.log(response.headers);
          // console.log('=======config========');
          // console.log(response.config);
          // console.log('当前顺序:' + index);
          this.setState({ data: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  fetchData = () => {
    console.log('获取数据：');
    // this.fetchBlog();
    setInterval(this.fetchBlog, 5000);
  };

  // <Button type="primary" onClick={this.fetchData}>开始</Button>

  render() {
    /* eslint-disable */
    const result = this.state.data;
    console.log(result);
    return (
    <div>
      <h1>数据展示</h1>
      <br />
      <div
        style={{ display: 'flex', height: 'inherit', flexDirection: 'column', overflow: 'auto' }}
        dangerouslySetInnerHTML={{
          __html: result
        }}
      />
    </div>
    )
  }
}

export default ShowChat;
