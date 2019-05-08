const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('./constants.json'),
    _local = {
        state: "idle"
    };

client.on('message', (msg, info) => {
    _local.state = msg.toString()
});

client.bind(constants.ports.response);

const bindStateManagement = (resolve, reject) => {
    let timeoutId = setTimeout(() => {
        console.log('set state to error after timeout!');
        _local.state = "error"
    }, 10000);
    let intervalId = setInterval(() => {
        if (isError())
            reject(_local.state);
        else // ok || idle
            resolve(_local.state);
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        _local.state = "idle"
    }, 100);
};

const isError = () => _local.state === "error";

const transmit = (command) => {
    const message = Buffer.from(command);
    client.send(message, 0, message.length, constants.ports.command, constants.hosts.remote, (error) => {
        if (error)
            _local.state = "error"
    })
};

const send = (command) => {
    console.log('Tellojs: received command', command);
    return new Promise((resolve, reject) => {
        bindStateManagement((value) => {
            resolve(value);
            transmit(command);
        }, (value) => {
            reject(value);
        });
    });
};

module.exports = {send, _local};