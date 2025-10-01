import TitleBar from '../window/components/TitleBar'
import Sidebar from '../main/components/Sidebar'
import './MainWindow.css'
import { Outlet } from 'react-router-dom'
import { ToolsService } from '../../services/ToolsServices';
import type { ToolModel } from '../../models/ToolViewModel';
import { useEffect, useState } from 'react';

function MainWindow() {
  const _service = new ToolsService();
  const [tools, setTools] = useState<ToolModel[] | null | string>(null);

  useEffect(() => {
    const fetchTools = async () => {
        try {
            const loadedTools = await _service.getTools();
            setTools(loadedTools);
        } catch (err) {
            setTools('Error to load tools: ' + (err as Error).message);
        }
    };

    fetchTools();
  }, []);

  return (
    <>
      <TitleBar />
      <div className="view">
        <Sidebar />
        <main>
          <div className="shadow-img">
            <div className="fixed-content">
              <Outlet context={{tools}}/>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default MainWindow