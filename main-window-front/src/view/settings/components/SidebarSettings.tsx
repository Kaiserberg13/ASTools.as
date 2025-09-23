import './SidebarSettings.css';
import { Link, useLocation } from 'react-router-dom';

const SidebarSettings: React.FC = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return pathname === `/settings/${path}` || (path === '' && pathname === '/settings');
    }

    return (
        <div className="sidebar-panel-settings">
            <Link to="/settings/" className={isActive('') ? 'active' : ''}>General</Link>
            <Link to="/settings/theme" className={isActive('theme') ? 'active' : ''}>Theme</Link>   
        </div>
    )
}

export default SidebarSettings