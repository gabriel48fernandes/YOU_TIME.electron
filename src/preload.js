const { contextBridge, ipcRenderer } = require('electron');

// ==== CLIENTES ====
contextBridge.exposeInMainWorld('senacAPI', {
  buscarClientes: () => ipcRenderer.invoke('buscar-clientes'),
  adicionarCliente: (nome, telefone, email) => ipcRenderer.invoke('adicionar-cliente', nome, telefone, email),
  alterarCliente: (id, nome, telefone, email) => ipcRenderer.invoke('alterar-cliente', id, nome, telefone, email),
  deletarCliente: (id) => ipcRenderer.invoke('deletar-cliente', id),

// ==== SERVIÇOS ====
  buscarServicos: () => ipcRenderer.invoke('buscar-servicos'),
  adicionarServico: (nome, preco, duracao) => ipcRenderer.invoke('adicionar-servico', nome, preco, duracao),
  alterarServico: (id, nome, preco, duracao) => ipcRenderer.invoke('alterar-servico', id, nome, preco, duracao),
  deletarServico: (id) => ipcRenderer.invoke('deletar-servico', id),

// ==== AGENDA DISPONÍVEL ====
  buscarAgenda: () => ipcRenderer.invoke('buscar-agenda'),
  adicionarAgenda: (data, hora) => ipcRenderer.invoke('adicionar-agenda', data, hora),
  alterarAgenda: (id, data, hora, disponivel) => ipcRenderer.invoke('alterar-agenda', id, data, hora, disponivel),
  deletarAgenda: (id) => ipcRenderer.invoke('deletar-agenda', id),

// ==== AGENDAMENTOS ====
  buscarAgendamentos: () => ipcRenderer.invoke('buscar-agendamentos'),
  adicionarAgendamento: (idcliente, idservico, idagenda) => ipcRenderer.invoke('adicionar-agendamento', idcliente, idservico, idagenda),
  alterarAgendamento: (id, idcliente, idservico, idagenda) => ipcRenderer.invoke('alterar-agendamento', id, idcliente, idservico, idagenda),
  deletarAgendamento: (id) => ipcRenderer.invoke('deletar-agendamento', id),
});

// ==== JANELAS ====
contextBridge.exposeInMainWorld('janelaAPI', {
  abrirCliente: () => ipcRenderer.send('abrir-cliente'),
  abrirServico: () => ipcRenderer.send('abrir-servico'),
  abrirAgenda: () => ipcRenderer.send('abrir-agenda'),
  abrirAgendamento: () => ipcRenderer.send('abrir-agendamento'),
});
