export class WindowServices {
    minimize() {
        window.ipcRenderer.send('window-minimize');
    }

    toggleMaximize() {
        window.ipcRenderer.send('window-toggle-maximize');
    }

    close() {
        window.ipcRenderer.send('window-close');
    }
}