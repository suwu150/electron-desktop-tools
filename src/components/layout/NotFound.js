import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
      <div id="page-404">
        <section>
          <h1>404</h1>
          <p>页面不存在,您可以:</p><br />
          <Link to="/" >返回首页</Link>
        </section>
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: '#react-content { height: 100%; background-color: #fff }',
          }}
        />
      </div>
    );
  }
}

export default NotFound;
