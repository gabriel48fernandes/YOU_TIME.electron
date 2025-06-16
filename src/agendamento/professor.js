
const paragrafo = document.getElementById('teste');
const tabelaProfessor = document.getElementById('professoresTableDados');
const modalNomeProfessor = document.getElementById('professor-nome');
const modalCpfProfessor = document.getElementById('professor-cpf');
const modalIDProfessor = document.getElementById('professor-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adionarAlterarProfessor)


//botao excluir
botaoExcluir.addEventListener('click', excluirProfessor)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(nome, cpf, id) {
    
    modalIDProfessor.value = id;
    modalCpfProfessor.value = cpf;
    modalNomeProfessor.value = nome;
}

function limpar(){
    modalIDProfessor.value = ""
    modalCpfProfessor.value = ""
    modalNomeProfessor.value = ""
}



function adionarAlterarProfessor(){
    if(modalIDProfessor.value != ''){
        alterarProfessor()
    }
    else{
        adicionarProfessor()
    }
}

async function alterarProfessor() {
    await window.senacAPI.alterarProfessor(modalIDProfessor.value, modalNomeProfessor.value, modalCpfProfessor.value)
    carregarProfessores()
    modalIDProfessor.value = ""
    modalCpfProfessor.value = ""
    modalNomeProfessor.value = ""
}


async function adicionarProfessor(){
    await window.senacAPI.adicionarProfessor(modalNomeProfessor.value, modalCpfProfessor.value)
    carregarProfessores()
    modalIDProfessor.value = ""
    modalCpfProfessor.value = ""
    modalNomeProfessor.value = ""
}
 

async function excluirProfessor() {
    const id = modalIDProfessor.value;

    await window.senacAPI.excluirProfessor(id);

    //após deleção atualiza a lista de alunos
    carregarProfessores();

    modalIDProfessor.value = ""
    modalCpfProfessor.value = ""
    modalNomeProfessor.value = ""
}


async function carregarProfessores() {


    const listaProfessor = await window.senacAPI.buscarProfessores();
    tabelaProfessor.innerHTML = "";

    console.log(listaProfessor)
    listaProfessor.forEach(criarLinhaProfessor)

    if (!listaProfessor.length > 0) {

        tabelaProfessor.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaProfessor(professor) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = professor.nome;
    linha.appendChild(celulaNome);

    //matricula
    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = professor.cpf;
    linha.appendChild(celulaCpf);



    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(professor.nome, professor.cpf, professor.id) }
    );
    botao.textContent = '';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaProfessor.appendChild(linha);

}




carregarProfessores()