import React from 'react';

function SortButtons({ sortReleaseListByArtist }) {

    const handlePress = (e) => {
		e.preventDefault();
		sortReleaseListByArtist();
	}

    return(
        <div className="btn-group">
            <button onClick={handlePress}>Artist</button>
            <button>Album Title</button>
            <button>Toast</button>
        </div>
    )
}
export default SortButtons;