/**
 * Created by jkwu on 17-12-15.
 */
function flat2Tree (data, params) {
  /*
  * data: 要转换到树形结构的数据，type=array
  * params: 树形结构中节点的命名，type=object
  * */
  const menuMap = {};
  const menuData = data.slice(0);
  params = {
    sortCodeName: params && params.sortCodeName ? params.sortCodeName : 'sortCode',
    parentName: params && params.parentName ? params.parentName : 'parent',
    childrenName: params && params.childrenName ? params.childrenName : 'children',
    levelName: params && params.levelName ? params.levelName : 'level',
  };

  menuData.slice(0).map(function(item){
    if (Object.keys(item).includes(params.sortCodeName)) {
      menuMap[item[params.sortCodeName]] = item;
    } else {
      console.log(item.id + '--缺少sortCode');
    }
  });

  for(let id in menuMap){
    const item = menuMap[id],
      codes = item[params.sortCodeName].trim().split('-'),
      parent = menuMap[codes.slice(0,codes.length - 1).join('-')] || null;
    if(parent){
      parent[params.childrenName] = parent[params.childrenName] || [];
      item[params.parentName] = parent;
      parent[params.childrenName].push(item);
    }
    item[params.levelName] = codes.length;
  }
  return { data: data, params: params };
}


function removeLevelMore(treeData) {
  /*
  * 保留层级为1的树结构
  * treeData：树结构,type=array
  * */
  const tempTreeData = treeData.slice(0);
  return tempTreeData.filter(function(menuItem) {
    const sortCodeItems = menuItem.sortCode && menuItem.sortCode.split('-');
    if (sortCodeItems && sortCodeItems.length === 1) {
      return true;
    }
    return false;
  });
}

function depthFirstSearch(_menus, callback, params) {
  /*
  * _menus: 属性结构数组, type=array
  * callback: 回调方法，用于将遍历到的值传递到调用层,type=function
  * params：参数,用于说明_menus中父子节点的名称, type=object
  * */
  const tempMenus = _menus.slice(0);
  params = {
    sortCodeName: params && params.sortCodeName ? params.sortCodeName : 'sortCode',
    parentName: params && params.parentName ? params.parentName : 'parent',
    childrenName: params && params.childrenName ? params.childrenName : 'children',
    levelName: params && params.levelName ? params.levelName : 'level',
  };

  tempMenus && tempMenus.map(function(curr) {
    if (curr[params.childrenName]) {
      depthFirstSearch(curr[params.childrenName], callback, params);
    }
     // delete curr[params.childrenName];
     // delete curr[params.parentName];
     // delete curr[params.levelName];
    callback(curr);
  });
}

// module.exports = { flat2Tree, removeLevelMore, depthFirstSearch };