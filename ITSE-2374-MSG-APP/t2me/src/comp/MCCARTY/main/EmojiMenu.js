import c from './EmojiMenu.module.css';
import EmojiButton from './EmojiButton';
import { emojis } from './emojis';

function EmojiMenu({ typeEmoji }) {
    const emojiCodes = emojis();

    function callTypeEmoji() {
        typeEmoji();
    }
    
    const LIST = [];
    for (let i = 0; i < emojiCodes.length; i++) {
        LIST[i] = <EmojiButton eid={i} typeEmoji={callTypeEmoji} emoji={`${emojiCodes[i]}`} />;
    }

    return(
        <div className={c.emojiMenu}>
            <div className={c.listWrapper}>{LIST}</div>
        </div>
    );
}

export default EmojiMenu;