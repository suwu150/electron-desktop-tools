import { upperFirst } from 'lodash/string';
import { get } from 'lodash/object';

const VERSION = '2.0.0';

function generateProperties() {
  return {
    product: {
      version: VERSION,
      name: 'leasing',
      value: '融资租赁',
      subdomains: [],
    }
  };
}

function generateDictionary(type) {
  return {
    dictionary: {
      version: VERSION,
      description: type,
      dictionaryCategories: [],
    }
  };
}

function generateSimpleFunctionItem(serviceName, type, name, value, resourceSecurityLevel = 2) {
  return {
    type,
    name,
    value,
    resourceSecurityLevel,
    isDefault: true,
    isEnable: true,
    isCustImpl: false,
    isConfirmNeeded: false,
    isCustQueryHandleImpl: false,
    functionCode: serviceName + '_' + type + '_' + name,
    actionName: '/Api/' + upperFirst(serviceName) + type + '/' + name,
    requestParameterType: 'Default',
    responseParameterType: 'Default',
  };
}

function generateComplexFunctionItem(serviceName, type, name, value, entity, isArray, resourceSecurityLevel = 5) {
  return {
    type,
    name,
    value,
    resourceSecurityLevel,
    isDefault: true,
    isEnable: true,
    isCustImpl: false,
    isConfirmNeeded: false,
    isCustQueryHandleImpl: false,
    functionCode: serviceName + '_' + type + '_' + name,
    actionName: '/Api/' + upperFirst(serviceName) + type + '/' + name,
    requestParameterType: isArray ? 'Array' : 'Object',
    requestParameters: [
      {
        name: entity.split('_')[1] + 'Id',
        type: 'Long',
        entity: {
          subdomain: entity.split('_')[0],
          name: entity.split('_')[1]
        },
        isRelatedField: true,
        dummy: '',
        isArray,
      }
    ],
    responseParameterType: 'Default',
  };
}

function generateDefaultFunctions(serviceName, entity) {
  return [
    generateSimpleFunctionItem(serviceName, 'List', 'render', '显示列表'),
    generateSimpleFunctionItem(serviceName, 'List', 'search', '筛选'),
    generateSimpleFunctionItem(serviceName, 'Detail', 'render', '添加'),
    generateSimpleFunctionItem(serviceName, 'Summary', 'render', '添加'),
    generateSimpleFunctionItem(serviceName, 'Info', 'render', '添加'),
    generateSimpleFunctionItem(serviceName, 'Transaction', 'save', '保存', 5),
    generateSimpleFunctionItem(serviceName, 'Transaction', 'batchSave', '批量保存', 5),
    generateSimpleFunctionItem(serviceName, 'Transaction', 'summarySave', '保存', 5),
    generateSimpleFunctionItem(serviceName, 'Transaction', 'summaryListSave', '选择'),
    generateSimpleFunctionItem(serviceName, 'SummaryList', 'render', '添加'),
    generateSimpleFunctionItem(serviceName, 'SummaryList', 'search', '筛选'),
    generateComplexFunctionItem(serviceName, 'Detail', 'renderByKey', '显示详情', entity, false),
    generateComplexFunctionItem(serviceName, 'Transaction', 'deleteByKey', '删除', entity, false, 5),
    generateComplexFunctionItem(serviceName, 'Transaction', 'deleteByKeys', '批量删除', entity, true, 5),
    generateSimpleFunctionItem(serviceName, 'Transaction', 'rowSave', '单行保存', 5)
  ];
}

function generateField(name, type, length, comment, isNull = false, isPrimaryKey = false) {
  return {
    name,
    isDefault: true,
    type,
    length,
    comment,
    isTransient: false,
    checks: {
      isNull,
      isPrimaryKey,
      isUnique: false
    }
  };
}

function generateDefaultFields(isEntityTemplate) {
  if (isEntityTemplate) {
    return [
      generateField('id', 'Long', 8, '主键ID', false, true),
      generateField('creatorId', 'Long', 8, '创建者ID'),
      generateField('creatorName', 'String', 80, '创建者姓名'),
      generateField('creatorDeptId', 'Long', 8, '创建者所属部门ID'),
      generateField('creatorDeptName', 'String', 80, '创建者所属部门名称'),
      generateField('createDate', 'Date', 8, '创建日期'),
      generateField('lastModifierId', 'Long', 8, '修改者ID'),
      generateField('lastModifierName', 'String', 80, '修改者名字'),
      generateField('lastModifierDeptId', 'Long', 8, '更新者所属部门ID'),
      generateField('lastModifierDeptName', 'String', 80, '更新者所属部门名称'),
      generateField('lastModifyDate', 'Date', 8, '更新日期'),
      generateField('extra', 'String', 2000, '扩展字段', true),
    ];
  }

  return [
    generateField('id', 'Long', 8, '主键ID', false, true),
    generateField('creatorId', 'Long', 8, '创建者ID'),
    generateField('creatorName', 'String', 80, '创建者姓名'),
    generateField('createDate', 'Date', 8, '创建日期'),
    generateField('lastModifierId', 'Long', 8, '修改者ID'),
    generateField('lastModifierName', 'String', 80, '修改者名字'),
    generateField('lastModifyDate', 'Date', 8, '更新日期'),
    generateField('extra', 'String', 2000, '扩展字段', true),
  ];
}

function onlyFlowEntityFields() {
  return [
    generateField('processStatus', 'String', 20, '流程状态', true, false),
    generateField('processResult', 'String', 20, '流程终审结果', true, false),
    generateField('processInstanceId', 'String', 64, '流程实例id', true, false),
    generateField('isBPMModel', 'String', 10, '是否流程业务模型', true, false),
    generateField('processFinalCheckDate', 'Date', 20, '流程终审时间', true, false),
    generateField('applicantId', 'String', 255, '流程申请者ID', true, false),
  ];
}

function flowEntityFields(isEntityTemplate) {
  if (isEntityTemplate) {
    return [
      generateField('id', 'Long', 8, '主键ID', false, true),
      generateField('creatorId', 'Long', 8, '创建者ID'),
      generateField('creatorName', 'String', 80, '创建者姓名'),
      generateField('creatorDeptId', 'Long', 8, '创建者所属部门ID'),
      generateField('creatorDeptName', 'String', 80, '创建者所属部门名称'),
      generateField('createDate', 'Date', 8, '创建日期'),
      generateField('lastModifierId', 'Long', 8, '修改者ID'),
      generateField('lastModifierName', 'String', 80, '修改者名字'),
      generateField('lastModifierDeptId', 'Long', 8, '更新者所属部门ID'),
      generateField('lastModifierDeptName', 'String', 80, '更新者所属部门名称'),
      generateField('lastModifyDate', 'Date', 8, '更新日期'),
      generateField('extra', 'String', 2000, '扩展字段', true),
      generateField('processStatus', 'String', 20, '流程状态', true, false),
      generateField('processResult', 'String', 20, '流程终审结果', true, false),
      generateField('processInstanceId', 'String', 64, '流程实例id', true, false),
      generateField('isBPMModel', 'String', 10, '是否流程业务模型', true, false),
      generateField('processFinalCheckDate', 'Date', 20, '流程终审时间', true, false),
      generateField('applicantId', 'String', 255, '流程申请者ID', true, false),
    ];
  }

  return [
    generateField('id', 'Long', 8, '主键ID', false, true),
    generateField('creatorId', 'Long', 8, '创建者ID'),
    generateField('creatorName', 'String', 80, '创建者姓名'),
    generateField('createDate', 'Date', 8, '创建日期'),
    generateField('lastModifierId', 'Long', 8, '修改者ID'),
    generateField('lastModifierName', 'String', 80, '修改者名字'),
    generateField('lastModifyDate', 'Date', 8, '更新日期'),
    generateField('extra', 'String', 2000, '扩展字段', true),
    generateField('processStatus', 'String', 20, '流程状态', true, false),
    generateField('processResult', 'String', 20, '流程终审结果', true, false),
    generateField('processInstanceId', 'String', 64, '流程实例id', true, false),
    generateField('isBPMModel', 'String', 10, '是否流程业务模型', true, false),
    generateField('processFinalCheckDate', 'Date', 20, '流程终审时间', true, false),
    generateField('applicantId', 'String', 255, '流程申请者ID', true, false),
  ];
}

function createDefaultButton(
  buttonDescription, buttonName, displayPosition, buttonType,
  relatedData, interactiveType, messagePromptType, service, actionLink, templateType, displayType,
  actionType, buttonCode, bindParameterType, transmitParameters = []
) {
  return {
    buttonDescription,
    buttonName,
    privilegeType: 'COMMON',
    displayPosition,
    buttonType,
    relatedData,
    interactiveType,
    messagePromptType,
    service,
    actionLink,
    templateType,
    displayType,
    actionType,
    buttonCode,
    transmitParameters,
    bindParameterType
  };
}

function createDefaultSaveButton(newServiceName, fileType) {
  const code = '保存'.split('').map((str) => str.codePointAt(0)).join('');
  const position = fileType === 'Detail' ? 'BOTTOM' : 'TOP';
  return createDefaultButton(
    '保存', 'SAVE', position, 'COMMON', 'NONE', 'ACTION', 'MESSAGE', newServiceName,
    '/Api/' + newServiceName + 'Transaction/save',
    'Detail', 'VIEW', 'REQUEST', code + '_In_' + newServiceName + '_' + fileType, 'ALL'
  );
}

function createDefaultListButton(newServiceName, fileType, templateType) {
  return [
    createDefaultButton(
      '新增', 'NEW', 'TOP', 'COMMON', 'NONE', 'MODAL', 'NONE', newServiceName,
      '/Api/' + newServiceName + 'Detail/render',
      templateType, 'EDIT', 'ROUTER', '新增'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_' + fileType, 'NONE'
    ),
    createDefaultButton(
      '详情', 'DETAIL', 'ROW', 'COMMON', 'NONE', 'MODAL', 'NONE', newServiceName,
      '/Api/' + newServiceName + 'Detail/renderByKey',
      templateType, 'EDIT', 'ROUTER', '详情'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_' + fileType, 'NONE'
    ),
    createDefaultButton(
      '删除', 'DELETE', 'ROW', 'COMMON', 'SINGLE', 'ACTION', 'CONFIRM', newServiceName,
      '/Api/' + newServiceName + 'Transaction/deleteByKey',
      templateType, 'EDIT', 'ROUTER', '删除'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_' + fileType, 'NONE'
    ),
    createDefaultButton(
      '批量删除', 'BATCHDELETE', 'TOP', 'COMMON', 'SINGLE', 'ACTION', 'CONFIRM', newServiceName,
      '/Api/' + newServiceName + 'Transaction/deleteByKeys',
      templateType, 'EDIT', 'ROUTER', '批量删除'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_' + fileType, 'KEYS'
    )
  ];
}

function createDefaultSummaryButton(newServiceName, serviceTemplate) {
  const templateType = serviceTemplate === '4' || serviceTemplate === '7' ? 'Detail' : 'Summary';
  const nextActionLinkLast = serviceTemplate === '4' || serviceTemplate === '7' ? 'Detail/renderByKey' : 'Info/render';
  return [
    { ...createDefaultButton(
      '确定', 'OTHER', 'BOTTOM', 'COMMON', 'NONE', 'PAGE', 'MESSAGE', newServiceName,
      '/Api/' + newServiceName + 'Transaction/summarySave',
      templateType, 'VIEW', 'REQUEST', '确定'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_Summary', 'ALL'
    ),
      nextService: newServiceName,
      nextActionLink: '/Api/' + newServiceName + nextActionLinkLast
    }];
}

function createDefaultSummaryListButton(newServiceName) {
  return [
    { ...createDefaultButton(
      '选择', 'OTHER', 'TOP', 'COMMON', 'SINGLE', 'MODAL', 'NONE', newServiceName,
      '/Api/' + newServiceName + 'Transaction/summaryListSave',
      'List', 'EDIT', 'REQUEST', '选择'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_SummaryList', 'KEY'
    ),
      nextService: newServiceName,
      nextActionLink: '/Api/' + newServiceName + 'Info/render'
    }
  ];
}

function createDefaultFlowDetailButton(newServiceName) {
  return [
    { ...createDefaultButton(
      '进度查询', 'OTHER', 'TOP', 'COMMON', 'NONE', 'RIGHTDRAWER', 'NONE', newServiceName,
      '/Api/Process/status',
      'Detail', 'VIEW', 'ROUTER', '进度'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_Detail', 'KEY'
    ) },
    { ...createDefaultButton(
      '意见', 'OTHER', 'TOP', 'COMMON', 'NONE', 'RIGHTDRAWER', 'NONE', newServiceName,
      '/Api/Process/remark',
      'Detail', 'VIEW', 'ROUTER', '意见'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_Detail', 'KEY'
    ) },
    { ...createDefaultButton(
      '提交', 'OTHER', 'TOP', 'COMMON', 'NONE', 'MODAL', 'NONE', newServiceName,
      '/Api/Process/commit',
      'Detail', 'VIEW', 'REQUEST', '提交'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_Detail', 'KEY'
    ) }
  ];
}

function createDefaultFlowListButton(newServiceName, flowType, serviceTemplate) {
  let detailLink = '';
  let newLink = 'Summary/render';
  if (serviceTemplate === '7') {
    detailLink = 'Detail/renderByKey';
  } else if (serviceTemplate === '8' || serviceTemplate === '9') {
    detailLink = 'Info/render';
  }
  if (serviceTemplate === '9') {
    newLink = 'SummaryList/render';
  }
  const buttons = [
    { ...createDefaultButton(
      '新增', 'NEW', 'TOP', 'COMMON', 'NONE', 'MODAL', 'NONE', newServiceName,
      '/Api/' + newServiceName + newLink,
      'Detail', 'EDIT', 'ROUTER', '新增'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_List', 'NONE'
    ) },
    { ...createDefaultButton(
      '撤销', 'OTHER', 'TOP', 'COMMON', 'NONE', 'ACTION', 'CONFIRM', newServiceName,
      '/Api/Process/deleteTask',
      'Detail', 'EDIT', 'REQUEST', '撤销'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_List', 'NONE'
    ) },
    { ...createDefaultButton(
      '进度查询', 'OTHER', 'ROW', 'COMMON', 'NONE', 'RIGHTDRAWER', 'NONE', newServiceName,
      '/Api/Process/status',
      'processStatusDiagram', 'EDIT', 'ROUTER', '进度'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_List', 'NONE'
    ) },
    { ...createDefaultButton(
      '查看详情', 'DETAIL', 'ROW', 'COMMON', 'NONE', 'PAGE', 'NONE', newServiceName,
      '/Api/' + newServiceName + detailLink,
      'Detail', 'EDIT', 'ROUTER', '详情'.split('').map((str) => str.codePointAt(0)).join('') +
      '_In_' + newServiceName + '_List', 'NONE'
    ) }
  ];
  if (flowType === 'apply') {
    return buttons;
  }
  return buttons.splice(2, 4);
}

function getButton(serviceName, fileType, serviceTemplate, flowType) {
  // 将服务名的首字母调整成大写
  const newServiceName = serviceName.substr(0, 1).toUpperCase() + serviceName.substr(1, serviceName.length);
  switch (serviceTemplate) {
    case '0':
    case '1':return [];
    case '2':
      return [createDefaultSaveButton(newServiceName, fileType)];
    case '3':
      if (fileType === 'Detail') {
        return [createDefaultSaveButton(newServiceName, fileType)];
      }
      return createDefaultListButton(newServiceName, fileType, 'Detail');
    case '4':
      if (fileType === 'Detail') {
        return [createDefaultSaveButton(newServiceName, fileType)];
      } else if (fileType === 'List') {
        return createDefaultListButton(newServiceName, fileType, 'Detail');
      }
      return createDefaultSummaryButton(newServiceName, serviceTemplate);
    case '5':
      if (fileType === 'Info') {
        return [];
      } else if (fileType === 'List') {
        return createDefaultListButton(newServiceName, fileType, 'Summary');
      }
      return createDefaultSummaryButton(newServiceName, serviceTemplate);
    case '6':
      if (fileType === 'Info') {
        return [];
      } else if (fileType === 'List') {
        return createDefaultListButton(newServiceName, fileType, 'SummaryList');
      }
      return createDefaultSummaryListButton(newServiceName);
    case '7':
      if (fileType === 'Detail') {
        return createDefaultFlowDetailButton(newServiceName);
      } else if (fileType === 'List') {
        return createDefaultFlowListButton(newServiceName, flowType);
      }
      return createDefaultSummaryButton(newServiceName, serviceTemplate);
    case '8':
      if (fileType === 'Info') {
        return [];
      } else if (fileType === 'List') {
        return createDefaultFlowListButton(newServiceName, flowType, serviceTemplate);
      }
      return createDefaultSummaryButton(newServiceName, serviceTemplate);
    case '9':
      if (fileType === 'Info') {
        return [];
      } else if (fileType === 'List') {
        return createDefaultFlowListButton(newServiceName, flowType, serviceTemplate);
      }
      return createDefaultSummaryListButton(newServiceName);
    default:return [];
  }
}

function getDictionCategoty(dictionary, code) {
  const categoryData = dictionary.filter(category => category.code === code);
  return get(categoryData[0], 'dictionaryItems', []);
}

export {
  onlyFlowEntityFields,
  flowEntityFields,
  generateProperties,
  generateDictionary,
  generateDefaultFunctions,
  generateDefaultFields,
  getButton,
  getDictionCategoty,
};
