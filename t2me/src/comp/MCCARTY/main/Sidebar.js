import ChatListItem from "./ChatListItem";
import c from "../CSS/chatClasses.module.css";

function Sidebar(props) {

    
    const chats = props.chatData.map((x) => {
        return <ChatListItem
                    key={x[0]}
                    chatID={x[0]}
                    chatName={x[1]}
                    chatColor={x[2]}
                    latestMessage={x[3]}
                    setCurrentChatData={props.setCurrentChatData}
                        />
    });

    return (
        <div className={c.sidebar}>
            <div className={c.sidebarHeader}>
                <h2>Chats</h2>
                <div><button type="button" className={c.createChatBtn} onClick={()=>{props.setCurrentChatData(-2, "Create Chat", ["#fff", "#fff"])}}></button></div>
            </div>
            <div className={c.messageList}>
                {chats}
            </div>
        </div>
    )
}
export default Sidebar;