import { useState } from 'react';
import TitleBar from '../window/components/TitleBar';
import './addFolderWindow.css';
import { FolderService } from '../../services/FoldersServices';

function AddFolderWindow() {
  const [folderName, setFolderName] = useState<string>();
  const _service = new FolderService()

  const createFolder = () => {
    if(!folderName) return;
    _service.createFolder({Label: folderName})
  }

  return (
    <>
      <TitleBar searchEnabled={false} appTitle='Add folder'/>
      <div className="view">
        <main>
          <div className="shadow-img">
            <div className="fixed-content">
              <div className="add-folder">
                <input type='text' onChange={(e) => setFolderName(e.target.value)}/>
                <button onClick={createFolder}>Create</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AddFolderWindow;