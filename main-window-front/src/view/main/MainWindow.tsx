import TitleBar from '../window/components/TitleBar'
import Sidebar from '../main/components/Sidebar'
import './MainWindow.css'
import { Outlet } from 'react-router-dom'

function MainWindow() {

  return (
    <>
      <TitleBar />
      <div className="view">
        <Sidebar />
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

export default MainWindow