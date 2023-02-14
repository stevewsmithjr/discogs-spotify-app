import React, {useState} from 'react'
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { buildReleaseMapFromPageList, buildReleaseMapFromReleaseList } from '../../utils/processData';
import { getAuthenticatedSpotifyToken } from '../../utils/spotifyAPI';
import { getDiscogsUserFullCollection } from '../../utils/discogsAPI';

function App() {
	const [releaseMap, setReleaseMap] = useState(new Map());
    
    const [autheticatedSpotifyToken, setAuthenticatedSpotifyToken] = useState('');
    
    const handleUserSearchFormSubmit = (input) => {
        getDiscogsUserFullCollection(input)
            .then(pageList => {
                const releaseMap = buildReleaseMapFromPageList(pageList);
			    setReleaseMap(releaseMap);
		    })
            .catch((err) => {
                console.log(err);
            });
        getAuthenticatedSpotifyToken()
            .then(token => {
                setAuthenticatedSpotifyToken(token);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    

    const sortReleaseMapByArtist = () => {
        const sortedReleaseList = [...releaseMap.values()];
        sortedReleaseList.sort((releaseA, releaseB) => {
            const nameA = releaseA.basic_information.artists[0].name.toLowerCase();
            const nameB = releaseB.basic_information.artists[0].name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            else if (nameA > nameB) {
                return 1;
            }
            else {
                return 0;
            }
        });
        const sortedReleaseMap = buildReleaseMapFromReleaseList(sortedReleaseList);
        setReleaseMap(sortedReleaseMap);
    }

    const sortReleaseMapByAlbumTitle = () => {
        const sortedReleaseList = [...releaseMap.values()];
        sortedReleaseList.sort((releaseA, releaseB) => {
            const nameA = releaseA.basic_information.title.toLowerCase();
            const nameB = releaseB.basic_information.title.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            else if (nameA > nameB) {
                return 1;
            }
            else {
                return 0;
            }
        });
        const sortedReleaseMap = buildReleaseMapFromReleaseList(sortedReleaseList);
        setReleaseMap(sortedReleaseMap);
    }
 
    return (
        <div className="App">
            <Header />
            <Main autheticatedSpotifyToken={autheticatedSpotifyToken} handleUserSearchFormSubmit={handleUserSearchFormSubmit}
                sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} releaseMap={releaseMap} />
            <Footer />
        </div>
    );
}

export default App;