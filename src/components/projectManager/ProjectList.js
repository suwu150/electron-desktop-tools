/**
 * Created by jkwu on 17-7-15.
 */
import React from 'react';
import _object from 'lodash/object';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import AddFileDirectory from './AddFileDirectory';


const FormItem = Form.Item;
const Option = Select.Option;
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      column: [
        {
          title: '项目名', dataIndex: 'projectName', key: 'projectName',
        },
        {
          title: '项目类型', dataIndex: 'projectType', key: 'projectType',
        },
        {
          title: '项目大小', dataIndex: 'projectSize', key: 'projectSize',
        },
        {
          title: '创建日期',
          dataIndex: 'createDate',
          key: 'createDate'
        },
        { title: '创建人', dataIndex: 'creator', key: 'creator' },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render: (text, currentProject) => {
            return (<span>
              <Button
                  type={'danger'}
                  icon={'delete'}
                  size="small"
                  onClick={() => this._handleProject(currentProject)}
              />
            </span>);
          }
        }
      ],
    }
  };

  _handleProject = currentProject => {
    const { onDeleteProject } = this.props;
    Modal.confirm({
      title: '删除项目',
      content: '你确定要删除' + currentProject.projectName + '项目吗?',
      onOk() {
        const deleteProjectPath = currentProject.projectPath;
        onDeleteProject && onDeleteProject(deleteProjectPath);
      },
      onCancel() {},
    });
  };

  _handleProjectModal = () => {
    this.setState({
      visible: true,
    });
  };

  _handleNextStep = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          visible: false,
          addFileDirectoryVisible: true,
          projectInfo: values,
        });
      }
    });
  };

  _handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  _onFileDirectoryVisibleCancel = () => {
    this.setState({
      addFileDirectoryVisible: false
    });
  };

  _onSubmitData = (data) => {
    const { addProject } = this.props;
    const projectInfo = this.state.projectInfo;
    const projectFileInfo = {
      ...projectInfo,
      fileData: data.FileDataInfo
    };
    addProject && addProject(projectFileInfo);
    this.setState({
      addFileDirectoryVisible: false,
    });
  };

  render() {
    const { dataSource } = this.props;
    // const tempDataSource = dataSource && dataSource.map(item => {
    //   return {
    //     projectName: item.projectName,
    //     projectType: item.projectType,
    //     projectSize: item.projectSize,
    //     createDate: item.createDate,
    //     creator: item.creator,
    //   }
    // });
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
          <Button
              {...buttonItemLayout}
              type="primary"
              size="small"
              onClick={() => this._handleProjectModal()}
          >新增项目</Button>
          <Table
              rowKey={(record) => record.projectName}
              columns={this.state.column}
              dataSource={dataSource}
          />
          <Modal
              visible={this.state.visible}
              onCancel={this._handleCancel}
              cancelText="取消"
              okText={'下一步'}
              onOk={() => this._handleNextStep()}
          >
            <Form>
              <FormItem
                  label="项目名"
                  {...formItemLayout}
              >
                {getFieldDecorator('projectName', {
                  rules: [{ required: true, message: '请输入项目名称' }],
                })(
                    <Input />
                )}
              </FormItem>
              <FormItem
                  label="项目类型"
                  {...formItemLayout}
              >
                {getFieldDecorator('projectType', {
                  rules: [{ required: true, message: '请选择项目类型' }],
                })(
                  <Select>
                    <Option value="Java">Java</Option>
                    <Option value="Node">Node</Option>
                    <Option value="JavaScript">JavaScript</Option>
                    <Option value="C++">C++</Option>
                    <Option value="Python">Python</Option>
                    <Option value="c#">c#</Option>
                    <Option value="net">.net</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                  label="git地址"
                  {...formItemLayout}
              >
                {getFieldDecorator('gitAddress', {
                  rules: [{ required: true, message: '请输入git地址' }],
                })(
                    <Input />
                )}
              </FormItem>
              <FormItem
                  label="创建人"
                  {...formItemLayout}
              >
                {getFieldDecorator('creator', {
                  rules: [{ required: true, message: '请输入创建人' }],
                })(
                    <Input />
                )}
              </FormItem>
            </Form>
          </Modal>
          <AddFileDirectory
              { ...this.props}
              addFileDirectoryVisible = {this.state.addFileDirectoryVisible}
              onFileDirectoryVisibleCancel = {this._onFileDirectoryVisibleCancel}
              projectInfo={this.state.projectInfo}
              onSubmitData={this._onSubmitData}
          />
        </div>
    )
  }
}

export default Form.create({})(ProjectList);