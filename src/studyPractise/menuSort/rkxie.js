/**
 * Created by xrk on 17-12-13.
 */
function translate (data) {
    const menuDataObject = {};
    const menuDataCopy = data.slice(0);
    menuDataCopy.map(item => {
        menuDataObject[item.sortCode] = item;
    });

    for (let id in menuDataObject) {
        const menuCodeArr = id.trim().split('-');
        const menuCodeLen = menuCodeArr.length;
        const parentCode = menuCodeArr.slice(0, menuCodeLen - 1).join('-');
        if (menuCodeLen > 1) {
            if (!menuDataObject[parentCode].children) {
                menuDataObject[parentCode].children = [];
            }
            menuDataObject[parentCode].children.push(menuDataObject[id]);
            menuDataObject[id].parent = menuDataObject[parentCode];
        }
        menuDataObject[id].level = menuCodeLen;
    }
    console.log(data);
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

translate(menuData);