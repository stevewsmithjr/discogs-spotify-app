import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function AudioRenderer(audioUrl) {
    return (
        <ReactAudioPlayer
            src={audioUrl.value}
            autoPlay={false}
            controls
            volume={0.25}
        />
    );
}
export default AudioRenderer;