/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { Input, Button, Form } from 'antd';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

class InputTextPanel extends React.Component {
  _sendMessage = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.sendMessage && this.props.sendMessage(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    };
    return (
      <div>
        <Form onSubmit={this._sendMessage}>
          <FormItem
            {...formItemLayout}
            label=""
          >
            {getFieldDecorator('sendMessage', {
              rules: [{ type: 'string', required: true, message: 'Please input text!' }],
            })(
              <TextArea />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">发送</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(InputTextPanel);
