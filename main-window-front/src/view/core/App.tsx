import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import MainWindow from '../main/MainWindow';
import FolderPage from '../main/pages/Folder';

import SettingsWindow from '../settings/SettingsWindow';
import GeneralSettingsPage from '../settings/pages/GeneralPage';
import ThemeSettingsPage from '../settings/pages/ThemePage';
import { ThemeProvider } from './ThemeContext';
import { DevWindow } from '../devWin/ForDevWindow.tsx';
import MainFolderPage from '../main/pages/MainPage.tsx';
import { DevConstains } from '../devWin/pages/DevConstains.tsx';
import { DevStore } from '../devWin/pages/DevStore.tsx';
import { DevAllTools } from '../devWin/pages/DevAllTools.tsx';
import AddFolderWindow from '../addFolder/addFolderWindow.tsx';
import { ToolPageView } from '../main/pages/ToolDetails.tsx';

function App() {

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path='/*' element={<MainWindow />}>
            <Route index element={<MainFolderPage/>} />
            <Route path='folder/:name' element={<FolderPage />} />
            <Route path='tool/:folder/:author/:name' element={<ToolPageView />} />
          </Route>
          <Route path='/settings/*' element={<SettingsWindow/>}>
            <Route index element={<GeneralSettingsPage/>} />
            <Route path='theme' element={<ThemeSettingsPage />} />
          </Route>
          <Route path='/add-folder' element={<AddFolderWindow />} />
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

