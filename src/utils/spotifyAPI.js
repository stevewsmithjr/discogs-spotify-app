const Buffer = require('buffer').Buffer;
const CONSTANTS = require('../utils/constants.js');


async function getAuthenticatedSpotifyTokenFromAPI() {
    const encodedSpotifyCredentials = new Buffer.from(`${CONSTANTS.SPOTIFY_CLIENT_ID}:${CONSTANTS.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + encodedSpotifyCredentials,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'grant_type=client_credentials'
    });
    const { access_token } = await response.json();
    return access_token; 
}

async function getSpotifySearchResultsFromAlbumTitleAndArtistList(albumList) {
    let idList = [];
    for (let i = 0; i < albumList.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${albumList[i].album}&type=album`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader(),            
        });

        const data = await response.json();
        let j = 0;
        const searchArtist = `${albumList[i].artist}`.toLowerCase();

        while (j < data.albums.items.length) {
            let resultArtist = `${data.albums.items[j].artists[0].name}`.toLowerCase();
            if (searchArtist.localeCompare(resultArtist) === 0) {
                idList.push(data.albums.items[j].id);
                break;
            }
            j++;
        }
    }
    return idList;
}

async function getSpotifyAlbumsFromIdList(idList, albumList) {
    let albums = [];
    /**
     * TODO
     * 
     * This should be refactored! Spotify
     */
    for (let i = 0; i < idList.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/albums/${idList[i]}/tracks`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader(),
        });
        const data = await response.json();
        albums.push({Album: albumList[i].album, tracks: data })
    }

    return albums;
}
export { getAuthenticatedSpotifyTokenFromAPI, getSpotifySearchResultsFromAlbumTitleAndArtistList, getSpotifyAlbumsFromIdList };