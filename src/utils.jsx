export async function getLyrics(song) {
    const response = await fetch(
        'https://spotify-lyric-api-984e7b4face0.herokuapp.com/?url=' +
        song.external_urls.spotify,
        {
            method: 'GET',
        }
    )

    if (response.ok) {
        const lyrics = await response.json()
        return lyrics
    } else {
        return {
            error: true
        }
    }
}

export async function getQueue(token) {
    const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const queue = await response.json()
        return queue.queue
    }
}

export async function getRecommendations(song, token) {
    const response = await fetch("https://api.spotify.com/v1/recommendations?seed_artists=" + song.artists[0].id + "&seed_tracks=" + song.id + "&limit=" + 10, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const recommendations = await response.json()
        return recommendations.tracks
    }
}

export const playSong = (token) => {
    fetch("https://api.spotify.com/v1/me/player/play", {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export const pauseSong = (token) => {
    fetch("https://api.spotify.com/v1/me/player/pause", {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export const nextSong = (token) => {
    fetch("https://api.spotify.com/v1/me/player/next", {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error changing song:', error));
}

export const previousSong = (token) => {
    fetch("https://api.spotify.com/v1/me/player/previous", {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error changing song:', error));
}

export const toggleShuffle = (mode, token) => {
    fetch("https://api.spotify.com/v1/me/player/shuffle?state=" + mode, {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        },
    })
        .catch(error => console.error('Error changing song:', error));
}

export const toggleRepeat = (command, token) => {
    var mode;
    if (command === false) {
        mode = "off"
    }
    else if (command === true) {
        mode = "track"
    }

    fetch("https://api.spotify.com/v1/me/player/repeat?state=" + mode, {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error changing song:', error));
}

export const setVolume = (number, token) => {
    fetch("https://api.spotify.com/v1/me/player/volume?volume_percent=" + number.replace("%", ""), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export const setPosition = (position, token) => {
    fetch("https://api.spotify.com/v1/me/player/seek?position_ms=" + Math.floor(position), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function msToTime(durationInMs) {
    const seconds = Math.floor((durationInMs / 1000) % 60);
    const minutes = Math.floor((durationInMs / (1000 * 60)) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
