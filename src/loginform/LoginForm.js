import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import './LoginForm.css'
import Parse from "parse";

function LoginForm(prop) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    if (Parse.User.current()) {
        return <Redirect to="/items" />
    } else {

        var buttonClick = async (event) => {
            event.preventDefault();
            try{
                await Parse.User.logIn(username, password);
                alert("Logged in!");
                history.push('items');
            } catch (e){
                alert(e.message);
            }
        }

        function onUsernameChange(event) {
            const enteredValue = event.target.value;
            setUsername(enteredValue);
        }

        function onPasswordChange(event) {
            const enteredValue = event.target.value;
            setPassword(enteredValue);
        }

        return (
            <div className="form-wrapper">
                <div className="styled-input-wrapper">
                    <div className="input-wrapper">
                        <div className="form__div">
                            <input onChange={onUsernameChange} type="text" className="form__input" placeholder=" " />
                            <label htmlFor="" className="form__label">Username</label>
                        </div>
                    </div>
                </div>
                <div className="styled-input-wrapper below">
                    <div className="input-wrapper">
                        <div className="form__div">
                            <input onChange={onPasswordChange} type="password" className="form__input" placeholder=" " />
                            <label htmlFor="" className="form__label">Password</label>
                        </div>
                    </div>
                </div>
                <button onClick={buttonClick} className="button login">Submit</button>
            </div>
        )
    }
}

export default LoginForm;