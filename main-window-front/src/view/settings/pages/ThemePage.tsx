import { useTheme } from '../../core/ThemeContext';
import './SettingsStyle.css';

const ThemeSettingsPage: React.FC = () => {
    const { theme, toggleTheme} = useTheme()

    return (
        <div>
            <h1>Настройка темы</h1>
            <p>Текущая тема: {theme === 'light' ? 'Светлая' : 'Тёмная'}</p>
            <button onClick={toggleTheme}>
                Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
            </button>
        </div>
    )
}

export default ThemeSettingsPage