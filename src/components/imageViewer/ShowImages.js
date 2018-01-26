/**
 * Created by jkwu on 18-1-3.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from 'viewerjs';
import $ from 'jquery';
import LightBox from './LightBox';
// import { Paxios } from '../../utils/axios';

class ShowImages extends React.Component {
  /* eslint-disable */
  componentDidMount() {
    var viewer = new Viewer(ReactDOM.findDOMNode('images'));
    this.dom = ReactDOM.findDOMNode(this);
    this.images = Array.from(this.dom.children).filter(d => d.className === `images`)[0];
    $('images').css("background-color","yellow");
    $(this.images).css("background-color","yellow");
  }

  imageView = () => {
    this.dom = ReactDOM.findDOMNode(this);
    this.images = Array.from(this.dom.children).filter(d => d.className === `images`)[0];
    return new Viewer(this.images);
  };

  render() {
    return (
      <div style={{ display: 'flex', height: 'inherit', flexDirection: 'column' }}>
          <ul id="images" ref={this.imageView} className="images">
            <li key={0}><img src="http://avatar.csdn.net/A/8/0/1_suwu150.jpg" alt="" /></li>
            <li key={1}><img src="http://img.blog.csdn.net/20171228154930305?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3V3dTE1MA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="" /></li>
            <li key={2}><img src="http://f11.baidu.com/it/u=1104467092,1317590886&fm=76" alt="" /></li>
          </ul>
        <LightBox />
      </div>
    )
  }
}

export default ShowImages;
