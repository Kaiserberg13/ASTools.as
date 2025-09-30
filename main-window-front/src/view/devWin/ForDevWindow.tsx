import TitleBar from "../window/components/TitleBar";
import { Link, Outlet } from "react-router-dom";

export const DevWindow = () => {

    return(
        <>
            <TitleBar searchEnabled={false} appTitle='Dev'/>
            <div className="view">
                <div className="sidebar-panel-settings">
                    <Link to='/dev'>Constains</Link>
                    <Link to='/dev/store'>Store data</Link>
                    <Link to='/dev/all-tools'>All tools</Link>
                    <button onClick={() => window.ipcRenderer.send('open-store-data-editor')}>Open data editor</button>
                </div>
                <main>
                    <div className="shadow-img">
                        <div className="fixed-content">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}