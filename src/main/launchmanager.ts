import { app, ipcMain } from "electron"
import { Client, Authenticator } from "minecraft-launcher-core"
import mccore = require("minecraft-launcher-core")
import path = require("path")

const opts = {
    // authorization
}

ipcMain.on("launcher/launch", (event, args) => {
    try {
        console.log("iniciando...");
        
        launch()
    } catch (error) {
        console.log(error);        
    }
})

function launch(){
    try {
        const launcher = new Client()

        launcher.launch({
            authorization: Authenticator.getAuth("DamianNylon"),
            root: path.join(app.getAppPath(), "instance", ".minecraft"),
            version: {
                number: "1.18.2",
                type: "release"
            },
            memory: {
                max: "4G",
                min: "2G"
            },
            forge: path.join(app.getAppPath(), "forge.jar"),
            overrides: {
                detached: false
            }
        })

        launcher.on('debug', (e) => console.log(e));
        launcher.on('data', (e) => console.log(e));
    } catch (error) {
        console.log(error);
    }
}