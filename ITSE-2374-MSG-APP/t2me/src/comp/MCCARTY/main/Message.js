import c from "../CSS/chatClasses.module.css"

function Message({sentBy, userID, chatColor, timeStamp, msg}) {
    function parseColor() {
        const temp = [chatColor[0].substring(1,8), chatColor[1].substring(1,8)];
        let x = `rgba(${parseInt(temp[0].substring(0,2), 16)},${parseInt(temp[0].substring(2,4), 16)},${parseInt(temp[0].substring(4,6), 16)},0.5)`;
        let y = `rgba(${parseInt(temp[1].substring(0,2), 16)},${parseInt(temp[1].substring(2,4), 16)},${parseInt(temp[1].substring(4,6), 16)},0.5)`;
        return [x,y];
    }
    const colors = parseColor();

    const colorStyle = (userID===sentBy) ? {
        backgroundImage: `linear-gradient(35deg, ${colors[0]}, ${colors[1]})`,
    } : {
        backgroundImage: `linear-gradient(35deg, rgba(128,128,128,0.5), rgba(255,255,255,0.5))`,
    };
    let dd = timeStamp.getDay();
    let mm = timeStamp.getMonth();
    let yyyy = timeStamp.getFullYear();
    let h = timeStamp.getHours();
    if (h > 11) h -= 10;
    if (h < 10) h = "0" + h;
    let m = timeStamp.getMinutes();
    if (m < 10) m = "0" + m;
    let ampm = ((timeStamp.getHours()>11) ? "PM" : "AM");
    const time = dd + "/" + mm + "/" + yyyy + " " + h + ":" + m + ampm;
    
    return(

        <div className={(userID===sentBy) ? c.msgWrap1 : c.msgWrap2}>
            <div className={c.timeStamp}><p>{time}</p></div>
            <div style={colorStyle} className={c.msg}>
                <p >{msg}</p>
            </div>
        </div>
    )
}

export default Message;