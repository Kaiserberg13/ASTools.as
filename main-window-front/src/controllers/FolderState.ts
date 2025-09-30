import { useEffect, useState } from "react";
import type { FolderModel } from "../models/FolderModel";
import type { ToolModel } from "../models/ToolViewModel";
import { ToolsService } from "../services/ToolsServices";

export function useFolderState(model: FolderModel | null){
    const [filters, setFilters] = useState<string[]>(() => model?.Filters ?? []);
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [viewTools, setViewTools] = useState<boolean>(true);
    const [filterdTools, setFiltredTools] = useState<ToolModel[]>(() => model?.Tools ?? []);
    

    useEffect(() => {
        if(selectedTag === 0 || !(model?.Filters && model.Filters.length)) {
            setFiltredTools(model?.Tools ?? []);
        } else if (model.Tools && filters.length !== 0){
            const filtered = model.Tools.filter(tool =>
                tool.Tags.includes(filters[selectedTag-1])
            );
            setFiltredTools(filtered);
        }
    }, [selectedTag, model, filters]);

    useEffect(() => {
        setFilters(model?.Filters ?? []);
    }, [model]);

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