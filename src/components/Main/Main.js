import React from 'react';
import DiscogsUserSearchForm from '../DiscogsUserSearchForm/DiscogsUserSearchForm';
import ReleaseItemList from '../ReleaseItemList/ReleaseItemList';

function Main ({ autheticatedSpotifyToken, handleUserSearchFormSubmit, sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, releaseMap }) {
  
  return (
    <main className="main">
      <h2 className="main__text">
        Connect your Discogs account to view your collection
      </h2>
      <DiscogsUserSearchForm handleUserSearchFormSubmit={handleUserSearchFormSubmit} />
      <ReleaseItemList autheticatedSpotifyToken={autheticatedSpotifyToken} sortReleaseMapByArtist={sortReleaseMapByArtist} 
        sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} releaseMap={releaseMap} />
    </main>
  )

}

export default Main;