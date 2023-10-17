import { useState } from 'react';
import Header from './comp/MCCARTY/general/Header.js';
import Main from './comp/MCCARTY/main/Main.js';
import SignUpForm from './comp/MCCARTY/login/SignInForm.js';
import appStyle from './comp/MCCARTY/CSS/classes.module.css';
import GeneralCSS from "./comp/MCCARTY/CSS/general.css";

function App() {
    const [signedIn, setSignInState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    // const [userPassword, setUserPassword] = useState("");

    if (signedIn) {
        return (
            <div>
                <Header minimized={true} />
                <Main user={userName} userID={userID} />
            </div>
        );
    }
    else {
        return (
            <div className={appStyle.loginScreenWrapper}>
                <Header />
                <SignUpForm
                    setUserID={setUserID}
                    setUser={setUserName}
                    // setPassword={setUserPassword}
                    isSignedIn={setSignInState}
                    />
            </div>
        );
    }
}

export default App;