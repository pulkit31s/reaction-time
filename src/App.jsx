import React, { useState } from 'react';
import Deatils from './assets/components/Deatils';
import Game from './assets/components/Game';

function App() {
  const [isEntered, setIsEntered] = useState(false);

  const handleEnter = () => {
    setIsEntered(true);
  };

  if (isEntered) {
    return <Game />;
  }

  return <Deatils onEnter={handleEnter} />;
}

export default App;
