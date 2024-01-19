import React, { useEffect, useState, useRef } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiProgress } from '@elastic/eui';
import { msToTime } from '../utils';

export default function ProgressBar({ duration, elapsedTime, progressTime, running, onSeek }) {
    const progressBarRef = useRef(null);

    const handleProgressBarClick = (event) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const newTime = (clickPosition / rect.width) * duration;

        onSeek(newTime);
    };

    return (
        <EuiFlexGroup alignItems='center' justifyContent='center'>
            <div style={{ width: '90%' }}>
                <EuiFlexGroup responsive={false} alignItems='center' justifyContent='center' gutterSize='m'>
                    <EuiFlexItem grow={false}>{progressTime}</EuiFlexItem>
                    <EuiFlexItem>
                        <div ref={progressBarRef} onClick={handleProgressBarClick} >
                            <EuiProgress value={(elapsedTime / duration) * 100} max={100} className='progressbar' color={running ? '#1BD760' : 'subdued'} size='m' />
                        </div>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>{msToTime(duration)}</EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </EuiFlexGroup>
    );
};
