const { ExpressPeerServer } = require('peer');

const options = {
    debug: true,
};

module.exports = ExpressPeerServer(options);