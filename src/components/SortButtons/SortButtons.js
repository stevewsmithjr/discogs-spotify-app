import React from 'react';

function SortButtons({ sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, handleSpotifySearch }) {

    const handleArtistSortPress = (e) => {
		e.preventDefault();
		sortReleaseMapByArtist();
	}

    const handleAlbumTitleSortPress = (e) => {
        e.preventDefault();
        sortReleaseMapByAlbumTitle();
    }
    
    const handleSpotifySearchPress = (e) => {
        e.preventDefault();
        handleSpotifySearch();
    }

    return(
        <div className="btn-group">
            <button onClick={handleArtistSortPress}>Artist</button>
            <button onClick={handleAlbumTitleSortPress}>Album Title</button>
            <button onClick={handleSpotifySearchPress}>Search Spotify</button>
        </div>
    )
}
export default SortButtons;