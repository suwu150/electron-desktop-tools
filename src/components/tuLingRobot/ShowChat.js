/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import OperatePanel from './OperatePanel';
import ShowContentPanel from './ShowContentPanel';
import InputTextPanel from './InputTextPanel';

import { Paxios } from '../../utils/axios';

class ShowChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: {},
      contentData: []
    };
  }

  sendMessage = (props) => {
    const { profile } = this.props;
    const tulingApiUrl = profile && profile.tuLingApiUrl;
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        Paxios(tulingApiUrl, {
          key: '73eb675db6b77d2736db5069571576c5',
          info: values.sendMessage,
          loc: '北京市中关村',
          userid: 'jkwuranran'
        }).then(response => {
          console.log(response);
          this.setState({
            responseData: response.data,
            contentData: ((this.state.contentData && this.state.contentData.length <= 0) ? [] :
              this.state.contentData).concat(response.data)
          });
        });
      }
    });
  };

  render() {
    if (this.state.contentData && this.state.contentData.length < 0) {
      return null;
    }
    return (
      <div style={{ display: 'flex', height: 'inherit', flexDirection: 'column' }}>
        <OperatePanel />
        <ShowContentPanel
          contentData={this.state.contentData}
          responseData={this.state.responseData}
        />
        <InputTextPanel
          sendMessage={this.sendMessage}
        />
      </div>
    )
  }
}

export default ShowChat;
