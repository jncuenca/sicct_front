import './Layout.css'
import { NavLink } from 'react-router-dom'
import { BiUser, BiHomeAlt, BiMoney, BiTransfer, BiAddToQueue } from 'react-icons/bi'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active"><BiHomeAlt /><span>Inicio</span></NavLink>
          </li>
          <li>
            <NavLink to="/registrar-transaccion" activeClassName="active"><BiAddToQueue /><span>Registro interno</span></NavLink>
          </li>
          <li>
            <NavLink to="/cobros" activeClassName="active"><BiTransfer /><span>Cobros</span></NavLink>
          </li>
          <li>
            <NavLink to="/control-de-efectivo" activeClassName="active"><BiMoney /><span>Control de Efectivo</span></NavLink>
          </li>
          <li>
            <NavLink to="/mi-cuenta" activeClassName="active"><BiUser /><span>Mi cuenta</span></NavLink>
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
