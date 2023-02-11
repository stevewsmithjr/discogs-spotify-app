const CONSTANTS = require('../utils/constants.js');

async function getAuthenticatedSpotifyToken() {
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            ...CONSTANTS.SPOTIFY_AUTH_HEADER
        },
        body: 'grant_type=client_credentials'
    });
    const { access_token } = await response.json();
    return access_token;
    
};
export { getAuthenticatedSpotifyToken };