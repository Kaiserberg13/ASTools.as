import { useEffect, useState } from "react";

interface DevView {
    __filename: string,
    __dirname: string,
    __approot: string,
    __preloadpath: string,
    __emulator: string,

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

export const DevConstains = () => {
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
            <h2>Loading...</h2>
        );
    }

    return (
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
    )
}