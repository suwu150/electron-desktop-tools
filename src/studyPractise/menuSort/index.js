/**
 * Created by xrk on 17-12-13.
 */

/*
* 扁平结构转树结构
*   data: 扁平结构数据
*   ...params:
*       eg.
*           参数一 sortCode(10-12-9) 层级标志
*           参数二 parent 父节点
*           参数三 children 字节点集
*           参数四 level 节点的层级
* */
function translate (data, ...params) {
    const menuMap = {};
    const menuData = data.slice(0);
    menuData.slice(0).map(function(item){
        menuMap[item[params[0]]] = item;
    });

    for(let id in menuMap){
        const item = menuMap[id],
            codes = item[params[0]].trim().split('-'),
            parent = menuMap[codes.slice(0,codes.length - 1).join('-')] || null;
        if(parent){
            parent[params[2]] = parent[params[2]] || [];
            item[params[1]] = parent;
            parent[params[2]].push(item);
        }
        item[params[3]] = codes.length;
    }
    return data;
}

const menuData = [
    {
        id: "Home",
        name: "首页",
        i18nCode: "menu.Home",
        summary: "首页菜单项",
        sortCode: "00",
        icon: "raxi raxi-0010home",
        url: "/Home",
        param: null,
        enable: true,
        container: "dom",
        style: "border:1px solid #F00",
        template: "",
        level: 1,
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "CustomerManager",
        name: "客户管理",
        i18nCode: "menu.CustomerName",
        summary: "客户管理模块，一级菜单",
        sortCode: "10",
        icon: "raxi raxi-1300xtgl",
        url: "",
        param: {CustomerType: "01"},
        enable: true,
        container: "dom",
        style: "",
        template: "",
        level: 1,
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "EntCustomer",
        name: "法人客户",
        i18nCode: "menu.EntCustomer",
        summary: "",
        sortCode: "10-10",
        icon: "raxi raxi-1306xtcspz",
        url: "/Modules/Customer/Ent/EntCustomerList",
        param: {dono: "EntCustomerList"},
        enable: true,
        container: "dom",
        style: "",
        template: "",
        level: 2,
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "Credit",
        name: "授信管理",
        i18nCode: "menu.Credit",
        summary: "",
        sortCode: "20",
        icon: "raxi raxi-1310zxbg",
        url: "",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "AgentCredit",
        name: "供应商授信",
        i18nCode: "menu.AgentCredit",
        summary: "",
        sortCode: "20-10",
        icon: "",
        url: "",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "ImportAgentCredit",
        name: "进口代理评审",
        i18nCode: "menu.ImportAgentCredit",
        summary: "",
        sortCode: "20-10-10",
        icon: "",
        url: "/Modules/Credit/Supplier/ImportAgentCreditList",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "SpeImportAgentCredit",
        name: "进口代理特殊评审",
        i18nCode: "menu.SpeImportAgentCredit",
        summary: "",
        sortCode: "20-10-20",
        icon: "",
        url: "/Modules/Credit/Supplier/SpeImportAgentCreditList",
        param: null,
        enable: false,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "ShowCase",
        name: "参考案例",
        i18nCode: "menu.ShowCase",
        summary: "",
        sortCode: "30",
        icon: "",
        url: "",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "SelfDef",
        name: "自定义",
        i18nCode: "menu.SelfDef",
        summary: "",
        sortCode: "30-10",
        icon: "",
        url: "",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "FrontApplet",
        name: "前端小程序",
        i18nCode: "menu.FrontApplet",
        summary: "",
        sortCode: "30-10-10",
        icon: "",
        url: "",
        param: null,
        enable: true,
        container: "dom",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    },
    {
        id: "HanoiTower",
        name: "汉诺塔",
        i18nCode: "menu.HanoiTower",
        summary: "",
        sortCode: "30-10-10-10",
        icon: "",
        url: "",
        param: null,
        enable: true,
        container: "iframe",
        style: "",
        template: "",
        revision: "",
        createdBy: "",
        createTime: "",
        updatedBy: "",
        updateTime: ""
    }
];

// translate(menuData, 'sortCode', 'parent', 'children', 'level');
console.log(translate(menuData, 'sortCode', 'parent', 'children', 'level'));