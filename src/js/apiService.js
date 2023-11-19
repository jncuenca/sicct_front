export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error refreshing access token: ${response.statusText}`);
      }
  
      const data = await response.json();
      const newAccessToken = data.access;
  
      console.log('New Access Token:', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };