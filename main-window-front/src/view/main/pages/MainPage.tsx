import type { FolderModel } from '../../../models/FolderModel';
import './Folder.css';
import { useFolderState } from '../../../controllers/FolderState';
import { contextMenuToolPopupController } from '../../../controllers/contextMenu';

interface FolderPageProps {
  folderModel: FolderModel;
}

const MainFolderPage: React.FC<FolderPageProps> = ({folderModel})  => {
    const { selectedTag, viewTools, filterdTools, setSelectedTag, setViewTools} = useFolderState(folderModel);
    const { menuPos, menuRef, menuVisible, handleContextMenu, handleOptionClick } = contextMenuToolPopupController();

    return (
        <div className='folder-page'>
            <div className="folder-name">
                <h4>{folderModel.Label}</h4>
                <div className='view-switch'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`switch-item ${!viewTools ? 'active' : ''}`} onClick={() => setViewTools(false)}>
                        <path d="M4 19.3333C4 18.9651 4.29848 18.6667 4.66667 18.6667H19.3333C19.7015 18.6667 20 18.9651 20 19.3333C20 19.7015 19.7015 20 19.3333 20H4.66667C4.29848 20 4 19.7015 4 19.3333Z"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.3333 4C18.8061 4 20 5.19391 20 6.66667V14.6667C20 16.1394 18.8061 17.3333 17.3333 17.3333H6.66667C5.19391 17.3333 4 16.1394 4 14.6667V6.66667C4 5.19391 5.19391 4 6.66667 4H17.3333ZM6.66667 5.33333C5.93029 5.33333 5.33333 5.93029 5.33333 6.66667V14.6667C5.33333 15.403 5.93029 16 6.66667 16H17.3333C18.0697 16 18.6667 15.403 18.6667 14.6667V6.66667C18.6667 5.93029 18.0697 5.33333 17.3333 5.33333H6.66667Z"/>
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`switch-item ${viewTools ? 'active' : ''}`} onClick={() => setViewTools(true)}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.78571 13.2857C9.85083 13.2857 10.7143 14.1492 10.7143 15.2143V19.0714C10.7143 20.1365 9.85083 21 8.78571 21H4.92857C3.86345 21 3 20.1365 3 19.0714V15.2143C3 14.1492 3.86345 13.2857 4.92857 13.2857H8.78571ZM4.92857 14.5714C4.57353 14.5714 4.28571 14.8592 4.28571 15.2143V19.0714C4.28571 19.4265 4.57353 19.7143 4.92857 19.7143H8.78571C9.14075 19.7143 9.42857 19.4265 9.42857 19.0714V15.2143C9.42857 14.8592 9.14075 14.5714 8.78571 14.5714H4.92857Z"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.0714 13.2857C20.1365 13.2857 21 14.1492 21 15.2143V19.0714C21 20.1365 20.1365 21 19.0714 21H15.2143C14.1492 21 13.2857 20.1365 13.2857 19.0714V15.2143C13.2857 14.1492 14.1492 13.2857 15.2143 13.2857H19.0714ZM15.2143 14.5714C14.8592 14.5714 14.5714 14.8592 14.5714 15.2143V19.0714C14.5714 19.4265 14.8592 19.7143 15.2143 19.7143H19.0714C19.4265 19.7143 19.7143 19.4265 19.7143 19.0714V15.2143C19.7143 14.8592 19.4265 14.5714 19.0714 14.5714H15.2143Z"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.0714 3C20.1365 3 21 3.86345 21 4.92857V8.78571C21 9.85083 20.1365 10.7143 19.0714 10.7143H15.2143C14.1492 10.7143 13.2857 9.85083 13.2857 8.78571V4.92857C13.2857 3.86345 14.1492 3 15.2143 3H19.0714ZM15.2143 4.28571C14.8592 4.28571 14.5714 4.57353 14.5714 4.92857V8.78571C14.5714 9.14075 14.8592 9.42857 15.2143 9.42857H19.0714C19.4265 9.42857 19.7143 9.14075 19.7143 8.78571V4.92857C19.7143 4.57353 19.4265 4.28571 19.0714 4.28571H15.2143Z"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.78571 3C9.85083 3 10.7143 3.86345 10.7143 4.92857V8.78571C10.7143 9.85083 9.85083 10.7143 8.78571 10.7143H4.92857C3.86345 10.7143 3 9.85083 3 8.78571V4.92857C3 3.86345 3.86345 3 4.92857 3H8.78571ZM4.92857 4.28571C4.57353 4.28571 4.28571 4.57353 4.28571 4.92857V8.78571C4.28571 9.14075 4.57353 9.42857 4.92857 9.42857H8.78571C9.14075 9.42857 9.42857 9.14075 9.42857 8.78571V4.92857C9.42857 4.57353 9.14075 4.28571 8.78571 4.28571H4.92857Z"/>
                    </svg>
                </div>
                
            </div>
            <div className="tags">
                <p className={`tag ${selectedTag === 0 ? 'active' : ''}`} onClick={() => setSelectedTag(0)}>all</p>
                {
                    folderModel.Filters.map((tag, index) => (
                        <p className={`tag ${index === selectedTag-1 ? 'active' : ''}`} key={index} onClick={() => setSelectedTag(index + 1)}>{tag}</p>
                    ))
                }
            </div>
            <div className="tools">
                {viewTools ? 
                    filterdTools.map((tool, index) => (
                        <div className='tool-card-mini' key={index} onDoubleClick={() => console.log(`DoubleClick ${tool.Name}`)} onContextMenu={(e) => handleContextMenu(e, tool)}>
                            <img src={tool.IconUrl} alt={tool.Name} loading="lazy"/>
                            <p>{tool.Name}</p>
                        </div>
                    )) :
                    filterdTools.map((tool, index) => (
                        <div className='tool-card-big' key={index} onDoubleClick={() => console.log(`DoubleClick ${tool.Name}`)} onContextMenu={(e) => handleContextMenu(e, tool)}>
                            <div className="tool-info">
                                <img src={tool.IconUrl} alt={tool.Name} loading="lazy"/>
                                <div className="text">
                                    <h6>{tool.Name}</h6>
                                    <p>{tool.Autor} | {tool.Tags.join(',')}</p>
                                </div>
                            </div>
                            <p className="tool-description">
                                {tool.Description}
                            </p>
                            <img className='cover' src={tool.CoverUrl} alt={tool.Name} />
                        </div>
                    ))
                }
                {menuVisible && (
                    <div
                        className="custom-context-menu"
                        ref={menuRef}
                        style={{
                            position: 'absolute',
                            top: menuPos.y,
                            left: menuPos.x,
                        }}
                    >
                        <button onClick={() => handleOptionClick('Run')}>Run</button>
                        <button onClick={() => handleOptionClick('Details')}>Details</button>
                        <hr />
                        <button onClick={() => handleOptionClick('RemoveFromFolder')}>Remove from folder</button>
                        <button onClick={() => handleOptionClick('MoveToFolder')}>Move to folder</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainFolderPage;