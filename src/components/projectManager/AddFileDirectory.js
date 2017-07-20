/**
 * Created by jkwu on 17-7-15.
 */
import React from 'react';
import _object from 'lodash/object';
import { Table, Button, Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Operate = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
};
class AddFileDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      column: [
        {
          title: '文件名', dataIndex: 'name', key: 'name',
        },
        {
          title: '文件类型', dataIndex: 'type', key: 'type',
        },
        {
          title: '文件内容', dataIndex: 'content', key: 'content',
          render: (text, currentItem) => {
            return (
              <sapn>
                <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    icon="edit"
                    onClick={() => this._addFileItemModal({ currentItem }, Operate.UPDATE)}
                />
                <Button
                    type="danger"
                    size="small"
                    shape="circle"
                    icon="delete"
                    onClick={() => this._handleDeleteFileData({ currentItem } ,Operate.DELETE)}
                />
              </sapn>
            );
          }
        }
      ],
      defaultFileData: [
        {
          'name' : 'css',
          'type' : 'dir'
        },
        {
          'name' : 'js',
          'type' : 'dir'
        },
        {
          'name' : 'images',
          'type' : 'dir'
        },
        {
          'name' : 'index.html',
          'type' : 'file',
          'content' : '<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello</h1>\n\t</body>\n</html>',
        }
      ]
    }

  };

  _handleSubmit = () => {
    const { onSubmitData } = this.props;
    onSubmitData && onSubmitData({ FileDataInfo: this.state.defaultFileData });
  };

  _handleCancel = () => {
    this.setState({
      addFileItemVisible: false,
    });
  };

  _addFileItemModal = (currentData, operateStatus) => {
    switch (operateStatus) {
      case Operate.ADD: {
        this.setState({
          addFileItemVisible: true,
          operateStatus: Operate.ADD
        }); break;
      }
      case Operate.UPDATE: {
        this.setState({
          addFileItemVisible: true,
          currentItem: currentData.currentItem,
          operateStatus: Operate.UPDATE
        }); break;
      }
      default: {
        console.log('没有匹配的操作项');
      }
    }
  };

  _handleFileData = (data ,operateStatus = this.state.operateStatus) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (operateStatus === Operate.ADD) {
          this.setState({
            addFileItemVisible: false,
            defaultFileData : this.state.defaultFileData.concat(
                values.type === 'file' ? ({
                  name: values.name,
                  type: values.type,
                  content: values.content
                }) :
                ({
                  name: values.name,
                  type: values.type
                })
              )
          });
        }
        if (operateStatus === Operate.UPDATE) {
          const currentItem = this.state.currentItem;
          const tempfileItemData = values.type === 'file' ? ({
            name: values.name,
            type: values.type,
            content: values.content
          }) : ({
                name: values.name,
                type: values.type
              });
          this.setState({
            addFileItemVisible: false,
            defaultFileData : this.state.defaultFileData
                .map(fileItem => {
                  if (fileItem.name === currentItem.name && fileItem.type === currentItem.type) {
                    return tempfileItemData;
                  }
                  return fileItem;
                })
          });
        }
      }
    });
  };

  _handleDeleteFileData = (data) => {
    const type = data.currentItem.type === 'file' ? '文件' : '目录';
    const name = data.currentItem.name;
    const defaultFileData = this.state.defaultFileData;
    const that = this;
    Modal.confirm({
      title: '删除' + type,
      content: '您确定要删除' + type + '-' + name + '-' + '吗??',
      onOk(){
        that.setState({
          defaultFileData: defaultFileData
              .filter(fileData => {
                if (fileData.name === name && fileData.type === data.currentItem.type) {
                  return false; //delete item
                }
                return true;  // not detelte item
              })
        });
      },
      okText: '删除',
      cancelText: '取消',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 18, offset: 4 },
    };
    return (
        <div>
          <Modal
              visible={this.props.addFileDirectoryVisible}
              onCancel={this.props.onFileDirectoryVisibleCancel}
              onOk={() => this._handleSubmit()}
          >
            <Button
                onClick={() => this._addFileItemModal({}, Operate.ADD)}
            >新增文件项目</Button>
            <Table
                columns={this.state.column}
                dataSource={this.state.defaultFileData}
            />
          </Modal>
          <Modal
            visible={this.state.addFileItemVisible}
            onCancel={this._handleCancel}
            onOk={() => this._handleFileData({})}
          >
            <Form>
              <FormItem
                label="文件类型"
                {...formItemLayout}
              >
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择文件类型' }],
                  initialValue: 'file',
                })(
                  <Select>
                    <Option value="file">文件</Option>
                    <Option value="dir">目录</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label= {this.props.form.getFieldValue('type') === 'file' ? '文件名' : '目录名' }
                {...formItemLayout}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入有效的' +
                  this.props.form.getFieldValue('type') === 'file' ? '文件名' : '目录名'}],
                  initialValue: 'file',
                })(
                    <Input />
                )}
              </FormItem>
              {this.props.form.getFieldValue('type') === 'file' ? (
                <FormItem
                  label="内容"
                  {...formItemLayout}
                >
                  {getFieldDecorator('content', {
                    rules: [{ required: false, message: '请输入文件内容' }],
                    initialValue: '',
                  })(
                    <Input
                        type={'textarea'}
                        placeholder="请输入文本"
                        autosize={{ minRows: 2, maxRows: 10 }}
                    />
                  )}
                </FormItem>) : null}
            </Form>
          </Modal>
        </div>
    )
  }
}

export default Form.create({})(AddFileDirectory);