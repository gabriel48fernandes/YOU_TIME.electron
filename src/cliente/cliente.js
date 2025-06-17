const tabela = document.getElementById('tabelaClientes');
const inputId = document.getElementById('cliente-id');
const inputNome = document.getElementById('cliente-nome');
const inputTelefone = document.getElementById('cliente-telefone');
const inputEmail = document.getElementById('cliente-email');

const btnSalvar = document.getElementById('btn-salvar');
const btnExcluir = document.getElementById('btn-excluir');
const btnLimpar = document.getElementById('btn-limpar');

btnSalvar.addEventListener('click', salvarCliente);
btnExcluir.addEventListener('click', excluirCliente);
btnLimpar.addEventListener('click', limparCampos);

// Carregar clientes na tabela
async function carregarClientes() {
    const lista = await window.senacAPI.buscarClientes();
    tabela.innerHTML = '';

    if (lista.length === 0) {
        const linha = document.createElement('tr');
        const celula = document.createElement('td');
        celula.colSpan = 4;
        celula.textContent = 'Sem dados';
        linha.appendChild(celula);
        tabela.appendChild(linha);
        return;
    }

    lista.forEach(criarLinhaCliente);

    lucide.createIcons();
}

// Criar linha na tabela
function criarLinhaCliente(cliente) {
    const linha = document.createElement('tr');

    // Colunas de dados
    linha.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>
    `;

    // Coluna de ações
    const celulaAcoes = document.createElement('td');
    const botao = document.createElement('button');
    const icone = document.createElement('i');

    icone.setAttribute('data-lucide', 'edit'); // Ícone do Lucide (lápis)

    botao.appendChild(icone);
    botao.addEventListener('click', () => preencherCampos(cliente));

    celulaAcoes.appendChild(botao);
    linha.appendChild(celulaAcoes);

    tabela.appendChild(linha);
}


// Preencher campos no formulário
function preencherCampos(cliente) {
    inputId.value = cliente.id;
    inputNome.value = cliente.nome;
    inputTelefone.value = cliente.telefone;
    inputEmail.value = cliente.email;
}

// Limpar campos
function limparCampos() {
    inputId.value = '';
    inputNome.value = '';
    inputTelefone.value = '';
    inputEmail.value = '';
}

// Salvar ou alterar cliente
async function salvarCliente() {
    const nome = inputNome.value.trim();
    const telefone = inputTelefone.value.trim();
    const email = inputEmail.value.trim();

    if (!nome) {
        alert('Preencha o nome!');
        return;
    }

    if (inputId.value) {
        await window.senacAPI.alterarCliente(inputId.value, nome, telefone, email);
    } else {
        await window.senacAPI.adicionarCliente(nome, telefone, email);
    }

    limparCampos();
    carregarClientes();
}

// Excluir cliente
async function excluirCliente() {
    const id = inputId.value;
    if (!id) {
        alert('Selecione um cliente primeiro.');
        return;
    }

    if (confirm('Deseja excluir este cliente?')) {
        await window.senacAPI.deletarCliente(id);
        limparCampos();
        carregarClientes();
    }
}

// Ao carregar a página
carregarClientes();
