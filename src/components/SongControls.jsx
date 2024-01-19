import { faPlay, faPause, faForward, faBackward, faShuffle, faRepeat, faMicrophone, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nextSong, pauseSong, playSong, previousSong, setVolume, toggleRepeat, toggleShuffle } from "../utils";
import '../css/SongControls.css'
import { useEffect, useState } from "react";
import { EuiButtonIcon, EuiFlexGroup, EuiSpacer } from "@elastic/eui";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function SongControls({ running, shuffle, repeat, token, onToggleShuffle, onToggleRepeat, onToggleRunning, onSongChange }) {

    const [isListening, setIsListening] = useState(localStorage.getItem('isListening') === 'On' ? 'On' : 'Off')

    useEffect(() => {
        localStorage.setItem('isListening', isListening)
    }, [isListening])

    const commands = [
        {
            command: ['play', 'continue', 'start', 'go', 'resume', 'sing'],
            callback: () => {
                handleRunning(true); resetTranscript();
            },
            matchInterim: true
        },
        {
            command: ['stop', 'pause', 'shut up', 'silence', 'quiet'],
            callback: () => {
                handleRunning(false); resetTranscript();
            },
            matchInterim: true
        },
        {
            command: ['next (song) (track)', 'skip'],
            callback: () => {
                handleNext(); resetTranscript();
            },
            matchInterim: true
        },
        {
            command: ['previous (song) (track)', 'back'],
            callback: () => {
                handlePrevious(); resetTranscript();
            },
            matchInterim: true
        },
        {
            command: ['turn on shuffle', 'enable shuffle', 'shuffle on'],
            callback: () => { handleShuffle(true); },
            matchInterim: true
        },
        {
            command: ['turn off shuffle', 'disable shuffle', 'shuffle off'],
            callback: () => { handleShuffle(false); resetTranscript(); },
            matchInterim: true
        },
        {
            command: ['turn on repeat', 'enable repeat', 'repeat on', 'repeat (this) song', 'repeat (this) track'],
            callback: () => { handleRepeat(true); resetTranscript(); },
            matchInterim: true
        },
        {
            command: ['turn off repeat', 'disable repeat', 'repeat off'],
            callback: () => { handleRepeat(false); resetTranscript(); },
            matchInterim: true
        },
        {
            command: ['(set) volume :number (percent)'],
            callback: (number) => { handleVolumeChange(number); resetTranscript(); },
        }
    ]

    const { resetTranscript } = useSpeechRecognition({ commands })

    function handleRunning(value) {
        if (value === false) {
            pauseSong(token)
        } else {
            playSong(token)
        }
        onToggleRunning(value)
    }

    function handleShuffle(value) {
        toggleShuffle(value, token)
        onToggleShuffle(value)
    }

    function handleRepeat(value) {
        toggleRepeat(value, token)
        onToggleRepeat(value)
    }

    function handleNext() {
        nextSong(token)
        handleSongChange()
    }

    function handlePrevious() {
        previousSong(token)
        handleSongChange()
    }

    function handleSongChange() {
        setTimeout(function () {
            onSongChange(token)
        }, 1000)
    }

    function handleVolumeChange(value) {
        setVolume(value, token)
    }

    function handleMicToggle(value) {
        if (value === 'On') {
            SpeechRecognition.startListening({
                continuous: true
            });
            setIsListening('On');
        } else {
            SpeechRecognition.abortListening();
            setIsListening('Off');
        }
    }

    return (
        <>
            <EuiFlexGroup alignItems="center" justifyContent="center" responsive={false} gutterSize="m">
                <EuiButtonIcon
                    className='controlbtn'
                    aria-label='shuffle'
                    iconType={() => (<FontAwesomeIcon size="2xl" icon={faShuffle} color={shuffle ? "#1BD760" : "white" } />)}
                    onClick={() => handleShuffle(!shuffle)}
                    size="m"
                />
                <EuiButtonIcon
                    className='controlbtn'
                    aria-label='previous'
                    iconType={() => (<FontAwesomeIcon size="2xl" icon={faBackward} color="white" />)}
                    onClick={handlePrevious}
                    size="m"
                />
                <EuiButtonIcon
                    className='controlbtn'
                    aria-label='playback'
                    iconType={() => (<FontAwesomeIcon size="2xl" icon={running ? faPause : faPlay} color="white" />)}
                    onClick={() => handleRunning(!running)}
                    size="m"
                />
                <EuiButtonIcon
                    className='controlbtn'
                    aria-label='next'
                    iconType={() => (<FontAwesomeIcon size="2xl" icon={faForward} color="white" />)}
                    onClick={handleNext}
                    size="m"
                />
                <EuiButtonIcon
                    className='controlbtn'
                    aria-label='repeat'
                    iconType={() => (<FontAwesomeIcon size="2xl" icon={faRepeat} color={repeat ? "#1BD760" : "white" } />)}
                    onClick={() => handleRepeat(!repeat)}
                    size="m"
                />

            </EuiFlexGroup>
            <EuiSpacer size="s"/>
            <EuiFlexGroup alignItems="center" justifyContent="center">
                <span>
                    <FontAwesomeIcon className='miscoption' icon={faVolumeHigh} />
                    <select className='select' defaultValue={"100"} title="Set Volume Level" onChange={(val) => handleVolumeChange(val.target.value)}>
                        <option value="100">100</option>
                        <option value="90">90</option>
                        <option value="80">80</option>
                        <option value="70">70</option>
                        <option value="60">60</option>
                        <option value="50">50</option>
                        <option value="40">40</option>
                        <option value="30">30</option>
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="0">0</option>
                    </select>
                </span>
                <span>
                    <FontAwesomeIcon className='miscoption' icon={faMicrophone} />
                    <select className='select' defaultValue={isListening} title="Toggle Microphone" id="mic" onChange={(val) => handleMicToggle(val.target.value)}>
                        <option value="Off">Off</option>
                        <option value="On">On</option>
                    </select>
                </span>
            </EuiFlexGroup>
        </>
    )
}