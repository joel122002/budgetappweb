import React from "react";
import Parse from "parse";
import './Navbar.css'
import {useHistory} from "react-router-dom";
function Navbar() {
    const history = useHistory();
    function logOutCurrentUserAndRedirect() {
        Parse.User.logOut().then(() => {
            history.push('');
        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Budget App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="">Items</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Laundry</a>
                        </li>
                    </ul>
                    <a className="navbar-text nav-link" onClick={logOutCurrentUserAndRedirect} href="">Logout</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;