import TimeAgo from 'timeago-react';
import './ChatItem.css';

function ChatItem({user,data}) {

    return (
        <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user.phoneNumber === data.author ? "user" : "other"}`}
      >
        <div className="chat__item__content">         
          <div className="chat__msg">          
            {/* Image */}
            {
              data.messageType == "image" &&     
                <img src={data.imageURL} alt=""/>
            }
            {/* Text */}
            {
              data.messageType == "text" && 
              data.message
            }
            {/* Audio */}
            {
              data.messageType == "audio" && 
              <audio controls >
                <source src={data.audioURL} type="audio/mpeg" />
              </audio>
            }  
          </div>
          <div className="chatItemTime">
            <span>{
                    data.messageTime ? (
                        <TimeAgo datetime= {data.messageTime.toDate()} live={false} />
                    ) : "Long Time Ago"
                  }
            </span>
          </div>
        </div>
      </div>
    )
}

export default ChatItem
