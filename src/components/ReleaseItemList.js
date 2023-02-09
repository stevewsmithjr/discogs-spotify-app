import React from 'react'
import ReleaseItem from './ReleaseItem'

function ReleaseItemList({ releaseList }) {

    return (
        <div>
            <ul>
                { releaseList.map(
                    ((release) => 
                        <ReleaseItem release={ release } />
                    )
                )}
            </ul>
        </div>
    );
}

export default ReleaseItemList;