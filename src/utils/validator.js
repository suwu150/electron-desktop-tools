
import debug from 'debug';
import Ajv from 'ajv';
import fs from 'fs';
import { readFileSync } from './json';
import { ValidateError } from './error';

import dictionarySchema from '../../normalize/schema/dictionary.json';
import entitySchema from '../../normalize/schema/entity.json';
import menuSchema from '../../normalize/schema/menu.json';
import propertiesSchema from '../../normalize/schema/properties.json';
import detailSchema from '../../normalize/schema/service_detail.json';
import infoSchema from '../../normalize/schema/service_info.json';
import listSchema from '../../normalize/schema/service_list.json';
import serviceSchema from '../../normalize/schema/service_service.json';
import summarySchema from '../../normalize/schema/service_summary.json';
import bpmEntitySchema from '../../normalize/schema/bpm_entity.json';
import bpmSchema from '../../normalize/schema/bpm.json';
import bpmModelMappingSchema from '../../normalize/schema/bpm_model_mapping.json';

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const log = debug('mx-dsl:utils/validator');

function validateData(schema, data) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    log('validate data error: ', ajv.errors);
    throw ajv.errors[0];
  }
}

export const validateDictionary = data => validateData(dictionarySchema, data);
export const validateEntity = data => validateData(entitySchema, data);
export const validateMenu = data => validateData(menuSchema, data);
export const validateProperties = data => validateData(propertiesSchema, data);
export const validateDetail = data => validateData(detailSchema, data);
export const validateInfo = data => validateData(infoSchema, data);
export const validateList = data => validateData(listSchema, data);
export const validateService = data => validateData(serviceSchema, data);
export const validateSummary = data => validateData(summarySchema, data);
export const validateBpmEntity = data => validateData(bpmEntitySchema, data);
export const validateBpm = data => validateData(bpmSchema, data);
export const validateBpmModelMapping = data => validateData(bpmModelMappingSchema, data);

function validateFile(schema, path) {
  if (fs.existsSync(path)) {
    log('Validating file: ' + path);
    const response = readFileSync(path);
    try {
      validateData(schema, response);
    } catch (err) {
      log('validate file [' + path + '] error: ', err);
      throw new ValidateError(path, err);
    }
    return response;
  }
  return {};
}

export const validateDictionaryFile = path => validateFile(dictionarySchema, path);
export const validateEntityFile = path => validateFile(entitySchema, path);
export const validateMenuFile = path => validateFile(menuSchema, path);
export const validatePropertiesFile = path => validateFile(propertiesSchema, path);
export const validateDetailFile = path => validateFile(detailSchema, path);
export const validateInfoFile = path => validateFile(infoSchema, path);
export const validateListFile = path => validateFile(listSchema, path);
export const validateServiceFile = path => validateFile(serviceSchema, path);
export const validateSummaryFile = path => validateFile(summarySchema, path);
export const validateBpmEntityFile = path => validateFile(bpmEntitySchema, path);
export const validateBpmFile = path => validateFile(bpmSchema, path);
export const validateBpmModelMappingFile = path => validateFile(bpmModelMappingSchema, path);
