const { app, BrowserWindow, shell } = require('electron/main')

const myAddon = require('./myAddon/build/Release/myAddon.node');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true, // Hide the menu bar (can be toggled with Alt key)
    // Alternatively, use: frame: false, // Removes the entire title bar and menu
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  
  // Handle external links - prevent them from opening in new Electron windows
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  })
}

app.whenReady().then(() => {
  createWindow()
  
  myAddon.showNotification("hello", "world")

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})