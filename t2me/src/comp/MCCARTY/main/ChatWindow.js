import { useState } from 'react';
import c from "../CSS/chatClasses.module.css"
import Message from "./Message"
// import EmojiMenu from "./EmojiMenu

function ChatWindow({ chatID, chatName, chatColor, setChatData, userID, user, currentChatHistory, isLoading }) {
    const [chatSettings, toggleChatSettings] = useState(false);

    const chatColorStyle = {
        backgroundImage: `linear-gradient(135deg, ${chatColor[0]}, ${chatColor[1]})`
    }
    if (isLoading) {
        return null;
    }
    else {
        const msgs = currentChatHistory.map((x) => {
            return  <Message
                        key={x[0]}
                        sentBy={x[2]}
                        userID={userID}
                        chatColor={chatColor}
                        timeStamp={new Date(x[3])}
                        msg={x[4]}
                        />
        });
        if (chatID === -1) {
            return (
                <div className={c.greeting}>
                        <div className={c.logo}></div>
                        <h2>Welcome, {user}</h2>
                        <p>Click on a chat to get started</p>
                </div>
            );
        }
        else if (chatID === -2) {
            return(
                <div>Create Chat Menu goes here</div>
            );
        }
        else {
            return (
                <div className={c.chatWrapper} style={chatColorStyle}>
                    <div className={c.chatHeader}>
                        <h2>{chatName}</h2>
                        <button className={c.chatSettings} onClick={()=>{toggleChatSettings(!chatSettings);}}></button>
                        <button className={c.chatClose} onClick={()=>{setChatData(-1, "", ["#fff", "#fff"]);}}></button>
                    </div>
                    <div className={c.chatHistory}>
                        {msgs}
                    </div>

                    <div className={c.messageBoxWrap}>
                        <div className={c.toolBar}>
                            {/* <EmojiMenu typeEmoji={typeEmoji} /> */}
                        </div>
                        <div className={c.messageBoxSeparator}>
                            <hr />
                        </div>
                        <textarea className={c.messageBox} name="msgBox" id="msgBox" placeholder="Type your message here..."></textarea>
                    </div>
                </div>
            );
        }
    }
}

export default ChatWindow;