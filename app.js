let numerosSorteados = []; // lista para armazenar os números já sorteados;
let numeroSecreto = gerarNumeroAleatorio(); // variável para gerar o número secreto aleatório;
console.log(numeroSecreto); // exibindo o número secreto no console;
let tentativas = 1; // contador de tentativas, começando por 1;

// função para exibir texto de acordo com a tag selecionada;
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// função unica para exibir o texto inicial, evitando a repetição;
function exibirTextoInicial() {
    exibirTexto('h1', 'Jogo do número secreto!');
    exibirTexto('p', 'Chute um número entre 1 e 10');
}

exibirTextoInicial(); // chamando a função criada acima;

// função para gerar um número aleatório;
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1); // gerando um número entre 1 e 10;
    let quantidadeNumerosSorteados = numerosSorteados.length; // quantidade de números já sorteados;

    if (quantidadeNumerosSorteados == 5) { // se sortear 5 números, reinicia a lista;
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroEscolhido)) { // se o número já foi sorteado, gera outro número;
        return gerarNumeroAleatorio();
    } else { 
        numerosSorteados.push(numeroEscolhido); // insere o número sorteado a lista;
        console.log(numerosSorteados); // exibindo os números sorteados no console;
        return numeroEscolhido; // retorna o número sorteado;
    }
}

// função para limpar o campo ao errar o chute;
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; // string em vazio = limpa o valor do input;
}

// função para reiniciar o jogo;
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // desabilita o botão de reiniciar ao clicado;
}

// função que interage com o botão "Chutar" e verifica o chute, iniciando o jogo;
function verificarChute() {
    console.log('O botão "Chutar"foi clicado');
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) { // se o chute for igual ao número secreto, exibe mensagem de acerto;
        exibirTexto('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // pluraliza a palavra "tentativa" se for > 1;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // habilita o botão de reiniciar;
    } else {
        if (chute < numeroSecreto) {
            exibirTexto('p', 'O número secreto é maior que ' + chute);
        } else {
            exibirTexto('p', 'O número secreto é menor que ' + chute);
        }
        tentativas++; // a cada tentativa, soma +1;
        limparCampo(); // limpa o campo de entrada;
    }
}
