import { useState } from 'react';
import TitleBar from '../window/components/TitleBar';
import './addFolderWindow.css';
import { FolderService } from '../../services/FoldersServices';
import { ICONS } from '../../data/icons';

function AddFolderWindow() {
  const [folderName, setFolderName] = useState<string>();
  const [folderIcon, setFolderIcon] = useState<string>("Home");
  const _service = new FolderService()

  const createFolder = () => {
    if(!folderName) return;
    _service.createFolder({Label: folderName, Icon: folderIcon})
  }

  return (
    <>
      <TitleBar searchEnabled={false} appTitle='Add folder'/>
      <div className="view">
        <main>
          <div className="shadow-img">
            <div className="fixed-content">
              <div className="add-folder">
                <div className="icon-container">
                  <div className="icons-list">
                    {Object.entries(ICONS).map(([name, IconComponent], index) => (
                      <div key={index} className={`icon-item ${folderIcon === name? `active` : ``}`} onClick={() => setFolderIcon(name)}>
                        {IconComponent}
                        <p>{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="input-container">
                  <label>Folder name:</label>
                  <input type='text' onChange={(e) => setFolderName(e.target.value)}/>
                </div>
                <div className="control-container">
                  <button onClick={createFolder}>Create</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AddFolderWindow;