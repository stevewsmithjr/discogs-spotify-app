import React, {useCallback, useState} from 'react';
import {flattenSpotifyAlbumData, extractGenresFromAlbums} from '../../utils/processData';
import './SpotifyAlbumList.css';
import AlbumListByGenre from '../AlbumListByGenre/AlbumListByGenre';

function SpotifyAlbumList({ albums, handleSpotifyDataGridNavigate }) {

    
    const [albumList, setAlbumList] = useState(flattenSpotifyAlbumData(albums));
    const [genreBuckets, setGenreBuckets] = useState(extractGenresFromAlbums(flattenSpotifyAlbumData(albums)));
    const [selectedAlbums, setSelectedAlbums] = useState(new Map());
    
    const handleAlbumItemClick = useCallback( (album) => {
        const updatedAlbumMap = new Map(selectedAlbums);
        if (updatedAlbumMap.has(album.id)) {
            updatedAlbumMap.delete(album.id);
        }
        else {
            updatedAlbumMap.set(album.id, album.albumData);
        }
        setSelectedAlbums(updatedAlbumMap);
        console.log(updatedAlbumMap);
    }, [selectedAlbums]);

    const handleDataGridButtonClick = () => {
        handleSpotifyDataGridNavigate(selectedAlbums);
    }

    const testButtonClick = (e) => {
        e.preventDefault();
        console.log(genreBuckets);
    }

    return (
        <section className="albums">
            <button onClick={handleDataGridButtonClick}>Data Grid</button>
            <button onClick={testButtonClick}>Test</button>
            <h3 className="albums__text">Your collection</h3>
            
            {
                [...genreBuckets.keys()].map(
                    (genre, idx) => {
                        return (
                            <AlbumListByGenre 
                                genre={genre} 
                                albums={genreBuckets.get(genre)} 
                                selectedAlbums={selectedAlbums}
                                handleAlbumItemClick={handleAlbumItemClick} 
                                key={idx} 
                            />
                        )
                    }
                )
            }

        
        </section>
    )

}

export default SpotifyAlbumList;