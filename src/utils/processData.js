
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

function buildDiscogsReleasePageUrl (release) { 
    return `https://www.discogs.com/release/${release.id}`; 
}

export { buildReleaseMapFromPageList, buildDiscogsReleasePageUrl, buildReleaseMapFromReleaseList };