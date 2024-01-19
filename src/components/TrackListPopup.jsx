import Popup from 'reactjs-popup';
import '../css/ButtonOptions.css'
import { EuiFlexGroup, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';

export default function TrackListPopup({ trackList, title }) {
    return (
        <Popup trigger={<button className="buttonOption" title="View Queue" id="lyricbtn">{title}</button>} modal nested>
            {close => (
                <div className="modal">
                    <EuiText textAlign='center'>{title}</EuiText>
                    <EuiSpacer size='m' />
                    <div className="modalcontent">
                        {trackList && trackList.length > 0 ? trackList.map((song, index) => (
                            <React.Fragment key={index}>
                                <p style={{ fontWeight: 'bolder', color: "white", lineClamp: 1 }}>{index + 1}. {song.name}</p>
                                <p style={{ color: "white" }}>{song.artists[0].name}</p>
                                <p style={{ color: "white" }}>{song.album.name}</p>
                                <br />
                            </React.Fragment>
                        ))
                            :
                            <p>No {title.toLowerCase()} to display.</p>
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