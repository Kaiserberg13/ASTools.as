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
          <div className="shadow-img">
            <div className="fixed-content">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default SettingsWindow