/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import ContentBubble from './ContentBubble';

function ShowContentPanel(props) {
  const showContentData = props && props.contentData ? props.contentData : [];
  const contentBubbleList = showContentData && showContentData
    .map((item, index) => <ContentBubble item={item} index={index} key={item.text + '-' + item.code + index} />);
  return (
    <div style={{
      width: '100%',
      height: '300px',
      flexDirection: 'column',
      border: '1px solid gray',
      display: 'flex',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}
    >
      {
        contentBubbleList
      }
    </div>
  );
}

export default ShowContentPanel;
