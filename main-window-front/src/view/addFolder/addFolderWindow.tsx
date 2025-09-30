import TitleBar from '../window/components/TitleBar';
import './addFolderWindow.css';

function AddFolderWindow() {

  return (
    <>
      <TitleBar searchEnabled={false} appTitle='Add folder'/>
      <div className="view">
        <main>
          <div className="shadow-img">
            <div className="fixed-content">
              <h1>Add folder</h1>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AddFolderWindow;