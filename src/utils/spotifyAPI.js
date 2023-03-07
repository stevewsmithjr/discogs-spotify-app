import {
    buildAlbumTitleAndArtistListFromMap, buildReleaseMapFromPageList,
    buildSpotifyAlbumQueryStrings, buildSpotifyTrackQueryStrings, removeDuplicateSpotifyAlbums, 
    trimStringForSearch, applyDiscogsGenreData
} from './processData.js';
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
    const idMap = new Map();
    let noMatch = [];
    
    for (let i = 0; i < albumList.length; i++) {
        const searchAlbum = trimStringForSearch(albumList[i].album);
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchAlbum}&type=album`, {
            method: 'GET',
            headers: CONSTANTS.getAuthenticatedSpotifyHeader(),
        });

        const data = await response.json();
        const searchArtist = trimStringForSearch(albumList[i].artist);
        let j = 0;

        while (j < data.albums.items.length) {
            let artistFound = false;
            const resultArtists = data.albums.items[j].artists;
            const resultAlbum = trimStringForSearch(data.albums.items[j].name);
            for (let k = 0; k < resultArtists.length; k++) {
                const resultArtist = trimStringForSearch(resultArtists[k].name);
                if (searchArtist.localeCompare(resultArtist) === 0) {
                    artistFound = true;
                    break;
                }
            }
            if (artistFound && searchAlbum.localeCompare(resultAlbum) === 0) {
                idMap.set(data.albums.items[j].id, albumList[i].genres);
                break;
            }
            j++;
        }

        if (j === data.albums.items.length) {
            noMatch.push({
                album: searchAlbum,
                artist: searchArtist,
                data: data
            });
        }
    }
    console.log('No matches: ', noMatch);
    return idMap;
}

async function getSpotifyAlbumsFromIdMap(idMap) {
    let albums = [];
    const querys = buildSpotifyAlbumQueryStrings([...idMap.keys()]);

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
    const idMap = await getSpotifyIdsFromAlbumListSearch(discogsAlbums);
    const albums = await getSpotifyAlbumsFromIdMap(idMap)
        .then(spotifyAlbums => applyDiscogsGenreData(idMap, spotifyAlbums))
        .then(spotifyAlbums => removeDuplicateSpotifyAlbums(spotifyAlbums));
    return albums;

}

export { getAuthenticatedSpotifyTokenFromAPI, getSpotifyIdsFromAlbumListSearch, getSpotifyAlbumsFromIdMap, getSpotifyAlbumTracks, getSpotifyAlbumsFromDiscogsUserCollection };