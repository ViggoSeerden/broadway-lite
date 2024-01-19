import Popup from 'reactjs-popup';
import '../css/ButtonOptions.css'
import { EuiFlexGroup, EuiSpacer, EuiText } from '@elastic/eui';
import React, { useEffect, useState } from 'react';

export default function LyricsPopup({ lyrics, lyricsFound, lyricsSynced, elapsedTime }) {

    const [updatedLyrics, setLyrics] = useState(lyrics);

    useEffect(() => {
        if (lyricsFound && lyricsSynced) {
          const updatedLyrics = lyrics.map((line) => {
            if (line.startTimeMs <= elapsedTime && line.startTimeMs !== 0) {
              return { ...line, highlighted: true };
            }
            return { ...line, highlighted: false };
          });
          setLyrics(updatedLyrics);
        }
      }, [elapsedTime, lyrics, lyricsFound, lyricsSynced]);

    return (
        <Popup trigger={<button className="buttonOption" title="View Queue" id="lyricbtn">Lyrics</button>} modal nested>
            {close => (
                <div className="modal">
                    <EuiText textAlign='center'>Lyrics</EuiText>
                    <EuiSpacer size='m' />
                    <div className="modalcontent">
                        {lyricsFound && updatedLyrics ? updatedLyrics.map((line, index) => (
                            <React.Fragment key={index}>
                                <span
                                    style={{ color: line.highlighted ? '#1ed760' : 'white' }}
                                >
                                    {line.words}
                                </span>
                                <br /> {/* Add line break after each line */}
                            </React.Fragment>
                        ))
                        :
                        <p>No lyrics found for this song.</p>
                        }
                    </div>
                    <EuiSpacer size='m' />
                    <EuiFlexGroup alignItems='center' justifyContent='center'>
                        <button className='buttonOption' onClick={close}>Close</button>
                    </EuiFlexGroup>
                </div>
            )}
        </Popup>
    )
}