import { use, useEffect, useState } from "react";
import type { FolderModel } from "../models/FolderModel";
import type { ToolModel } from "../models/ToolViewModel";
import { ToolsService } from "../services/ToolsServices";

export function getFolderBySlug(slug: string): FolderModel {
    const folderModel: FolderModel = {
        Label: slug,
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
    return folderModel;
}

export function useFolderState(model: FolderModel){
    const [filters, setFilters] = useState<string[]>(model.Filters);
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
    }, [selectedTag, model.Tools, filters]);

    useEffect(() => {
        setFilters(model.Filters);
    }, [model.Filters]);

    return {
        filters,
        selectedTag,
        viewTools,
        filterdTools,
        setSelectedTag,
        setViewTools
    };
}

export function useFolderMainState() {
    const _service = new ToolsService()
    const [tools, setTools] = useState<ToolModel[]>([]);
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [filters, setFilters] = useState<string[]>([]);
    const [filterdTools, setFiltredTools] = useState<ToolModel[]>(tools);
    const [viewTools, setViewTools] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(selectedTag === 0) {
            setFiltredTools(tools);
        } else {
            const filtered = tools.filter(tool =>
                tool.Tags.includes(filters[selectedTag-1])
            );
            setFiltredTools(filtered);
        }
    }, [selectedTag, tools, filters]);

    useEffect(() => {
        const all_tags = tools.flatMap(tool => tool.Tags);
        const uniqueTags = [...new Set(all_tags)];
        setFilters(uniqueTags);
    }, [tools]);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const loadedTools = await _service.getTools();
                setTools(loadedTools);
            } catch (err) {
                setError('Ошибка загрузки инструментов: ' + (err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    return {
        selectedTag,
        viewTools,
        filterdTools,
        filters,
        setSelectedTag,
        setViewTools,
        loading,
        error
    };
}