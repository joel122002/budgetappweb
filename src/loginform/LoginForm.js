import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import './LoginForm.css'
import Parse from "parse";

function LoginForm() {
    // States that holds the username and password entered by the user in the inputs
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // Allows us to change the URL of the page thus redirecting to another page. The page does note refresh in this case
    // it is only re-rendered
    const history = useHistory();
    // If user has already logged in redirecting to "/items"
    if (Parse.User.current()) {
        return <Redirect to="/items" />
    } else {
        // Function called on clicking the login button
        var buttonClick = async (event) => {
            event.preventDefault();
            try{
                await Parse.User.logIn(username, password);
                history.push('items');
            } catch (e){
                alert(e.message);
            }
        }

        // Function called when there is a change in the username input
        function onUsernameChange(event) {
            const enteredValue = event.target.value;
            setUsername(enteredValue);
        }

        // Function called when there is a change in the password input
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
                <button onClick={buttonClick} className="button login">Login</button>
            </div>
        )
    }
}

export default LoginForm;