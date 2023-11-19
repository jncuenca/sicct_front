import './login.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom';

const Login = ({ setAccessToken, setRefreshToken, accessToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    }

    if (accessToken) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
          <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <br />
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
              <div>
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div>
                <button type="submit" className="form-button">Login</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
    )
}

export default Login
