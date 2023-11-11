import { Link } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
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
