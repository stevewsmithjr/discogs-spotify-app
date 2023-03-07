import React from 'react';
import SpotifyAlbumItem from '../SpotifyAlbumItem/SpotifyAlbumItem';
import './AlbumListByGenre.css';

function AlbumListByGenre({ genre, albums, selectedAlbums, handleAlbumItemClick }) {

    
    return (
        <section>
            <h3 className="albums__text">{genre}</h3>
            <ul className="albums__list">
                {albums.map(
                    (album) => {
                        const isSelected = selectedAlbums.has(album.id);
                        return (
                            <SpotifyAlbumItem 
                                album={album}
                                isSelected={ isSelected } 
                                handleAlbumItemClick={ handleAlbumItemClick } 
                                key={ album.id }
                            />
                        )
                        
                    }
                )}
            </ul>

        </section>
    )
}

export default AlbumListByGenre;