import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Header, Layout, Login } from './sections'
import { Home, Transaction, CashControl, Payments, MyAccount } from './components'
import { useEffect, useState } from 'react'
import { fetchUser } from './js/apiService'

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser(accessToken, refreshToken, setAccessToken, setRefreshToken, setUser);
    }
  }, [isLoggedIn]);


  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Header accessToken={accessToken} refreshToken={refreshToken} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} user={user} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          { accessToken ? (
            <>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/registrar-transaccion" element={ <Layout><Transaction accessToken={accessToken} /></Layout>} />
              <Route path="/cobros" element={ <Layout><Payments accessToken={accessToken}/></Layout>} />
              <Route path="/control-de-efectivo" element={ <Layout><CashControl /></Layout>} />
              <Route path="/mi-cuenta" element={ <Layout><MyAccount user={user}/></Layout>} />
            </>
          ) : (
            <Route path="/" element={ <Navigate to='/login' />} />
          )}
          <Route path="/login" element={<Login accessToken={accessToken} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setIsLoggedIn={setIsLoggedIn} /> } /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App
