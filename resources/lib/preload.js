document.addEventListener('DOMNodeInserted', () => {
  if (!!window && !window.io) {
    window.io = require('./socket.io/socket.io.js'); // eslint-disable-line
  }
});
