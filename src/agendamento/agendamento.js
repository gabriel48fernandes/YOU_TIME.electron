const tabela = document.getElementById('tabelaAgendamentos');
const inputId = document.getElementById('agendamento-id');
const selectCliente = document.getElementById('agendamento-cliente');
const selectServico = document.getElementById('agendamento-servico');
const selectAgenda = document.getElementById('agendamento-agenda');

const btnSalvar = document.getElementById('btn-salvar');
const btnExcluir = document.getElementById('btn-excluir');
const btnLimpar = document.getElementById('btn-limpar');

btnSalvar.addEventListener('click', salvarAgendamento);
btnExcluir.addEventListener('click', excluirAgendamento);
btnLimpar.addEventListener('click', limparCampos);

async function carregarSelects() {
    const [clientes, servicos, agendas] = await Promise.all([
        window.senacAPI.buscarClientes(),
        window.senacAPI.buscarServicos(),
        window.senacAPI.buscarAgenda()
    ]);

    preencherSelect(selectCliente, clientes);
    preencherSelect(selectServico, servicos);
    preencherSelect(selectAgenda, agendas, true);
}

function preencherSelect(select, lista, agenda = false) {
    select.innerHTML = '';
    lista.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = agenda
            ? `${item.data} ${item.hora} (${item.disponivel ? 'Livre' : 'Ocupado'})`
            : item.nome;
        select.appendChild(option);
    });
}

async function carregarAgendamentos() {
    const lista = await window.senacAPI.buscarAgendamentos();
    tabela.innerHTML = '';

    lista.forEach(criarLinhaAgendamento);

    if (!lista.length) {
        tabela.textContent = 'Sem dados';
    }

    lucide.createIcons();
}

function criarLinhaAgendamento(agendamento) {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${agendamento.nome_cliente}</td>
        <td>${agendamento.nome_servico}</td>
        <td>${agendamento.data}</td>
        <td>${agendamento.hora}</td>
    `;

    const celulaAcoes = document.createElement('td');
    const botao = document.createElement('button');
    botao.innerHTML = '<i data-lucide="edit"></i>';
    botao.addEventListener('click', () => preencherCampos(agendamento));
    celulaAcoes.appendChild(botao);

    linha.appendChild(celulaAcoes);
    tabela.appendChild(linha);
}

function preencherCampos(agendamento) {
    inputId.value = agendamento.id;
    selectCliente.value = agendamento.idcliente;
    selectServico.value = agendamento.idservico;
    selectAgenda.value = agendamento.idagenda;
}

function limparCampos() {
    inputId.value = '';
    selectCliente.selectedIndex = 0;
    selectServico.selectedIndex = 0;
    selectAgenda.selectedIndex = 0;
}

async function salvarAgendamento() {
    const cliente = selectCliente.value;
    const servico = selectServico.value;
    const agenda = selectAgenda.value;

    if (!cliente || !servico || !agenda) {
        alert('Preencha todos os campos!');
        return;
    }

    if (inputId.value) {
        await window.senacAPI.alterarAgendamento(inputId.value, cliente, servico, agenda);
    } else {
        await window.senacAPI.adicionarAgendamento(cliente, servico, agenda);
    }

    limparCampos();
    carregarAgendamentos();
}

async function excluirAgendamento() {
    const id = inputId.value;
    if (!id) {
        alert('Selecione um agendamento!');
        return;
    }

    if (confirm('Deseja excluir?')) {
        await window.senacAPI.deletarAgendamento(id);
        limparCampos();
        carregarAgendamentos();
    }
}

carregarSelects();
carregarAgendamentos();
