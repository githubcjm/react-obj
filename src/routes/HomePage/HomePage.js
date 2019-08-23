import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Icon } from 'antd';
import { Link, Route } from "react-router-dom";
import menu from './menu';
import { connect } from 'dva';
import request from '../../utils/request'


import ComplaintPage from './ComplaintPage/ComplaintPage';
import Problem from './Problem/Problem';
import Itemupload from './Itemupload/Itemupload';
import Vip from './Vip/Vip'
import Evaluate from './Evaluate/Evaluate'
import Mine from './Mine/Mine'
import MoneyDetail from './MoneyDetail/MoneyDetail'
import Weekly from './Weekly/Weekly'
import Exam from './Exam/Exam'
import Inquiry from './Inquiry/Inquiry'
import Leave from './Leave/Leave'
import Discipline from './Discipline/Discipline'



const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu,
      rightclass: {
        color: 'red'
      },
      // username: 'username',
      menur: (
        <Menu>
          <Menu.Item key="0">
            <a onClick={this.loginout}>退出</a>
          </Menu.Item>
          <Menu.Divider />
        </Menu>
      ),
      username: this.props.products.arr[0].name,
      usernames: 'username',
    }
  }

  loginout() {
    //清除cookie
    var now = new Date();
    now.setDate(now.getDate() - 1);
    document.cookie =
      'username' +
      "=" +
      '' +
      ";expires=" +
      now.toUTCString() +
      ";path=/"; //设置一个站点内的文件可以共享此cookie
    //存在Bug第一次打开页面时，退出用户，不会关闭旧的页面
    window.open('/', '_blank');
    window.close()

  }



  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {this.state.menu.map((item) => {
              return <SubMenu
                key={item.key}
                title={item.title}
              >
                {
                  item.options.map((item, index) => {
                    return <Menu.Item key={index}>
                      <Link to={item.ads}>{item.name}</Link>
                    </Menu.Item>
                  })
                }
              </SubMenu>
            })}
          </Menu>
        </Sider>

        <Dropdown overlay={this.state.menur} trigger={['click']}>
          <a className="ant-dropdown-link" style={{
            color: 'white',
            top: '18px',
            float: 'right',
            position: ' absolute',
            right: ' 23px'
          }}>
            {this.state.username} <Icon type="down" />
          </a>
        </Dropdown>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* 右边内容 */}
            <Route path="/home/etable" component={ComplaintPage} />
            <Route path="/home/problem" component={Problem} />
            <Route path="/home/itemupload" component={Itemupload} />
            <Route path="/home/Vip" component={Vip} />

            <Route path="/home/evaluate" component={Evaluate} />
            <Route path="/home/mine" component={Mine} />
            <Route path="/home/moneyDetail" component={MoneyDetail} />
            <Route path="/home/weekly" component={Weekly} />
            <Route path="/home/exam" component={Exam} />
            <Route path="/home/inquiry" component={Inquiry} />
            <Route path="/home/leave" component={Leave} />
            <Route path="/home/discipline" component={Discipline} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default connect(({ products }) => ({
  products,
}))(HomePage)