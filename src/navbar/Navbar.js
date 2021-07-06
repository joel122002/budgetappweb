import React from "react";
import Parse from "parse";
import './Navbar.css'
import {useHistory} from "react-router-dom";

function Navbar(props) {
    const history = useHistory();
    function logOutCurrentUserAndRedirect(event) {
        event.preventDefault()
        Parse.User.logOut().then(() => {
            history.push('');
        });
    }
    function onCalcClick(event) {
        event.preventDefault()
        history.push('/calc');
    }

    function onItemsClick(event) {
        event.preventDefault()
        history.push('/items');
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
                            <a className={"nav-link" + (props.active === "Items" ? " active" : "")} aria-current="page"  onClick={onItemsClick} href="">Items</a>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className={"nav-link" + (props.active === "Laundry" ? " active" : "")} href="">Laundry</a>*/}
                        {/*</li>*/}
                    </ul>
                    <a href="" onClick={onCalcClick}>
                        <svg className="navbar-text nav-link" xmlns="http://www.w3.org/2000/svg"
                             width="50"
                             height="50"
                             viewBox="0 0 489.43 663.42">
                            <path
                                d="M450,0L39.43,0A39.43,39.43 0,0 0,0 39.43L0,624A39.43,39.43 0,0 0,39.43 663.42L450,663.42A39.43,39.43 0,0 0,489.43 624L489.43,39.43A39.43,39.43 0,0 0,450 0ZM44.86,419.3A17.31,17.31 0,0 1,62.18 402h64A17.32,17.32 0,0 1,143.43 419.3v63a17.33,17.33 0,0 1,-17.32 17.32h-64a17.32,17.32 0,0 1,-17.32 -17.32ZM45.27,355.95v-63a17.32,17.32 0,0 1,17.32 -17.32h64a17.31,17.31 0,0 1,17.32 17.32v63a17.32,17.32 0,0 1,-17.32 17.32h-64A17.33,17.33 0,0 1,45.27 356ZM144.27,608.66A17.31,17.31 0,0 1,126.98 626h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM290.27,607.66A17.31,17.31 0,0 1,272.98 625h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM191.07,354.34v-63A17.31,17.31 0,0 1,208.43 274h64a17.32,17.32 0,0 1,17.32 17.32v63A17.33,17.33 0,0 1,272.43 371.66L208.43,371.66A17.32,17.32 0,0 1,191.1 354.34ZM290.27,482.66A17.31,17.31 0,0 1,272.98 500h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM436.27,607.66A17.31,17.31 0,0 1,418.98 625h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM437.27,482.66A17.31,17.31 0,0 1,419.98 500h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM437.27,355.66A17.31,17.31 0,0 1,419.98 373h-64a17.32,17.32 0,0 1,-17.32 -17.32v-63a17.33,17.33 0,0 1,17.32 -17.32h64a17.32,17.32 0,0 1,17.32 17.32ZM443.54,205.39a15.4,15.4 0,0 1,-15.39 15.4L60.25,220.79a15.4,15.4 0,0 1,-15.39 -15.4L44.86,70.32a15.39,15.39 0,0 1,15.39 -15.39L428.18,54.93a15.39,15.39 0,0 1,15.39 15.39Z"
                                fill="#fff"/>
                        </svg>
                    </a>
                    <a className="navbar-text nav-link" onClick={logOutCurrentUserAndRedirect} href="">Logout</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;