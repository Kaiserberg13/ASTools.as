import './SettingsStyle.css';
import './ThemePreview.css';
import { themeController } from '../../../controllers/themmeController';

const ThemeSettingsPage: React.FC = () => {
    const {themeColors, isApply, themeSwitch, chosenPaletteHasDark, submit, fastSubmit, cancel, chahged} = themeController()

    return (
        <div className='settings-page'>
            <h3>Theme</h3>
            <div className="blok column">
                <h6>Preview - {themeColors}</h6>
                <div className={`theme-preview ${themeSwitch} ${themeColors}`}>
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
                            <div className="shadow-img-prev">
                                <div className="fixed-content-prev">
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
                    </div>
                </div>
                <div className="control">
                    <div className="main">
                        <div className={`switcher ${chosenPaletteHasDark(themeColors)? '' : 'disabled'}`}>
                            <button className={themeSwitch === 'light' && chosenPaletteHasDark(themeColors) ? 'active' : ''} onClick={() => chahged('light', themeColors)} disabled={!chosenPaletteHasDark(themeColors)}>Light</button>
                            <button className={themeSwitch === 'dark' && chosenPaletteHasDark(themeColors) ? 'active' : ''} onClick={() => chahged('dark', themeColors)} disabled={!chosenPaletteHasDark(themeColors)}>Dark</button>
                        </div>
                    </div>
                    <button className='apply' onClick={submit} disabled={isApply}>Apply</button>
                    <button className='cansel' onClick={cancel} disabled={isApply}>Cansel</button>
                </div>
            </div>
            <h5>Inner themes</h5>
            <div className="blok">
                <div className="info">
                    <h6>Default</h6>
                    <p>This is a default theme AS Tools. Enabled light and dark style</p>
                </div>
                <div className="control">
                    <button onClick={() => chahged(themeSwitch, "default")}>Preview</button>
                    <button onClick={() => fastSubmit('default')}className='apply'>Apply</button>
                </div>
            </div>
            <div className="blok">
                <div className="info">
                    <h6>ALauncher theme</h6>
                    <p>This is a classic theme Aperture Launcher. Enabled light and dark style</p>
                </div>
                <div className="control">
                    <button onClick={() => chahged(themeSwitch, 'a-launcher')}>Preview</button>
                    <button onClick={() => fastSubmit('a-launcher')} className='apply'>Apply</button>
                </div>
            </div>
            <div className="blok">
                <div className="info">
                    <h6>Omori theme</h6>
                    <p>This is a theme based on the game Omori. Has dark and ligt style, aslo have a picture</p>
                </div>
                <div className="control">
                    <button onClick={() => chahged(themeSwitch, 'omori')}>Preview</button>
                    <button onClick={() => fastSubmit('omori')} className='apply'>Apply</button>
                </div>
            </div>
            <div className="blok">
                <div className="info">
                    <h6>Columbina theme</h6>
                    <p>This theme fascinates and enchants</p>
                </div>
                <div className="control">
                    <button onClick={() => chahged(themeSwitch, 'columbina')}>Preview</button>
                    <button onClick={() => fastSubmit('columbina')} className='apply'>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default ThemeSettingsPage