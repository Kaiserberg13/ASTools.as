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