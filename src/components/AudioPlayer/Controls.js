import styled from 'styled-components';

function Controls({ play, isPlaying, duration, currentTime }) {
    
    function secondsToHms(seconds) {
        if (!seconds) return '00m 00s'
    
        let duration = seconds
        let hours = duration / 3600
        duration = duration % 3600
    
        let min = parseInt(duration / 60)
        duration = duration % 60
    
        let sec = parseInt(duration)
    
        if (sec < 10) {
          sec = `0${sec}`
        }
        if (min < 10) {
          min = `0${min}`
        }
    
        if (parseInt(hours, 10) > 0) {
          return `${parseInt(hours, 10)}h ${min}m ${sec}s`
        } else if (min == 0) {
          return `00m ${sec}s`
        } else {
          return `${min}m ${sec}s`
        }
      }

    return (
        <ControlsContainer>
            <div className='timer'>{secondsToHms(currentTime)}</div>
            <div className='btn-container'>
                <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
            </div>
            <div className='timer'>{secondsToHms(duration)}</div>
        </ControlsContainer>
    )
}

const ControlsContainer = styled.div`
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    .timer {
        font-size: 10px;
        font-weight: 200;
        color: rgb(196, 196, 196);
    }

    .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    flex-grow: 1;
    }

    .btn-play {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 30px;
    border-color: transparent transparent transparent #ffffff;
    cursor: pointer;
    }

    .btn-stop {
    height: 40px;
    width: 30px;
    border-left: 10px solid rgb(255, 255, 255);
    border-right: 10px solid rgb(255, 255, 255);
    cursor: pointer;
    }

`;



export default Controls
