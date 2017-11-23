
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
  const bpmDirectory = dslPath + config.dsl.subdomain + config.dsl.bpm;
  const bpmPath = bpmDirectory + config.dsl.bpmmodelmapping;

  if (fs.existsSync(bpmPath)) {
    const bpmData = readFileSync(bpmPath);
    // bpms = bpmData.bpmModelMapping.mapping;
    // validator.validateBpmModelMappingFile(bpmPath);
  } else {
    ensureDirectoryExistence(bpmDirectory);
  }
  return bpms;
}

function scanEntity(entityPath) {
  const entities = [];
  const relatedEntities = {};
  if (fs.existsSync(entityPath)) {
    const entityFiles = fs.readdirSync(entityPath);
    entityFiles.forEach(entity => {
      const entityData = readFileSync(entityPath + '/' + entity);
      entities.push(entityData.entity.id);
      relatedEntities[entityData.entity.subdomain + '_' + entityData.entity.id]
        = _object.get(entityData, 'entity.relatedEntities', []);
      // validator.validateEntityFile(entityPath + '/' + entity);
    });
  } else {
    ensureDirectoryExistence(entityPath);
  }
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
  if (fs.existsSync(servicePath)) {
    const serviceDirs = fs.readdirSync(servicePath);
    serviceDirs.forEach(serviceDir => {
      let serviceObject = {};
      const files = ['service'];
      const serviceDependent = {};
      const serviceDirPath = servicePath + '/' + serviceDir;
      const serviceList = fs.readdirSync(serviceDirPath);
      if (serviceList.length > 0) {
        serviceList.forEach(service => {
          if (service.endsWith(TemplateSuffix.INFO)) {
            files.push('info');
            serviceDependent.info = analysisInfo(validator.validateInfoFile(serviceDirPath + '/' + service));
          } else if (service.endsWith(TemplateSuffix.DETAIL)) {
            files.push('detail');
            serviceDependent.detail = analysisDetail(validator.validateDetailFile(serviceDirPath + '/' + service));
          } else if (service.endsWith(TemplateSuffix.SUMMARY)) {
            files.push('summary');
            serviceDependent.summary = analysisDetail(validator.validateSummaryFile(serviceDirPath + '/' + service));
          } else if (service.endsWith(TemplateSuffix.LIST)) {
            files.push('list');
            serviceDependent.list = analysisList(validator.validateListFile(serviceDirPath + '/' + service));
          } else if (service.endsWith(TemplateSuffix.SUMMARYLIST)) {
            files.push('summarylist');
            serviceDependent.summarylist = analysisList(validator.validateListFile(serviceDirPath + '/' + service));
          } else if (service.endsWith(TemplateSuffix.SERVICE)) {
            const serviceFilePath = serviceDirPath + '/' + service;
            serviceDependent.service = analysisService(validator.validateServiceFile(serviceFilePath));
            const serviceData = readFileSync(serviceFilePath);
            serviceObject = _object.pick(serviceData.domainService,
              ['id', 'mainEntity', 'serviceName', 'subdomain', 'comment', 'isMenuService', 'isWorkflow', 'refService']);
          }
        });
        serviceDependencies.push(Object.assign(serviceDependent,
          { serviceName: _object.get(serviceObject, 'serviceName') }));
        services.push(Object.assign(serviceObject, { files }));
      }
    });
  } else {
    ensureDirectoryExistence(servicePath);
  }

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
  try {
    // 1. validate dictionary file.
    const dictionaryPath = dslPath + config.dsl.dictionary;
    if (fileExist(dictionaryPath)) {
      getFilesByDirSync(dictionaryPath).forEach(file => {
        validator.validateDictionaryFile(dictionaryPath + file);
      });
    } else {
      ensureDirectoryExistence(dictionaryPath);
    }

    // 2. validate menu file.
    validator.validateMenuFile(dslPath + config.dsl.menu);

    // 3. validate properties file.
    const propertiesPath = dslPath + config.dsl.properties;
    validator.validatePropertiesFile(propertiesPath);

    // 4. validate subdomain file.
    const subdomainPath = dslPath + config.dsl.subdomain;
    if (fs.existsSync(subdomainPath)) {
      const domains = fs.readdirSync(subdomainPath);
      domains.forEach(domain => {
        if (domain !== 'general') {
          const domainData = scanDomain(subdomainPath, domain);
          subdomains[domain] = domainData;
        }
      });
    } else {
      ensureDirectoryExistence(subdomainPath);
    }

    // 5. construct subdomins data
    if (fs.existsSync(propertiesPath)) {
      const propertiesData = readFileSync(propertiesPath);
      propertiesData.product.subdomains.forEach(item => {
        if (!subdomains[item.name]) {
          subdomains[item.name] = {
            entities: [],
            services: [],
            serviceDependencies: []
          };
        } else {
          _object.assign(subdomains[item.name], item);
        }
      });
    } else {
      const propertiesPrimary = generateProperties();
      saveFileSync(propertiesPrimary, propertiesPath);
    }
  } catch (err) {
    log('dsl validate failed!', err);
    throw err;
  }

  return subdomains;
}

function scanDependencies(dslPath) {
  const dependenciesPath = dslPath + config.dsl.dependencies;
  let dependencies = [];
  try {
    dependencies = _object.get(readFileSync(dependenciesPath), 'dependencies', []);
  } catch (err) {
    dependencies = [];
  }
  return dependencies;
}

export { scanDsl, scanBpm, scanDependencies, scanExcelData };
