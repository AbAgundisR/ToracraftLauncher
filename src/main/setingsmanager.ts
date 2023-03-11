import { app, BrowserWindow, shell, ipcMain } from 'electron';
import fs = require("fs")
import path = require('path');
import dl = require("electron-dl")

ipcMain.handle("settings/checkinstallationFolder", async (event, args) => {
    try {
        if (fs.existsSync(path.join(app.getAppPath(), 'instance'))) {
            console.log("path existe");
            if (fs.existsSync(path.join(app.getAppPath(), 'instance', 'toracraft'))){
                return true
            } else {
                return false
            }
        } else {
            console.log("path no existe");
            fs.mkdirSync("instance");
            return false
        }
    } catch (error) {
        console.log(error);
    }
})

ipcMain.handle("settings/install", async (event, args) => {
    try {
        const win = BrowserWindow.getFocusedWindow()

        if(win){
            dl.download(win, "http://ipv4.download.thinkbroadband.com/200MB.zip", {
                directory: path.join(app.getAppPath(), 'instance'),
                filename: "file de prueba.zip",
                onProgress: progress
            })
        }
    } catch (error) {
        
    }
})

function progress(obj: any){
    console.log(obj);
}