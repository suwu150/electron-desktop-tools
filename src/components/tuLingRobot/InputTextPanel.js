/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { Input } from 'antd';

const TextArea = Input.TextArea;

function InputTextPanel() {
  return (
    <div style={{ display: 'flex', flex: '1 1 auto' }}>
      <TextArea />
    </div>
  );
}

export default InputTextPanel;
