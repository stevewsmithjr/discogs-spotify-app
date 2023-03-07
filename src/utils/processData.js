
function buildReleaseMapFromPageList(pageList) {
    const releaseArray = pageList.flatMap(page => page.releases);
    const releaseMap = new Map();
    releaseArray.forEach((release) => {
        if (!releaseMap.has(release.id)) {
            releaseMap.set(release.id, release);
        }
    });
    return releaseMap;
}

function buildReleaseMapFromReleaseList(releaseList) {
    const releaseMap = new Map();
    releaseList.forEach((release) => {
        if (!releaseMap.has(release.id)) {
            releaseMap.set(release.id, release);
        }
    });
    return releaseMap;
}

function buildAlbumTitleAndArtistListFromMap(releaseMap) {
    // This funciton removes the numbers in parenthesis from Discogs Artists' names
    // ex: Pond (5) => Pond
    const albumList = [];
    const regex = /\(\d+\)/g;
    [...releaseMap.values()].forEach((release) => {
        let name = release.basic_information.artists[0].name;
        const found = name.match(regex);
        if (found) {
            name = name.replace(found, '').trim();
        }
        albumList.push({ album: release.basic_information.title.replace('&', 'and').trim(), artist: name, genres: release.basic_information.genres });
    });
    return albumList;
}

function buildSpotifyTrackQueryStrings(albums) {
    const queryStrings = [];
    let query = '';
    let trackCount = 0;
    albums.forEach(album => {
        album.tracks.items.forEach(track => {
            query = query.concat(`${track.id},`);
            trackCount++;
            // Can only request for up to 50 tracks at a time
            if (trackCount % 50 === 0) {
                query = query.slice(0, -1);
                queryStrings.push(query);
                query = '';
            }
        })
    });

    if (trackCount % 50 !== 0) {
        query = query.slice(0, -1);
        queryStrings.push(query);
    }
    console.log(`Query built to request ${trackCount} tracks.`);
    return queryStrings;
}

function buildSpotifyAlbumQueryStrings(idList) {
    const queryStrings = [];
    let query = '';
    let albumCount = 0;
    idList.forEach(id => {
        query = query.concat(`${id},`);
        albumCount++;
        // Can only request for up to 20 albums at a time
        if (albumCount % 20 === 0) {
            query = query.slice(0, -1);
            queryStrings.push(query);
            query = '';
        }
    });

    if (albumCount % 20 !== 0) {
        query = query.slice(0, -1);
        queryStrings.push(query);
    }

    console.log(`Query built to request ${albumCount} albums.`);
    return queryStrings;
}

function buildTrackTempoMap(trackList) {
    //const tempoMap = new Map();

    trackList.forEach(track => {
        console.log(`track name : ${track.track.name}\tbpm: ${track.audio_features.tempo}`);
    });
}

function extractGridDataFromTrackList(trackList) {
    const gridData = [];
    trackList.forEach((track) => {

        gridData.push({
            acousticness: track.acousticness,
            album: track.album.name,
            analysis_url: track.analysis_url,
            artist: track.artists[0].name,
            danceability: track.danceability,
            disc_number: track.disc_number,
            duration_ms: track.duration_ms,
            energy: track.energy,
            explicit: track.explicit,
            external_id: track.external_ids[0],
            external_url: track.external_urls[0],
            href: track.href,
            id: track.id,
            instramentalness: track.instramentalness,
            key: track.key,
            liveness: track.liveness,
            loudness: track.loudness,
            mode: track.mode,
            name: track.name,
            populatiry: track.populatiry,
            preview_url: track.preview_url,
            speechiness: track.speechiness,
            tempo: track.tempo,
            thumbnail_url: track.album.images[track.album.images.length - 1].url,
            time_signature: track.time_signature,
            track_href: track.track_href,
            track_number: track.track_number,
            uri: track.uri,
            valence: track.valence,
        });

    });
    return gridData;
}

function flattenSpotifyAlbumData(albums) {
    const flatData = [];
    console.log('rendered spotify album list');
    albums.forEach((album) => {
        let artistString = '';
        album.artists.forEach(artist => artistString = artistString.concat(' ', artist.name))
  
        flatData.push({
            id: album.id,
            name: album.name,
            artist: artistString,
            images: [...album.images.map(image => image.url)],
            albumData: album
        });
    });

    return flatData;
}

function buildDiscogsReleasePageUrl(release) {
    return `https://www.discogs.com/release/${release.id}`;
}

function removeDuplicateSpotifyAlbums(albums) {
    const albumMap = new Map();
    let idx = albums.length - 1;
    while (idx > -1) {
        if (!albumMap.has(albums[idx].id)) {
            albumMap.set(albums[idx].id);
        } else {
            albums.splice(idx, 1);
        }
        idx--;
    }
    return albums;
}

function trimStringForSearch(string) {

    let trimmedString = string;

    const removeRegex = /\((.*?)\)/g;
    const substringsToReplace = {
        '&': 'and'
    };
    const replaceRegex = new RegExp(Object.keys(substringsToReplace).join('|'), 'gi');
    
    trimmedString = trimmedString.replace(removeRegex, '');
    trimmedString = trimmedString.replace(replaceRegex, (match) => substringsToReplace[match.toLowerCase()] );
    trimmedString = trimmedString.trim().toLowerCase();

    // console.log('Trimmed \''+string+'\' to \''+trimmedString+'\'.');
    
    return trimmedString;
}

// const sortReleaseMapByAlbumTitle = () => {
//     const sortedReleaseList = [...discogsReleaseMap.values()];
//     sortedReleaseList.sort((releaseA, releaseB) => {
//         const nameA = releaseA.basic_information.title.toLowerCase();
//         const nameB = releaseB.basic_information.title.toLowerCase();
//         if (nameA < nameB) {
//             return -1;
//         }
//         else if (nameA > nameB) {
//             return 1;
//         }
//         else {
//             return 0;
//         }
//     });
//     const sortedReleaseMap = buildReleaseMapFromReleaseList(sortedReleaseList);
// }

function applyDiscogsGenreData(idMap, spotifyAlbums) {

    const updatedAlbums = [];
    spotifyAlbums.forEach((album) => {
        let tempAlbum = album;
        tempAlbum.genres = idMap.get(tempAlbum.id);
        updatedAlbums.push(tempAlbum);
    })

    return updatedAlbums;
}

function extractGenresFromAlbums(albums) {
    
    const genreMap = new Map();
    albums.forEach((album) => {
        album.albumData.genres.forEach((genre) => {
            if (genreMap.has(genre)) {
                genreMap.set(genre, [...genreMap.get(genre), album]);
            }
            else {
                genreMap.set(genre, [album]);
            }
            
        });
    });

    return genreMap
}

export {
    buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList,
    buildSpotifyAlbumQueryStrings, buildSpotifyTrackQueryStrings, buildAlbumTitleAndArtistListFromMap,
    buildTrackTempoMap, extractGridDataFromTrackList, removeDuplicateSpotifyAlbums, flattenSpotifyAlbumData,
    trimStringForSearch, applyDiscogsGenreData, extractGenresFromAlbums
};