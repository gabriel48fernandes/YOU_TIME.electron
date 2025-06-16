const { ipcMain } = require('electron');
const { modalAbrirAgendamento, modalAbrirCliente, modalAbrirServico, modalAbrirAgenda } = require('./janelaModal');

const { buscarClientes, adicionarCliente, alterarCliente, deletarCliente } = require('./cliente/clienteDB');
const { buscarServicos, adicionarServico, alterarServico, deletarServico } = require('./servico/servicoDB');
const { buscarAgenda, adicionarAgenda, alterarAgenda, deletarAgenda } = require('./agenda/agendaDB');
const { buscarAgendamentos, adicionarAgendamento, alterarAgendamento, deletarAgendamento } = require('./agendamento/agendamentoDB');

// === Handlers ===

function registrarClienteHandler() {
    ipcMain.handle('buscar-clientes', buscarClientes);
    ipcMain.handle('adicionar-cliente', adicionarCliente);
    ipcMain.handle('alterar-cliente', alterarCliente);
    ipcMain.handle('deletar-cliente', deletarCliente);
}

function registrarServicoHandler() {
    ipcMain.handle('buscar-servicos', buscarServicos);
    ipcMain.handle('adicionar-servico', adicionarServico);
    ipcMain.handle('alterar-servico', alterarServico);
    ipcMain.handle('deletar-servico', deletarServico);
}

function registrarAgendaHandler() {
    ipcMain.handle('buscar-agenda', buscarAgenda);
    ipcMain.handle('adicionar-agenda', adicionarAgenda);
    ipcMain.handle('alterar-agenda', alterarAgenda);
    ipcMain.handle('deletar-agenda', deletarAgenda);
}

function registrarAgendamentoHandler() {
    ipcMain.handle('buscar-agendamentos', buscarAgendamentos);
    ipcMain.handle('adicionar-agendamento', adicionarAgendamento);
    ipcMain.handle('alterar-agendamento', alterarAgendamento);
    ipcMain.handle('deletar-agendamento', deletarAgendamento);
}

// === Janelas ===

function registrarJanelas() {
    ipcMain.on('abrir-cliente', modalAbrirCliente);
    ipcMain.on('abrir-servico', modalAbrirServico);
    ipcMain.on('abrir-agenda', modalAbrirAgenda);
    ipcMain.on('abrir-agendamento', modalAbrirAgendamento);
}

// === Registrar todos ===

function registrarListeners() {
    registrarClienteHandler();
    registrarServicoHandler();
    registrarAgendamentoHandler();
    registrarAgendaHandler();
}
module.exports = {
    registrarListeners
};
