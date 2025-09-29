import { useEffect, useRef, useState } from "react";
import type { ToolModel } from "../models/ToolViewModel";

export function contextMenuToolPopupController() {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [menuPos, setMenuPos] = useState({x: 0, y:0});
    const [menuTool, setMenuTool] = useState<ToolModel | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent) => {
            if(menuVisible && menuRef.current && !(e.target instanceof Node && menuRef.current.contains(e.target))){
                setMenuVisible(false);
            }
        }

        window.addEventListener('mousedown', handleClickOutside as any);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside as any);
        }
    }, [menuVisible]);

    const handleOptionClick = (option: string) => {
        console.log('Option:', option, "for tool:", menuTool);
        setMenuVisible(false);
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, tool: ToolModel) => {
        e.preventDefault();
        setMenuTool(tool);
        setMenuPos({ x: e.clientX, y: e.clientY});
        setMenuVisible(true);
    }

    return {
        menuRef,
        menuPos,
        menuVisible,
        handleOptionClick,
        handleContextMenu
    }
}