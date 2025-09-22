import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import FolderPage from '../pages/Folder'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import type { FolderModel } from '../../models/FolderModel'

const homePage:FolderModel = {
  Label: "Main",
  Filters: ["Video", "File"],
  CurrentFilter: 0,
  Tools: [
    {
      Name: "Video to spirte sheet",
      Tags: ["Video"],
      Autor: "Default",
      Description: "This application converts video or GIF files into a sequence of image frames based on a chosen FPS, optionally resizes them, and combines them into a spritesheet or saves them individually. It supports scaling by percentage or fixed size and customizable layout.",
      CoverUrl: "save-file://C:/Users/User/Downloads/astimg/Image.png",
      IconUrl: "save-file://C:/Users/User/Downloads/astimg/Tile Icon.png"
    }
  ]
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

