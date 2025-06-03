
import React, { useState , useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom"
function Chat({socket , userName , room}) {
    const now = new Date();
    const timeString = now.getHours() + ":" + now.getMinutes();


     const [currentMessage , setCurrentMessage ] = useState("")
     const [messageList , setMessageList ] = useState([""])

     const sendMessage = () => {
        if(currentMessage !== ""){
            const messageContent = {
                
                room : room, 
                author : userName,
                message : currentMessage,
                time : timeString
            }
            socket.emit("send_message" , messageContent)
            setCurrentMessage("");
            setMessageList((list) => [...list , messageContent]);    
        }
        
     }
     useEffect( () => {
            socket.on("recieve_message" , (data) => {
                setMessageList((list) => [...list , data]);
                
            })
        }, [socket])


  return (
    <div className = "chat-window">
        <div className = "chat-header">
            <p>Live Chat</p>
        </div>
        <div className = "chat-body">
            <ScrollToBottom className = "message-container">

           
            {messageList.map((messageContent) => {
                return <div className ="message" id = {userName === messageContent.author ? "you" : "other" }>
                    <div>
                        <div className = "message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className = "message-meta">
                            <p id = "time">{messageContent.time}</p>
                            <p id = "author">{messageContent.author}</p>
                        </div>
                    </div>
                </div>            
                
            })}

            </ScrollToBottom>
        </div>
        <div className = "chat-footer">
           <input
                type="text"
                placeholder="Enter text"
                value={currentMessage}
                onChange={(event) => setCurrentMessage(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                    sendMessage();
                    }
                }}
                />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
        
    </div>
  )
}

export default Chat