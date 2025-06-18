const { app, BrowserWindow } = require('electron')
const path = require('path')
const { createloginwindow } = require('./janelaPrincipal')

const {registrarListeners}= require('./appListeners')
app.whenReady().then(function () {

    createloginwindow();
    registrarListeners();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createloginwindow();
        }
    });

}
);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
