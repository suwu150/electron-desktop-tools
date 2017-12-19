/**
 * Created by jkwu on 17-12-13.
 */
var sortObjectKeys = require('sort-object-attribute');

log = data => {
  console.log(data);
};

var menudata = [
  { sortCode: '00',	id: 'CustomerManager-noMenu'},
  { sortCode: '10',	id: 'CustomerManager'},
  {	sortCode: '10-10',id: 'EntCustomer'},
  {	sortCode: '10-20',id: 'AgentCredit'},
  {	sortCode: '10-30',id: 'ThirdParty'},
  {	sortCode: '20',id: 'ImportAgentCredit'},
  {	sortCode: '20-10',id: 'ShowCase20-10'},
  {	sortCode: '20-10-20',id: 'ShowCase20-10-20'},
  {	sortCode: '20-10-20-30',id: 'ShowCase20-10-20-30'},
]

/*
* 要求：
* 1，将扁平化结构按照sortCode组装成树形结构，sortCode暂定为： 10、10-10、10-10-10、10-10-10-10这样的结构，可按照“-”进行拆分，确定层级。
* 2，每一个菜单项需包含level(当前层级)、parent（父节点）、children（子节点集合，数组）。
* 3，算法尽量设计为扁平化结构转树形结构的抽象，尽可能考虑通用性。
*
*
* ------
* 如何确定当前level
* 如何parent父节点
* 如何确定字节点
*
* */
addParent = (menuItem, parentCode) => {

  return menuItem.parent = parentCode;
};

addChildren = (menuItem, level) => {
  return sortObjectKeys({ ...menuItem, level: level });
};

addLevel = (menuItem, level) => {
  return sortObjectKeys({ ...menuItem, level: level });
};
// log(mockData);
const result = [];

menudata.map((menuItem, index) => {
  // log(menuItem.sortCode);
  const sortCodeItems = menuItem.sortCode && menuItem.sortCode.split('-');
  if (sortCodeItems && sortCodeItems.length === 1) {
    log('1:' + sortCodeItems);
    result.push(addLevel(menuItem, 1));
  } else if (sortCodeItems && sortCodeItems.length === 2) {
    log('2:' + sortCodeItems);
    addLevel(menuItem, 2);
    addParent(menuItem, sortCodeItems[sortCodeItems.length -1]);
    // if (sortCodeItems[0] === ) {

    // }
  } else if (sortCodeItems && sortCodeItems.length === 3) {
    log('3:' + sortCodeItems);
    addLevel(menuItem, 3);
  } else if (sortCodeItems && sortCodeItems.length === 4) {
    log('4:' + sortCodeItems);
    addLevel(menuItem, 4);
  }
});

log('------------------------------');
log(result);
