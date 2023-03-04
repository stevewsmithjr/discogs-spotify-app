
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
    const albumList = [];
    const regex = /\(\d+\)/g;
    [...releaseMap.values()].forEach((release) => {
        let name = release.basic_information.artists[0].name;
        const found = name.match(regex);
        if (found) {
            name = name.replace(found, '').trim();
        }
        albumList.push({ album: release.basic_information.title.replace('&', 'and').trim(), artist: name });
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

function extractGridDataFromSearchResults(searchResults) {
    const gridData = [];
    searchResults.forEach((track) => {

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

    albums.forEach((album) => {
        flatData.push({
            id: album.id,
            name: album.name,
            artist: [...album.artists.map(artist => artist.name)],
            images: [...album.images.map(image => image.url)],
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

export {
    buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList,
    buildSpotifyAlbumQueryStrings, buildSpotifyTrackQueryStrings, buildAlbumTitleAndArtistListFromMap,
    buildTrackTempoMap, extractGridDataFromSearchResults, removeDuplicateSpotifyAlbums, flattenSpotifyAlbumData
};