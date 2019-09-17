import React from 'react'
import { HashRouter as Router, Link } from "react-router-dom"
import {Layout, Menu, Icon } from 'antd'
import AsideLogo from 'src/assets/images/path.svg'
import { withRouter} from  'react-router-dom'
import styles from './index.scss'
const { SubMenu }  = Menu
const { Sider } = Layout
class GlobalMenu extends React.Component<any, any>  {
  
  state = {
    menuList: [{
      name: '书签管理',
      icon: 'unordered-list',
      path: '/bookmarks',
      key: '1',
    }, {
      name: '可视化工具',
      icon: 'pie-chart',
      key: '2',
      path: '/data',
      children: [{
        name: '图表',
        path: '/chart',
        key: '2-1'
      }]
    }, {
      name: '热力图',
      icon: 'heat-map',
      key: '3',
      path: '/heatMap',
      children: [{
        name: '百度-高德',
        path: '/baidu',
        key: '3-1'
      }]
    }, {
      name: '路线排化',
      icon: 'radius-setting',
      path: '/path',
      key: '4',
    }]
  }

  setDefaultMenu = (lacationHash: any) => {
    let hash = lacationHash.split('/')
    let parentHash = hash[1]
    let childHash = hash[2]
    let defaultOpenKeys: any = ''
    let defaultSelectedKeys: any = ''
    if (parentHash) {
      defaultOpenKeys = this.state.menuList.filter(item => item.path === '/' + parentHash)[0]
    }
    if (childHash) {
      defaultSelectedKeys = defaultOpenKeys.children.filter((item: { path: string; }) => item.path === '/' + childHash)[0]
    }
    return {
      defaultOpenKeys: [defaultOpenKeys ? defaultOpenKeys.key : ''],
      defaultSelectedKeys: [defaultSelectedKeys ? defaultSelectedKeys.key : defaultOpenKeys ? defaultOpenKeys.key : '']
    }
  }
  getMenus = ({ data, ParentPath = '', collapsed }: any) => {
    return data.map(({key, icon, name, path, children}: any) => {
      if (!children) {
        return (
          <Menu.Item key={key} className={ collapsed ? styles.menuLevelCollapsed: styles.menu__level }>
          {
           icon ? <Icon type={icon} /> : ''
          }
          <Router>
            <Link to={ ParentPath + path } >{name}</Link> 
          </Router>
         </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={key}
            title={
              <span>
                <Icon type={icon} />
                <span>{name}</span>
              </span>
            }
          >
          {
            this.getMenus({ data: children, ParentPath: path, collapsed })
          }
         </SubMenu>
        )
      }
    })
  }

  render() {
    let { location } = this.props
    const { collapsed } = this.props.data
    const menuItems = this.getMenus({ data: this.state.menuList, collapsed })
    let { defaultOpenKeys, defaultSelectedKeys = []} = this.setDefaultMenu(location.hash)
    return (
      <Sider 
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
      <div className={styles.logo} >
        <img className={styles.logoImg} alt="path" src={AsideLogo}/>
      </div>
        <Menu
          defaultSelectedKeys = {defaultSelectedKeys}
          defaultOpenKeys = {defaultOpenKeys}
          mode="inline"
          theme="dark"
        >
        {menuItems}
        </Menu>
      </Sider>
    )
  }
}
export default withRouter(GlobalMenu)