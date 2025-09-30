import { useEffect, useState } from "react";

export const DevAllTools = () => {
    const [data, setData] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        window.ipcRenderer.invoke('get-all-tools')
        .then(obj => {
            setData(obj);
        })
        .catch((err) => {
            console.error("Error getting constains:", err);
        });
    }, []);

    if (!data) {
        return (
            <h2>Loading...</h2>
        );
    }

    return (
        <div>
            <h2>All tools</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}