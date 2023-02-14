
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

function buildDiscogsReleasePageUrl (release) { 
    return `https://www.discogs.com/release/${release.id}`; 
}

export { buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList, buildAlbumTitleAndArtistListFromMap };