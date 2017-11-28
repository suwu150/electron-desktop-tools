/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { ShowChat } from '../components/index';

class TuLingRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <div>chatRoom</div>
        <div>{this.state.userName}</div>
        <ShowChat
          profile={profile}
        />
      </div>
    )
  }
}

export default TuLingRobot;
