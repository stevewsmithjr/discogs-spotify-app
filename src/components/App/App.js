import React, {useState} from 'react'
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { getDiscogsCollectionPageList } from '../../utils/processData';
import { getAuthenticatedSpotifyToken } from '../../utils/spotifyAPI';

function App() {
	const [releaseList, setReleaseList] = useState([]);
    const [autheticatedSpotifyToken, setAuthenticatedSpotifyToken] = useState('');
    
    const handleUserSearchFormSubmit = (input) => {
        getDiscogsCollectionPageList(input)
            .then(pageList => {
			    setReleaseList(pageList.flatMap(page => page.releases));
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

    const sortReleaseListByArtist = () => {
        const sortedReleases = [...releaseList];
        sortedReleases.sort((releaseA, releaseB) => {
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
        setReleaseList(sortedReleases);
    }

    const sortReleaseListByAlbumTitle = () => {
        const sortedReleases = [...releaseList];
        sortedReleases.sort((releaseA, releaseB) => {
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
        setReleaseList(sortedReleases);
    }

    
    return (
        <div className="App">
            <Header />
            <Main handleUserSearchFormSubmit={handleUserSearchFormSubmit} sortReleaseListByArtist={sortReleaseListByArtist} sortReleaseListByAlbumTitle={sortReleaseListByAlbumTitle} releaseList={releaseList} />
            <Footer />
        </div>
    );
}

export default App;