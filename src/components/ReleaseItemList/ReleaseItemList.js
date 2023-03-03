import React, {useCallback, useState} from 'react'
import ReleaseItem from '../ReleaseItem/ReleaseItem'
import SortButtons from '../SortButtons/SortButtons';
import { buildAlbumTitleAndArtistListFromMap } from '../../utils/processData';
import { getSpotifySearchResultsFromAlbumTitleAndArtistList, getSpotifyAlbumsFromIdList, getSpotifyAlbumTracks } from '../../utils/spotifyAPI';
import './ReleaseItemList.css';

function ReleaseItemList({ handleSpotifySearch, sortReleaseMapByArtist, sortReleaseMapByAlbumTitle, releaseMap }) {
    
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

    const onSpotifySearch = async () => {
        const albumList = buildAlbumTitleAndArtistListFromMap(selectedReleaseMap);
        const searchResults = await getSpotifySearchResultsFromAlbumTitleAndArtistList(albumList)
            .then(idList => getSpotifyAlbumsFromIdList(idList))
            .then(albums =>  getSpotifyAlbumTracks(albums))
            .then(results => results)
            .catch(err => console.log(err));
        handleSpotifySearch(searchResults);
    }

    return (
        <section className="releases">
            <SortButtons sortReleaseMapByArtist={sortReleaseMapByArtist} sortReleaseMapByAlbumTitle={sortReleaseMapByAlbumTitle} 
                handleSpotifySearch={onSpotifySearch} />
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