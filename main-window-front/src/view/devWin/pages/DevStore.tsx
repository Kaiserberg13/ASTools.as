import { useEffect, useState } from "react";

export const DevStore = () => {
    const [data, setData] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        window.ipcRenderer.invoke('get-store')
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
            <h2>Store data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}