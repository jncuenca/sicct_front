import './login.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = ({ accessToken, setAccessToken, setRefreshToken, setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();

      fetch('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, password}),
      })
      .then((response) => {
        if (!response.ok) {
          setError('Inicio de sesión fallido. Por favor verifica tus credenciales.');
          throw new Error("Loggin failed");
        } 
        return response.json();
      }) 
      .then((data) => {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("An error has ocurred", error);
      });
    }

    if (accessToken) {
      return <Navigate to="/" />
    }

    return (
        <div className="login-container">
          <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <br />
            <form>
              <div>
                <label htmlFor="username">Nombre de usuario:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
              </div>
              <div>
                <button type="submit" className="form-button" onClick={(e) => handleLogin(e)}>Iniciar Sesión</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
    )
}

export default Login
