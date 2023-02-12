import React from 'react';

function SortButtons({ sortReleaseMapByArtist, sortReleaseMapByAlbumTitle }) {

    const handleArtistSortPress = (e) => {
		e.preventDefault();
		sortReleaseMapByArtist();
	}

    const handleAlbumTitleSortPress = (e) => {
        e.preventDefault();
        sortReleaseMapByAlbumTitle();
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