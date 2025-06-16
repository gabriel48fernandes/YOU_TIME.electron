const path = require('path');
const { BrowserWindow } = require('electron');
const { getJanelaPrincipal } = require('./janelaPrincipal');

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
  const main = getJanelaPrincipal();
  if (main) {
    criarJanelaModal(main, './src/cliente/cliente.html');
  }
}

function modalAbrirServico() {
  const main = getJanelaPrincipal();
  if (main) {
    criarJanelaModal(main, './src/servico/servico.html');
  }
}

function modalAbrirAgenda() {
  const main = getJanelaPrincipal();
  if (main) {
    criarJanelaModal(main, './src/agenda/agenda.html');
  }
}

function modalAbrirAgendamento() {
  const main = getJanelaPrincipal();
  if (main) {
    criarJanelaModal(main, './src/agendamento/agendamento.html');
  }
}

module.exports = {
  criarJanelaModal,
  modalAbrirCliente,
  modalAbrirServico,
  modalAbrirAgenda,
  modalAbrirAgendamento
};
