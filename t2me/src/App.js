import { useState } from 'react';
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
        return <Main user={userName} userID={userID} />
    }
    else {
        return (
            <div className={appStyle.loginScreenWrapper}>
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