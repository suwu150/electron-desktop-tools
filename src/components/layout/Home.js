
import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
// import { ShowMe } from '../index';
import styles from '../../styles/layout/Home.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item;



class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline',
    }
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
    render() {
      return (
        <div height={document.body.clientHeight} className={styles.container}>
          <Layout className={styles.layoutContainer}>
            <Header className={styles.HeaderContainer}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '30px', width: '100%', textAlign: 'center' }}
              >
                <MenuItem key="1">主页</MenuItem>
                <MenuItem key="2">菜单管理</MenuItem>
                <MenuItem key="3">文件管理</MenuItem>
              </Menu>
            </Header>
            <Content style={styles.contentContainer}>
              <Breadcrumb style={{ margin: '20px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Layout>
                <Sider
                    className={{height: document.body.clientHeight}}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                  <Menu
                      theme="dark"
                      mode={this.state.mode}
                      inlineIndent={6}
                  >
                    <SubMenu
                        key="dependentanalysis"
                        className="topSubMenu"
                        title={<span><Icon type="area-chart" /><span className="nav-text">工程项目管理</span></span>}
                    >
                      <MenuItem key="/projectManager">
                        <Link to="/projectManager">项目管理</Link>
                      </MenuItem>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <div>
                    <Button><a href="http://my.csdn.net/suwu150">www.csdn.com</a></Button>
                  </div>
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </div>
      );
    }
}


// ReactDom.render(<Home />, document.getElementById('entry'));
export default Home;