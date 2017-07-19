import React from 'react';

import { Tabs, Icon, Button } from 'antd';
import ChatRoom from './ChatRoom';

const TabPane = Tabs.TabPane;

class ShowMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: '2'
        };
    }

    // _onChangeSwitch = (record, text) => {
    //     this.props.onUpdateSwitch && this.props.onUpdateSwitch(record, !text);
    // }

    _handleTabChange = (key) => {
        console.log(key);
        this.setState({
            currentTab: key,
        });
    }

    _handleMedia = (stream) => {
        var constraints = {video: true};
        function onSuccess(stream) {
            var video = document.querySelector("video");
            video.src = window.URL.createObjectURL(stream);
            video.autoplay = true;
        }

        function onError(error) {
            console.log("navigator.getUserMedia error: ", error);
        }

        navigator.getUserMedia(constraints, onSuccess, onError);
    }

    _handleMediaStop = (stream) => {
        var constraints = {video: true};

        function onError(error) {
            console.log("navigator.getUserMedia error: ", error);
        }

        navigator.getUserMedia(constraints, onError, onError);
    }

    _handleAudio = () => {
        window.AudioContext = window.AudioContext ||
            window.webkitAudioContext;

        var context = new AudioContext();

        function onSuccess(stream) {
            var audioInput = context.createMediaStreamSource(stream);
            audioInput.connect(context.destination);
        }

        function onError(error) {
            console.log("navigator.getUserMedia error: ", error);
        }

        navigator.getUserMedia({audio:true}, onSuccess, onError);
    }

    render() {
        return (
            <Tabs defaultActiveKey="2" onChange={this._handleTabChange}>
                <TabPane tab={<span><Icon type="sound" />语音</span>} key="1">
                    <div>
                        <Button
                            type="primary"
                            onClick={this._handleAudio}
                        >开始语音</Button>
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="video-camera" />视频</span>} key="2">
                    <div>
                        <div>
                            <Button
                                type="primary"
                                onClick={this._handleMedia}
                            >开始视频</Button>
                            <Button
                                type="primary"
                                onClick={this._handleMediaStop}
                            >Stop视频</Button>
                        </div>
                        <div>
                            <video id="webcam"></video>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="video-camera" />ChatRoom</span>} key="3">
                    <ChatRoom />
                </TabPane>
            </Tabs>
        )
    }
}

export default ShowMe;