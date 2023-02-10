import React from 'react';
import DiscogsUserSearchForm from '../DiscogsUserSearchForm/DiscogsUserSearchForm';
import ReleaseItemList from '../ReleaseItemList/ReleaseItemList';
import SortButtons from '../SortButtons/SortButtons';

function Main ({ handleUserSearchFormSubmit, sortReleaseListByArtist, releaseList }) {
  
  return (
    <main className="main">
      <h2 className="main__text">
        Connect your Discogs account to view your collection
      </h2>
      <DiscogsUserSearchForm handleUserSearchFormSubmit={handleUserSearchFormSubmit} />
      <SortButtons sortReleaseListByArtist={sortReleaseListByArtist} />
      <ReleaseItemList releaseList={releaseList} />
    </main>
  )

}

export default Main;