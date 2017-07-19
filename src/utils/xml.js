import fs from 'fs';
import debug from 'debug';

const log = debug('mx-dsl:utils/xml');

// const remote = require('electron').remote;
// const electronFs = remote.require('fs');

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        log('read error: ' + path);
        reject(err.message);
      } else {
        const doc = (new DOMParser()).parseFromString(buffer, 'text/xml');
        log(doc);
        resolve(doc);
      }
    });
  });
}

function saveFile(path, doc) {
  return new Promise((resolve, reject) => {
    const buffer = (new XMLSerializer()).serializeToString(doc);
    fs.writeFile(path, buffer, (err) => {
      if (err) {
        log('write error: ' + path);
        reject(err);
      }
    });
  });
}

export { readFile, saveFile };
