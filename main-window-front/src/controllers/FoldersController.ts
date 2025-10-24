import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FolderService } from "../services/FoldersServices";
import type { FolderModel } from "../models/FolderModel";
import { useNavigate } from "react-router-dom";

export function FoldersContext() {
    const _service = useMemo(() => new FolderService(), []);
    const [folders, setFolders] = useState<FolderModel[]>([]);
    const foldersRef = useRef<FolderModel[]>([]);
    const navigate = useNavigate();

    const getFolder = useCallback((label: string) => {
        return folders.find(folder => folder.Label === label) ?? null;
    }, [folders]);

    const deleteFolder = (label: string) => {
        _service.deleteFolder(label);
    }

    const createFolder = (folder: FolderModel) => {
        _service.createFolder(folder);
    }

    const getAllFolders = (): FolderModel[] => {
        return folders
    }

    const moveToolToFolder = (toolId: string, folderLabel: string) => {
        _service.moveToolToFolder(toolId, folderLabel);
    }

    const removeToolFromFolder = (toolId: string, folderLabel: string) => {
        _service.removeToolFormFolder(toolId, folderLabel);
    }

    useEffect(() => {
        foldersRef.current = folders;
    }, [folders]);

    useEffect(() => {
        _service.getAllFolders()
        .then((f) => {
            if (f) setFolders(f);
        })
        .catch(console.error);

        const prev = foldersRef.current;

        const handleUpdate = (_event: any, newFolders: FolderModel[]) => {
            if(prev.length > newFolders.length) {
                navigate("/");
            } else {
                const newFolder = newFolders.find(nf => !prev.some(f => f.Label === nf.Label));
                if (newFolder) {
                    navigate(`/folder/${encodeURIComponent(newFolder.Label)}`);
                }
            }
        }

        _service.onFolderUpdate(handleUpdate);
        return () => {
            _service.offFolderUpdate(handleUpdate);
        }
        
    }, [_service, navigate])

    return {
        folders,
        getFolder,
        deleteFolder,
        createFolder,
        getAllFolders,
        moveToolToFolder,
        removeToolFromFolder
    }
}