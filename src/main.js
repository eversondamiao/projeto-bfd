class ContaBancaria {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    formatarValor(valor) {
        return `R$${valor.toFixed(2)}`;
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            return `Depósito de ${this.formatarValor(valor)} realizado. Novo saldo: ${this.formatarValor(this.saldo)}.`;
        } else {
            return "Valor de depósito inválido.";
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            return `Saque de ${this.formatarValor(valor)} realizado. Novo saldo: ${this.formatarValor(this.saldo)}.`;
        } else if (valor > this.saldo) {
            return "Saldo insuficiente para saque.";
        } else {
            return "Valor de saque inválido.";
        }
    }

    consultarSaldo() {
        return `Saldo atual de ${this.titular}: ${this.formatarValor(this.saldo)}.`;
    }
}


const conta = new ContaBancaria("Everson", 1000);

console.log(conta.depositar(500));

console.log(conta.sacar(200));

console.log(conta.consultarSaldo());

console.log(conta);