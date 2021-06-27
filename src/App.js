import { useState, useRef } from "react";

// Import Styles
import "./styles/app.scss";

// Adding Components 

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// Import Data

import data from "./data";


function App() {

  // Ref
  const audioRef = useRef(null);

  // States

  const [songs, setSongs] = useState(data()); 
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Event Handlers

  const timeUpdateHandler = (e) => {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;

      // Calculate Percantage
      const roundedCurrent = Math.round(currentTime);
      const roundedDuration= Math.round(duration);
      const animation= Math.round((roundedCurrent / roundedDuration) * 100);

      setSongInfo({...setSongInfo, currentTime, duration, animationPercentage:animation});
  };

  const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : "" }`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song 
        currentSong={currentSong} 
      />
      <Player 
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        audioRef= {audioRef} 
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library 
        songs={songs} 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        libraryStatus={libraryStatus}
      />
      <audio 
        src={currentSong.audio} 
        ref={audioRef} 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndHandler}
        >
        
      </audio>
    </div>
  );
}

export default App;
