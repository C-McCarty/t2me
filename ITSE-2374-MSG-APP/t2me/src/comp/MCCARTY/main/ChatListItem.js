import c from "../CSS/chatListItem.module.css"


function ChatListItem(props) {
    const chatColorIconStyle = {
        width: "1vw",
        height: "1vw",
        marginLeft: "1vw",
        borderRadius: "2vw",
        backgroundImage: `linear-gradient(135deg, ${props.chatColor[0]}, ${props.chatColor[1]})`
    }

    return (
        <>
            <hr className={c.separator} />
            <div
                className={c.chatListItemWrap}
                onClick={()=>{
                    props.setCurrentChatData(props.chatID, props.chatName, [props.chatColor[0], props.chatColor[1]]);
                }}>
                
                <div style={chatColorIconStyle} />
                
                <h4>{props.chatName}</h4>
                <div className={c.excerpt}>
                    <div>
                        <p>{props.latestMessage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatListItem;