const path = require('path')
const { BrowserWindow } = require('electron')

let janelaPrincipal

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    janelaPrincipal.loadFile('index.html')

    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null
    })

    return janelaPrincipal
}

function getJanelaPrincipal() {
    return janelaPrincipal
}

module.exports = {
    createMainWindow,
    getJanelaPrincipal
}