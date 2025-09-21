import './TitleBar.css';
import { useWindowState } from '../../controllers/useWindowState';

const TitleBar: React.FC = () => {
    const { minimize, toggleMaximize, close} = useWindowState();

    return (
        <div className="title-bar">
            <div className="title-label">
                <div className='logo-svg'/>
                <p>AS Tools</p>
            </div>
            <div className="spaser"/>
            <input type="text" placeholder='Search apps, tools and more'/>
            <div className="spaser"/>
            <button onClick={minimize}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99609 13H19.9996C20.5519 13 20.9996 12.5523 20.9996 12C20.9996 11.4477 20.5519 11 19.9996 11H3.99609C3.44381 11 2.99609 11.4477 2.99609 12C2.99609 12.5523 3.44381 13 3.99609 13Z"/>
                </svg>
            </button>
            <button onClick={toggleMaximize}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6Z"/>
                </svg>
            </button>
            <button className="close" onClick={close}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2097 4.3871L4.29289 4.29289C4.65338 3.93241 5.22061 3.90468 5.6129 4.2097L5.70711 4.29289L12 10.585L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.415 12L19.7071 18.2929C20.0676 18.6534 20.0953 19.2206 19.7903 19.6129L19.7071 19.7071C19.3466 20.0676 18.7794 20.0953 18.3871 19.7903L18.2929 19.7071L12 13.415L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.585 12L4.29289 5.70711C3.93241 5.34662 3.90468 4.77939 4.2097 4.3871L4.29289 4.29289L4.2097 4.3871Z"/>
                </svg>
            </button>
        </div>
    )
}

export default TitleBar;