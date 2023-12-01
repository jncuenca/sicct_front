import './header.css'
import { BiHelpCircle, BiLogOutCircle, BiUserCircle, BiLogInCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { onLogout } from '../../js/apiService'


const Header = ({ accessToken, refreshToken, setAccessToken, setRefreshToken, user, setIsLoggedIn }) => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        onLogout(refreshToken, setAccessToken, setRefreshToken, setIsLoggedIn);
        navigate('/login');
    };

    return (
        <div className="app_header">
            <div className="app_header_profile">
                { accessToken ? (
                        <>
                            <Link to="/mi-cuenta"><BiUserCircle /></Link>
                            <p><span>Hola</span>, {user && `${user.first_name} ${user.last_name}`}</p>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><BiUserCircle /></Link>
                            <p>No autenticado</p>
                        </>
                    )
                }
            </div>
            <div className="app_header_logo">
                <h1>SICCT</h1>
            </div>
            <div className="app_header_info">
                { accessToken && (
                    <div className="app_header_info_groups">
                        <p>{user && user.groups[0]}</p>
                    </div>
                )}
               
                <div className="app_header_info_icons">
                    <BiHelpCircle />
                    { accessToken ? (
                        <BiLogOutCircle onClick={handleLogout} />
                    ) : (
                        <Link to="/login"><BiLogInCircle /></Link>
                    )}
                </div> 
            </div>
        </div>
    )
}

export default Header