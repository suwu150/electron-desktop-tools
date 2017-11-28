
import fs from 'fs';
import debug from 'debug';
import _object from 'lodash/object';

import config from '../constant/config';
import { TemplateSuffix } from '../constant/dictCodes';
import * as validator from './validator';
import { generateProperties } from './primary';
import { analysisService, analysisInfo, analysisDetail, analysisList } from './dependent';
import { ensureDirectoryExistence, readFileSync, saveFileSync, getFilesByDirSync, fileExist } from './json';

const log = debug('mx-dsl:utils/scan');

function scanBpm(dslPath) {
  let bpms = [];
  return bpms;
}

function scanEntity(entityPath) {
  const entities = [];
  const relatedEntities = {};
  return {
    relatedEntities,
    entities
  };
}

function scanExcelData(excelPath) {
  const exceldata = [];
  if (fs.existsSync(excelPath)) {
    const entityFiles = fs.readdirSync(excelPath);
    entityFiles.forEach(excel => {
      exceldata.push(excel.split('.')[0]);
    });
  }
  return exceldata;
}

function scanService(servicePath) {
  const services = [];
  // 构造服务文件中的实体服务依赖关系数据
  const serviceDependencies = [];

  return {
    services,
    serviceDependencies
  };
}

function scanDomain(subdomainPath, domain) {
  const domainPath = subdomainPath + domain;
  const domainEntity = domainPath + '/entity';
  const domainService = domainPath + '/service';

  return {
    ...scanEntity(domainEntity),
    ...scanService(domainService)
  };
}

function scanDsl(dslPath) {
  const subdomains = {};

  return subdomains;
}


export { scanDsl, scanBpm, scanExcelData };
