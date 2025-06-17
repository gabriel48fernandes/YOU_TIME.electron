const tabela = document.getElementById('tabelaAgenda');
const inputId = document.getElementById('agenda-id');
const inputData = document.getElementById('agenda-data');
const inputHora = document.getElementById('agenda-hora');
const selectDisponivel = document.getElementById('agenda-disponivel');

const btnSalvar = document.getElementById('btn-salvar');
const btnExcluir = document.getElementById('btn-excluir');
const btnLimpar = document.getElementById('btn-limpar');

btnSalvar.addEventListener('click', salvarAgenda);
btnExcluir.addEventListener('click', excluirAgenda);
btnLimpar.addEventListener('click', limparCampos);

async function carregarAgenda() {
    const lista = await window.senacAPI.buscarAgenda();
    tabela.innerHTML = '';

    lista.forEach(criarLinhaAgenda);

    if (!lista.length) {
        tabela.textContent = 'Sem dados';
    }

    lucide.createIcons();
}

function criarLinhaAgenda(agenda) {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${agenda.data}</td>
        <td>${agenda.hora}</td>
        <td>${agenda.disponivel ? 'Sim' : 'Não'}</td>
    `;

    const celulaAcoes = document.createElement('td');
    const botao = document.createElement('button');
    botao.innerHTML = '<i data-lucide="edit"></i>';
    botao.addEventListener('click', () => preencherCampos(agenda));
    celulaAcoes.appendChild(botao);

    linha.appendChild(celulaAcoes);
    tabela.appendChild(linha);
}

function preencherCampos(agenda) {
    inputId.value = agenda.id;
    inputData.value = agenda.data;
    inputHora.value = agenda.hora;
    selectDisponivel.value = agenda.disponivel;
}

function limparCampos() {
    inputId.value = '';
    inputData.value = '';
    inputHora.value = '';
    selectDisponivel.value = 'true';
}

async function salvarAgenda() {
    const data = inputData.value;
    const hora = inputHora.value;
    const disponivel = selectDisponivel.value;

    if (!data || !hora) {
        alert('Preencha data e hora!');
        return;
    }

    if (inputId.value) {
        await window.senacAPI.alterarAgenda(inputId.value, data, hora, disponivel);
    } else {
        await window.senacAPI.adicionarAgenda(data, hora);
    }

    limparCampos();
    carregarAgenda();
}

async function excluirAgenda() {
    const id = inputId.value;
    if (!id) {
        alert('Selecione um horário primeiro.');
        return;
    }

    if (confirm('Deseja excluir este horário?')) {
        await window.senacAPI.deletarAgenda(id);
        limparCampos();
        carregarAgenda();
    }
}

carregarAgenda();
