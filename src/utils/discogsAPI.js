const CONSTANTS = require('../utils/constants.js');

async function fetchRecsByPage(usernameInput, pageNumber) {
    return await fetch(`https://api.discogs.com/users/${usernameInput}/collection/folders/0/releases?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            'Authorization': `Discogs key=${CONSTANTS.CONSUMER_KEY}, secret=${CONSTANTS.CONSUMER_SECRET}`,
        },
    }).then(res => res.json()).then(data => data).catch(err => console.log(err));
} 

export { fetchRecsByPage };
