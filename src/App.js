import React from 'react';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, BrowserRouter,} from "react-router-dom";
import Parse from 'parse';
import LoginForm from "./loginform/LoginForm";
import Items from "./items/Items";

Parse.initialize(process.env.REACT_APP_APPLICATION_ID, process.env.REACT_APP_JAVASCRIP_KEY);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

function App() {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter>
                <Switch>
                    <Route path="/items" component={Items}/>
                    <Route path="/" component={LoginForm}/>
                </Switch>
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    );
}

export default App;
