import React from 'react';
import Nav from './Nav';
import Home from './home/Home';
import Register from './register/Register';
import StyledInput from "./styledInput/StyledInput";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    useHistory,
    withRouter,
    Redirect
} from "react-router-dom";
import Parse from 'parse';
import LoginForm from "./loginform/LoginForm";
import Items from "./items/Items";
console.log(process.env.REACT_APP_APPLICATION_ID)
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
                {/*<div className="App">*/}
                {/*    <LoginForm />*/}
                {/*    /!*<Nav />*!/*/}
                {/*    /!*<Switch>*!/*/}
                {/*    /!*  <Route path="/" exact component={Home}></Route>*!/*/}
                {/*    /!*  <Route path="/register" exact component={Register}></Route>*!/*/}
                {/*    /!*</Switch>*!/*/}
                {/*</div>*/}
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    );
}

export default App;
