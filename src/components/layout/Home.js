
import React from 'react';
import { push, replace, goBack } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import styles from '../../styles/layout/Home.less';

const { SubMenu } = Menu;
// const { Header, Content, Footer, Sider } = Layout;
const { Content, Sider } = Layout;
const MenuItem = Menu.Item;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline',
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };

  /* eslint-disable */
  render() {
    const { children, routerActions } = this.props;
    return (
      <Layout style={{ height: document.body.clientHeight }} className={styles}>
        <Content>
          <Breadcrumb
            style={{
              margin: '0',
              paddingLeft: '20px',
              lineHeight: '20px',
              borderBottom: '1px solid gray',
              borderTop: '1px solid gray'
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout>
            <Sider
              className={{ height: document.body.clientHeight }}
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
                  key="systemManagerContainer"
                  className="topSubMenu"
                  title={<span><Icon type="area-chart" /><span className="nav-text">操作系统管理</span></span>}
                >
                  <MenuItem key="/systemManager">
                    <Link to="/systemManager">操作系统管理</Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  key="projectManagerContainer"
                  className="topSubMenu"
                  title={<span><Icon type="area-chart" /><span className="nav-text">工程项目管理</span></span>}
                >
                  <MenuItem key="/projectManager">
                    <Link to="/projectManager" >项目管理</Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  key="entertainmentGameManagerContainer"
                  className="topSubMenu"
                  title={<span><Icon type="area-chart" /><span className="nav-text">娱乐游戏管理</span></span>}
                >
                  <MenuItem key="/entertainmentGameManager">
                    <Link to="/entertainmentGameManager">娱乐游戏管理</Link>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: document.body.clientHeight - 22, overflow: 'hidden' }}>
              {
                React.cloneElement(children, ...routerActions)
              }
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = ({ routing }) => ({ routing });

const mapDispatchToProps = () =>
  dispatch => ({
    routerActions: {
      ...bindActionCreators({
        push,
        replace,
        goBack,
      }, dispatch)
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
