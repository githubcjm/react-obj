import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import request from '../../utils/request'
import { connect } from 'dva';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginvalue: [],
        }

    }
    componentDidMount = async () => {
        //监听用户状态
        let body = `token=${this.getcookie()}`
        let data = await request('http://localhost:5555/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        })
        console.log(data);
        // 参数里的cookie少了个+，其他地方都没问题
        if (data.data.data.length >= 1) {
            window.location.href = "/#/home/etable"
            //存进仓库
            this.props.dispatch({
                type: 'products/add',
                payload: data.data.data
            })
        } else { 
            console.log(1);
        }
    }
    getcookie() {
        {
            var name = 'username' + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.loginvalue = values
            }
        });
        if (this.state.loginvalue.username && this.state.loginvalue.password) {
            let body = `name=${this.state.loginvalue.username}&pas=${this.state.loginvalue.password}`
            let data = await request('http://localhost:5555/login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            })
            console.log(data.data.data[0].token);
            let cookie = data.data.data[0].token;
            let username = 'username'
            if (data.data.success) {
                //存进cookie
                // var now = new Date();
                // now.setDate(now.getDate() + 10);
                // document.cookie =
                //     username +
                //     "=" +
                //     cookie +
                //     ";expires=" +
                //     now.toUTCString() +
                //     ";path=/"; //设置一个站点内的文件可以共享此cookie
                this.setCookie(username, cookie, 7)
                window.location.href = "/#/home/etable"
                //存进仓库
                this.props.dispatch({
                    type: 'products/add',
                    payload: data.data.data
                })

                message.info('登录成功', 1);
            }
        } else {
            message.info('请输入信息', 1);
        }
    };

    //设置cookie
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{
                height: ' 200px',
                width: ' 300px',
                margin: '200px auto'
            }}>
                <h3 style={{
                    color: 'red',
                    fontSize: '12px'
                }}>如果第一次登录会自动帮您注册!</h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// export default WrappedNormalLoginForm

export default connect(({ products }) => ({
    products,
}))(WrappedNormalLoginForm)

