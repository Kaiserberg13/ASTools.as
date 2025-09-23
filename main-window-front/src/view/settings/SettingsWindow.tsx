import TitleBar from '../window/components/TitleBar'
import GeneralSettingsPage from './pages/GeneralPage'
import './SettingsWindow.css'
import { Route, Routes } from 'react-router-dom'

function SettingsWindow() {

  return (
    <>
      <TitleBar searchEnabled={false} appTitle='Settings'/>
      <div className="view">
        <main>
        <Routes>
            <Route path='/' element={<GeneralSettingsPage/>}/>
        </Routes>
        </main>
      </div>
    </>
  )
}

export default SettingsWindow