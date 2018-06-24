/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { Button } from 'antd';

function OperatePanel() {
  return (
    <div style={{ display: 'flex', flex: '1 1 auto' }}>
      <Button
        type="primary"
        size="small"
      >测试网络是否连接</Button>
    </div>
  );
}

export default OperatePanel;
