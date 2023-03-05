import React from 'react';
import './SpotifyAlbumItem.css';

function SpotifyAlbumItem({ album, isSelected, handleAlbumItemClick }) {
    return (
        <li className={isSelected ? 'card-selected' : 'card'} onClick={() => handleAlbumItemClick(album)}>
            <img src={album.images[0]} alt='Album cover' className="card__image" />
            <h3 className="card__title" >{album.name}</h3>
            <p className="card__bottom-artist">{album.artist}</p>
        </li>
    )
}

export default SpotifyAlbumItem;