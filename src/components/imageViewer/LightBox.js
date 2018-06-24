/**
 * Created by jkwu on 18-1-3.
 */
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

const images = [
  'http://avatar.csdn.net/A/8/0/1_suwu150.jpg',
  'http://avatar.csdn.net/A/8/0/1_suwu150.jpg',
  'http://avatar.csdn.net/A/8/0/1_suwu150.jpg',
  '//placekitten.com/1500/1500',
];

export default class LightboxExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }


  /* eslint-disable */
  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            discourageDownloads={false}
          />
        )}
      </div>
    );
  }
}