import React, {useCallback, useState} from 'react';
import SpotifyAlbumItem from '../SpotifyAlbumItem/SpotifyAlbumItem';
import {flattenSpotifyAlbumData} from '../../utils/processData';
import './SpotifyAlbumList.css';

function SpotifyAlbumList({ albums }) {

    const [albumList, setAlbumList] = useState(flattenSpotifyAlbumData(albums))
    const [selectedAlbums, setSelectedAlbums] = useState(new Map());
    
    const handleAlbumItemClick = useCallback( (album) => {
        const updatedAlbumMap = new Map(selectedAlbums);
        if (updatedAlbumMap.has(album.id)) {
            updatedAlbumMap.delete(album.id);
        }
        else {
            updatedAlbumMap.set(album.id, album);
        }
        setSelectedAlbums(updatedAlbumMap);
    }, [selectedAlbums]);

    return (
        <section className="albums">
            <button>Data Grid</button>
            <h3 className="albums__text">Your collection</h3>
            <ul className="albums__list">
                {albumList.map(
                    (album) => {
                        const isSelected = selectedAlbums.has(album.id);
                        return <SpotifyAlbumItem album={ album } isSelected={ isSelected } 
                        handleAlbumItemClick={ handleAlbumItemClick } key={ album.id } />
                    }
                )}
            </ul>
        </section>
    )

}

export default SpotifyAlbumList;