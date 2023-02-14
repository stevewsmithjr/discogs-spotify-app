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
    
}

async function getSpotifySearchResultsFromAlbumTitleAndArtistList(autheticatedSpotifyToken, albumList) {
    let idList = [];
    for (let i = 0; i < albumList.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${albumList[i].album}&type=album`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${autheticatedSpotifyToken}`,
                Accept: 'application/json'
            },
        });

        const data = await response.json();
        let j = 0;
        const searchArtist = `${albumList[i].artist}`.toLowerCase();

        while (j < data.albums.items.length) {
            let resultArtist = `${data.albums.items[j].artists[0]}`.toLowerCase();
            if (searchArtist.localeCompare(resultArtist === 0)) {
                idList.push(data.albums.items[j].id);
                break;
            }
        }
    }
    return idList;
}
export { getAuthenticatedSpotifyToken, getSpotifySearchResultsFromAlbumTitleAndArtistList };