/**
 * Created by jkwu on 17-12-13.
 */
log = data => {
  console.log(data);
};

const mockData = require('./mock-data');

function translate (data) {
  var menuMap = {}
  var menuData = data.slice(0);
  menuData.slice(0).map(function(item){
    menuMap[item.sortCode] = item;
  })

  // log(menuData);
  log(menuMap);

  for(var id in menuMap){
    var item = menuMap[id],
      codes = item.sortCode.trim().split('-'),
      parent = menuMap[codes.slice(0,codes.length - 1).join('-')] || null;
    if(parent){
      parent.children = parent.children || [];
      item.parent = parent;
      parent.children.push(item);
    }
    item.level = codes.length;
  }

  return data;
}

// translate(mockData);
log(translate(mockData));

const treeData = translate(mockData);