import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import MainWindow from '../main/MainWindow'
import SettingsWindow from '../settings/SettingsWindow'
import FolderPage from '../main/pages/Folder'
import type { FolderModel } from '../../models/FolderModel'
import GeneralSettingsPage from '../settings/pages/GeneralPage'
import ThemeSettingsPage from '../settings/pages/ThemePage'

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
      <HashRouter>
          <Routes>
            <Route path='/*' element={<MainWindow/>}>
              <Route index element={<FolderPage folderModel={homePage} />} />
            </Route>
            <Route path='/settings/*' element={<SettingsWindow/>}>
              <Route index element={<GeneralSettingsPage/>} />
              <Route path='theme' element={<ThemeSettingsPage />} />
            </Route>
          </Routes>
      </HashRouter>
    </>
  )
}

export default App

