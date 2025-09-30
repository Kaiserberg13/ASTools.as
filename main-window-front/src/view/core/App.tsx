import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import MainWindow from '../main/MainWindow';
import FolderPage from '../main/pages/Folder';
import type { FolderModel } from '../../models/FolderModel';

import SettingsWindow from '../settings/SettingsWindow';
import GeneralSettingsPage from '../settings/pages/GeneralPage';
import ThemeSettingsPage from '../settings/pages/ThemePage';
import { ThemeProvider } from './ThemeContext';
import { DevWindow } from '../devWin/ForDevWindow.tsx';
import MainFolderPage from '../main/pages/MainPage.tsx';
import { DevConstains } from '../devWin/pages/DevConstains.tsx';
import { DevStore } from '../devWin/pages/DevStore.tsx';
import { DevAllTools } from '../devWin/pages/DevAllTools.tsx';

const homePage:FolderModel = {
  Label: "Main",
  Filters: ["Video", "File"],
  CurrentFilter: 0,
  Tools: [
    {
      Id: "Video to spirte sheet",
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
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path='/*' element={<MainWindow/>}>
            <Route index element={<MainFolderPage folderModel={homePage} />} />
            <Route path='folder/:name' element={<FolderPage />} />
          </Route>
          <Route path='/settings/*' element={<SettingsWindow/>}>
            <Route index element={<GeneralSettingsPage/>} />
            <Route path='theme' element={<ThemeSettingsPage />} />
          </Route>
          <Route path='/dev/*' element={<DevWindow />} >
            <Route index element={<DevConstains />} />
            <Route path='store' element={<DevStore />} />
            <Route path='all-tools' element={<DevAllTools />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App

