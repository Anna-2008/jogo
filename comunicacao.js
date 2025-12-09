const net = require('net');

function iniciarHost(port = 5000) {
    return new Promise((resolve) => {
        const server = net.createServer((socket) => {
            console.log('Jogador conectado:', socket.remoteAddress);
            resolve(socket);
        });

        server.listen(port, () => {
            console.log('Aguardando jogador conectar...');
        });
    });
}

function conectarHost(ip, port = 5000) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(port, ip, () => {
            console.log('Conectado ao host!');
            resolve(client);
        });
        client.on('error', (err) => reject(err));
    });
}

function enviar(msg, socket) {
    socket.write(msg);
}

function receber(socket) {
    return new Promise((resolve) => {
        socket.once('data', (data) => {
            resolve(data.toString());
        });
    });
}

module.exports = { iniciarHost, conectarHost, enviar, receber };
