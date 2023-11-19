import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Header, Layout, Login } from './sections'
import { Home, Transaction } from './components'
import { refreshAccessToken } from './js/apiService'

const MiCuenta = () => (
  <div>
    <h1>Mi cuenta</h1>
    <p>This is the account page content.</p>
  </div>
);

const Cobros = () => (
  <div>
    <h1>Cobros</h1>
    <p>This is the payments page content.</p>
  </div>
);

const ControlEfectivo = () => (
  <div>
    <h1>Control de Efectivo</h1>
    <p>This is the cash control page content.</p>
  </div>
);

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };
  
  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          localStorage.setItem('access_token', newAccessToken);
          setAccessToken(newAccessToken);
        } else {
          throw new Error(`API Error: ${response.statusText}`);
        }
      } else {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      if (accessToken) {
        
        fetchUser();
      }
  }, [accessToken, refreshToken]);

  return (
    <div className="app">
      <Router>
        <Header onLogout={handleLogout}  accessToken={accessToken} user={user}/>
        <Routes>
          {accessToken ? (
            <>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/mi-cuenta" element={ <Layout><MiCuenta /></Layout>} />
              <Route path="/cobros" element={ <Layout><Cobros /></Layout>} />
              <Route path="/control-de-efectivo" element={ <Layout><ControlEfectivo /></Layout>} />
              <Route path="/registrar-transaccion" element={ <Layout><Transaction accessToken={accessToken}/></Layout>} />
            </>
          ) : (
            <Route path="/" element={ <Navigate to='/login' />} />
          )}
          <Route path="/login" element={<Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} accessToken={accessToken} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App
