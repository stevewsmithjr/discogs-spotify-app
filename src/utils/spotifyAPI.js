import { buildAlbumTitleAndArtistListFromMap, buildReleaseMapFromPageList, buildSpotifyAlbumQueryStrings, buildSpotifyTrackQueryStrings, removeDuplicateSpotifyAlbums } from './processData.js';
import { getDiscogsUserFullCollection } from './discogsAPI';

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

async function getSpotifyIdsFromAlbumListSearch(albumList) {
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
            let resultArtist = `${data.albums.items[j].artists[0].name}`.replace('&', 'and').toLowerCase();
            if (searchArtist.localeCompare(resultArtist) === 0) {
                idList.push(data.albums.items[j].id);
                break;
            }
            j++;
        }
    }
    return idList;
}

async function getSpotifyAlbumsFromIdList(idList) {
    let albums = [];
    const querys = buildSpotifyAlbumQueryStrings(idList);

    for (let i = 0; i < querys.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/albums?ids=${querys[i]}`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader()
        });
        const data = await response.json();
        data.albums.forEach(album => albums.push(album));
    }
    console.log('Spotify Albums returned:', albums);
    return albums;
}

async function getSpotifyAlbumTracks(albumList) {
    let tracks = [];
    const querys = buildSpotifyTrackQueryStrings(albumList);
    for (let i = 0; i < querys.length; i++) {

        const trackResponse = await fetch(`https://api.spotify.com/v1/tracks?ids=${querys[i]}`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader()
        });
        const trackData = await trackResponse.json();
        const featureResponse = await fetch(`https://api.spotify.com/v1/audio-features?ids=${querys[i]}`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader()
        });
        const featureData = await featureResponse.json();
        if (trackData.tracks.length === featureData.audio_features.length) {
            trackData.tracks.forEach((track, idx) => {
                tracks.push({ ...track, ...featureData.audio_features[idx] })
            });
        }
        else {
            console.log('Response data arrays do not match in size.');
            return;
        }
    }
    console.log('Spotify Tracks returned: ', tracks);
    return tracks;

}

async function getSpotifyAlbumsFromDiscogsUserCollection(username) {

    const discogsAlbums = await getDiscogsUserFullCollection(username)
        .then(pageList => buildReleaseMapFromPageList(pageList))
        .then(discogsReleaseMap => buildAlbumTitleAndArtistListFromMap(discogsReleaseMap));
    const idList = await getSpotifyIdsFromAlbumListSearch(discogsAlbums);
    const albums = await getSpotifyAlbumsFromIdList(idList)
        .then(spotifyAlbums => removeDuplicateSpotifyAlbums(spotifyAlbums));
    return albums;
}

export { getAuthenticatedSpotifyTokenFromAPI, getSpotifyIdsFromAlbumListSearch, getSpotifyAlbumsFromIdList, getSpotifyAlbumTracks, getSpotifyAlbumsFromDiscogsUserCollection };