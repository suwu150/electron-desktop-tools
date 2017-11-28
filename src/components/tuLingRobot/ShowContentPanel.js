/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';

function ShowContentPanel(props) {
  const showContentData = props && props.contentData ? props.contentData : [];
  console.log(props);
  return (
    <div style={{
      width: '100%',
      height: '300px',
      border: '1px solid gray',
      display: 'flex',
      flex: '1 1 auto'
    }}
    >
      <div>{JSON.stringify(showContentData)}</div>
    </div>
  );
}

export default ShowContentPanel;
