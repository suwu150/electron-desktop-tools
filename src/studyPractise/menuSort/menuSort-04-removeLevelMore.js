/**
 * Created by jkwu on 17-12-13.
 */
var menudata = [
  { sortCode: '10',	id: 'CustomerManager'},
  {	sortCode: '10-10',id: 'EntCustomer'},
  {	sortCode: '10-20',id: 'AgentCredit'},
  {	sortCode: '10-30',id: 'ThirdParty'},
  {	sortCode: '20',id: 'ImportAgentCredit'},
  {	sortCode: '20-10',id: 'ShowCase'},
]

log = data => {
  console.log(data);
}


function translate (data) {
  var menuMap = {}
  var menuData = data.slice(0);
  menuData.slice(0).map(function(item){
    menuMap[item.sortCode] = item;
  })

  // log(menuData);
  // log(menuMap);

  for(var id in menuMap) {
    var item = menuMap[id],
      codes = item.sortCode.trim().split('-'),
      parent = menuMap[codes.slice(0,codes.length - 1).join('-')] || null;
    if(parent){
      // log(parent);
      parent.children = parent.children || [];
      item.parent = parent;
      parent.children.push(item);
    }
    item.level = codes.length;
  }

  return data;
}

// translate(menudata)
// console.log(translate(menudata));
const resultTreeData = translate(menudata);

removeLevelMore = (treeData) => {
  return treeData.filter(menuItem => {
    const sortCodeItems = menuItem.sortCode && menuItem.sortCode.split('-');
    if (sortCodeItems.length === 1) {
      return true;
    }
    return false;
  });
};

log(removeLevelMore(resultTreeData));

