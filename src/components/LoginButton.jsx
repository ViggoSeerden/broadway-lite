import '../css/LoginButton.css'
import spotify from '../img/spotify.png'

export default function LoginButton() {
    const authEndpoint = "https://accounts.spotify.com/authorize/?"

    const clientId = process.env.CLIENT_ID
    const redirectUri = process.env.REDIRECT_URI

    const scopes = [
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-modify-playback-state',
    ]

    return (
        <a
            className="btn btn--loginApp-link fadein"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
            <button className="SpotifyBtn fadein">
                <img className="SpotifyImg" src={spotify} alt="Spotify Logo" title="Log in with your Spotify account" width='40' />
                <p id="login">Log In</p>
            </button>
        </a>
    )
}