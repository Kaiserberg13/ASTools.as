import './TitleBar.css';
import { useWindowState } from '../../controllers/useWindowState';

const TitleBar: React.FC = () => {
    const { minimize, toggleMaximize, close} = useWindowState();

    return (
        <div className="title-bar">
            <div className="title-label">
                <p>AS Tools</p>
            </div>
            <div className="spaser"/>
            <button onClick={minimize}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="11" width="16" height="2"/>
                </svg>
            </button>
            <button onClick={toggleMaximize}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 20H22V4H2V20ZM4 6V18H20V6H4Z"/>
                </svg>
            </button>
            <button className="close" onClick={close}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18.5L5.5 20L12 13.5L18.5 20L20 18.5L13.5 12L20 5.5L18.5 4L12 10.5L5.5 4L4 5.5L10.5 12L4 18.5Z"/>
                </svg>
            </button>
        </div>
    )
}

export default TitleBar;