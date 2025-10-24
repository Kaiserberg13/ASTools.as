import { useCallback, useEffect, useMemo, useState } from "react";
import { ToolsService } from "../services/ToolsServices";

export type TemplateField = {
  category_text?: string;
  type?: "bool" | "str" | "int" | "float" | "select";
  options?: string[];
  name?: string;
  text?: string;
  default?: any;
  is_active?: boolean;
  file_path?: boolean;
  condition?: string; // пример: "Unlimited == False"
  [key: string]: any;
};

export function toolWindowController(toolId: string | undefined) {
    const _service = useMemo(() => new ToolsService(), []);

    const [template, setTemplate] = useState<TemplateField[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [answer, setAnswer] = useState<{succed: boolean, message: string} | null>(null);
    const [toolData, setToolData] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchTemplate = async () => {
            if (!toolId) {
                setLoading(false);
                setError("No tool ID provided");
                return;
            }

            try {
                const tpl = await _service.getToolTemplate(toolId);
                if(!tpl) {
                    setError("No template found for this tool");
                    setLoading(false);
                    return;
                } else {
                    let parsed: TemplateField[];
                    if (typeof tpl === "string") {
                        parsed = JSON.parse(tpl) as TemplateField[];
                    }
                    else {
                        parsed = tpl as unknown as TemplateField[];
                    }
                    setTemplate(parsed);

                    const initialData: Record<string, any> = {};
                    for(const field of parsed) {
                        if(field.type === "bool" && field.name) {
                            initialData[field.name] = field.is_active ?? false;
                        } else if(field.name && (field.type === "int" || field.type === "float")) {
                            initialData[field.name] = field.default ?? '';
                        } else if(field.name && field.type === "str") {
                            initialData[field.name] = field.default ?? "";
                        }else if(field.name && field.type === "select") {
                            initialData[field.name] = field.default ?? (field.options as string[])[0] ?? '';
                        }
                    }
                    setToolData(initialData);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [toolId, _service]);

    useEffect(() => {
        const handleUpdate = (_event: any, answer: {succed: boolean, message: string}) => {
            setAnswer(answer);
        };

        _service.onToolAnswer(handleUpdate);
        return () => {
            _service.offToolAnswer(handleUpdate);
        }
    }, [_service, answer, setAnswer])

    const setFieldValue = useCallback((key: string | undefined, value: any) => {
        if(!key) return;
        setToolData(prev => ({...prev, [key]: value}));
    }, []);

    const runTool = useCallback(async () => {
        if(!toolId || !toolData) return;
        await _service.runExeTool(toolId, toolData);
    }, [toolData]);

    return {
        template,
        loading,
        error,
        toolData,
        answer,
        runTool,
        setFieldValue
    }
}

export function toolController() {
    const _service = new ToolsService();

    const runTool = (toolID: string) => {
        _service.runTool(toolID);
    }

    return {
        runTool
    };
}