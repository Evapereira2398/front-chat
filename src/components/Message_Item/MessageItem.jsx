import React from "react";
import './MessageItem.css'; 

export default ({data, user}) => {
    return (
        <div className="messageLine" 
             style={{justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}}>

            <div className="messageItem" 
                 style={{backgroundColor: user.id === data.author ? 'rgb(120, 247, 111, 0.3)' : 'rgba(255, 255, 255, 0.4)'}}>

                <div className="messageText">{data.body}</div>
                <div className="messagedate">19:00</div>
            </div>
            
        </div>
    )
}