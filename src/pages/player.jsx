import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { setPosition, nextSong, previousSong, msToTime } from '../utils';
import { EuiFlexGroup, EuiFlexItem, EuiImage, EuiSpacer } from '@elastic/eui';
import '../css/PlayerPage.css'
import ProgressBar from '../components/ProgressBar';
import SongControls from '../components/SongControls';
import ButtonOptions from '../components/ButtonOptions';

export default function Player() {

    const [token, setToken] = useState();

    const [currSong, setCurrSong] = useState();
    const [shuffle, setShuffle] = useState();
    const [repeat, setRepeat] = useState();
    const [running, setRunning] = useState(false);
    const [duration, setDuration] = useState();

    const [elapsedTime, setElapsedTime] = useState(0);
    const [progressTime, setProgressTime] = useState(msToTime(elapsedTime));

    const [vinylBG, setVinylBG] = useState(localStorage.getItem('vinylBG') === 'true' ? true : false);

    const [useRow, setUseRow] = useState(window.innerWidth >= 600 && window.innerHeight <= 550)

    //Save BG to localstorage
    useEffect(() => {
        localStorage.setItem('vinylBG', vinylBG)
    }, [vinylBG])

    //Get Token from URL
    useEffect(() => {
        if (!token) {
            const hash = window.location.hash
                .substring(1)
                .split("&")
                .reduce(function (initial, item) {
                    if (item) {
                        var parts = item.split("=");
                        initial[parts[0]] = decodeURIComponent(parts[1]);
                    }
                    return initial;
                }, {});
            let _token = hash.access_token
            if (_token) {
                setToken(_token)
                getCurrentSong(_token)
            }
        }
    }, [token])

    //Timer Function
    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setElapsedTime(prevElapsedTime => {
                    const newElapsedTime = prevElapsedTime + 1000;
                    setProgressTime(msToTime(newElapsedTime));
                    if (newElapsedTime >= duration) {
                        clearInterval(timer);
                        getCurrentSong(token);
                    }
                    return newElapsedTime;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [running, duration, token]);

    function getCurrentSong(token) {
        fetch("https://api.spotify.com/v1/me/player", {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(data => {
                setCurrSong(data.item);
                setElapsedTime(data.progress_ms)
                setDuration(data.item.duration_ms)
                setRunning(data.is_playing)
                setShuffle(data.shuffle_state)
                if (data.replay_state === "off") {
                    setRepeat(false)
                }
                else if (data.replay_state === "track") {
                    setRepeat(true)
                }
            })
            .catch(error => console.error('Error fetching current song:', error))
    }

    //Check if Mobile
    function handleWindowSizeChange() {
        setUseRow(window.innerWidth >= 600 && window.innerHeight <= 550);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleToggleRunning = (value) => {
        setRunning(value)
    }

    const handleToggleShuffle = (value) => {
        setShuffle(value)
    }

    const handleToggleRepeat = (value) => {
        setRepeat(value)
    }

    const handleSeek = (value) => {
        setPosition(value, token);
        setElapsedTime(value);
    }

    //Swiping + Animations
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            document.getElementById('album').style.transform = 'translateX(-300%)'
            nextSong(token);
            setTimeout(function () {
                document.getElementById('albumcover').style.opacity = 0
                document.getElementById('album').style.transform = 'translateX(300%)'
            }, 350)
            setTimeout(function () {
                getCurrentSong(token)
                document.getElementById('albumcover').style.opacity = 1
                document.getElementById('album').style.transform = 'translateX(0%)'
            }, 1000)
        },
        onSwipedRight: () => {
            document.getElementById('album').style.transform = 'translateX(300%)'
            previousSong(token);
            setTimeout(function () {
                document.getElementById('albumcover').style.opacity = 0
                document.getElementById('album').style.transform = 'translateX(-300%)'
            }, 350)
            setTimeout(function () {
                getCurrentSong(token)
                document.getElementById('albumcover').style.opacity = 1
                document.getElementById('album').style.transform = 'translateX(0%)'
            }, 1000)
        },
        delta: 50,
        preventDefaultTouchmoveEvent: true
    });

    return (
        <>
            {currSong && token &&
                <EuiFlexGroup alignItems='center' justifyContent='center' direction={useRow ? 'row' : 'column'}>
                    <EuiFlexItem>
                        <EuiSpacer size={useRow ? 's' : 'l'} />

                        {/* Album Cover & Background Image */}
                        {useRow && window.innerWidth < 768 && window.innerHeight <= 375 ?
                            <EuiFlexGroup justifyContent='center'>
                                <button className='buttonOption' onClick={() => setVinylBG(!vinylBG)}>Swap Image</button>
                            </EuiFlexGroup>
                            :
                            <div className='fadein' title="Switch Background" id="album" onClick={() => setVinylBG(!vinylBG)} {...handlers}>
                                <EuiImage size='l' src={currSong.album.images[0].url} alt="Album Cover" id="albumcover" className="album" />
                            </div>
                        }

                        <div id='bgimg' className={vinylBG ? 'vinyl fadein' : 'bg fadein'}>
                            <img src={currSong.album.images[0].url} alt="bg" />
                        </div>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        {/* Song Name, Artist(s) and Album */}
                        <div style={{ paddingLeft: '2%' }}>
                            <p className='songtitle'>{currSong.name.length < 45 ? currSong.name : currSong.name.substring(0, 45) + '...'}</p>
                            <p>{currSong.artists[0].name.length < 45 ? currSong.artists[0].name : currSong.artists[0].name.substring(0, 45) + '...'}</p>
                            <p>{currSong.album.name.length < 45 ? currSong.album.name : currSong.album.name.substring(0, 45) + '...'}</p>
                        </div>

                        <EuiSpacer size='s' />

                        {/* Progress Bar */}
                        <ProgressBar key={currSong.id} duration={duration} elapsedTime={elapsedTime} progressTime={progressTime} running={running}
                            onSongEnd={() => getCurrentSong(token)} onSeek={handleSeek} />

                        <EuiSpacer size='s' />

                        {/* Playback controls (play/pause, next/previous, shuffle, repeat, volume, microphone) */}
                        <SongControls running={running} shuffle={shuffle} repeat={repeat} token={token}
                            onToggleShuffle={handleToggleShuffle} onToggleRepeat={handleToggleRepeat} onToggleRunning={handleToggleRunning}
                            onSongChange={() => getCurrentSong(token)} />

                        <EuiSpacer size='s' />

                        {/* Lyrics, Queue, Recommendations, Command List, Logout */}
                        <ButtonOptions token={token} currSong={currSong} time={elapsedTime} />
                    </EuiFlexItem>
                </EuiFlexGroup>
            }
        </>
    )
}