const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function pergunta(questao) {
    return new Promise(resolve => {
        rl.question(questao, (resposta) => {
            resolve(resposta);
        });
    });
}

function validarNumero(numero) {
    const num = parseInt(numero, 10);
    return !isNaN(num) && num > 0;
}

function mensagemMedalha(posicao) {
    const medalhas = ['ouro', 'prata', 'bronze'];
    
    if (posicao >= 1 && posicao <= 3) {
        return `Parabéns, sua medalha foi de ${medalhas[posicao - 1]}.`;
    } else {
        return "Sua posição não recebe medalha. Tente novamente!";
    }
}

async function retornarMedalha() {
    const numeroDoUsuario = await pergunta('Digite a sua posição na competição: ');
    
    if (validarNumero(numeroDoUsuario)) {
        const posicao = parseInt(numeroDoUsuario, 10);
        const mensagem = mensagemMedalha(posicao);
        console.log(mensagem);
        rl.close();
    } else {
        console.log('Digite uma posição válida.');
        return retornarMedalha();
    }
}

retornarMedalha();
