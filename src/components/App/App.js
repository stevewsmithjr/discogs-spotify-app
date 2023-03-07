import React, {useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import DiscogsUserSearchForm from '../DiscogsUserSearchForm/DiscogsUserSearchForm';
import Footer from '../Footer/Footer';
import SpotifyAlbumList from '../SpotifyAlbumList/SpotifyAlbumList'
import SpotifyDataGrid from '../SpotifyDataGrid/SpotifyDataGrid';
import { extractGridDataFromTrackList } from '../../utils/processData';
import { getAuthenticatedSpotifyTokenFromAPI, getSpotifyAlbumsFromDiscogsUserCollection, getSpotifyAlbumTracks } from '../../utils/spotifyAPI';
import {  } from '../../utils/discogsAPI';
import { setAuthenticatedSpotifyToken } from '../../utils/constants';

function App() {

    const [spotifyAlbums, setSpotifyAlbums] = useState([]);
    const [spotifyGridData, setSpotifyGridData] = useState([]);
    const navigate = useNavigate();
    
    const handleUserSearchFormSubmit = async (usernameInput) => {
        await getAuthenticatedSpotifyTokenFromAPI()
            .then(token => setAuthenticatedSpotifyToken(token))
            .catch(err => console.log(err));

        const yourAlbums = await getSpotifyAlbumsFromDiscogsUserCollection(usernameInput);
        setSpotifyAlbums(yourAlbums);
        console.log('your albums:', yourAlbums);
        navigate('/spotify_albums');
    }

    const handleSpotifyDataGridNavigate = async (albumMap) => {
        console.log(albumMap);
        const trackList = await getSpotifyAlbumTracks([...albumMap.values()]);
        const gridData = extractGridDataFromTrackList(trackList);
        setSpotifyGridData(gridData);
        navigate('/search_results');
    }   

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route  
                    path="/"                 
                    element={<DiscogsUserSearchForm handleUserSearchFormSubmit={handleUserSearchFormSubmit}/>}
                />
                <Route 
                    path="/spotify_albums" 
                    element={<SpotifyAlbumList albums={spotifyAlbums} handleSpotifyDataGridNavigate={handleSpotifyDataGridNavigate}/>}
                />
                <Route 
                    path="/search_results"
                    element={<SpotifyDataGrid gridData={spotifyGridData} />}
                />
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;