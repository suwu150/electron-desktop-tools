/**
 * Created by jkwu on 17-7-14.
 */
import React from 'react';
import { render } from 'react-dom';
// import debug from 'debug';
import _object from 'lodash/object';
const debug = require('debug');
// import ProjectList from '../components/projectManager/ProjectList';
import { ProjectList } from '../components/index';

const fs = require('fs');
const log = debug('electronDeskTopTool: container/ProjectManager');

const projectWorkPath = '/home/jkwu/WebstormProjects/';


class ProjectManager extends React.Component {

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
  };


  render() {
    return (
        <div>
          <ProjectList
              addProject = {this._onAddProject}
          />
        </div>
    );
  }
}

render(<ProjectManager />, document.getElementById('entry'));
// export default ProjectManager;