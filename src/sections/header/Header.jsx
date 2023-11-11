import './header.css'
import { BiHelpCircle, BiLogOutCircle, BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = () => {

    const name = "Jazmín Valdez"
    const groups = "Contabilidad"

    return (
        <div className="app_header">
            <div className="app_header_profile">
                <Link to="/mi-cuenta"><BiUserCircle /></Link>
                <p><span>Hola</span>, {name}</p>
            </div>
            <div className="app_header_logo">
                <h1>SICCT</h1>
            </div>
            <div className="app_header_info">
                <div className="app_header_info_groups">
                    <p>{groups}</p>
                </div>

                <div className="app_header_info_icons">
                    <BiHelpCircle />
                    <BiLogOutCircle />
                </div> 
            </div>
        </div>
    )
}

export default Header