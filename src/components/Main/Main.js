import React from 'react';
import DiscogsUserSearchForm from '../DiscogsUserSearchForm/DiscogsUserSearchForm';
import ReleaseItemList from '../ReleaseItemList/ReleaseItemList';
import SortButtons from '../SortButtons/SortButtons';

function Main ({ handleUserSearchFormSubmit, sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, releaseMap }) {
  
  return (
    <main className="main">
      <h2 className="main__text">
        Connect your Discogs account to view your collection
      </h2>
      <DiscogsUserSearchForm handleUserSearchFormSubmit={handleUserSearchFormSubmit} />
      <SortButtons sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} />
      <ReleaseItemList releaseMap={releaseMap} />
    </main>
  )

}

export default Main;