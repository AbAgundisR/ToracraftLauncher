import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

export function App() {
  function launch() {

  }

  function settings() {

  }

  function test() {
    window.electron.ipcRenderer.invoke("settings/checkinstallationFolder", [])
  }

  return (
    <div className='container'>
      <div className='footer'>
        <button className='launchbutton'>Launch</button>
        <button onClick={test} className='settingsbutton'>Settings</button>
      </div>
    </div>
  );
}
