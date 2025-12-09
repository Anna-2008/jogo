function resultado(j1, j2) {
    const regras = {
        pedra: 'tesoura',
        papel: 'pedra',
        tesoura: 'papel'
    };

    if (j1 === j2) return 'empate';
    if (regras[j1] === j2) return 'jogador1';
    return 'jogador2';
}

module.exports = { resultado };
