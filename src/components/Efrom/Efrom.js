import React from 'react'
import { Form, Input, Button, message } from 'antd';
import request from '../../utils/request'
import { connect } from 'dva';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class DynamicRule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkNick: false,
      titleClass: {
        width: '592px',
        height: '90px'
      },
      username: this.props.products.arr[0].name
    }
  }


  check = async () => {
    // console.log(this.state.username);
    //获取当前时间
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
    let datatime = getNowFormatDate()

    let { nickname } = this.props.form.getFieldsValue()
    if (nickname && this.state.username) {
      let key = Date.parse(new Date())
      //存进数据库的key，页面刷新会重新计
      let body = `name=${this.state.username}&problem=${nickname}&time=${datatime}&key=${key}`
      let data = await request('http://localhost:5555/add/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      })
      if (data.data.success) {
        message.info('添加成功', 1);
      } else {
        message.info('添加失败', 1);
      }
    } else {
      message.info('不能为空！', 1);
    }
  }

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['nickname'], { force: true });
      },
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* 这里根据是否有登录状态，绑定姓名 */}
        <Form.Item {...formItemLayout} label="学员姓名" >
          {getFieldDecorator('username', {
            rules: [
              {
                required: this.state.checkNick,
                message: 'Please input your name',
              },
            ],
            //刷新页面会出现bug，仓库没有数据
          })(<Input placeholder={this.props.products.arr[0].name} disabled={true} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="问题内容">
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: this.state.checkNick,
                message: 'Please input your nickname',
              },
            ],
          })(<textarea style={this.state.titleClass} placeholder="请输入技术内容" />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            提问
            </Button>
        </Form.Item>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);

export default connect(({ products }) => ({
  products,
}))(WrappedDynamicRule)