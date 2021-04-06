import TimeAgo from 'timeago-react';
import styled from 'styled-components';

// import { BsPlayFill } from 'react-icons/bs'

function ChatItem({user,data}) {

    return (
        <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user.phoneNumber === data.author ? "user" : "other"}`}
      >
        <div className="chat__item__content">
          {data.messageType == "audio" && 
            <audio controls >
              <source src={data.audioURL} type="audio/mpeg" />
            </audio>

            // <Audio>
            //     <div class="_2rB2Y">
            //       <div class="Hei0U">
            //         <div class="GrwLb _2hsTo">
            //           <div class="E2qvM">
            //             <button class="_28Dfr">
            //               <BsPlayFill size="2em"/>
            //             </button>
            //           </div>
            //           <div class="_23Fho">
            //             <span aria-label="Voice message"></span>
            //             <div class="_2O_ZT">0:05</div><div class="sQ3Ia">
            //               <span class="_3cCXU" style={{width: 0}}></span>
            //               <input dir="ltr" type="range" class="_3TWTE" min="0" max="100" value="0" />
            //                 <audio autoplay preload="auto">
            //                   <source src={data.audioURL} type="audio/mpeg" />
            //                 </audio>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div class="_23QsC">
            //         <div class="_1S-g9">
            //           <div class="_2myan _1vuxa vDSDs">
            //             <span data-testid="ptt-status" data-icon="ptt-status" class="">
            //             </span>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            // </Audio>
          }

          {data.messageType == "image" && 
            <div className="chat__msg">
              <img src={data.imageURL} alt=""/>
            </div>
          }

          {data.messageType == "text" && <div className="chat__msg">{data.message}</div>}
          
          <Time>
            <span>{
                    data.messageTime ? (
                        <TimeAgo datetime= {data.messageTime.toDate()} live={false} />
                    ) : "Long Time Ago"
                  }
            </span>
          </Time>
        </div>
      </div>
    )
}

const Audio = styled.div`
  padding: 6px;
  box-sizing: border-box;
  width: 236px;
  max-width: 100%;

  /* ._3MHVj ._2rB2Y {
    flex-direction: row-reverse;
}



.GrwLb {
    display: flex;
    align-items: center;
    direction: ltr;
}

._23Fho, .E2qvM {
    position: relative;
}
.E2qvM {
    display: block;
    flex: none;
    width: 34px;
    height: 34px;
    margin-top: -1px;
    margin-right: 12px;
}

._28Dfr {   
    width: 34px;
    height: 34px;
    background-color: inherit;
    color: white;
}

._23Fho {
    flex: 1;
}
._23Fho, .E2qvM {
    position: relative;
}

._2O_ZT {
    position: absolute;
    bottom: -19px;
    font-size: 11px;
    line-height: 15px;
    color: #fff;
}

._3TWTE {
    box-sizing: border-box;
    display: block;
    height: 21px;
    background-color: initial!important;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

._3TWTE, .sQ3Ia {
    position: relative;
    width: 100%;
}

.sQ3Ia {
    top: -1px;
}

._3TWTE {
    box-sizing: border-box;
    display: block;
    height: 21px;
    background-color: initial!important;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
} */
`;


const Time = styled.div`
  right: 7px;
  bottom: 4px;
  display: flex;
  justify-content: space-between;
  position: absolute;


  span {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    user-select: none;
  }
`;  

export default ChatItem
