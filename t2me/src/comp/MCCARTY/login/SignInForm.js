// Cameron McCarty
// 09/11/2023

import { useState, useEffect } from 'react';

import FormInput from './FormInput';
import LoadingScreen from '../main/LoadingScreen';
import Header from '../general/Header';
import ResetPasswordPage from '../../TRAN/ResetPasswordPage';
import formClass from '../CSS/classes.module.css';

function SignInForm({setUser, setPassword, setUserID, isSignedIn}) {
    //// useState declarations
    // Values for email, password, and confirm password input fields
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confpwd, setConfPwd] = useState("");

    // Conditionals to control which form the user is seeing
    const [newUser, setSignInState] = useState(false);
    const [forgotPassword, setForgot] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [resetPasswordState, setResetPasswordState] = useState(false); // Set to true to test Tran's ResetPasswordPage component
    
    // Conditionals to control validation of user input
    const [validEmail, setEmailValidation] = useState(true);
    const [validPwd, setValidPwd] = useState([true, true, true, true, true, true]); // Length, Upper, Lower, Number, No Spaces, All Valid
    const [validConfPwd, setValidConfPwd] = useState(true);

    const [isLoading, setLoading] = useState(false);
    const [backendValidated, setBackendValidated] = useState(false);

    // Regex Email validator found here: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const REGEX_MATCH = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    //// Input field handlers
    function handleEmail(e) {
        setEmail(e.target.value.toString());
    }
    function handlePwd(e) {
        setPwd(e.target.value.toString());
    }
    function handleConfPwd(e) {
        setConfPwd(e.target.value.toString());
    }

    //// Validation functions
    function validateAll() {
        validateEmail();
        validatePwd();
        validateConfPwd();
    }
    
    function validateEmail() {
        if (email === "") {
            setEmailValidation(true);
            return;
        }
        if (email.toLowerCase().match(REGEX_MATCH)) {
            setEmailValidation(true);
            return;
        }
        setEmailValidation(false);
    }
    
    function validatePwd(x) {
        // Length, Upper, Lower, Number, No Spaces, All Valid
        setValidPwd([false, false, false, false, false, false]);
        if (pwd === "" || x === 1) {
            setValidPwd([true, true, true, true, true, true]);
            return;
        }
        let MeetsLenReq = false,
            MeetsUpperReq = false,
            MeetsLowerReq = false,
            MeetsNumReq = false,
            NoSpaces = true,
            MeetsAllReq = false;
        if (pwd.length >= 8 && pwd.length <= 20) { MeetsLenReq = true; }
        for (let i = 0; i < pwd.length; i++) {
            if (pwd.charCodeAt(i) >= 65 && pwd.charCodeAt(i) <= 90) { MeetsUpperReq = true; }
            if (pwd.charCodeAt(i) >= 97 && pwd.charCodeAt(i) <= 122) { MeetsLowerReq = true; }
            if (pwd.charCodeAt(i) >= 48 && pwd.charCodeAt(i) <= 57) { MeetsNumReq = true; }
            if (pwd[i] === " " || pwd[i] === "\t") { NoSpaces = false; }
            if (MeetsLenReq && MeetsUpperReq && MeetsLowerReq && MeetsNumReq && NoSpaces) { MeetsAllReq = true; break; }
        }

        setValidPwd([MeetsLenReq, MeetsUpperReq, MeetsLowerReq, MeetsNumReq, NoSpaces, MeetsAllReq]);
    }
    function modifiedValidatePwd() {
        validatePwd(1);
    }

    function validateConfPwd() {
        if (newUser === false) {
            return;
        }
        if (confpwd === pwd || confpwd === "") {
            setValidConfPwd(true);
            return;
        }
        setValidConfPwd(false);
    }

    //// Form submission handler
    function handleSubmit(e) {
        e.preventDefault();
        // Cancel submit if any input is empty or if any field is invalid
        if ((email === "") || (!forgotPassword && pwd === "") || (newUser && confpwd === "") || !validEmail || !validPwd[5] || !validConfPwd) {
            if (newUser && confpwd === "") setValidConfPwd(false);
            return;
        }

        validateEmail();

        if (!forgotPassword) { validatePwd(); }
        if (newUser) { validateConfPwd(); }

        // Handling the Forgot Password page
        if (forgotPassword) {
            setEmailSent(true); // Sets the page to the Email Sent Confirmation Page

            /*** Email-sending code goes here ***/

            return;
        }
        // Handling the Sign Up page
        if (newUser) {

            /*** Code to commit values to database goes here ***/

            setEmailSent(true);
            setForgot(true);
            return;
        }
        // Handling returning users
        else {
            setLoading(true);

            fetch('https://t2me-middleman.onrender.com/checkCredentialsAPI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: pwd }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                console.log(data.validCredentials);
                setBackendValidated(data.validCredentials);
            }).then(() => {
                setLoading(false);
                if (backendValidated === false) {
                    setValidPwd([validPwd[0],validPwd[1],validPwd[2],validPwd[3],validPwd[4],false]);
                    return;
                }
            }).then(() => {
                getUserData();
            }).catch((error) => {
                console.error('Error:', error);
            });

            function getUserData() {

                fetch("https://t2me-middleman.onrender.com/getUserDataAPI").then(
                    response => response.json()
                ).then(
                    data => {
                        setUser(data.userName);
                        setUserID(data.userID);
                        setPassword(pwd);
                        clearInputs();
                    }
                    ).catch(error => { console.log("Error:", error) });
                    
                // Currently there is no backend validation so the main page always displays
                
                // Display Main
                isSignedIn(true);
            }
        }
    }
    //// Reset function
    function clearInputs() {
        setEmail("");
        setPwd("");
        setConfPwd("");
        setEmailSent(false);
        setEmailValidation(true);
        setValidPwd([true, true, true, true, true, true]);
        setValidConfPwd(true);
    }
    //// Form-switching functions
    function swapForm() {
        setSignInState(!newUser);
        clearInputs();
    }
    function forgotPwd() {
        setForgot(!forgotPassword);
        clearInputs();
    }

    /*************************************************************** Generate JSX **************************************************************/

    if (isLoading) {
        return (
            <>
                <Header minimized={true} />
                <LoadingScreen />
            </>
        );
    }


    //////////////////////////////////////////////////////////// Password Reset Page ////////////////////////////////////////////////////////////
    if (resetPasswordState) {
        return (
            <>
                <Header />
                <ResetPasswordPage />
            </>
        )
    }
    //////////////////////////////////////// Email Sent Confirmation Page (Used for Sign Up and Forgot Password pages) ////////////////////////////////////////
    else if (emailSent) {
        return (
            <>
                <Header />
                <div id='formWrapper' className={formClass.loginForm}>
                    <div className={formClass.formSwapper}>
                        <button className={formClass.forgotPwdBackButton} onClick={forgotPwd}>Go Back</button>
                    </div>
                    <div className={formClass.formLogo} />
                    <h2>Email Sent!</h2>
                    <div className={formClass.confirmation}>
                        <p>An email has been sent to: {email}. The email will be sent within the next few minutes. Please follow the instructions in the email once you receive it.</p>
                    </div>
                </div>
            </>
        )
    }
    ////////////////////////////////////////////////// Forgot Password Page (Password Reset Request form) //////////////////////////////////////////////////
    else if (forgotPassword) {
        return (
            <>
                <Header />
                <div id='formWrapper' className={formClass.loginForm}>
                    {/* //////////////////// Form Swapper Button //////////////////// */}
                    <div className={formClass.formSwapper}>
                        <button className={formClass.forgotPwdBackButton} onClick={forgotPwd}>Go Back</button>
                    </div>
                    {/* //////////////////// Logo and Title //////////////////// */}
                    <div className={formClass.formLogo} />
                    <h2>Forgot Password</h2>
                    {/* //////////////////// Forgot Password Form //////////////////// */}
                    <form id='SignUpForm' onSubmit={handleSubmit}>
                        <div className={formClass.inpWrap}>
                            <div className={formClass.formInput}>
                                <FormInput
                                    inpType="email"
                                    changeFunc={handleEmail}
                                    val={email}
                                    blurFunc={validateEmail}
                                    isValid={validEmail}
                                    />
                                {validEmail ? null : <p className={formClass.invalid}>Invalid Email</p>}
                            </div>
                        </div>
                        <div className={formClass.submitBtnWrap}>
                            <button className={formClass.submitBtn} type='submit'>Send</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    //////////////////////////////////////////////////////////// Sign Up Page ////////////////////////////////////////////////////////////
    else if (newUser) {
        return (
            <>
                <Header />
                <div id='formWrapper' className={formClass.loginForm} data-testid="SUE">
                    {/* //////////////////// Form Swapper Button //////////////////// */}
                    <div className={formClass.formSwapper}>
                        <h3>Returning User? </h3>
                        <button onClick={swapForm}>Sign In</button>
                    </div>
                    {/* //////////////////// Logo and Title //////////////////// */}
                    <div className={formClass.formLogo}></div>
                    <h2>Sign Up</h2>
                    {/* //////////////////// Sign Up Form //////////////////// */}
                    <form id='SignUpForm' className={formClass.formGrid} onSubmit={handleSubmit}>
                        <div className={formClass.inpWrap}>
                            <div className={formClass.formInput}>
                                <FormInput
                                    inpType="email"
                                    changeFunc={handleEmail}
                                    val={email}
                                    blurFunc={validateAll}
                                    isValid={validEmail}
                                    />
                                {validEmail ? null : <p className={formClass.invalid}>Invalid Email</p>}
                            </div>
                            <div className={formClass.formInput}>
                                <FormInput
                                    inpType={"password"}
                                    changeFunc={handlePwd}
                                    val={pwd}
                                    blurFunc={validateAll}
                                    isValid={validPwd[5]}
                                    sizeReq={true}
                                    />
                                {
                                    validPwd[5] ? null : <div className={formClass.invalid}>
                                        <p>Password requires the following:</p>
                                        <ul>
                                            {validPwd[0] ? <></> : <li>Must be between 8-20 characters</li>}
                                            {validPwd[1] ? <></> : <li>An Uppercase Letter</li>}
                                            {validPwd[2] ? <></> : <li>A Lowercase Letter</li>}
                                            {validPwd[3] ? <></> : <li>A number</li>}
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className={formClass.formInput}>
                                <FormInput 
                                    inpType="confpwd"
                                    name="confpwd"
                                    changeFunc={handleConfPwd}
                                    val={confpwd}
                                    blurFunc={validateAll}
                                    isValid={validConfPwd}
                                    />
                                {validConfPwd ? null : <p className={formClass.invalid}>Passwords do not match</p>}
                            </div>
                        </div>
                        <div className={formClass.submitBtnWrap}>
                            <button className={formClass.submitBtn} type='submit' data-testid="SUB" >Sign Up</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
    //////////////////////////////////////////////////////////// Sign In Page ////////////////////////////////////////////////////////////
    else {
        return (
            <>
                <Header />
                <div id='formWrapper' className={formClass.loginForm} data-testid="SIE">
                    {/* //////////////////// Form Swapper Button //////////////////// */}
                    <div className={formClass.formSwapper}>
                        <h3>New here? </h3>
                        <button onClick={swapForm}>Sign Up</button>
                    </div>
                    {/* //////////////////// Logo and Title //////////////////// */}
                    <div className={formClass.formLogo}></div>
                    <h2>Sign In</h2>
                    {/* //////////////////// Sign In Form //////////////////// */}
                    <form id='SignInForm' className={formClass.formGrid} onSubmit={handleSubmit}>
                        <div className={formClass.inpWrap}>
                            <div className={formClass.formInput}>
                                <FormInput
                                    inpType="email"
                                    changeFunc={handleEmail}
                                    val={email}
                                    blurFunc={validateEmail}
                                    isValid={Boolean(validPwd[5] * validEmail)}
                                    />
                                {validEmail ? null : <p className={formClass.invalid}>Invalid Email</p>}
                            </div>
                        
                            <div className={formClass.formInput}>
                                <FormInput
                                    inpType="password"
                                    changeFunc={handlePwd}
                                    val={pwd}
                                    isValid={validPwd[5]}
                                    blurFunc={modifiedValidatePwd}
                                    sizeReq={false}
                                    />
                                {
                                    validPwd[5] ? null : <div className={formClass.invalid}>
                                        <p>Email or Password is incorrect.</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <button className={formClass.submitBtn} type='submit' data-testid="SBE">Sign In</button>
                        <div className={formClass.forgotPwdSection}>
                            <p>Forgot password?</p>
                            <button className={formClass.forgotPwdButton} onClick={forgotPwd}>Reset Password</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default SignInForm;