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
    const lista = await window.senacAPI.buscarServicos();
    tabela.innerHTML = '';

    lista.forEach(criarLinhaServico);

    if (!lista.length) {
        tabela.textContent = 'Sem dados';
    }

    lucide.createIcons();
}

function criarLinhaServico(servico) {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${servico.nome}</td>
        <td>R$ ${servico.preco}</td>
        <td>${servico.duracao_minutos} min</td>
    `;

    const celulaAcoes = document.createElement('td');
    const botao = document.createElement('button');
    botao.innerHTML = '<i data-lucide="edit"></i>';
    botao.addEventListener('click', () => preencherCampos(servico));
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

    if (!nome) {
        alert('Preencha o nome!');
        return;
    }

    if (inputId.value) {
        await window.senacAPI.alterarServico(inputId.value, nome, preco, duracao);
    } else {
        await window.senacAPI.adicionarServico(nome, preco, duracao);
    }

    limparCampos();
    carregarServicos();
}

async function excluirServico() {
    const id = inputId.value;
    if (!id) {
        alert('Selecione um serviço primeiro.');
        return;
    }

    if (confirm('Deseja excluir este serviço?')) {
        await window.senacAPI.deletarServico(id);
        limparCampos();
        carregarServicos();
    }
}

carregarServicos();
