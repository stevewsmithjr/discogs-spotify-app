import React from 'react'
import ReleaseItem from './ReleaseItem'

function ReleaseItemList({ releaseList }) {

    return (
        <div>
            <ul>
                { releaseList.map(
                    ((release, index) => 
                        <ReleaseItem release={ release }  key={ index }/>
                    )
                )}
            </ul>
        </div>
    );
}

export default ReleaseItemList;