import React, {useState} from 'react'
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { getDiscogsCollectionPageList } from '../../utils/processData';

function App() {
	const [releaseList, setReleaseList] = useState([]);

    const handleUserSearchFormSubmit = (input) => {
        getDiscogsCollectionPageList(input)
            .then(pageList => {
			    setReleaseList(pageList.flatMap(page => page.releases));
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