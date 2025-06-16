const tabela = document.getElementById('tabelaNotas');
const inputId = document.getElementById('nota-id');
const selectAluno = document.getElementById('nota-aluno');
const selectProfessor = document.getElementById('nota-professor');
const selectMateria = document.getElementById('nota-materia');
const selectAvaliacao = document.getElementById('nota-avaliacao');
const selectMateriaFiltro = document.getElementById('select-materia');


const btnSalvar = document.getElementById('btn-salvar');
const btnExcluir = document.getElementById('btn-excluir');
const btnLimpar = document.getElementById('btn-limpar');
const btnFiltrar = document.getElementById('btn-filtrar');

btnSalvar.addEventListener('click', salvarNota);
btnExcluir.addEventListener('click', excluirNota);
btnLimpar.addEventListener('click', limparCampos);
btnFiltrar.addEventListener('click', filtrarPorMateria);

async function carregarSelects() {
  const [alunos, professores, materias] = await Promise.all([
    window.senacAPI.buscarAlunos(),
    window.senacAPI.buscarProfessores(),
    window.senacAPI.buscarMaterias()

  ]);

  preencherSelect(selectAluno, alunos);
  preencherSelect(selectProfessor, professores);
  preencherSelect(selectMateria, materias);
  preencherSelect(selectMateriaFiltro, materias);

}

function preencherSelect(select, lista) {
  select.innerHTML = '';
  lista.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.nome;
    select.appendChild(option);
  });
}

async function carregarNotas() {
  const listaNotas = await window.senacAPI.buscarNotas();
  tabela.innerHTML = "";

  console.log(listaNotas);
  listaNotas.forEach(criarLinhaNota);

  if (!listaNotas.length > 0) {
    tabela.textContent = "sem dados";
  }

  lucide.createIcons(); // ícones Lucide (lapis etc.)
}

function criarLinhaNota(nota) {
  const linha = document.createElement("tr");

  // Nome do aluno
  const celulaAluno = document.createElement("td");
  celulaAluno.textContent = nota.nome_aluno;
  linha.appendChild(celulaAluno);

  // Nome da matéria
  const celulaMateria = document.createElement("td");
  celulaMateria.textContent = nota.nome_materia;
  linha.appendChild(celulaMateria);

  // Nome do professor
  const celulaProfessor = document.createElement("td");
  celulaProfessor.textContent = nota.nome_professor;
  linha.appendChild(celulaProfessor);


  // Avaliação
  const celulaAvaliacao = document.createElement("td");
  celulaAvaliacao.textContent = nota.avaliacao;
  linha.appendChild(celulaAvaliacao);


  // ícone aprovado/reprovado
  const celulaIcone = document.createElement("td");
  const iconeNota = document.createElement("i");

  if (nota.avaliacao === "aprovado") {
    iconeNota.setAttribute("data-lucide", "smile");
  } else {
    iconeNota.setAttribute("data-lucide", "frown");
  }

  celulaIcone.appendChild(iconeNota);
  linha.appendChild(celulaIcone);



  // Botão editar
  const celulaBotao = document.createElement("td");
  const botao = document.createElement("button");
  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  botao.addEventListener("click", () => preencherCampos(nota));
  celulaBotao.appendChild(botao);
  linha.appendChild(celulaBotao);




  tabela.appendChild(linha);

  lucide.createIcons();

}

function preencherCampos(nota) {
  inputId.value = nota.id;
  selectAluno.value = nota.idaluno;
  selectProfessor.value = nota.idprofessor;
  selectMateria.value = nota.idmateria;
  selectAvaliacao.value = nota.avaliacao;
}

function limparCampos() {
  inputId.value = '';
  selectAluno.selectedIndex = 0;
  selectProfessor.selectedIndex = 0;
  selectMateria.selectedIndex = 0;
  selectAvaliacao.selectedIndex = 0;
}

async function filtrarPorMateria() {
  const materiaId = selectMateriaFiltro.value;

  if (!materiaId) {
    alert("Selecione uma matéria para filtrar.");
    return;
  }

  const todasNotas = await window.senacAPI.buscarNotas();
  const notasFiltradas = todasNotas.filter(n => n.idmateria == materiaId);

  tabela.innerHTML = "";

  if (notasFiltradas.length === 0) {
    tabela.textContent = "Nenhuma nota encontrada para essa matéria.";
  } else {
    notasFiltradas.forEach(criarLinhaNota);
    lucide.createIcons();
  }
}

async function salvarNota() {
  const id = inputId.value;
  const idaluno = selectAluno.value;
  const idmateria = selectMateria.value;
  const idprofessor = selectProfessor.value;
  const avaliacao = selectAvaliacao.value;

  if (!idaluno || !idprofessor || !idmateria || !avaliacao) {
    alert('Preencha todos os campos.');
    return;
  }

  if (id) {
    await window.senacAPI.alterarNota(id, idaluno, idprofessor, idmateria, avaliacao);
  } else {
    await window.senacAPI.adicionarNota(idaluno, idprofessor, idmateria, avaliacao);
  }

  limparCampos();
  carregarNotas();
}

async function excluirNota() {
  const id = inputId.value;
  if (!id) return alert('Selecione uma nota para excluir.');

  if (confirm('Tem certeza que deseja excluir?')) {
    await window.senacAPI.deletarNota(id);
    limparCampos();
    carregarNotas();
  }
}

carregarSelects();
carregarNotas();
