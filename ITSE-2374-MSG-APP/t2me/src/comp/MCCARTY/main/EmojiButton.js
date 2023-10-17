import c from './EmojiMenu.module.css'
import { useState } from 'react';

function EmojiButton({ emoji, typeEmoji, eid }) {

    function getEmojiCode(e) {
        e.preventDefault();
        typeEmoji(eid);
    }

    return(
        <button onClick={getEmojiCode} className={c.emojiButton}><div>{emoji}</div></button>
    );
}

export default EmojiButton;