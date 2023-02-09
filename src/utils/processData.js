import { fetchRecsByPage } from './discogsAPI'

async function getDiscogsCollectionPageList(usernameInput) {
    return await fetchRecsByPage(usernameInput, 1).then(data => {
        let promiseList = [data];
        if (data.pagination.pages > 1) {
            let totalPages = data.pagination.pages;
            
            for (let page = 2; page <= totalPages; page++) {
                promiseList.push(fetchRecsByPage(usernameInput, page));
            }
        }
        console.log(promiseList)
        return Promise.all(promiseList);
    });
}

export { getDiscogsCollectionPageList };