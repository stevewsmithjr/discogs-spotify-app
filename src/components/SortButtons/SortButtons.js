import React from 'react';

function SortButtons({ sortReleaseListByArtist, sortReleaseListByAlbumTitle }) {

    const handleArtistSortPress = (e) => {
		e.preventDefault();
		sortReleaseListByArtist();
	}

    const handleAlbumTitleSortPress = (e) => {
        e.preventDefault();
        sortReleaseListByAlbumTitle();
    }

    return(
        <div className="btn-group">
            <button onClick={handleArtistSortPress}>Artist</button>
            <button onClick={handleAlbumTitleSortPress}>Album Title</button>
            <button>Toast</button>
        </div>
    )
}
export default SortButtons;