import { useEffect, useState } from "react"
import TitleBar from "../window/components/TitleBar";

interface DevView {
    __filename: string,
    __dirname: string,
    __approot: string,
    __preloadpath: string,

    tool_dir: string,
    theme_dir: string,
    
    MAIN_WINDOW_DEV_URL: string,
    SETTINGS_WINDOW_DEV_URL: string,
    TOOL_WINDOW_DEV_URL: string,
    DEV_WINDOW_DEV_URL: string,
    CREATE_FOLDER_WINDOW_DEV_URL: string,
    
    VITE_DEV_SERVER_URL: string | undefined,
    RENDERER_DIST: string,
    VITE_PUBLIC: string,
    
    TOOL_DIR_DEV_PATH: string,
    THEME_DIR_DEV_PATH: string,
}

export const DevWindow = () => {
    const [constains, setConstains] = useState<DevView>();

    useEffect(() => {
        window.ipcRenderer.invoke('get-constains')
        .then((data: DevView) => {
            setConstains(data);
        })
        .catch((err) => {
            console.error("Error getting constains:", err);
        });
    }, []);

    if (!constains) {
        return (
            <>
                <TitleBar searchEnabled={false} appTitle='Dev'/>
                <div>Loading...</div>
            </>
        );
    }

    return(
        <>
            <TitleBar searchEnabled={false} appTitle='Dev'/>
            <table>
                <thead>
                    <tr>
                        <td>Key</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(constains).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{String(value)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}