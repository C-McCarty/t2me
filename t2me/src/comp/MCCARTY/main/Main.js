import Sidebar from "./Sidebar";
import MenuTray from "./MenuTray";
import ChatWindow from "./ChatWindow";
import LoadingScreen from "./LoadingScreen";
import Header from "../general/Header";
import c from "../CSS/chatClasses.module.css";
import { useState, useEffect } from "react";


function Main({ user, userID }) {
    const MAIN_CONTENT_HEIGHT = window.innerHeight - 36;

    const [currentChatID, setCurrentChatID] = useState(-1);
    const [currentChatName, setCurrentChatName] = useState("");
    const [currentChatColor, setCurrentChatColor] = useState(["#fff","#fff"]);
    const [currentChatHistory, setCurrentChatHistory] = useState([]);

    //// Fetching backend data
    const [loading, setLoading] = useState(true);
    const [backendData, setBackendData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [chatHistories, setChatHistories] = useState([]);

    useEffect(() => {
        fetch("https://t2me-middleman.onrender.com/pullAPI").then(
            response => response.json()
        ).then(
            data => {
                if (JSON.stringify(data) !== JSON.stringify(backendData)) {
                    setBackendData(data);
                }
                setLoading(false);
            }
        ).catch(error => { console.log("Error:", error) });
    }, []);

    if (chatHistories !== backendData.chatHistories) {
        setChatHistories(backendData.chatHistories);
    }
    if (chatData !== backendData.chatData) {
        setChatData(backendData.chatData);
    }

    if (currentChatID > 0 && chatHistories.length > 0) {
        const msgs = [];
        let c = 0;
        for (let i = 0; i < chatHistories.length; i++) {
            if (chatHistories[i][1] === currentChatID) {
                msgs[c] = chatHistories[i];
                c++;
            }
        }
        if (msgs.toString() !== currentChatHistory.toString()) {
            setCurrentChatHistory(msgs);
        }
    }

    function setCurrentChatData(x, y, z) {
        setCurrentChatID(x);
        setCurrentChatName(y);
        setCurrentChatColor(z);
    }
    if (loading) {
        return (
            <>
                <Header minimized={true} />
                <LoadingScreen />
            </>
        )
    }

    return (
        <>
            <Header minimized={true} />
            <div className={c.mainWrap} style={{height: MAIN_CONTENT_HEIGHT}}>
                <MenuTray />
                {loading ? null :
                <Sidebar
                    userID={userID}
                    setCurrentChatData={setCurrentChatData}
                    currentChatHistory={currentChatHistory}
                    chatData={chatData}
                    isLoading={loading}
                    />
                }
                <div className={c.mainContent}>
                    {loading ? null :
                    <ChatWindow
                                user={user}
                                chatID={currentChatID}
                                chatName={currentChatName}
                                chatColor={currentChatColor}
                                userID={userID}
                                setChatData={setCurrentChatData}
                                currentChatHistory={currentChatHistory}
                                isLoading={loading}
                                    />
                    }
                </div>
            </div>
        </>
    )
}

export default Main;
