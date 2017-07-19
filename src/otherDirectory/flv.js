/**
 * Created by jkwu on 17-7-2.
 */
import React, { PureComponent } from 'react';
import Reflv from '../components/index';
import { HOST } from './index';

export class HttpFlv extends PureComponent {

    render() {
        return (
            <Reflv
                url={`http://${HOST}:7001/live/${this.props.id}.flv`}
                type="flv"
                isLive
                cors
                config={{
                    enableWorker: true,
                    enableStashBuffer: false,
                    stashInitialSize: 128,
                }}
            />
        )
    }
}