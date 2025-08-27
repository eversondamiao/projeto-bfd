const readline = require("node:readline");


function perguntar(pergunta) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            rl.close();
            resolve(resposta);
        });
    });
}


async function calcularMedia() {
    const resposta1 = await perguntar("Qual a sua primeira nota: ");
    const resposta2 = await perguntar("Qual a sua segunda nota: ");
    const resposta3 = await perguntar("Qual a sua terceira nota: ");

    const nota1 = parseFloat(resposta1);
    const nota2 = parseFloat(resposta2);
    const nota3 = parseFloat(resposta3);

    
    if (Number.isNaN(nota1) || Number.isNaN(nota2) || Number.isNaN(nota3)) {
        console.log("Um dos campos não foi preenchido corretamente.");
        console.log("Por favor, insira apenas números válidos de 0 a 10.");
        return;
    }

    if (nota1 < 0 || nota2 < 0 || nota3 < 0) {
        console.log("As notas devem ser maiores ou iguais a 0.");
        return;
    }

    if (nota1 > 10 || nota2 > 10 || nota3 > 10) {
        console.log("As notas devem ser menores ou iguais a 10.");
        return;
    }

    const media = (nota1 + nota2 + nota3) / 3;

    if (media <= 6) {
        console.log(`Sua média é ${media.toFixed(2)} e você foi REPROVADO!`);
    } else if (media <= 8) {
        console.log(`Sua média é ${media.toFixed(2)} e você foi aprovado na MÉDIA!`);
    } else {
        console.log(`Sua média é ${media.toFixed(2)} e você foi APROVADO!`);
    }
}

calcularMedia();