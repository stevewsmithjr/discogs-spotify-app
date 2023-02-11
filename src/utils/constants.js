const Buffer = require('buffer').Buffer;

const DISCOGS_CONSUMER_KEY = process.env.REACT_APP_DISCOGS_CONSUMER_KEY;
const DISCOGS_CONSUMER_SECRET = process.env.REACT_APP_DISCOGS_CONSUMER_SECRET;
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const encodedSpotifyCredentials = new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

module.exports = {
    DISCOGS_AUTH_HEADER: {
        'Authorization': `Discogs key=${DISCOGS_CONSUMER_KEY}, secret=${DISCOGS_CONSUMER_SECRET}`,
    },
    SPOTIFY_AUTH_HEADER: {
        Authorization: 'Basic ' + encodedSpotifyCredentials,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    SPOTIFY_CLIENT_ID: SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: SPOTIFY_CLIENT_SECRET
}