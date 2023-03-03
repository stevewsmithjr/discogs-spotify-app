import React, {useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchResults from '../SearchResults/SearchResults';
import { buildReleaseMapFromPageList, buildReleaseMapFromReleaseList } from '../../utils/processData';
import { getAuthenticatedSpotifyTokenFromAPI } from '../../utils/spotifyAPI';
import { getDiscogsUserFullCollection } from '../../utils/discogsAPI';
import { setAuthenticatedSpotifyToken } from '../../utils/constants';
function App() {
	const [releaseMap, setReleaseMap] = useState(new Map());
    const [spotifySearchResults, setSpotifySearchResults] = useState([]);
    const navigate = useNavigate();
    
    const handleUserSearchFormSubmit = (input) => {
        getDiscogsUserFullCollection(input)
            .then(pageList => {
                const releaseMap = buildReleaseMapFromPageList(pageList);
			    setReleaseMap(releaseMap);
		    })
            .catch((err) => {
                console.log(err);
            });
        getAuthenticatedSpotifyTokenFromAPI()
            .then(token => {
                setAuthenticatedSpotifyToken(token);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSpotifySearch = (searchResults) => {
        setSpotifySearchResults(searchResults);
        navigate('/search_results');

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
            <Routes>
                <Route path="/" element={<Main handleUserSearchFormSubmit={handleUserSearchFormSubmit} handleSpotifySearch={handleSpotifySearch}
                    sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} releaseMap={releaseMap} />} />
                <Route path="/search_results" element={<SearchResults searchResults={spotifySearchResults} />}/>
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;