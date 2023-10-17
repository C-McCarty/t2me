// Cameron McCarty
// 09/18/2023

import formClass from "../CSS/classes.module.css"

function FormInput(props) {
    if (props.inpType === "password") {
        return (
            <div className={formClass.labelGroup} data-testid="FIE-P">
                <label htmlFor="pwd">Password:</label>
                <input
                    data-testid="IEP"
                    className={props.isValid ? null : formClass.invalidInput}
                    id="pwd" 
                    type="password"
                    name="pwd"
                    onChange={props.changeFunc}
                    value={props.val}
                    onBlur={props.blurFunc}
                    maxLength={20}
                    minLength={8}
                    required={true}
                    />
            </div>
        )
    }
    if (props.inpType === "email") {
        return (
            <div className={formClass.labelGroup} data-testid="FIE-E">
                <label htmlFor="email">Email:</label>
                <input
                    data-testid="IEE"
                    className={(props.isValid ? null : formClass.invalidInput)}
                    id="email" 
                    type="email" 
                    name="email"
                    onChange={props.changeFunc}
                    value={props.val}
                    onBlur={props.blurFunc}
                    required={true}
                    />
            </div>
        )
    }
    if (props.inpType === "confpwd") {
        return (
            <div className={formClass.labelGroup} data-testid="FIE-C">
            <label htmlFor="confpwd">Confirm Password:</label>
            <input
                data-testid="IEC"
                className={props.isValid ? null : formClass.invalidInput}
                id="confpwd" 
                type="password" 
                name="confpwd"
                onChange={props.changeFunc}
                value={props.val}
                onBlur={props.blurFunc}
                maxLength={20}
                minLength={8}
                required={true}
                />
            </div>
        )
    }
}

export default FormInput;