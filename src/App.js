import React from 'react';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, BrowserRouter,} from "react-router-dom";
import Parse from 'parse';
import LoginForm from "./loginform/LoginForm";
import Items from "./items/Items";
import MonthlyCalculator from "./monthlycalculator/MonthlyCalculator";

/* Connecting to our back4app server */
Parse.initialize(process.env.REACT_APP_APPLICATION_ID, process.env.REACT_APP_JAVASCRIP_KEY);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

function App() {
    return (
        /* Used to set the date library which the DatePicker uses. Here we are using moment as our date library */
        <MuiPickersUtilsProvider utils={MomentUtils}>
            {/* Browser router uses HTML5 history API to keep the UI in sync with the URL */}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                {/* Renders the first child <Route> or <Redirect> that matches the location. For example if you have "/"
                    as the path for your first route it will be rendered irrespective of the route as "/anything" is a
                    subset of "/". Therefore it is necessary to keep "/" at the last and all the sub locations/routes on
                    top. Similarly if you have to display a different component for "/calc/display" you have to place
                    it above "/calc" */}
                <Switch>
                    {/* Routes determine which component is rendered for that route/location */}
                    <Route path="/calc" component={MonthlyCalculator}/>
                    <Route path="/items" component={Items}/>
                    <Route path="/" component={LoginForm}/>
                </Switch>
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    );
}

export default App;
