import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface Props {
  mediaUrl: string;
}

export const VideoPlayer = (props: Props) => {
  const playerContainerRef = useRef(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (playerContainerRef.current) {
      const player = new Plyr('#player');
      playerRef.current = player;
    }
  }, []);

  return (
    <video id="player" playsInline controls data-poster="/path/to/poster.jpg" ref={playerContainerRef}>
      <source src={props.mediaUrl} type="video/mp4" />

      <track kind="captions" label="English captions" src="/path/to/captions.vtt" srcLang="en" default />
    </video>
  )
};

