import React, {useCallback, useState} from 'react'
import ReleaseItem from '../ReleaseItem/ReleaseItem'
import SortButtons from '../SortButtons/SortButtons';
import { buildAlbumTitleAndArtistListFromMap } from '../../utils/processData';
import { getSpotifySearchResultsFromAlbumTitleAndArtistList } from '../../utils/spotifyAPI';

import './ReleaseItemList.css';

function ReleaseItemList({ autheticatedSpotifyToken, sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, releaseMap }) {
    
    const [selectedReleaseMap, setSelectedReleaseMap] = useState(new Map());
    const handleReleaseItemClick = useCallback( (release) => {
        const updatedReleaseMap = new Map(selectedReleaseMap);
        if (updatedReleaseMap.has(release.id)) {
            updatedReleaseMap.delete(release.id);
        }
        else {
            updatedReleaseMap.set(release.id, release);
        }
        console.log('toast: ', updatedReleaseMap);
        setSelectedReleaseMap(updatedReleaseMap);
    }, [selectedReleaseMap]);

    const handleSpotifySubmit = () => {
        const albumList = buildAlbumTitleAndArtistListFromMap(selectedReleaseMap);
        getSpotifySearchResultsFromAlbumTitleAndArtistList(autheticatedSpotifyToken, albumList)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    return (
        <section className="releases">
            <SortButtons sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} 
                handleSpotifySubmit={handleSpotifySubmit} />
            <h3 className="releases__text">Your collection</h3>
            <ul className="releases__list">
                {[...releaseMap.values()].map(
                    (release) => {
                        const isSelected = selectedReleaseMap.has(release.id);
                        return <ReleaseItem release={ release } isSelected={isSelected} 
                            handleReleaseItemClick={handleReleaseItemClick} key={ release.id }/>
                    }
                )}
            </ul>
        </section>
    );
}

export default ReleaseItemList;