// Cameron McCarty
// 09/11/2023

import headerClass from '../CSS/classes.module.css';

function Header({ minimized }) {
    if (minimized) {
        return (
            <header className={headerClass.headerMini} >
                {/* <div className={headerClass.headerLogoMini}></div> */}
            </header>
        )
    }
    else {
        return (
            <header className={headerClass.header} >
                <div className={headerClass.headerLogo}></div>
                <h1>T2me</h1>
            </header>
        )
    }
}

export default Header;