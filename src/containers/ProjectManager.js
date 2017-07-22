/**
 * Created by jkwu on 17-7-14.
 */
import React from 'react';
import { render } from 'react-dom';
// import debug from 'debug';
import _object from 'lodash/object';
import { message } from 'antd'
const debug = require('debug');
// import ProjectList from '../components/projectManager/ProjectList';
import { ProjectList } from '../components/index';

const fs = require('fs');
const util = require('util');
const log = debug('electronDeskTopTool: container/ProjectManager');

const projectWorkPath = '/home/jkwu/webstormprojects/';


class ProjectManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ''
    };
  }

  componentWillMount = () => {
    console.log('componentWillMount');
    this._onGetData();
  };

  _onDeleteProject = (deleteProjectPath) => {
    const fileOrDirItemArray = this._readDirectory(deleteProjectPath);
    if (fileOrDirItemArray.length > 0) {
      fileOrDirItemArray.map(fileOrDirItem => {
        const info = fs.statSync(deleteProjectPath + '/' + fileOrDirItem);
          console.log(info);
          if (info.isDirectory()) {
            const files = this._readDirectory(deleteProjectPath + '/' + fileOrDirItem);
            if (files.length > 0) {
              files.map(item => {
                this._onDeleteProject(deleteProjectPath + '/' + fileOrDirItem + '/' + item);
              });
            }
            this._deleteDirectory(deleteProjectPath + '/' + fileOrDirItem);
          }
          if (info.isFile()) {
            this._deleteFile(deleteProjectPath + '/' + fileOrDirItem);
          }
      });
    }
      this._deleteDirectory(deleteProjectPath);
  };

  _readDirectory = (path) => {
    try {
      const filesItem = fs.readdirSync(path);
      console.log(path + '目录读取成功');
      return filesItem;
    } catch (err) {
      console.log(err + path + '目录读取失败');
    }
  };

  _deleteDirectory = (path) => {
      try {
        fs.rmdirSync(path);
        console.log(path + '目录删除成功');
      } catch (err) {
        console.log(err + path + '目录删除失败');
      }
  };

  _deleteFile = (path) => {
      try {
        fs.unlink(path);
        console.log(path + '文件删除成功');
      } catch (err) {
        console.log(err + path + '文件删除失败');
      }
  };

  _onGetCreateDate = (infotime) => {
    let timeStamp = Date.parse(new Date(infotime));
    let date = new Date(timeStamp);
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    return year + '-' + this._onAddPreZero(month) + '-' + this._onAddPreZero(day) + '  ' + this._onAddPreZero(hour) +
        ':' + this._onAddPreZero(minutes) + ':' + this._onAddPreZero(second);
  };

  _onAddPreZero = (number) => {
    return number < 10 ? ('0' + number) : number;
  };

  _onGetData = () => {
    const path = projectWorkPath;
    const fileDirData = fs.readdir(path, (err, response) => {
      if (err) {
        message.error('文件读取失败');
      } else {
        const projectInfo2json = [];
        console.log(response);
        new Promise((resolve, reject) => {
          try {
            response.map(fileDirItem => {
              console.log(fileDirItem + '---');
              fs.stat(path + fileDirItem, (err, info) => {
                switch (info.mode) {
                  case 16822:
                  case 16877:
                    // 留下只是文件夹的,出去文件项,为下一步查询项目名进行做准备
                    console.log( '[文件夹] ' + fileDirItem );
                    // const currentFilePath = path + fileDirItem;
                    // fs.readdir(currentFilePath, (err, response) => {
                    //   if (err) {
                    //     message.error('项目' + fileDirItem + '读取失败');
                    //   } else {

                    projectInfo2json.push({
                      ...info,
                      projectName: fileDirItem,
                      projectType: '---',
                      projectSize: info.size,
                      createDate: this._onGetCreateDate(info.birthtime),
                      projectPath: path + fileDirItem,
                      creator: 'jkwu'
                    });
                    console.log(projectInfo2json);
                    // }
                    // });
                    break;
                  case 33188:
                  case 33206:
                    console.log( '[文件] ' + fileDirItem );
                    break;
                  default :
                    console.log( '[其他类型] ' + fileDirItem );
                    break;
                }
                this.setState({
                  dataSource: projectInfo2json,
                });
              });
            });
            resolve(projectInfo2json);
          } catch (err) {
            reject(err);
          }
        })
            .then((projectInfo2json) => {
                  console.log(projectInfo2json + '.then()');
                  console.log('---测试.then()方法');
                }
            );
      }
    });
  };

  _onAddProject = (projectInfo) => {
    log(projectInfo);
    if (projectInfo && projectInfo.projectName) {
      fs.mkdir(projectWorkPath + projectInfo.projectName, (response) => {
           if (!response) {
             // fs.open()
             console.log(response);
             if (projectInfo.fileData) {
               const fileData = projectInfo.fileData;
               fileData.map(item => {
                 const path = projectWorkPath + projectInfo.projectName + '/' +item.name;
                 const content = item.content || '';
                 switch (item.type) {
                   case 'dir': {
                     fs.mkdirSync(path);
                     break;
                   }
                   case 'file': {
                     fs.writeFileSync(path,content);
                     break;
                   }
                   default: {
                     console.log('文件类型不匹配');
                     break;
                   }
                 }
               })
             }
           }
      })
    }
    this._onGetData();
  };




  render() {
    return (
        <div>
          <ProjectList
              addProject = {this._onAddProject}
              dataSource={this.state.dataSource}
              onDeleteProject={this._onDeleteProject}
          />
        </div>
    );
  }
}

render(<ProjectManager />, document.getElementById('entry'));
// export default ProjectManager;