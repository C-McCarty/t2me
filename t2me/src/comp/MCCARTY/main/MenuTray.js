import c from '../CSS/chatClasses.module.css';

function MenuTray() {
    return (
        <div className={c.menuTrayWrap}>
            <button className={c.menuChatBtn} />
            <button className={c.menuContactsBtn} />
            <div className={c.menuSpacer} />
            <button className={c.menuSettingsBtn} />
            <button className={c.menuProfileBtn} />
        </div>
    )
}

export default MenuTray;