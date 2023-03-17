import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

export function App() {
  const [buttonText, setButText] = useState('')
  const [taskText, setTaskText] = useState('')
  const [barProgress, setBar] = useState(0)
  const [installed, setInstalled] = useState(false)


  useEffect(() => {
    window.electron.ipcRenderer.on("test-back", (args) => {
      console.log(args);      
    })

    window.electron.ipcRenderer.on("settings/installprogress", (args: any) => {
      const percent: number = args.percent
      const percentRounded: number = Math.round((percent + Number.EPSILON) * 100)
      console.log(percentRounded);
      setBar(percentRounded)
    })

    window.electron.ipcRenderer.on("settings/task", (args: any) => {
      setTaskText(args)
    })

    window.electron.ipcRenderer.on("settings/installprogress", (args: any) => {
      const percent: number = args.percent
      const percentRounded: number = Math.round((percent + Number.EPSILON) * 100)
      console.log(percentRounded);
      setBar(percentRounded)
    })

    window.electron.ipcRenderer.invoke("settings/checkinstallationFolder").then(result => {
      if(result){
        setButText('Launch')
        setInstalled(true)
      } else {
        setButText('Install')
        setInstalled(false)
      }
    })
  }, [])

  function launch() {
    if(installed){

    } else {
      console.log("?");
      
      setTaskText("Descargando...")
      window.electron.ipcRenderer.invoke("settings/install")
    }
  }

  function settings() {

  }

  function test() {
    window.electron.ipcRenderer.sendMessage("test", [])
  }

  return (
    <div className='container'>
      <div className='footer'>
        <ProgressBar completed={barProgress} />
        <p className='tarea'>{taskText}</p>
        <button onClick={launch} className='launchbutton'>{buttonText}</button>
        <button onClick={test} className='settingsbutton'>Settings</button>
      </div>
    </div>
  );
}
