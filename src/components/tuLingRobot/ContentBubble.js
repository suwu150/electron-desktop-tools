/**
 * Created by jkwu on 17-11-30.
 */
import React from 'react';

function ContentBubble(props) {
  const currentDate = '------' + new Date().toString() + '----';

  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100px',
    }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 'inherit',
          height: '100px',
          backgroundColor: 'white',
          zIndex: '200000'
        }}
      >
        {props.item && props.item.text}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {
          currentDate
        }
      </div>
    </div>
  );
}

export default ContentBubble;
