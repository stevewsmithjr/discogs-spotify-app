
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
            if (trackCount % 100 === 0) {
                query = query.slice(0, -1);
                queryStrings.push(query);
                query = '';
            }
        })
    });
    query = query.slice(0, -1);
    queryStrings.push(query);
    console.log(trackCount);
    return queryStrings;
}

function buildDiscogsReleasePageUrl (release) { 
    return `https://www.discogs.com/release/${release.id}`; 
}

export { buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList, buildSpotifyTrackQueryStrings, buildAlbumTitleAndArtistListFromMap };