import React from 'react';
import DiscogsUserSearchForm from '../DiscogsUserSearchForm/DiscogsUserSearchForm';
import ReleaseItemList from '../ReleaseItemList/ReleaseItemList';

function Main ({ handleUserSearchFormSubmit, releaseList }) {
  
  return (
    <main className="main">
      <h2 className="main__text">
        Connect your Discogs account to view your collection
      </h2>
      <DiscogsUserSearchForm handleUserSearchFormSubmit={handleUserSearchFormSubmit} />
      <ReleaseItemList releaseList={releaseList} />
    </main>
  )

}

export default Main;