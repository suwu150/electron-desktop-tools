/**
 * Created by jkwu on 17-3-29.
 */
import React from 'react';

import { Tabs, Icon, Button } from 'antd';
// var server = require('./site/server');
// var script = require('./site/script');
// var webrtcIo = require('./site/webrtc.io');
// import server from './site/server';

import style from '../styles/style.css';

const TabPane = Tabs.TabPane;

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: '2'
        };
    }

    render() {
        return (
            <div>
                <div>ChatRoom</div>
                <div id="videos">
                    <video
                        id="you"
                        className={ style.flip }
                        autoPlay="true"
                        style={{ position: "absolute",left: "0", bottom: "0", width: "263px", height: "200px" }}
                    />
                </div>
                <div id="chatbox">
                    <div
                        id="hideShowMessages"
                        className={ style.button }
                    >toggle chat</div>
                    <div
                        id="messages"
                    >
                    </div>
                    <input
                        id="chatinput"
                        type="text"
                        placeholder="Message:"
                    />
                </div>
                <div className={ style.buttonBox }>
                    <div id="fullscreen" className="button">Enter Full Screen</div>
                    <div id="newRoom" className="button">Create A New Room</div>
                </div>
            </div>
        )
    }
}

export default ChatRoom;