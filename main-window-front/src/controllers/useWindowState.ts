import { useCallback } from "react";
import { WindowServices } from "../services/WindowServices";

export function useWindowState() {
    const windowServices = new WindowServices();

    const minimize = useCallback(() => {
        console.log("minimize");
        windowServices.minimize();
    }, []);

    const toggleMaximize = useCallback(() => {
        console.log("toggleMaximize");
        windowServices.toggleMaximize();
    }, []);

    const close = useCallback(() => {
        console.log("close");
        windowServices.close();
    }, []);

    return {
        minimize, toggleMaximize, close
    };
}