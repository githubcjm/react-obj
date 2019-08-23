import React, {
  Component
} from 'react'
import { Link, Route, Switch } from "react-router-dom";
import { Layout, Menu } from 'antd';
import HomePage from '../../routes/HomePage/HomePage'
import MinePage from '../../routes/MinePage/MinePage'
import SettingPage from '../../routes/SettingPage/SettingPage'
const { Header, } = Layout;

export default class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '千峰教育',
      menus: [{
        title: '首页',
        url: '/home'
      }, {
        title: '我的',
        url: '/mine'
      }, {
        title: '设置',
        url: '/setting'
      }]
    }
  }
  render() {
    return ( 

      <Layout>
        <Header >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            style={{ lineHeight: '64px' }}>

            {
              this.state.menus.map((item, index) => {
                return (<Menu.Item key={index}>
                  <Link to={item.url}></Link>
                  {item.title}
                </Menu.Item>)
              })
            }
          </Menu>
        </Header>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/mine" component={MinePage}></Route>
          <Route path="/setting" component={SettingPage}></Route>
        </Switch>
      </Layout>
    )
  }
}
