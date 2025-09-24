import './SettingsStyle.css';

const GeneralSettingsPage: React.FC = () => {
    return (
        <div className="settings-page">
            <h3>General</h3>
            <div className="blok">
                <div className="info">
                    <h6>Tools folder</h6>
                    <p>Current path: app/Tools</p>
                </div>
                <div className="control">
                    <button>Change</button>
                </div>
            </div>
            <div className="blok">
                <div className="info">
                    <h6>Theme folder</h6>
                    <p>Current path: app/Theme</p>
                </div>
                <div className="control">
                    <button>Change</button>
                </div>
            </div>
        </div>
    )
}

export default GeneralSettingsPage