import './SidebarSettings.css';
import { NavLink } from 'react-router-dom';

const SidebarSettings: React.FC = () => {
    return (
        <div className="sidebar-panel-settings">
            <NavLink to="/settings/" end className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>General</NavLink>
            <NavLink to="/settings/theme" end className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>Theme</NavLink>   
        </div>
    )
}

export default SidebarSettings