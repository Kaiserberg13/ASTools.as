import { useParams } from "react-router-dom";
import TitleBar from "../window/components/TitleBar";
import { toolWindowController, type TemplateField } from "../../controllers/ToolRunController";
import './runToolWindow.css';
import type React from "react";

export const ToolWindow = () => {
    const { toolID } = useParams<{toolID: string}>();

    const { template, error, loading, toolData, answer, runTool, setFieldValue } = toolWindowController(toolID);

    if(error || !toolID) {
        return (
            <>
                <TitleBar searchEnabled={false} appTitle="error"/>
                <div className="view">
                    <main>
                        <div className="shadow-img">
                            <div className="fixed-content">
                                <h3>error</h3>
                                <p>{error}</p>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    if(loading) {
        return (
            <>
                <TitleBar searchEnabled={false} appTitle={toolID}/>
                <div className="view">
                    <main>
                        <div className="shadow-img">
                            <div className="fixed-content">
                                <h3>Loading...</h3>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <TitleBar searchEnabled={false} appTitle={toolID}/>
            <div className="view">
                <main>
                    <div className="shadow-img">
                        <div className="fixed-content">
                            <div className="tool-window">
                                <div className="tool-content">
                                    { template && renderTemplate(template, toolData, setFieldValue) }
                                    { answer && (
                                        <div className="answer">
                                            <h5>{answer.succed? "Result" : "Error"}:</h5>
                                            <pre>{answer.message}</pre>
                                        </div>
                                    )}
                                </div>
                                <div className="tool-control-buttons">
                                    <button className="run-btn" onClick={runTool}>Run</button>
                                    <button className="cancel-btn">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

function renderTemplate(template: TemplateField[], toolData: Record<string, any>, setFieldValue: (field: string | undefined, value: any) => void): React.ReactNode[] {
    const entries = Object.entries(template);
    const output: React.ReactNode[] = [];
    let bollBuffer: [string, any][] = [];


    function evaluateCondition(condition: string, toolData: Record<string, any>): boolean {
        const parts = condition.split('==').map(part => part.trim());
        if (parts.length !== 2) return false;
        const [field, value] = parts;

        let expeted: any;
        if(value.toLowerCase() === 'true') {
            expeted = true;
        } else if(value.toLowerCase() === 'false') {
            expeted = false;
        } else if(!isNaN(Number(value))) {
            expeted = Number(value);
        } else {
            expeted = value.replace(/^["'](.+)["']$/, "$1");
        }

        return toolData[field] === expeted;
    }

    const flushBoolBuffer = () => {
        if (bollBuffer.length > 0) {
            output.push(
                <div key={`bool-group-${output.length}`} className="bool-group">
                    {bollBuffer.map(([key, value]) => (
                        <button key={key} className={`bool-btn ${toolData[value.name] ? 'active' : ''}`} onClick={() => setFieldValue(value.name, !toolData[value.name])}>
                            <p>{value.text}</p>
                        </button>
                    ))}
                </div>
            );
            bollBuffer = [];
        }
    }

    entries.forEach(([key, value]) => {
        if (value.type === "bool" && !value.category_text) {
            bollBuffer.push([key, value]);
        } else {
            flushBoolBuffer();

            if (value.category_text) {
                output.push(<h5 key={key}>{value.category_text}</h5>);
            } else if (value.type === "str" && value.file_path) {
                const disabled = value.condition ? !evaluateCondition(value.condition, toolData) : false;
                output.push(
                    <div key={key} className="template-row">
                        <input disabled={disabled} type="text" placeholder={value.text || ""} value={toolData[value.name as string] ?? ""} onChange={e => setFieldValue(value.name, e.target.value)}/>
                        <button onClick={async () => {
                            const options: Electron.OpenDialogOptions = {
                                title: "Select Directory",
                                properties: ['openDirectory']
                            };
                            const selectedPath = await window.ipcRenderer.invoke('open-file-dialog', options);
                            if (selectedPath) {
                                setFieldValue(value.name, selectedPath);
                            }
                        }}>Browse</button>
                    </div>
                );
            } else if (value.type === "str") {
                const disabled = value.condition ? !evaluateCondition(value.condition, toolData) : false;
                output.push(
                    <div key={key} className="template-row">
                        <input disabled={disabled}  type="text" placeholder={value.text || ""} value={toolData[value.name as string] ?? ""} onChange={e => setFieldValue(value.name, e.target.value)}/>
                    </div>
                );
            } else if (value.type === "int" || value.type === "float") {
                const disabled = value.condition ? !evaluateCondition(value.condition, toolData) : false;
                output.push(
                    <div key={key} className="template-row">
                        <input disabled={disabled}  type="number" placeholder={value.text || ""} value={toolData[value.name as string] ?? ""} onChange={e => setFieldValue(value.name, parseInt(e.target.value))}/>
                    </div>
                );
            } else if (value.type === "select") {
                const disabled = value.condition ? !evaluateCondition(value.condition, toolData) : false;
                output.push(
                    <div key={key} className="template-row">
                        <select disabled={disabled} value={toolData[value.name as string] ?? null} onChange={e => setFieldValue(value.name, e.target.value)}>
                            {value.options?.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                )
            }
        }
    });

    flushBoolBuffer();

    return output;
}