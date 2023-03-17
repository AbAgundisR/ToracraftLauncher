import { app, BrowserWindow, shell, ipcMain } from 'electron';
import fs = require("fs")
import path = require('path');
import dl = require("electron-dl")
import yauzl = require("yauzl")

ipcMain.on("test", () => {
    descomprimir()
})

ipcMain.handle("settings/checkinstallationFolder", async (event, args) => {
    try {
        if (fs.existsSync(path.join(app.getAppPath(), 'instance'))) {
            if (fs.existsSync(path.join(app.getAppPath(), 'instance', '.toracraft'))){
                return true
            } else {
                return false
            }
        } else {
            fs.mkdirSync("instance");
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
})

ipcMain.handle("settings/install", async (event, args) => {
    try {
        const win = BrowserWindow.getFocusedWindow()

        if(win){
            dl.download(win, "https://github.com/AbAgundisR/ToracraftLauncher/releases/download/v0.1/Toracraft.zip", {
                directory: path.join(app.getAppPath(), 'instance'),
                filename: "Toracraft.zip",
                onProgress: progress,
                onCompleted: descomprimir
            })
        }
    } catch (error) {
        
    }
})

function descomprimir(){
    try {
        const win = BrowserWindow.getFocusedWindow()
        win?.webContents.send("settings/task", "Descomprimiendo...")

        if(fs.existsSync(path.join(app.getAppPath(), 'instance', "Toracraft.zip"))){
            console.log("existe");
        }

        yauzl.open(path.join(app.getAppPath(), 'instance', "instance.zip"), { lazyEntries: true }, function(err, zipfile) {
            if (err) throw err

            zipfile.readEntry()
            zipfile.on('entry', entry => {
                // const filename: string = (entry.fileName as string)
                console.log((entry.fileName as string));
                
                // Check if the entry is a directory
                if (/\/$/.test(entry.fileName)) {
                    // If the entry is a directory, create it
                    fs.mkdirSync(entry.fileName)
                    zipfile.readEntry()
                } else {
                    // If the entry is a file, extract it
                    zipfile.openReadStream(entry, (err, readStream) => {
                        if (err) throw err

                        readStream.on('end', () => {
                            zipfile.readEntry()
                        })

                        // Write the file to disk
                        readStream.pipe(fs.createWriteStream(entry.fileName))
                    })
                }
            })
        });
    } catch (error) {
        console.log(error);        
    }
}

function progress(obj: any){
    const win = BrowserWindow.getFocusedWindow()

    console.log(obj);
    win?.webContents.send("settings/installprogress", obj)
    // ipcMain.emit('progreso')
}