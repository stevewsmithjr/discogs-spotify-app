
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
        albumList.push({album: release.basic_information.title, artist: name});
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
            // Can only request for up to 100 tracks at a time
            if (trackCount % 100 === 0) {
                
                query = query.slice(0, -1);
                queryStrings.push(query);
                query = '';
            }
        })
    });

    if (trackCount % 100 !== 0) {
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
    console.log('size: ', idList.length);
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
    })
}

function buildDiscogsReleasePageUrl (release) { 
    return `https://www.discogs.com/release/${release.id}`; 
}

export { buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList, buildSpotifyAlbumQueryStrings, buildSpotifyTrackQueryStrings, buildAlbumTitleAndArtistListFromMap, buildTrackTempoMap };