/**
 * Created by jkwu on 18-1-3.
 */
import React from 'react';
import { ShowImages } from '../components/index';

class ImageViewer extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div>chatRoom</div>
        <ShowImages
          profile={profile}
        />
      </div>
    )
  }
}

export default ImageViewer;
