import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import type { ToolModel } from "../../../models/ToolViewModel";
import { useEffect, useState } from "react";
import './ToolDetails.css';

export const ToolPageView = () => {
    const navigate = useNavigate();
    const { author, name, folder } = useParams<{author: string, name: string, folder: string}>(); 
    const { tools } = useOutletContext<{ tools: ToolModel[] | null | string}>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tool, setTool] = useState<ToolModel>();

    useEffect(() => {
        if(typeof tools === 'string'){
            setError(tools);
        } else if (tools) {
            setTool(tools.find(tool => tool.Name === name && tool.Autor === author))
            setLoading(false);
        }
    }, [tools, author, name]);
    
    if (loading) return (
        <div className='folder-page'>
            <h4>Loading...</h4>
        </div>
    )

    if (error) return (
        <div className='folder-page'>
            <h4>Error</h4>
            <h5>{error}</h5>
        </div>
    )

    return (
        <div className="tool-page">
            <div className="path-buttons">
                <button onClick={() => navigate(-1)}>Back</button>
                <div className="path-to">
                    <p>{folder}</p>
                    <p>{`>`}</p>
                    <p>{name}</p>
                </div>
            </div>
            <div className="tool-label">
                <img src={`save-file://${tool?.IconUrl}`} alt={`${tool?.Name} icon`} />
                <div>
                    <h3>{tool?.Name}</h3>
                    <p>{tool?.Autor}</p>
                </div>
                <div className="tool-controls">
                    <button className="btn-delete">Delete</button>
                    <button>Edit</button>
                    <button className="btn-accent">Run</button>
                </div>
            </div>
            <div className="tool-info">
                <h5>{tool?.Description}</h5>
                <img src={`save-file://${tool?.CoverUrl}`} alt={`${tool?.Name} cover`} />
            </div>
        </div>
    )
}