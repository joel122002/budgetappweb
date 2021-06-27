import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import StyledInput from "../styledInput/StyledInput";
import './LoginForm.css'
import Parse from "parse";

function LoginForm(prop) {
    const history = useHistory();
    if (Parse.User.current()) {
        return <Redirect to="/items" />
    } else {
        var username;
        var password;

        function onChanged(object) {
            if (object.type == "password") {
                password = object.value
            }
            if (object.type == "username") {
                username = object.value
            }
        }

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

        return (
            <div className="form-wrapper">
                <div className="styled-input-wrapper">
                    <StyledInput type="text" placeholder="Username" name="username" onValChange={onChanged} widthInVW="25"/>
                </div>
                <div className="styled-input-wrapper below">
                    <StyledInput type="password" placeholder="Password" name="password" onValChange={onChanged} widthInVW="25"/>
                </div>
                <button onClick={buttonClick} className="button login">Submit</button>
            </div>
        )
    }
}

export default LoginForm;