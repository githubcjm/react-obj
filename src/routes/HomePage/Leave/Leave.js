import React from 'react'
import { Form, Input, Button, Table, message, DatePicker } from 'antd';
import request from '../../../utils/request'
//时间
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class DynamicRule extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '20%',
                editable: true,
            },
            {
                title: '请假理由',
                dataIndex: 'title',
            },
            {
                title: '班主任审批',
                dataIndex: 'mes',
            },
            {
                title: '讲师审批',
                dataIndex: 'operation',

            },
            {
                title: '请假时间',
                dataIndex: 'time',
            },
            {
                title: '创建时间',
                dataIndex: 'settime',
            },
        ];
        this.state = {
            dateStrings: '1',
            contentclass: {
                color: 'black',
                textAlign: 'center',
                fontSize: ' 23px'
            },
            //下面表格的内容
            dataSource: [],
            dataSources: [],
            count: 2,
            checkNick: false,
            num: '',
            titleClass: {
                width: '592px',
                height: '90px'
            },
        };

    }

    //访问另外一个表单
    //etable删除功能，设置key为时间戳
    //注册登录功能
    check = async () => {
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

        let { nickname, username, title } = this.props.form.getFieldsValue()
        var d = new Date(nickname)
        var time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(time);

        if (nickname && username && title) {
            //存进数据库的key，页面刷新会重新计
            let body = `name=${username}&time=${nickname}&settime=${datatime}&title=${title}`
            let data = await request('http://localhost:5555/leave/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            })
            if (data.data.success) {
                this.setState({
                    dataSource: data.data.data
                })
                message.info('添加成功', 1);
            } else {
                message.info('添加失败', 1);
            }
        } else {
            message.info('不能为空！', 1);
        }
    }


    componentDidMount = async () => {
        let data = await request('http://localhost:5555/leave/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        if (data.data.success) {
            this.setState({
                dataSource: data.data.data
            })
        }
        // console.log(data.data.success);
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
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
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
                    })(<Input placeholder="Please input your name" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="请假理由">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: '请填写周报标题',
                            },
                        ],
                    })(<textarea style={this.state.titleClass} placeholder="请写入请假理由" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="请假时间" >
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder={['Start Time', 'End Time']}
                    // onChange={this.onChange}
                    // onOk={this.onChange}
                    />)}
                </Form.Item>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.check}>
                        申请
            </Button>
                </Form.Item>


                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />

            </div>
        );
    }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);

export default WrappedDynamicRule