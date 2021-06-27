import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                   <LibrarySong 
                    song={song} 
                    id={song.id}
                    key={song.id}
                    songs={songs} 
                    setSongs={setSongs}
                    setCurrentSong={setCurrentSong}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    
                   />
                ))}
            </div>
        </div>
        )
}


export default Library;