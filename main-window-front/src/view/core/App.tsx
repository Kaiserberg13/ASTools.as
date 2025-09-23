import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import MainWindow from '../main/MainWindow'
import SettingsWindow from '../settings/SettingsWindow'

function App() {

  return (
    <>
      <HashRouter>
          <Routes>
            <Route path='/' element={<MainWindow/>}/>
            <Route path='/settings' element={<SettingsWindow/>}/>
          </Routes>
      </HashRouter>
    </>
  )
}

export default App

