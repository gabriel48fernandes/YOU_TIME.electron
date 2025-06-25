const { contextBridge, ipcRenderer } = require('electron');

// ==== CLIENTES ====
function buscarClientes() {
  return ipcRenderer.invoke('buscar-clientes');
}
function adicionarCliente(nome, telefone, email) {
  return ipcRenderer.invoke('adicionar-cliente', nome, telefone, email);
}
function alterarCliente(id, nome, telefone, email) {
  return ipcRenderer.invoke('alterar-cliente', id, nome, telefone, email);
}
function deletarCliente(id) {
  return ipcRenderer.invoke('deletar-cliente', id);
}

// ==== SERVIÇOS ====
function buscarServicos() {
  return ipcRenderer.invoke('buscar-servicos');
}
function adicionarServico(nome, preco, duracao) {
  return ipcRenderer.invoke('adicionar-servico', nome, preco, duracao);
}
function alterarServico(id, nome, preco, duracao) {
  return ipcRenderer.invoke('alterar-servico', id, nome, preco, duracao);
}
function deletarServico(id) {
  return ipcRenderer.invoke('deletar-servico', id);
}

// ==== AGENDA DISPONÍVEL ====
function buscarAgenda() {
  return ipcRenderer.invoke('buscar-agenda');
}
function adicionarAgenda(data, hora) {
  return ipcRenderer.invoke('adicionar-agenda', data, hora);
}
function alterarAgenda(id, data, hora, disponivel) {
  return ipcRenderer.invoke('alterar-agenda', id, data, hora, disponivel);
}
function deletarAgenda(id) {
  return ipcRenderer.invoke('deletar-agenda', id);
}

// ==== AGENDAMENTOS ====
function buscarAgendamentos() {
  return ipcRenderer.invoke('buscar-agendamentos');
}
function adicionarAgendamento(idcliente, idservico, idagenda) {
  return ipcRenderer.invoke('adicionar-agendamento', idcliente, idservico, idagenda);
}
function alterarAgendamento(id, idcliente, idservico, idagenda) {
  return ipcRenderer.invoke('alterar-agendamento', id, idcliente, idservico, idagenda);
}
function deletarAgendamento(id) {
  return ipcRenderer.invoke('deletar-agendamento', id);
}

// ==== LOGIN ====
function validarLogin(usuario, senha) {
  return ipcRenderer.invoke('validar-login', usuario, senha);
}

// ==== API UNIFICADA ====
contextBridge.exposeInMainWorld('senacAPI', {
  // Clientes
  buscarClientes,
  adicionarCliente,
  alterarCliente,
  deletarCliente,

  // Serviços
  buscarServicos,
  adicionarServico,
  alterarServico,
  deletarServico,

  // Agenda
  buscarAgenda,
  adicionarAgenda,
  alterarAgenda,
  deletarAgenda,

  // Agendamentos
  buscarAgendamentos,
  adicionarAgendamento,
  alterarAgendamento,
  deletarAgendamento,

  // Login
  validarLogin
});

// ==== JANELAS ====
function abrirCliente() {
  ipcRenderer.send('abrir-cliente');
}
function abrirServico() {
  ipcRenderer.send('abrir-servico');
}
function abrirAgenda() {
  ipcRenderer.send('abrir-agenda');
}
function abrirAgendamento() {
  ipcRenderer.send('abrir-agendamento');
}
function abrirJanelaAdmin() {
  ipcRenderer.send('abrir-menu-admin');
}
function abrirJanelaUser() {
  ipcRenderer.send('abrir-menu-user');
}

contextBridge.exposeInMainWorld('janelaAPI', {
  abrirCliente,
  abrirServico,
  abrirAgenda,
  abrirAgendamento,
  abrirJanelaAdmin,
  abrirJanelaUser
});
