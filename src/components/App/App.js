import React, {useState} from 'react'
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { getDiscogsCollectionPageList } from '../../utils/processData';

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

    const handleUserSearchFormSubmit = (input) => {
        getDiscogsCollectionPageList(input)
            .then(pageList => {
			    setReleaseListState(pageList);
		    })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="App">
            <Header />
            <Main handleUserSearchFormSubmit={handleUserSearchFormSubmit} releaseList={releaseList} />
            <Footer />
        </div>
    );
}

export default App;