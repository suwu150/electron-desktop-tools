
const socketIo = require('socket.io');
const debug = require('debug')('mock:socket');

class Socket {
  constructor() {
    this._io = null;
  }
  init(server) {
    this._io = socketIo.listen(server);

    this._io.on('connection', (socket) => {
      debug('a user connected');

      socket.emit('tx', 'msg');

      socket.on('disconnect', () => {
        debug('user disconnected');
      });
    });
  }
}

module.exports = new Socket();
