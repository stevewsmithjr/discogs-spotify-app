import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchResults({ searchResults }) {

    const navigate = useNavigate();

    const handleReturnButtonClick = (e) => {
        e.preventDefault();
        navigate('/');
    }

    console.log('toast', searchResults);

    return (
        <ul>
            <button onClick={handleReturnButtonClick}> Return to Collection </button>
            {searchResults.map(track => (
                <li key={track.id}>
                    <h2 >{track.name}</h2>
                    <p>{track.album.name} &nbsp;
                        <img src={track.album.images[2].url} alt={'https://m.media-amazon.com/images/I/91CkROmgdcL._AC_UF1000,1000_QL80_.jpg'} /></p>
                    <span>Tempo: {track.tempo}</span>
                    <h2>___</h2>
                </li>
            ))}
        </ul>
    );

}

export default SearchResults;