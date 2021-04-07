import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

function Slider({ percentage = 0, onChange }) {

    const [position, setPosition] = useState(0)
    const [marginLeft, setMarginLeft] = useState(0)
    const [progressBarWidth, setProgressBarWidth] = useState(0)

    const rangeRef = useRef()
    const thumbRef = useRef()

    useEffect(() => {
        const rangeWidth = rangeRef.current.getBoundingClientRect().width
        const thumbWidth = thumbRef.current.getBoundingClientRect().width
        const centerThumb = (thumbWidth / 100) * percentage * -1
        const centerProgressBar =
          thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
        setPosition(percentage)
        setMarginLeft(centerThumb)
        setProgressBarWidth(centerProgressBar)
      }, [percentage])

    return (
        <SliderContainer>
            <div
                className='progress-bar-cover'
                style={{
                width: `${progressBarWidth}px`
                }}
            ></div>
            <div
                className='thumb'
                ref={thumbRef}
                style={{
                left: `${position}%`,
                marginLeft: `${marginLeft}px`
                }}
            ></div>
            <input
                type='range'
                value={position}
                ref={rangeRef}
                step='0.01'
                className='range'
                onChange={onChange}
            />
        </SliderContainer>
    )
}

const SliderContainer = styled.div`
    --progress-bar-height: 4px;
    position: relative;
    width: 100%;

    ::before {
        content: '';
        background-color: white;
        width: 99%;
        height: calc(var(--progress-bar-height) - 1px);
        display: block;
        position: absolute;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    /* Custom Progress Bar */
    .progress-bar-cover {
        background-color: rgb(218, 55, 145);
        width: 0%;
        height: var(--progress-bar-height);
        display: block;
        position: absolute;
        border-radius: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        user-select: none;
        pointer-events: none;
    }

    /*  Hide Original */
    .range {
        -webkit-appearance: none;
        background-color: rgba(240, 9, 9, 0.397);
        height: 10px;
        width: 100%;
        cursor: pointer;
        opacity: 0;
        margin: 0 auto;
    }

`;

export default Slider
