import React, { useEffect, useState } from 'react';
import '../css/ButtonOptions.css'
import { getQueue, getRecommendations } from '../utils';
import { EuiFlexGroup } from '@elastic/eui';
import TrackListPopup from './TrackListPopup';
// import LyricsPopup from './LyricsPopup';

export default function ButtonOptions({ token, currSong, time }) {

    const [recommendations, setRecommendations] = useState();
    const [queue, setQueue] = useState();

    // const [lyrics, setLyrics] = useState();
    // const [lyricsFound, setFound] = useState(false);
    // const [lyricsSynced, setSynced] = useState(false);

    useEffect(() => {
        async function getData() {
            setRecommendations(await getRecommendations(currSong, token))
            setQueue(await getQueue(token))

            // const lyricResults = await getLyrics(currSong, token)
            // if (!lyricResults.error) {
            //     setFound(true)

            //     if (lyricResults.syncType === "LINE_SYNCED") {
            //         setSynced(true)
            //         const syncedLyrics = lyricResults.lines.map((line) => ({
            //             ...line,
            //             highlighted: lyricResults.syncType === 'LINE_SYNCED' ? false : true,
            //           }));
            //           setLyrics(syncedLyrics);
            //     } else {
            //         setLyrics(lyricResults.lines)
            //         setSynced(false)
            //     }
            // } else {
            //     setFound(false)
            // }
        }
        getData();
    }, [token, currSong])

    function logout() {
        window.location.hash = '';
    }

    return (
        <>
            <EuiFlexGroup alignItems='center' justifyContent='center'>
                {/* <LyricsPopup lyrics={lyrics} lyricsFound={lyricsFound} lyricsSynced={lyricsSynced} elapsedTime={time} /> */}
                <TrackListPopup trackList={queue} title='Queue' />
                <TrackListPopup trackList={recommendations} title='Suggestions' />
                <button className="buttonOption" title="Logout" onClick={logout}>Log Out</button>
            </EuiFlexGroup>
            <EuiFlexGroup alignItems='center' justifyContent='center'>

            </EuiFlexGroup>
        </>
    )
}