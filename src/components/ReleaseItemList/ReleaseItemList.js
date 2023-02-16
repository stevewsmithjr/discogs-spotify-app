import React, {useCallback, useState} from 'react'
import ReleaseItem from '../ReleaseItem/ReleaseItem'
import SortButtons from '../SortButtons/SortButtons';
import { buildAlbumTitleAndArtistListFromMap, buildSpotifyTrackQueryStrings } from '../../utils/processData';
import { getSpotifySearchResultsFromAlbumTitleAndArtistList, getSpotifyAlbumsFromIdList } from '../../utils/spotifyAPI';
import './ReleaseItemList.css';

function ReleaseItemList({ sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, releaseMap }) {
    
    const [selectedReleaseMap, setSelectedReleaseMap] = useState(new Map());
    const handleReleaseItemClick = useCallback( (release) => {
        const updatedReleaseMap = new Map(selectedReleaseMap);
        if (updatedReleaseMap.has(release.id)) {
            updatedReleaseMap.delete(release.id);
        }
        else {
            updatedReleaseMap.set(release.id, release);
        }
        setSelectedReleaseMap(updatedReleaseMap);
    }, [selectedReleaseMap]);

    const handleSpotifySearch = () => {
        const albumList = buildAlbumTitleAndArtistListFromMap(selectedReleaseMap);
        
        getSpotifySearchResultsFromAlbumTitleAndArtistList(albumList)
            .then(idList => getSpotifyAlbumsFromIdList(idList, albumList))
            .then(albums =>  buildSpotifyTrackQueryStrings(albums)) 
            .then(strings => console.log(strings))
            .catch(err => console.log(err));
        
    }

    return (
        <section className="releases">
            <SortButtons sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} 
                handleSpotifySearch={handleSpotifySearch} />
            <h3 className="releases__text">Your collection</h3>
            <ul className="releases__list">
                {[...releaseMap.values()].map(
                    (release) => {
                        const isSelected = selectedReleaseMap.has(release.id);
                        return <ReleaseItem release={ release } isSelected={ isSelected } 
                            handleReleaseItemClick={ handleReleaseItemClick } key={ release.id } />
                    }
                )}
            </ul>
        </section>
    );
}

export default ReleaseItemList;