import React, {useState} from 'react'
import DiscogsUserSearchForm from './components/DiscogsUserSearchForm';
import ReleaseItemList from './components/ReleaseItemList';


function App() {
	const [releaseList, setReleaseList] = useState([]);
    const setReleaseListState = (pageList) => {
        let releaseList = [];
			pageList.forEach(array => {
				array.releases.forEach(release => {
					releaseList.push(release);
				});
			});
            setReleaseList(releaseList);
    }
    return (
        <div>
            <DiscogsUserSearchForm setReleaseListState={ setReleaseListState } />
            { releaseList
                ? (<ReleaseItemList releaseList={ releaseList } />)
                : (<div>nada</div>)
            }
                
        </div>
    );
}

export default App;