/**
 * Created by liuqiang on 2017/4/11.
 */
import _object from 'lodash/object';

function analysisParameters(parameters) {
  return parameters.map(parameter => {
    if (parameter.entity) {
      return {
        name: parameter.name,
        entity: parameter.entity
      };
    }
    return '';
  }).filter(par => !!par);
}
function analysisButtons(buttons) {
  return buttons.map(but => {
    // 处理按钮的参数依赖
    const transmitParameters = but.transmitParameters;
    const bindParameters = but.bindParameters;
    let button = {
      buttonDescription: but.buttonDescription,
      actionLink: {
        service: _object.get(but, 'service', ''),
        link: _object.get(but, 'actionLink', ''),
        actionLinkMapping: _object.get(but, 'actionLinkMappings.actionLinkMapping', [])
      },
      nextActionLink: {
        service: _object.get(but, 'nextService', ''),
        link: _object.get(but, 'nextActionLink', ''),
        nextActionLinkMapping: _object.get(but, 'nextActionLinkMappings.nextActionLinkMapping', [])
      }
    };
    if (transmitParameters || bindParameters) {
      if (transmitParameters) {
        button = {
          ...button,
          transmitParameters: analysisParameters(transmitParameters)
        };
      }
      if (bindParameters) {
        button = {
          ...button,
          bindParameters: analysisParameters(bindParameters)
        };
      }
    }
    return button;
  }).filter(but => !!but);
}
// 分析服务文件
function analysisService(data) {
  // 获取主服务
  const mainServiceNames = _object.get(data, 'domainService.mainServiceNames', []);
  // 获取主实体
  const mainEntity = _object.get(data, 'domainService.mainEntity', '');
  // 获取方法参数所依赖的实体属性
  const functions = _object.get(data, 'domainService.functions', []).map(fun => {
    const requestParameters = fun.requestParameters;
    const responseParameters = fun.responseParameters;
    if (requestParameters || responseParameters) {
      let newFunction = {
        name: fun.name,
        type: fun.type
      };
      if (requestParameters) {
        // 遍历所有的请求参数，找出所有参数依赖的实体
        newFunction = {
          ...newFunction,
          requestParameters: analysisParameters(requestParameters)
        };
      }
      if (responseParameters) {
        // 遍历所有的响应参数，找出所有参数依赖的实体
        newFunction = {
          ...newFunction,
          responseParameters: analysisParameters(responseParameters)
        };
      }
      return newFunction;
    }
    return '';
  }).filter(fun => !!fun);
  // 返回服务文件中所有的依赖数据
  return {
    mainServiceNames,
    mainEntity,
    functions
  };
}

// 分析聚合详情文件
function analysisInfo(data) {
  // 获取主实体
  const mainEntity = _object.get(data, 'domainInfo.mainEntity', '');
  // 获取按钮所有的服务和实体依赖
  const buttons = analysisButtons(_object.get(data, 'domainInfo.buttons', []));
  // 获取菜单的服务依赖
  const menus = _object.get(data, 'domainInfo.pageMenu.menus', []).map(menu => {
    return {
      service: _object.get(menu, 'service', ''),
      actionLink: menu.actionLink,
      bindParameters: analysisParameters(_object.get(menu, 'bindParameters', [])),
      actionLinkMapping: _object.get(menu, 'actionLinkMappings.actionLinkMapping', [])
    };
  });
  return {
    mainEntity,
    buttons,
    menus
  };
}
// 分析普通详情，概要详情文件
function analysisDetail(data) {
  // 获取主实体
  const mainEntity = _object.get(data, 'domainDetail.mainEntity', '');
  // 获取按钮所有的服务和实体依赖
  const buttons = analysisButtons(_object.get(data, 'domainDetail.buttons', []));
  // 获取所有的属性
  const fields = _object.get(data, 'domainDetail.fields', []).map(field => {
    return {
      name: field.name,
      entity: _object.get(field, 'entity', '')
    };
  });
  // 获取关联实体及其属性
  const relatedEntities = _object.get(data, 'domainDetail.relatedEntities', []);
  return {
    mainEntity,
    buttons,
    fields,
    relatedEntities
  };
}
// 分析列表，列表概要文件
function analysisList(data) {
  // 获取主实体
  const mainEntity = _object.get(data, 'domainList.mainEntity', '');
  // 获取按钮所有的服务和实体依赖
  const buttons = analysisButtons(_object.get(data, 'domainList.buttons', []));
  // 获取所有的属性
  const fields = _object.get(data, 'domainList.fields', []).map(field => {
    return {
      name: field.name,
      entity: _object.get(field, 'entity', '')
    };
  });
  // 获取关联实体及其属性
  const relatedEntities = _object.get(data, 'domainList.relatedEntities', []);
  return {
    mainEntity,
    buttons,
    fields,
    relatedEntities
  };
}
export {
  analysisService,
  analysisInfo,
  analysisDetail,
  analysisList
};
