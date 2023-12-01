import './Layout.css'
import { NavLink } from 'react-router-dom'
import { BiUser, BiHomeAlt, BiMoney, BiTransfer, BiAddToQueue } from 'react-icons/bi'
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [group, setGroup] = useState(null);
  useEffect(() => {
    const fetchGroup = () => {  
      if (localStorage.access_token) {
          fetch(`http://localhost:8000/api/users/`, {
              method: 'GET',
              headers: {'Authorization': `Bearer ${localStorage.access_token}`, 'Content-Type': 'application/json'}
          })
          .then((response) => response.json())
          .then((data) => {
              setGroup(data.groups[0]);
          })
          .catch((error) => {
              console.error('Could not retrieve user data', error);
          });
      }  
    }
    fetchGroup();
  }, []);

  return (
    <div className="app-container">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/" activeclassname ="active"><BiHomeAlt /><span>Inicio</span></NavLink>
          </li>
          {group &&
          
          group === 'Contabilidad' ? 
          <li>
            <NavLink to="/cobros" activeclassname ="active"><BiTransfer /><span>Cobros</span></NavLink>
          </li>
        :
          <li>
            <NavLink to="/registrar-transaccion" activeclassname ="active"><BiAddToQueue /><span>Registro interno</span></NavLink>
          </li>   
}
          {/* <li>
            <NavLink to="/control-de-efectivo" activeclassname ="active"><BiMoney /><span>Control de Efectivo</span></NavLink>
          </li> */}
          <li>
            <NavLink to="/mi-cuenta" activeclassname ="active"><BiUser /><span>Mi cuenta</span></NavLink>
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
