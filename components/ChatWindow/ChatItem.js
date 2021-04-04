import TimeAgo from 'timeago-react';

function ChatItem({user,data}) {
    return (
        <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user.phoneNumber === data.author ? "user" : "other"}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{data.message}</div>
          <div className="chat__meta">
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
