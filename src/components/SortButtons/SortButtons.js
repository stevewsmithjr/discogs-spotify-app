import React from 'react';

function SortButtons({ sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, handleSpotifySubmit }) {

    const handleArtistSortPress = (e) => {
		e.preventDefault();
		sortReleaseMapByArtist();
	}

    const handleAlbumTitleSortPress = (e) => {
        e.preventDefault();
        sortReleaseMapByAlbumTitle();
    }
    
    const handleToastPress = (e) => {
        e.preventDefault();
        handleSpotifySubmit();
    }

    return(
        <div className="btn-group">
            <button onClick={handleArtistSortPress}>Artist</button>
            <button onClick={handleAlbumTitleSortPress}>Album Title</button>
            <button onClick={handleToastPress}>Toast</button>
        </div>
    )
}
export default SortButtons;