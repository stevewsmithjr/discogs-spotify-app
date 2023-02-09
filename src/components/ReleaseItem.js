import React from 'react'

function ReleaseItem({ release }) {
    return (
        <li>
            {release.basic_information.id + ' --- '} 
            <img src={release.basic_information.thumb} alt='alt' width='125' height='125'/>
        </li>
    );
}

export default ReleaseItem;