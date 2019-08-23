import React from 'react'
// import axios from 'axios'
import request from '../../utils/request'
import { Table, Input, Button, Popconfirm, Form,message } from 'antd';

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

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '问题理由',
                dataIndex: 'problem',
            },
            {
                title: '创建时间',
                dataIndex: 'time',
            },
            {
                title: '编辑',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [
                // {
                //     // key: '0',
                //     name: 'Edward King 0',
                //     age: '32',
                //     address: 'London, Park Lane no. 0',
                // },
                // {
                //     // key: '1',
                //     name: 'Edward King 1',
                //     age: '32',
                //     address: 'London, Park Lane no. 1',
                // },
            ],
            count: 2,
        };
    }

    async componentDidMount() {
        console.log(this.state.dataSource);
        //  headers: { "content-type": "application/x-www-form-urlencoded" },//局部更改
        // let data = await axios('http://localhost:5555/add/login') 

        let data = await request('http://localhost:5555/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        this.state.dataSource = data.data
        this.setState({
            dataSource: data.data
        });
    }

    handleDelete = async (key) => {
        let body = `key=${key}`
        let data = await request('http://localhost:5555/del/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        })
        if (data.data.success) {
            message.info('删除成功', 1);
          } else {
            message.info('删除失败', 1);
          }
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };


    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
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
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
        </Button>
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
