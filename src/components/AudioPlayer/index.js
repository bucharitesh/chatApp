import styled from 'styled-components';
import { useState, useRef } from 'react';
import Slider from './Slider';
import Controls from './Controls';

function AudioPlayer({audioChat}) {

  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  return (
      <Audio>
          <Slider percentage={percentage} onChange={onChange} />
          <audio
            ref={audioRef}
            onTimeUpdate={getCurrDuration}
            onLoadedData={(e) => {
              setDuration(e.currentTarget.duration.toFixed(2))
            }}
            src={audioChat}
          ></audio>
          <Controls
            play={play}
            isPlaying={isPlaying}
            duration={duration}
            currentTime={currentTime}
          />  
      </Audio>
  )
}

const Audio = styled.div`
  width: 600px;
  padding: 0 10px;
  background-color: #272727;
  padding: 30px 50px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.479);
`;

export default AudioPlayer



