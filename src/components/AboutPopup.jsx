import Popup from 'reactjs-popup';
import '../css/ButtonOptions.css'
import { EuiFlexGroup, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';
import soup from '../img/soup.png'
import mcs from '../img/mcs.png'

export default function AboutPopup() {
    return (
        <Popup trigger={<button className="buttonOption" title="View Queue" id="lyricbtn">About</button>} modal nested>
            {close => (
                <div className="modal">
                    <EuiText textAlign='center'>About</EuiText>
                    <EuiSpacer size='m' />
                    <div className="modalcontent">
                        <h2>What is this?</h2>
                        <p>Broadway Lite is a remade and more optimised version of Broadway, a former school project. This project involved
                            creating something that would make listening to music while driving more safe. The solution me and my project partner
                            came up with was to create a voice controller for Spotify. This means being able to control basic playback functions from an active
                            Spotify session simply by saying commands out loud into your devices' microphone. I was pretty happy with the end result, so
                            I decided to keep working on this for fun after the project was over, by adding more features. Eventually, this project became
                            quite unmanageable due to unorganised and unoptimised code, as well as having features that really didn't add much to the overall
                            package. This led to me creating Broadway Lite, which removes excessive features and greatly improves the code.
                        </p>
                        <br/>
                        <p>For those curious, this project was made with React, using Spotify's official developer API. There's no backend to speak of. 
                            Packages and libraries used include FontAwesome, ElasticUI, react-router-dom, react-speech-recognition, react-swipeable and 
                            reactjs-popup. Additionally, I used spotify-lyrics-api to get song lyrics from Spotify, since these aren't provided by the 
                            official API.
                        </p>
                        <h2>How do I use this?</h2>
                        <p>First of all, you need a Spotify Premium account for this. This is required by Spotify. Besides this, make sure you have an
                            active Spotify session running on any device, and start playing a song. Once both requirements are met, simply tap the login 
                            button seen on this page. From there, you will need to login with your Spotify account, and grant this app permission to see 
                            your activity, account details, and allow it to control your Spotify session. Once granted, you will now be able to use the app.
                        </p>
                        <br/>
                        <p>Sadly, Spotify doesn't allow people to create things that allow people to control a session with their voice, so I cannot get this
                            app to go fully live. This means that only a select few users are able to use the app. These users are explicitly defined in my
                            Spotify developer dashboard. I don't know why this restriction exists, but as long as it's there, this project will not be usable by
                            the general public.
                        </p>
                        <h2>Data Usage</h2>
                        <p>This app needs access to your Spotify account to work. Specifically, the data it'll get access to is your public account data (username, 
                            profile picture, followers and public playlists) and your current activity (song that's currently playing and queue). Furthermore,
                            you will grant this app control over your Spotify sessions. This is so that you can control the app from here. If you wish to revoke
                            access, you can find the option in the <a href='https://www.spotify.com/us/account/apps/' target='_blank' without rel="noreferrer">
                                Spotify App Settings</a>. While in here, look for Broadway and click the "Remove Access" button.
                        </p>
                        <br/>
                        <p>Finally, your background and microphone preferences are saved in your browser's site settings. Removing this simply requires you to
                            erase your browsing data entirely, or just the site settings for this website.
                        </p>
                        <h2>Sponsors</h2>
                        <EuiFlexGroup justifyContent='center' alignItems='center' gutterSize='xl'>
                            <img src={mcs} width='20%' height='20%' alt='mcs'/>
                            <img src={soup} width='20%' height='20%' alt='soup'/>
                        </EuiFlexGroup>
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