import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import FolderPage from '../pages/Folder'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import type { FolderModel } from '../../models/FolderModel'

const homePage:FolderModel = {
  Label: "Home",
  Filters: ["Video", "File"],
  CurrentFilter: 0,
  Tools: []
};

function App() {

  return (
    <>
      <TitleBar />
      <div className="view">
        <HashRouter>
          <Sidebar />
          <main>
            <Routes>
              <Route path='/' element={<FolderPage folderModel={homePage}/>}/>
            </Routes>
          </main>
        </HashRouter>
      </div>
    </>
  )
}

export default App

