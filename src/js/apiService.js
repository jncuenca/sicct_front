import { Navigate } from 'react-router-dom'

const baseUrl = 'http://localhost:8000'

export const refreshTokens = (refreshToken, setAccessToken, setRefreshToken) => {    
    fetch(`${baseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refresh: refreshToken})
    })
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        return {
            newAccessToken: data.access,
            newRefreshToken: data.refresh
        }
    })
    .catch((error) => {
        console.log('Could not refresh token', error);
    });
}

export const fetchUser = async (accessToken, refreshToken, setAccessToken, setRefreshToken, setUser) => {  
    if (accessToken) {
        fetch(`${baseUrl}/api/users/`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'}
        })
        .then((response) => {
            if (response.status == 401) {
                const {newAccessToken, newRefreshToken} = refreshTokens(refreshToken, setAccessToken, setRefreshToken);
                fetchUser(newAccessToken, newRefreshToken, setAccessToken, setRefreshToken, setUser);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            console.error('Could not retrieve user data', error);
        });
    }  
}

export const onLogout = (refreshToken, setAccessToken, setRefreshToken, setIsLoggedIn) => {
    fetch(`${baseUrl}/api/token/blacklist/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refresh: refreshToken})
    })
    .then((response) => {
        if (response.ok) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setAccessToken(null);
            setRefreshToken(null);
            setIsLoggedIn(false);
        }
    })
    .catch(error => {
        console.error('Could not blacklist the refresh token', error);
    });
}