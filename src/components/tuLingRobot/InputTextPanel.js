/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { Input, Button, Form } from 'antd';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

function InputTextPanel(props) {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
  };
  return (
    <div>
      <Form onSubmit={() => props.sendMessage(props)}>
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

export default Form.create()(InputTextPanel);
