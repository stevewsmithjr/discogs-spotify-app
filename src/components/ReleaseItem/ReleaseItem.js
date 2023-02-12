import React, {useState} from 'react'
import './ReleaseItem.css';
import { buildDiscogsReleasePageUrl } from '../../utils/processData';

function ReleaseItem({ release , handleReleaseClicked}) {
    const [isSelected, setIsSelected] = useState(false);
    const releaseItemClicked = () => {
        const update = !isSelected;
        setIsSelected(update);
        handleReleaseClicked(release);
    }
    return (
        <li className={isSelected ? 'card-selected' : 'card'} onClick={releaseItemClicked}>
            {/* <a href={buildDiscogsReleasePageUrl(release)} target="_blank">
                <img src={release.basic_information.thumb} alt='Album cover' className="card__image" />
            </a> */}
            <img src={release.basic_information.thumb} alt='Album cover' className="card__image" />
            <h3 className="card__title" >{release.basic_information.title}</h3>
            <p className="card__bottom-artist">{release.basic_information.artists[0].name}</p>
        </li>
    );
}

export default ReleaseItem;