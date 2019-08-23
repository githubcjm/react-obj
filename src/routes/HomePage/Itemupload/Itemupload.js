import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';
export default class Itemupload extends Component {
    constructor(props){
        super(props)
        //这里放数据
        this.state={
            borderclass:{
                fontSize: '23px',
                border: '1px solid rgb(197, 208, 220)',
                textAlign:' center',
                lineHeight: '50px' 
            },
            tijiao:{
                background:'#6fb3e0',
                color:'white',
                fontSize:'15px',
                height: '42px',
                width:' 85px'
            }
        }
        props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
        }

    }
    onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      };
    render() {
        return (
            <div>
                <div style={this.state.borderclass}>
                <h2>学员项目上传</h2>
                 <Upload {...this.props}> 
                    <Button>
                    <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <button style={this.state.tijiao}>提交</button>
                <button style={this.state.tijiao}>返回</button>

                </div>
             </div>
        )
    }
}