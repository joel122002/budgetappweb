import React, {useEffect, useRef, useState} from "react";
import Parse from "parse";
import {Redirect} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ReactExport from "react-export-excel";
import './MonthlyCalculator.css'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function MonthlyCalculator() {
    // Function to convert month from int to a string
    function monthToString(month) {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    // State that holds the current month in int
    const [currentMonthState, setCurrentMonthState] = useState(0);
    // State that holds the current year in int
    const [currentYearState, setCurrentYearState] = useState(0);
    // State that holds the month as a string
    const [month, setMonth] = useState('January');
    // State that holds the year as int
    const [year, setYear] = useState(0);
    // State that tracks the current user's expense for the current month
    const [currentUserExpense, setCurrentUserExpense] = useState(0);
    // State that tracks the current user's expense for the current year
    const [allUsersExpense, setAllUsersExpense] = useState(0);
    // State that holds the items bought by the user for the current month. (Used to generate a spreadsheet)
    const [itemsForMonthState, setItemsForMonthState] = useState([]);
    // State that holds the items bought by the all users for the current month. (Used to generate a spreadsheet)
    const [itemsForMonthCurrentUserState, setItemsForMonthCurrentUserState] = useState([]);

    // Variables that hold the year and month. We use this because setState is an asynchronous process and so we can't
    // update the value displayed on the screen at will. You'll understand what we mean later
    let currentMonth = currentMonthState;
    let currentYear = currentYearState;

    // Variables that hold the items of the current user and items of all the users. We use this because setState is an
    // asynchronous process and so we can't update the value displayed on the screen at will. You'll understand what we
    // mean later
    let itemsForMonth = itemsForMonthState;
    let itemsForMonthCurrentUser = itemsForMonthCurrentUserState;

    // A reference to an invisible button that we want to programmatically click so as to generate the second \
    // spreadsheet
    const childRef = useRef(null);

    // If we change the state in directly it infinitely renders the page. So to prevent this we use useEffect which
    // called after the render of the page so this doesn't result in infinite renders
    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        const today = new Date();
        currentMonth = today.getMonth();
        setCurrentMonthState(currentMonth);
        currentYear = today.getFullYear()
        setCurrentYearState(currentYear);
        const monthAsString = monthToString(currentMonth);
        setMonth(monthAsString)
        setYear(today.getFullYear());
        getItemsForMonth();

    }, []);

    // Checking if the user is logged in
    if (!Parse.User.current()) {
        // If the user is not logged in we redirect him to the login screen
        return <Redirect to="/" />
    }

    // Getting the currently logged in user's username
    const currentUsername = Parse.User.current().get("username")

    // Function that creates a refined object from the results and separates the current user's items from all users
    // items
    function filterResults(results) {
        // Clearing the items of all users and current user as we are going to fill in new data.
        itemsForMonth = []
        itemsForMonthCurrentUser = []
        // Setting the expense of all users and the current user's to zero as we have to add all the prices to get the
        // total
        let userExpense = 0;
        let expense = 0;
        // Iterating through the results
        results.forEach((item) => {
            // Extracting the item's name
            const itemName = item.get("ItemName");
            // Extracting the item's price
            const price = item.get("Price");
            // Extracting the date the item was created
            const date = item.get("Date");
            // Extracting the username of the user who created this item
            const username = item.get("username");
            // Parsing the date to dd/mm/yyyy
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = date.getFullYear();
            const dateAsString = dd + '/' + mm + '/' + yyyy;
            // Creating a JSON object with the extracted data. We will add this to the array and present the array as a
            // spreadsheet if the user clicks on the generate button
            const itemObject = {
                date: dateAsString,
                itemName: itemName,
                price: price
            }
            // Adding this item to the array of all users items
            itemsForMonth.push(itemObject);
            // Adding this item's price to the total of all users
            expense += price
            // If the username of the author of the object matches with the username of the logged in user then we add
            // this to the array of items of the current user and add the price of the object to the current user's
            // total
            if (username === currentUsername) {
                // Adding this item to the array of current user's items
                itemsForMonthCurrentUser.push(itemObject)
                // Adding this items price to the total of the current user
                userExpense += price
            }
        })
        // Updating the state of the items for all users
        setItemsForMonthState(itemsForMonth);
        // Updating the state of the items for the current user
        setItemsForMonthCurrentUserState(itemsForMonthCurrentUser);
        // Updating the state of the total for all users
        setCurrentUserExpense(userExpense);
        // Updating the state of the total for the current user
        setAllUsersExpense(expense);
    }

    // Function to get the items of all the users for the current month
    async function getItemsForMonth() {
        // Setting the starting date as the fist day of this month
        const startDate = new Date(Date.UTC(currentYear,currentMonth,1))
        // Now we increase the month by one so if it is december we increase the year by one else we just increase the
        // month. "currentYearLocal" holds the new year and "nextMonth" holds the next month
        let currentYearLocal;
        let nextMonth;
        // Checking if december
        if (currentMonth === 11) {
            // Setting month to January
            nextMonth = 0
            // Setting "currentYearLocal" to be the current year + 1
            currentYearLocal = currentYear + 1;
        } else {
            // Setting nextMonth to the next month of the current month. For example if current month is February,
            // nextMonth will we March
            nextMonth = currentMonth + 1;
            // No change in year and so the "currentYearLocal" is equal to the current year
            currentYearLocal = currentYear
        }
        // Setting the end date to the first day of the next month
        const endDate = new Date(Date.UTC(currentYearLocal, nextMonth, 1))
        // Referencing the "Items" class in back4app
        const Item = Parse.Object.extend("Items")
        // Creating a new query to get the Items
        const query = new Parse.Query(Item);
        // Setting the start date. We want items entered that day and the days ahead so greater that or equal to
        query.greaterThanOrEqualTo("Date", startDate);
        // Setting the end date. We want items bought before this date and don't want items of the first day of the next
        // month so less than
        query.lessThan("Date", endDate);
        // Ordering it in the descending order. (This is not really required)
        query.descending("createdAt")
        // Getting the objects asynchronously
        const results = await query.find();
        // Filtering the results
        filterResults(results)
    }

    // Function that is called when the previous button is clicked
    function decrementMonth() {
        // Decreasing the current month by 1
        --currentMonth;
        // Checking if the current month before decrementing was January.
        if (currentMonth === -1) {
            // Decreasing the year as a month before January was the previous year
            --currentYear;
            // Setting the current year state to the decreased year
            setCurrentYearState(currentYear)
            // Setting the current month to December
            currentMonth = 11;
        }
        // Setting the current month state to the changed month
        setCurrentMonthState(currentMonth)
        // Getting a string month by passing the int month
        const monthAsString = monthToString(currentMonth);
        // Setting the string month state as this string value of the month
        setMonth(monthAsString);
        // Setting the current year as the state of "year" state
        setYear(currentYear);
        // Setting all users total state to 0
        setAllUsersExpense(0);
        // Setting current user's total state to 0
        setCurrentUserExpense(0);
        getItemsForMonth();
    }

    // Function that is called when the next button is clicked
    function incrementMonth() {
        // Increasing the current month by 1
        ++currentMonth;

        // Checking if the current month before incrementing was December.
        if (currentMonth === 12) {
            // Increasing the year as a month after December is the next year
            ++currentYear;
            // Setting the current year state to the increased year
            setCurrentYearState(currentYear)
            // Setting the current month to January
            currentMonth = 0;
        }
        // Setting the current month state to the changed month
        setCurrentMonthState(currentMonth)
        // Getting a string month by passing the int month
        const monthAsString = monthToString(currentMonth);
        // Setting the string month state as this string value of the month
        setMonth(monthAsString)
        // Setting the current year as the state of "year" state
        setYear(currentYear);
        // Setting all users total state to 0
        setAllUsersExpense(0);
        // Setting current user's total state to 0
        setCurrentUserExpense(0);
        getItemsForMonth();
    }

    function generateExcelSheet() {
        childRef.current.click();
    }

    return (
        <div>
            {/* Navbar */}
            <Navbar active=""/>
            <h1 className="calc-month-text">{month + " " + year}</h1>
            <p className="calc-expense-text">{currentUsername + " : " + currentUserExpense}</p>
            <p className="calc-expense-text">{"All users : " + allUsersExpense}</p>
            <div className="calc-button-wrapper">
                <ExcelFile element={<button className="calc-control-button center" onClick={generateExcelSheet}>Generate Excel sheet</button>} filename={String(currentMonth+1).padStart(2, '0') + "CurrentUser"}>
                    <ExcelSheet data={() => {
                        const lastRow= {
                            date: "",
                            itemName: "Total",
                            price: currentUserExpense
                        };
                        const tempArr = [];
                        tempArr.push(lastRow)
                        const finalArr = itemsForMonthCurrentUser.concat(tempArr)
                        return finalArr;
                    }} name="Items">
                        <ExcelColumn label="Date" value="date"/>
                        <ExcelColumn label="Item Name" value="itemName"/>
                        <ExcelColumn label="Price" value="price"/>
                    </ExcelSheet>
                </ExcelFile>
                <ExcelFile element={<button style={{display: "none"}} ref={childRef} className="calc-control-button center" onClick={generateExcelSheet}>Generate Excel sheet</button>} filename={String(currentMonth+1).padStart(2, '0') + "AllUsers"}>
                    <ExcelSheet data={() => {
                        const lastRow = {
                            date: "",
                            itemName: "Total",
                            price: allUsersExpense
                        };
                        const tempArr = []
                        tempArr.push(lastRow)
                        const finalArr = itemsForMonth.concat(tempArr)
                        return finalArr;
                    }} name="Items">
                        <ExcelColumn label="Date" value="date"/>
                        <ExcelColumn label="Item Name" value="itemName"/>
                        <ExcelColumn label="Price" value="price"/>
                    </ExcelSheet>
                </ExcelFile>
                <button className="calc-control-button left" onClick={decrementMonth}>Previous</button>
                <button className="calc-control-button right" onClick={incrementMonth}>Next</button>
            </div>
        </div>
    )
}

export default MonthlyCalculator