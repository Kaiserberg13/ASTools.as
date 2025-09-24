import { useState } from 'react';
import { useTheme } from '../../core/ThemeContext';
import './SettingsStyle.css';
import './ThemePreview.css';

const ThemeSettingsPage: React.FC = () => {
    const { theme, toggleTheme} = useTheme();
    const [isApply, setIsApply] = useState<boolean>(true);
    const [themeSwitch, setThemeSwitch] = useState<'light' | 'dark'>(theme);
    const [themeColors, setThemeColors] = useState<string>('default');

    const chahged = (theme: 'light' | 'dark', colors: string) => {
        setIsApply(false);
        setThemeSwitch(theme);
        setThemeColors(colors)
    }

    const submit = () => {
        toggleTheme();
        setIsApply(true);
    }

    const cancel = () => {
        setIsApply(true);
        setThemeSwitch(theme);
        setThemeColors('default');
    }

    return (
        <div className='settings-page'>
            <h3>Theme</h3>
            <div className="blok">
                <h6>Preview</h6>
                <div className={`theme-preview ${themeSwitch}`}>
                    <div className="titlebar">
                        <div className="title-label">
                            <div className='logo-svg'/>
                            <p>App title</p>
                        </div>
                        <div className="spaser"/>
                        <div className="sercher"/>
                        <div className="spaser"/>
                    </div>
                    <div className="content">
                        <div className="sidebar">
                            <div className="item active">
                                <div className="indicator"/>
                                <div className="icon"/>
                            </div>
                            <div className="item">
                                <div className="icon"/>
                                <div className="text"/>
                            </div>
                        </div>
                        <div className="main-content">
                            <div className="text header"/>
                            <div className="tags">
                                <div className="tag active"><div className="text"/></div>
                                <div className="tag"><div className="text"/></div>
                                <div className="tag"><div className="text"/></div>
                            </div>
                            <div className="tool-blok"></div>
                        </div>
                    </div>
                </div>
                <div className="control">
                    <div className="main">
                        <div className="switcher">
                            <button onClick={() => chahged('light', themeColors)} disabled={themeSwitch === 'light'}>Light</button>
                            <button onClick={() => chahged('dark', themeColors)} disabled={themeSwitch === 'dark'}>Dark</button>
                        </div>
                        {/* <select onChange={(e) => chahged(themeSwitch, e.target.value)} value={themeColors}>
                            <option value="default">Default</option>
                            <option value="as-launcher">AS Launcher</option>
                        </select> */}
                    </div>
                    <button className='apply' onClick={submit} disabled={isApply}>Apply</button>
                    <button className='cansel' onClick={cancel} disabled={isApply}>Cansel</button>
                </div>
            </div>
        </div>
    )
}

export default ThemeSettingsPage