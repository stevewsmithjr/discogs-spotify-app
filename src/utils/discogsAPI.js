const CONSTANTS = require('../utils/constants.js');

async function getDiscogsUserCollectionByPage(usernameInput, pageNumber) {
    return await fetch(`https://api.discogs.com/users/${usernameInput}/collection/folders/0/releases?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            ...CONSTANTS.DISCOGS_AUTH_HEADER
        }
    }).then(res => res.json()).then(data => data).catch(err => console.log(err));
} 

async function getDiscogsUserFullCollection(usernameInput) {
    return await getDiscogsUserCollectionByPage(usernameInput, 1).then(data => {
        let promiseList = [data];
        if (data.pagination.pages > 1) {
            let totalPages = data.pagination.pages;
            
            for (let page = 2; page <= totalPages; page++) {
                promiseList.push(getDiscogsUserCollectionByPage(usernameInput, page));
            }
        }
        return Promise.all(promiseList);
    });
}

export { getDiscogsUserFullCollection };
