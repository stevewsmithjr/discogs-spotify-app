import React from 'react'
import './ReleaseItem.css';
import { buildDiscogsReleasePageUrl } from '../../utils/processData';

function ReleaseItem({ release }) {
    return (
        <li className="card">
            <a href={buildDiscogsReleasePageUrl(release)} target="_blank">
                <img src={release.basic_information.thumb} alt='Album cover' className="card__image" />
            </a>
            <h3 className="card__title" >{release.basic_information.title}</h3>
        </li>
    );
}

export default ReleaseItem;