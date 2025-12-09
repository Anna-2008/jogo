const fs = require('fs');

function salvarJogador(jogador) {
    let dados = [];
    if (fs.existsSync('jogadores.json')) {
        dados = JSON.parse(fs.readFileSync('jogadores.json'));
    }
    const existe = dados.find(j => j.nome === jogador.nome);
    if (existe) {
        Object.assign(existe, jogador);
    } else {
        dados.push(jogador);
    }
    fs.writeFileSync('jogadores.json', JSON.stringify(dados, null, 4));
}

function registrarPartida(j1, j2, esc1, esc2, res) {
    let hist = [];
    if (fs.existsSync('historico.json')) {
        hist = JSON.parse(fs.readFileSync('historico.json'));
    }
    hist.push({
        jogador1: j1,
        jogador2: j2,
        escolha_j1: esc1,
        escolha_j2: esc2,
        resultado: res,
        data: new Date().toISOString()
    });
    fs.writeFileSync('historico.json', JSON.stringify(hist, null, 4));
}

module.exports = { salvarJogador, registrarPartida };
