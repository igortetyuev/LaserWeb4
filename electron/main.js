const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Embedded lw.comm-server (runs in the Electron main process)
const config = require('../vendor/lw.comm-server/config');
config.IP = '127.0.0.1';
config.uipath = path.join(__dirname, '..', 'dist');
const commServer = require('../vendor/lw.comm-server/server.js');
commServer.setElectronApp(app);
commServer.LWCommServer(config);

ipcMain.on('toggle-devtools', (event) => {
    const wc = event.sender;
    if (wc.isDevToolsOpened()) {
        wc.closeDevTools();
    } else {
        wc.openDevTools();
    }
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
