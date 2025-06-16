

const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome');
const modalMatriculaAluno = document.getElementById('aluno-matricula');
const modalIDAluno = document.getElementById('aluno-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adionarAlterarAluno)


//botao excluir
botaoExcluir.addEventListener('click', excluirAluno)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(nome, matricula, id) {
    modalIDAluno.value = id;
    modalMatriculaAluno.value = matricula;
    modalNomeAluno.value = nome;
}

function limpar() {
    modalIDAluno.value = ""
    modalMatriculaAluno.value = ""
    modalNomeAluno.value = ""
}



function adionarAlterarAluno() {
    if (modalIDAluno.value != '') {
        alterarAluno()
    }
    else {
        adicionarAluno()
    }
}

async function alterarAluno() {
    await window.senacAPI.alterarAluno(modalIDAluno.value, modalNomeAluno.value, modalMatriculaAluno.value)
    carregarAlunos()
    modalIDAluno.value = ""
    modalMatriculaAluno.value = ""
    modalNomeAluno.value = ""
}


async function adicionarAluno() {
    await window.senacAPI.adicionarAluno(modalNomeAluno.value, modalMatriculaAluno.value)
    carregarAlunos()
    modalIDAluno.value = ""
    modalMatriculaAluno.value = ""
    modalNomeAluno.value = ""
}


async function excluirAluno() {
    const id = modalIDAluno.value;
    console.log("vou deletar o id ", id);

    await window.senacAPI.excluirAluno(id);

    //após deleção atualiza a lista de alunos
    carregarAlunos();

    modalIDAluno.value = ""
    modalMatriculaAluno.value = ""
    modalNomeAluno.value = ""
}


async function carregarAlunos() {


    const listaAlunos = await window.senacAPI.buscarAlunos();
    tabelaAluno.innerHTML = "";

    console.log(listaAlunos)
    listaAlunos.forEach(criarLinhaAluno)

    if (!listaAlunos.length > 0) {

        tabelaAluno.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaAluno(aluno) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = aluno.nome;
    linha.appendChild(celulaNome);

    //matricula
    const celulaMatricula = document.createElement("td");
    celulaMatricula.textContent = aluno.matricula;
    linha.appendChild(celulaMatricula);
   

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(aluno.nome, aluno.matricula, aluno.id) }
    );
    botao.textContent = '';
    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    

    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaAluno.appendChild(linha);





}




carregarAlunos()