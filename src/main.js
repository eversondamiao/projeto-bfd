const readline = require('readline');

// ===== INTERFACE DE ENTRADA =====
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(pergunta) {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

// ===== CLASSES =====
class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.emprestado = false;
  }

  emprestar() {
    if (this.emprestado) {
      console.log(`Livro "${this.titulo}" já está emprestado.`);
    } else {
      this.emprestado = true;
      console.log(`Livro "${this.titulo}" emprestado com sucesso.`);
    }
  }

  devolver() {
    if (!this.emprestado) {
      console.log(`Livro "${this.titulo}" já está disponível.`);
    } else {
      this.emprestado = false;
      console.log(`Livro "${this.titulo}" devolvido com sucesso.`);
    }
  }

  get info() {
    return `"${this.titulo}" por ${this.autor} [${this.emprestado ? "Emprestado" : "Disponível"}]`;
  }
}

class Filme {
  constructor(titulo, diretor) {
    this.titulo = titulo;
    this.diretor = diretor;
    this.emprestado = false;
  }

  emprestar() {
    if (this.emprestado) {
      console.log(`Filme "${this.titulo}" já está emprestado.`);
    } else {
      this.emprestado = true;
      console.log(`Filme "${this.titulo}" emprestado com sucesso.`);
    }
  }

  devolver() {
    if (!this.emprestado) {
      console.log(`Filme "${this.titulo}" já está disponível.`);
    } else {
      this.emprestado = false;
      console.log(`Filme "${this.titulo}" devolvido com sucesso.`);
    }
  }

  get info() {
    return `"${this.titulo}" dirigido por ${this.diretor} [${this.emprestado ? "Emprestado" : "Disponível"}]`;
  }
}

class Usuario {
  constructor(nome) {
    this.nome = nome;
    this.itensEmprestados = [];
  }

  pegarItem(item) {
    if (this.itensEmprestados.length >= 3) {
      console.log("Limite de 3 itens emprestados atingido.");
      return;
    }
    if (item.emprestado) {
      console.log("Este item já está emprestado.");
      return;
    }
    if (this.itensEmprestados.includes(item)) {
      console.log("Você já pegou este item.");
      return;
    }
    item.emprestar();
    this.itensEmprestados.push(item);
  }

  devolverItem(item) {
    const index = this.itensEmprestados.indexOf(item);
    if (index > -1) {
      item.devolver();
      this.itensEmprestados.splice(index, 1);
    } else {
      console.log("Este item não está com você.");
    }
  }

  listarItens() {
    if (this.itensEmprestados.length === 0) {
      console.log(`${this.nome} não possui itens emprestados.`);
      return;
    }
    console.log(`Itens emprestados por ${this.nome}:`);
    this.itensEmprestados.forEach((item, i) => {
      console.log(`${i + 1} - ${item.info}`);
    });
  }
}

class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro(livro) {
    const existe = this.livros.some(
      (l) => l.titulo === livro.titulo && l.autor === livro.autor
    );
    if (existe) {
      console.log("Este livro já está cadastrado.");
      return;
    }
    this.livros.push(livro);
    console.log("Livro adicionado com sucesso.");
  }

  listarLivros() {
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
      return;
    }
    console.log("Lista de livros:");
    this.livros.forEach((livro, i) => {
      console.log(`${i + 1} - ${livro.info}`);
    });
  }

  buscarLivro(index) {
    return this.livros[index];
  }
}

class Locadora {
  constructor() {
    this.filmes = [];
  }

  adicionarFilme(filme) {
    const existe = this.filmes.some(
      (f) => f.titulo === filme.titulo && f.diretor === filme.diretor
    );
    if (existe) {
      console.log("Este filme já está cadastrado.");
      return;
    }
    this.filmes.push(filme);
    console.log("Filme adicionado com sucesso.");
  }

  listarFilmes() {
    if (this.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
      return;
    }
    console.log("Lista de filmes:");
    this.filmes.forEach((filme, i) => {
      console.log(`${i + 1} - ${filme.info}`);
    });
  }

  buscarFilme(index) {
    return this.filmes[index];
  }
}

// ===== INSTÂNCIAS =====
const biblioteca = new Biblioteca();
const locadora = new Locadora();

const usuarios = [
  new Usuario("Everson"),
  new Usuario("Eline"),
];

// Livros pré-cadastrados
biblioteca.adicionarLivro(new Livro("A Dança dos Dragões", "George R. R. Martin"));
biblioteca.adicionarLivro(new Livro("Uma Vida Pequena", "Hanya Yanagihara"));
biblioteca.adicionarLivro(new Livro("Canção para Ninar Menino Grande", "Conceição Evaristo"));

// Filmes pré-cadastrados
locadora.adicionarFilme(new Filme("O Auto da Compadecida", "Guel Arraes"));
locadora.adicionarFilme(new Filme("A Viagem de Chihiro", "Hayao Miyazaki"));
locadora.adicionarFilme(new Filme("Tudo em Todo Lugar ao Mesmo Tempo", "Daniel Kwan e Daniel Scheinert"));

// ===== MENU =====
function mostrarMenu() {
  console.log("\n===== MENU =====");
  console.log("1 - Adicionar Livro");
  console.log("2 - Adicionar Filme");
  console.log("3 - Adicionar Usuário");
  console.log("4 - Listar Livros");
  console.log("5 - Listar Filmes");
  console.log("6 - Usuário pegar item");
  console.log("7 - Usuário devolver item");
  console.log("8 - Listar itens do usuário");
  console.log("0 - Sair");
}

// ===== LOOP PRINCIPAL =====
async function main() {
  let executando = true;

  while (executando) {
    mostrarMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        const tituloLivro = await perguntar("Título do livro: ");
        const autorLivro = await perguntar("Autor do livro: ");
        biblioteca.adicionarLivro(new Livro(tituloLivro, autorLivro));
        break;

      case "2":
        const tituloFilme = await perguntar("Título do filme: ");
        const diretorFilme = await perguntar("Diretor do filme: ");
        locadora.adicionarFilme(new Filme(tituloFilme, diretorFilme));
        break;

      case "3":
        const nomeUsuario = await perguntar("Nome do novo usuário: ");
        usuarios.push(new Usuario(nomeUsuario));
        console.log("Usuário adicionado com sucesso.");
        break;

      case "4":
        biblioteca.listarLivros();
        break;

      case "5":
        locadora.listarFilmes();
        break;

      case "6":
        const nomeUser1 = await perguntar("Nome do usuário: ");
        const user1 = usuarios.find(u => u.nome === nomeUser1);
        if (!user1) {
          console.log("Usuário não encontrado.");
          break;
        }
        const tipoItem1 = await perguntar("Tipo (1 = Livro, 2 = Filme): ");
        if (tipoItem1 === "1") {
          biblioteca.listarLivros();
          const idx = await perguntar("Escolha o número do livro: ");
          const livro = biblioteca.buscarLivro(Number(idx) - 1);
          if (livro) user1.pegarItem(livro);
          else console.log("Livro inválido.");
        } else if (tipoItem1 === "2") {
          locadora.listarFilmes();
          const idx = await perguntar("Escolha o número do filme: ");
          const filme = locadora.buscarFilme(Number(idx) - 1);
          if (filme) user1.pegarItem(filme);
          else console.log("Filme inválido.");
        } else {
          console.log("Tipo inválido.");
        }
        break;

      case "7":
        const nomeUser2 = await perguntar("Nome do usuário: ");
        const user2 = usuarios.find(u => u.nome === nomeUser2);
        if (!user2) {
          console.log("Usuário não encontrado.");
          break;
        }
        user2.listarItens();
        if (user2.itensEmprestados.length === 0) break;

        const idxDev = await perguntar("Escolha o número do item para devolver: ");
        const itemDev = user2.itensEmprestados[Number(idxDev) - 1];
        if (itemDev) user2.devolverItem(itemDev);
        else console.log("Item inválido.");
        break;

      case "8":
        const nomeUser3 = await perguntar("Nome do usuário: ");
        const user3 = usuarios.find(u => u.nome === nomeUser3);
        if (!user3) {
          console.log("Usuário não encontrado.");
          break;
        }
        user3.listarItens();
        break;

      case "0":
        console.log("Saindo do sistema...");
        executando = false;
        rl.close();
        break;

      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

main();

          