const xss = require('xss');

const controller = require('../controller/controller');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async (msg) => {
      let input = null;
      input = await controller.sendInput(xss(msg));
      socket.emit('message', input.name);
    });
    socket.on('complete', async (string) => {
      const getStrings = await controller.autocomplete(string);
      const allStrings = [];
      getStrings.forEach((nameElement) => {
        allStrings.push({ name: xss(nameElement.name) });
      });
      socket.emit('complete', allStrings);
    });
  });
};
