const prompt = require('prompt-sync')();
const { iniciarHost, conectarHost, enviar, receber } = require('./comunicacao');
const { resultado } = require('./logica');
const { salvarJogador, registrarPartida } = require('./crud');

(async () => {
    console.log("=== Pedra, Papel e Tesoura ===");
    const nome = prompt("Seu nome: ");

    console.log("1 - Criar partida (host)");
    console.log("2 - Entrar em partida");
    const op = prompt("> ");

    let socket, souHost, nomeOponente;

    if (op === "1") {
        socket = await iniciarHost();
        souHost = true;

        nomeOponente = await receber(socket);  // host recebe nome
        enviar(nome, socket);                 // host envia nome
    } else {
        const ip = prompt("IP do host: ");
        socket = await conectarHost(ip);
        souHost = false;

        enviar(nome, socket);                 // cliente envia nome
        nomeOponente = await receber(socket); // cliente recebe nome
    }

    console.log(`Você está jogando contra: ${nomeOponente}`);

    const escolha = prompt("Escolha (pedra/papel/tesoura): ").toLowerCase();

    let escolhaOponente;
    if (souHost) {
        enviar(escolha, socket);
        escolhaOponente = await receber(socket);
    } else {
        escolhaOponente = await receber(socket);
        enviar(escolha, socket);
    }

    console.log("Oponente escolheu:", escolhaOponente);

    const res = resultado(escolha, escolhaOponente);

    if (res === "empate") console.log("EMPATE!");
    else if ((res === "jogador1" && souHost) || (res === "jogador2" && !souHost))
        console.log("VOCÊ VENCEU!");
    else console.log("VOCÊ PERDEU!");

    salvarJogador({ nome });
    registrarPartida(nome, nomeOponente, escolha, escolhaOponente, res);

    socket.end();
})();
