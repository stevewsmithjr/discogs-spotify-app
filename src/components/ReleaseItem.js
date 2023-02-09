import React, {useState} from 'react'

const CONSTANTS = require('../constants.js');

function ReleaseItem({ release }) {

    return (
        <li>{release.basic_information.id}</li>
    );
}

export default ReleaseItem;