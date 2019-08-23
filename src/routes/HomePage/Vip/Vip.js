import React from 'react'
import { Form, Input, Button,message, } from 'antd';
import request from '../../../utils/request'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
  

class DynamicRule extends React.Component {
  state = {
    checkNick: false,
    num:'',
    mes:'',
    name:'',
    titleClass:{
      width: '592px',
      height: '90px'
    }
  }

  check = async () => {
   this.state.mes=this.props.form.getFieldsValue().nickname;
   this.state.name=this.props.form.getFieldsValue().username;
   if( this.state.mes){
       //如果输入框有内容才发送请求
       let body = `name=${this.state.name}&vip=${this.state.mes}`
    let data = await request('http://localhost:5555/change/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
        console.log(data); 
    message.info('添加成功',1);
   }else{
    message.info('申请理由不能为空！',1);
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
        <Form.Item {...formItemLayout} label="学员姓名">
          {getFieldDecorator('username', {
            rules: [
              {
                required: this.state.checkNick,
                message: 'Please input your name',
              },
            ],
          })(<Input placeholder="Please input your name"  />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="问题内容">
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: this.state.checkNick,
                message: 'Please input your nickname',
              },
            ],
          })(<textarea style= {this.state.titleClass}  placeholder="请输入申请内容"/ >)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={this.check} >
            申请
            </Button>
        </Form.Item>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);

export default WrappedDynamicRule