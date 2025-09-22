import { useEffect, useState } from "react";
import type { FolderModel } from "../models/FolderModel";
import type { ToolModel } from "../models/ToolViewModel";

export function useFolderState(model: FolderModel){
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [viewTools, setViewTools] = useState<boolean>(true);
    const [filterdTools, setFiltredTools] = useState<ToolModel[]>(model.Tools);
    
    useEffect(() => {
        if(selectedTag === 0) {
            setFiltredTools(model.Tools);
        } else {
            const filtered = model.Tools.filter(tool =>
                tool.Tags.includes(model.Filters[selectedTag-1])
            );
            setFiltredTools(filtered);
        }
    }, [selectedTag, model.Tools, model.Filters]);

    return {
        selectedTag,
        viewTools,
        filterdTools,
        setSelectedTag,
        setViewTools
    };
}