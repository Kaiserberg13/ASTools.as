import TitleBar from '../window/components/TitleBar'
import SidebarSettings from './components/SidebarSettings'
import './SettingsWindow.css'
import { Outlet } from 'react-router-dom'

function SettingsWindow() {

  return (
    <>
      <TitleBar searchEnabled={false} appTitle='Settings'/>
      <div className="view">
        <SidebarSettings />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default SettingsWindow