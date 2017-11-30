/**
 * Created by liuqiang on 2017/2/21.
 */
import fs from 'fs';
import debug from 'debug';
import path from 'path';

const log = debug('mx-dsl:utils/json');

/* eslint-disable */
// 判断文件是否存在
function fileExist(filePath) {
  return fs.existsSync(filePath);
}

// 更改子域文件目录名称
function renameSubdomain(filePath, newPath) {
  if (fileExist(filePath)) {
    fs.rename(filePath, newPath, error => {
      if (error) {
        throw error;
      }
    });
  }
}

// 仅删除目录下的文件
function deleteJsonFile(filePath) {
  if (fileExist(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// 删除目录下所有文件
function deleteDirectoryFile(filePath) {
  if (fileExist(filePath)) {
    fs.readdirSync(filePath).forEach(file => {
      const curPath = filePath + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectoryFile(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filePath);
  }
}

function ensureDirectoryExistence(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      const parentDir = path.dirname(dirPath);
      ensureDirectoryExistence(parentDir);
      fs.mkdirSync(dirPath);
    }
  } catch (err) {
    log('目录创建失败:' + err);
    throw err;
  }
}

 // 同步读取json文件
function readFileSync(filePath) {
  try {
    const data = fs.readFileSync(filePath).toString();
    return JSON.parse(data);
  } catch (err) {
    log('文件读取失败:' + err);
    throw err;
  }
}
 // 异步读取json文件返回Promise
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        log('文件读取失败:' + err);
      } else {
        resolve(JSON.parse(data.toString()));
      }
    });
  });
}
 // 异步读取json文件通过回调
function readFileCall(filePath, callBack) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callBack(err);
      log('文件读取失败:' + err);
    } else {
      callBack(null, JSON.parse(data.toString()));
    }
  });
}


 // 同步保存json文件
function saveFileSync(jsonObj, filePath) {
  try {
    const data = JSON.stringify(jsonObj, null, 2);
    ensureDirectoryExistence(path.dirname(filePath));
    fs.writeFileSync(filePath, data);
  } catch (err) {
    log('文件保存失败:' + err);
    throw err;
  }
}
 // 异步保存json文件返回Promise
function saveFilePromise(jsonObj, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), (err) => {
      if (err) {
        reject(err);
        log('文件保存失败:' + err);
      } else {
        resolve(jsonObj);
      }
    });
  });
}

// 异步追加文件
function appendFilePromise(obj, filePath) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, obj, 'utf-8', (err) => {
      if (err) {
        reject(err);
        log('文件追加失败:' + err + ' filePath: ' + filePath);
      } else {
        resolve(obj);
      }
    });
  });
}

 // 异步保存json文件通过回调
function saveFileCall(jsonObj, filePath, callBack) {
  fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), (err) => {
    if (err) {
      callBack(err);
      log('文件保存失败:' + err);
    } else {
      callBack(err, filePath);
    }
  });
}

// 异步获取某个目录下的所有文件
function getFilesByDirPromise(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// 同步获取某个目录下的所有文件
function getFilesByDirSync(dirPath) {
  try {
    return fs.readdirSync(dirPath);
  } catch (err) {
    log('目录读取失败:' + err);
    throw err;
  }
}

function fileExistPromise(filePath, isCreate) {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (status) => {
      if (!status) {
        if (isCreate) {
          const parent = path.dirname(filePath);
          fileExistPromise(parent, isCreate).then(() => {
            fs.mkdir(filePath, (parentErr) => {
              if (parentErr) {
                reject(parentErr);
              }
              resolve(filePath);
            });
          }).catch((err) => {
            reject(err);
          });
        } else {
          reject(status);
        }
      } else {
        resolve(filePath);
      }
    });
  });
}

export {
  fileExist,
  ensureDirectoryExistence,
  readFileSync,
  readFilePromise,
  readFileCall,
  saveFileSync,
  saveFilePromise,
  appendFilePromise,
  saveFileCall,
  deleteDirectoryFile,
  renameSubdomain,
  deleteJsonFile,
  getFilesByDirPromise,
  getFilesByDirSync,
  fileExistPromise
};
