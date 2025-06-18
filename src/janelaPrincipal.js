const path = require('path')
const { BrowserWindow } = require('electron')

let janelaPrincipal
let janelaLogin

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

function createloginwindow() {
    janelaLogin = new BrowserWindow({
                                     width: 600,
                                     height: 500,
                                     webPreferences: {
                                     preload: path.join(__dirname, 'preload.js')
                                     }
    
    
                                    })
janelaLogin.loadFile('login/login.html')            
                                }
   

    function getJanelaLogin() {
        return janelaLogin
    }

module.exports = { 
    getJanelaPrincipal,
    createloginwindow,
    getJanelaLogin,
    createMainWindow
}