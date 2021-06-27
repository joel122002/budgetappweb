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
    // class Item {
    //     constructor(height, width) {
    //         this.height = height;
    //         this.width = width;
    //     }
    // }
    // async function a() {
    //     var Item = Parse.Object.extend("Items")
    //     var query = new Parse.Query(Item);
    //     query.equalTo("username", "Varghese Joseph");
    //     const results = await query.find();
    //     results.forEach(logItems)
    //     for (let i = 0; i < results.length; i++) {
    //         const object = results[i];
    //         console.log(object.id);
    //     }
    //     console.log("done")
    // }
    //
    // a()

    // query.first().then(function (pet) {
    //     if (pet) {
    //         console.log('Item found with Item: ' + pet.get("ItemName") + ' and Price: ' + pet.get("Price"));
    //     } else {
    //         console.log("Nothing found, please try again");
    //     }
    // }).catch(function (error) {
    //     console.log("Error: " + error.code + " " + error.message);
    // });
    function dateAsString(date) {
        console.log("DateAsString is called")
        const day = date.getDate()
        const month = monthToString(date.getMonth())
        const year = date.getFullYear()
        const dayOfWeek = dayToString(date.getDay())
        return day + " " + month + " " + year + " (" + dayOfWeek + ")"
    }

    function dayToString(day) {
        console.log("dayToString is called")
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

    function monthToString(day) {
        console.log("MonthToString is called")
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

    function dateInUTC(date) {
        console.log("DateInUTC is called")
        date = date.toDate()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth()).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return new Date(Date.UTC(yyyy, parseInt(mm), parseInt(dd), 0, 0, 0));
    }

    var today = new Date();
    today = moment(today);
    today = dateInUTC(today);

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(today);
    const [dateText, setDateText] = useState(dateAsString(today));
    const [items, setItems] = useState([])
    const [firstRun, setFirstRun] = useState(true);
    if (!Parse.User.current()) {
        return <Redirect to="/" />
    }

    var user = Parse.User.current();
    var name= user.get("username");

    if (firstRun) {
        console.log("First run is called")
        setFirstRun(false);
        getItemsForDate(today)
    }

    function logItems(obj) {
        console.log(obj)
    }

    async function getItemsForDate(date) {
        console.log("GetItems for date is called")
        var Item = Parse.Object.extend("Items")
        var query = new Parse.Query(Item);
        query.equalTo("username", name);
        console.log(date)
        query.equalTo("Date", date)
        query.descending("createdAt")
        const results = await query.find();
        setItems(results);
        // console.log(items)
        // results.forEach(logItems)
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = (value) => {
        setOpen(false);
        var c = dateInUTC(value);
        console.log(c)
        getItemsForDate(c)
        setDate(c)
        c = dateAsString(c)
        setDateText(c)
        // console.log(date)
    };

    function showItem(item) {
        return <Item objectId={item.get("objectId")} itemname={item.get("ItemName")} price={item.get("Price")}/>
    }

    function onDateChange(event) {
        console.log(event.target.value)

    }

    function onAdd() {
        getItemsForDate(date)
    }

    return (
        <div>
            <Navbar />
            <Item date={date} onAdd={onAdd}/>
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
            <DatePickerDialog selectedValue={date} open={open} date={date} onClose={handleClose} />
            {items.map(showItem)}
        </div>
    )
}

export default Items;