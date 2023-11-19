import './Layout.css'
import { Link } from 'react-router-dom'
import { BiUser, BiHomeAlt, BiMoney, BiTransfer, BiAddToQueue } from 'react-icons/bi'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/"><BiHomeAlt /><span>Inicio</span></Link>
          </li>
          <li>
            <Link to="/registrar-transaccion"><BiAddToQueue /><span>Registro interno</span></Link>
          </li>
          <li>
            <Link to="/cobros"><BiTransfer /><span>Cobros</span></Link>
          </li>
          <li>
            <Link to="/control-de-efectivo"><BiMoney /><span>Control de Efectivo</span></Link>
          </li>
          <li>
            <Link to="/mi-cuenta"><BiUser /><span>Mi cuenta</span></Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout
