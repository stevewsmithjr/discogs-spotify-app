const DISCOGS_CONSUMER_KEY = process.env.REACT_APP_DISCOGS_CONSUMER_KEY;
const DISCOGS_CONSUMER_SECRET = process.env.REACT_APP_DISCOGS_CONSUMER_SECRET;
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
let authenticatedSpotifyToken = '';

function setAuthenticatedSpotifyToken(token) {
    authenticatedSpotifyToken = token;
}

function getAuthenticatedSpotifyHeader() {
    return {
        Authorization: `Bearer ${authenticatedSpotifyToken}`,
        Accept: 'application/json'
    }
}


module.exports = {
    setAuthenticatedSpotifyToken,
    getAuthenticatedSpotifyHeader,
    DISCOGS_AUTH_HEADER: {
        'Authorization': `Discogs key=${DISCOGS_CONSUMER_KEY}, secret=${DISCOGS_CONSUMER_SECRET}`,
    },
    SPOTIFY_CLIENT_ID: SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: SPOTIFY_CLIENT_SECRET,
    
}
