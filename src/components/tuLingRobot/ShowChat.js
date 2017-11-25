/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import OperatePanel from './OperatePanel';
import ShowContentPanel from './ShowContentPanel';
import InputTextPanel from './InputTextPanel';

class ShowChat extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', height: 'inherit', flexDirection: 'column' }}>
        <OperatePanel />
        <ShowContentPanel />
        <InputTextPanel />
      </div>
    )
  }
}

export default ShowChat;
