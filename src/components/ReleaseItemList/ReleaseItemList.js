import React from 'react'
import ReleaseItem from '../ReleaseItem/ReleaseItem'
import './ReleaseItemList.css';

function ReleaseItemList({ handleReleaseClicked, releaseMap }) {

    return (
        <section className="releases">
            <h3 className="releases__text">Your collection</h3>
            <ul className="releases__list">
                {[...releaseMap.values()].map(
                    (release, index) => {
                        return <ReleaseItem release={ release } handleReleaseClicked={handleReleaseClicked} key={ release.id }/>
                    }
                )}
            </ul>
        </section>
    );
}

export default ReleaseItemList;