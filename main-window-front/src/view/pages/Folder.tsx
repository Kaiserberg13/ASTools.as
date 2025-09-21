import type { FolderModel } from '../../models/FolderModel';
import './Folder.css';

interface FolderPageProps {
  folderModel: FolderModel;
}

const FolderPage: React.FC<FolderPageProps> = ({folderModel})  => {


    return (
        <div className='folder-page'>
            <h1>{folderModel.Label}</h1>
        </div>
    )
}

export default FolderPage;