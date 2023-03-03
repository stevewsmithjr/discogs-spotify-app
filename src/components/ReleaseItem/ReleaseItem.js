import React from 'react'
import './ReleaseItem.css';

function ReleaseItem({ release , isSelected, handleReleaseItemClick }) {
    
    return (
        <li className={isSelected ? 'card-selected' : 'card'} onClick={() => handleReleaseItemClick(release)}>
            <img src={release.basic_information.thumb} alt='Album cover' className="card__image" />
            <h3 className="card__title" >{release.basic_information.title}</h3>
            <p className="card__bottom-artist">{release.basic_information.artists[0].name}</p>
        </li>
    );
}

export default ReleaseItem;