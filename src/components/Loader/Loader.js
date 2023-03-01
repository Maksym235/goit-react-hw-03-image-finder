import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
export function Loader() {
  return (
    <Player
      autoplay
      loop
      src="https://assets6.lottiefiles.com/packages/lf20_qjosmr4w.json"
      style={{ height: '300px', width: '300px' }}
    >
      <Controls
        visible={false}
        buttons={['play', 'repeat', 'frame', 'debug']}
      />
    </Player>
  );
}
