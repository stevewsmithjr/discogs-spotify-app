const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
module.exports = {
    DISCOGS_AUTH_HEADER: {
        'Authorization': `Discogs key=${CONSUMER_KEY}, secret=${CONSUMER_SECRET}`,
    }
}