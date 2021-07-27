import React, {useState} from "react";
import Parse from "parse";
import Item from "../item/Item";
import {Redirect} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import './Items.css'
import DatePickerDialog from "../datepickerdialog/DatePickerDialog";
import 'react-google-flight-datepicker/dist/main.css';
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";

function Items() {
    // Method to convert a given date to a string
    function dateAsString(date) {
        const day = date.getDate()
        const month = monthToString(date.getMonth())
        const year = date.getFullYear()
        const dayOfWeek = dayToString(date.getDay())
        return day + " " + month + " " + year + " (" + dayOfWeek + ")"
    }

    // Method to convert a day to a string
    function dayToString(day) {
        switch (day) {
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
    }

    // Method to convert a month into a string
    function monthToString(day) {
        switch (day) {
            case 0:
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
        }
    }

    // Method to get today's date in UTC 00:00:00. For example 29/06/2021 18:54:37 IST will be converted to  29/06/2021
    // 00:00:00 UTC
    function dateInUTC(date) {
        date = date.toDate()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth()).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        return new Date(Date.UTC(yyyy, parseInt(mm), parseInt(dd), 0, 0, 0));
    }

    // Creating today's date in UTC so that it can be set as the initial state of date and dateText
    let today = new Date();
    today = moment(today);
    today = dateInUTC(today);

    // State to check if the DatePicker Dialog is open. By default it is false
    const [open, setOpen] = useState(false);
    // State that holds the date of the items by default it is today's date in 00:00:00 UTC
    const [date, setDate] = useState(today);
    // State that holds the string format of the date
    const [dateText, setDateText] = useState(dateAsString(today));
    // State that hold the items for the date state
    const [items, setItems] = useState([])
    // Checks if it is the first session so that it can render the default date's items
    const [firstRun, setFirstRun] = useState(true);
    // Checking if the user has not logged in
    if (!Parse.User.current()) {
        // If the user is not logged in we redirect him to the login screen
        return <Redirect to="/" />
    }
    // Stores the user which we will use to extract the username
    const user = Parse.User.current();
    // Extracting username form the variable "user"
    const name= user.get("username");

    // Checking if it is the firstRun. If it is we set "firstRun" to false and get and display all the items for the default date
    if (firstRun) {
        setFirstRun(false);
        getItemsForDate(today)
    }

    // Function that fetches data from the server and sets the received items as the state "items"
    async function getItemsForDate(date) {
        const Item = Parse.Object.extend("Items")
        const query = new Parse.Query(Item);
        query.equalTo("username", name);
        query.equalTo("Date", date)
        query.descending("createdAt")
        const results = await query.find();
        setItems([])
        setItems(results);
    }

    // Function that opens the DatePicker Dialog when the calendar icon is clicked
    const handleClickOpen = () => {
        setOpen(true)
    };

    // Function that is called when the DatePickerDialog is closed
    const handleClose = (date) => {
        // Sets its open state to false
        setOpen(false);
        // Constant that holds the UTC 00:00:00 date of the date chosen by the user
        const UTCDate = dateInUTC(date);
        // Getting items for the date chosen by the user
        getItemsForDate(UTCDate)
        // Setting the "date" state to the date chosen by the user
        setDate(UTCDate)
        // Constant that holds the date selected by the user as a string
        const UTCDateString = dateAsString(UTCDate);
        // Setting the "dateText" state as the string of the date chosen by the user
        setDateText(UTCDateString)
    };

    // Function that receives a ParseObject and presents the data as an "Item"
    function showItem(item) {
        return <Item
            objectId={item.id}
            itemname={item.get("ItemName")}
            price={item.get("Price")}
            date={item.get("Date")}
            itemObject={item}
            onDatabaseChange={onDatabaseChange}
        />
    }

    // Called when the user has successfully added a new item. Basically means refresh the page
    function onDatabaseChange() {
        getItemsForDate(date)
    }

    return (
        <div>
            {/* Navbar */}
            <Navbar active="Items"/>
            {/* Here is where the user enters a new item we give it a date of the "date" state so that the object
                entered has a date of the current date */}
            <Item date={date} onDatabaseChange={onDatabaseChange}/>
            { /* div that holds the date and calendar icon to open the DatePickerDialog */ }
            <div className="date-picker-items">
                <div style={{display: "inline-block",
                height: "100%"}}>
                </div>
                <div onClick={handleClickOpen} className="calendar-icon-wrapper">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24" >
                        <path fill="#FFFFFF" d="M19,3h-1L18,1h-2v2L8,3L8,1L6,1v2L5,3c-1.11,0 -1.99,0.9 -1.99,2L3,19c0,1.1 0.89,2 2,2h14c1.1,0 2,-0.9 2,-2L21,5c0,-1.1 -0.9,-2 -2,-2zM19,19L5,19L5,8h14v11zM7,10h5v5L7,15z"/>
                    </svg>
                </div>
                <h1 className="date-header">{dateText}</h1>
            </div>
            <DatePickerDialog selectedValue={date} open={open} date={moment(date)} onClose={handleClose} />
            {items.map(showItem)}
        </div>
    )
}

export default Items;