const path = require('path');
const { BrowserWindow } = require('electron');

let janelaLogin;
let janelaAdmin;
let janelaUser

// Janela para Administrador
function createMainWindowAdmin() {
    janelaAdmin = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaAdmin.loadFile('index.html');
    return janelaAdmin;
}

// Janela para Usuário comum
function createMainWindowUser() {
     janelaUser = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaUser.loadFile('indexuser.html');
    return janelaUser;
}

// Janela de Login
function createloginwindow() {
    janelaLogin = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaLogin.loadFile('login/login.html');
}

// Getters (caso precise futuramente)
function getJanelaLogin() {
    return janelaLogin;
}
function getJanelaPrincipalAdmin() {
    return janelaAdmin;
}
function getJanelaPrincipalUser() {
    return janelaUser;
}

module.exports = {
    createloginwindow,
    getJanelaLogin,
    createMainWindowAdmin,
    createMainWindowUser,
    getJanelaPrincipalAdmin,
    getJanelaPrincipalUser
};
