import React from 'react';

const LibrarySong = ({song, songs, setSongs, setCurrentSong, id, audioRef, isPlaying}) => {

    const songSelectHandeler = async () => {
       await setCurrentSong(song);

        // Add Active State

        const newSongs = songs.map((song) => {
            if(song.id === id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });

        await setSongs(newSongs);

        // Check if the song is playing

        if(isPlaying) audioRef.current.play();
    }

    return (
        <div className={`library-song ${song.active ? 'selected' : ""}`} onClick={songSelectHandeler}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
        )
}

export default LibrarySong;