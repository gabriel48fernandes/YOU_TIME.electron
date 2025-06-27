const path = require('path');
const { BrowserWindow } = require('electron');
const { getJanelaPrincipalAdmin, getJanelaPrincipalUser } = require('./janelaPrincipal');


function criarJanelaModal(telaPai, arquivohtml) {
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    modal: true,
    parent: telaPai,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  janela.loadFile(arquivohtml);
  return janela;
}


function modalAbrirCliente() {
  const main = getJanelaPrincipalAdmin();
  if (main) {
    criarJanelaModal(main, './cliente/cliente.html');
  }
}

function modalAbrirServico() {
  const main = getJanelaPrincipalAdmin();
  if (main) {
    criarJanelaModal(main, './servico/servico.html');
  }
}

function modalAbrirAgenda() {
  const main = getJanelaPrincipalAdmin();
  if (main) {
    criarJanelaModal(main, './agenda/agenda.html');
  }
}

function modalAbrirAgendamento() {
  // Verifica qual janela principal está aberta e cria a janela modal nela
  let main = getJanelaPrincipalAdmin();
  let mainUser = getJanelaPrincipalUser();
  main = main||mainUser;
  if (main) {
    criarJanelaModal(main, './agendamento/agendamento.html');
  }
}

module.exports = {
  criarJanelaModal,
  modalAbrirCliente,
  modalAbrirServico,
  modalAbrirAgenda,
  modalAbrirAgendamento,

};
