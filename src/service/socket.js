// import io from 'socket.io';
import debug from 'debug';
import config from '../config';

const log = debug('mx-dsl:service/socket');

class Socket {
  _socket = null;
  init() {
    this._socket = window.io(config.socket);
    this._socket.on('tx', (data) => {
      log('### socket ### ', data);
    });
  }
}

export default new Socket();
