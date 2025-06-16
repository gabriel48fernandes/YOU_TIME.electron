const tabela = document.getElementById('tabelaServicos');
const inputId = document.getElementById('servico-id');
const inputNome = document.getElementById('servico-nome');
const inputPreco = document.getElementById('servico-preco');
const inputDuracao = document.getElementById('servico-duracao');

const btnSalvar = document.getElementById('btn-salvar');
const btnExcluir = document.getElementById('btn-excluir');
const btnLimpar = document.getElementById('btn-limpar');

btnSalvar.addEventListener('click', salvarServico);
btnExcluir.addEventListener('click', excluirServico);
btnLimpar.addEventListener('click', limparCampos);

async function carregarServicos() {
  const listaServicos = await window.senacAPI.buscarServicos();
  tabela.innerHTML = "";

  listaServicos.forEach(criarLinhaServico);

  if (listaServicos.length === 0) {
    tabela.textContent = "Sem dados";
  }

  lucide.createIcons();
}

function criarLinhaServico(servico) {
  const linha = document.createElement("tr");

  const celulaNome = document.createElement("td");
  celulaNome.textContent = servico.nome;
  linha.appendChild(celulaNome);

  const celulaPreco = document.createElement("td");
  celulaPreco.textContent = `R$ ${servico.preco}`;
  linha.appendChild(celulaPreco);

  const celulaDuracao = document.createElement("td");
  celulaDuracao.textContent = `${servico.duracao_minutos} min`;
  linha.appendChild(celulaDuracao);

  const celulaAcoes = document.createElement("td");
  const botao = document.createElement("button");
  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  botao.addEventListener("click", () => preencherCampos(servico));
  celulaAcoes.appendChild(botao);
  linha.appendChild(celulaAcoes);

  tabela.appendChild(linha);
}

function preencherCampos(servico) {
  inputId.value = servico.id;
  inputNome.value = servico.nome;
  inputPreco.value = servico.preco;
  inputDuracao.value = servico.duracao_minutos;
}

function limparCampos() {
  inputId.value = '';
  inputNome.value = '';
  inputPreco.value = '';
  inputDuracao.value = '';
}

async function salvarServico() {
  const nome = inputNome.value;
  const preco = inputPreco.value;
  const duracao = inputDuracao.value;
  const id = inputId.value;

  if (!nome || !preco || !duracao) {
    alert('Preencha todos os campos!');
    return;
  }

  if (id) {
    await window.senacAPI.alterarServico(id, nome, preco, duracao);
  } else {
    await window.senacAPI.adicionarServico(nome, preco, duracao);
  }

  limparCampos();
  carregarServicos();
}

async function excluirServico() {
  const id = inputId.value;
  if (!id) {
    alert('Selecione um serviço para excluir.');
    return;
  }

  if (confirm('Deseja realmente excluir este serviço?')) {
    await window.senacAPI.deletarServico(id);
    limparCampos();
    carregarServicos();
  }
}

carregarServicos();
