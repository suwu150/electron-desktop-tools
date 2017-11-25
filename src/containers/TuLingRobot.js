/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';

class TuLingRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  render() {
    return (
      <div>
        <div>chatRoom</div>
        <div>{this.state.userName}</div>
      </div>
    )
  }
}

export default TuLingRobot;
