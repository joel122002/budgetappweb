import React, {useEffect, useRef, useState} from "react";
import Parse from "parse";
import {Redirect} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ReactExport from "react-export-excel";
import './MonthlyCalculator.css'

function MonthlyCalculator() {
    function monthToString(month) {
        console.log("MonthToString is called")
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

    const [currentMonthState, setCurrentMonthState] = useState(0);
    const [curryearState, setCurryearState] = useState(0);

    var currentMonth = currentMonthState;
    var curryear = curryearState;
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(0);
    const [currentUserExpense, setCurrentUserExpense] = useState(0);
    const [allUsersExpense, setAllUsersExpense] = useState(0);
    const childRef = useRef(null);

    const [itemsForMonthState, setItemsForMonthState] = useState([]);
    const [itemsForMonthCurrentUserState, setItemsForMonthCurrentUserState] = useState([]);
    var itemsForMonth = itemsForMonthState;
    var itemsForMonthCurrentUser = itemsForMonthCurrentUserState;

    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        const today = new Date();
        currentMonth = today.getMonth();
        setCurrentMonthState(currentMonth);
        curryear = today.getFullYear()
        setCurryearState(curryear);
        var monthAsString = monthToString(currentMonth);
        setMonth(monthAsString)
        setYear(today.getFullYear());
        getItemsForMonth();

    }, []);

    if (!Parse.User.current()) {
        // If the user is not logged in we redirect him to the login screen
        return <Redirect to="/" />
    }

    const currentUsername = Parse.User.current().get("username")

    function filterResults(results) {
        itemsForMonth = []
        itemsForMonthCurrentUser = []
        var userExpense = 0;
        var expense = 0;
        results.forEach((item) => {
            var itemName = item.get("ItemName");
            var price = item.get("Price");
            var date = item.get("Date");
            var username = item.get("username");
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            var dateAsString = mm + '/' + dd + '/' + yyyy;
            var itemObject = {
                date: dateAsString,
                itemName: itemName,
                price: price
            }
            itemsForMonth.push(itemObject);
            expense += price
            if (username === currentUsername) {
                itemsForMonthCurrentUser.push(itemObject)
                userExpense += price
            }
        })
        setItemsForMonthState(itemsForMonth);
        setItemsForMonthCurrentUserState(itemsForMonthCurrentUser);
        setCurrentUserExpense(userExpense);
        setAllUsersExpense(expense);
    }

    async function getItemsForMonth() {
        var startDate = new Date(Date.UTC(curryear,currentMonth,1))
        var currentYear;
        var nextMonth;
        if (currentMonth === 11) {
            nextMonth = 0
            currentYear = curryear + 1;
        } else {
            nextMonth = currentMonth + 1;
            currentYear = curryear
        }
        var endDate = new Date(Date.UTC(currentYear, nextMonth, 1))
        var Item = Parse.Object.extend("Items")
        var query = new Parse.Query(Item);
        console.log("StartDate = ", startDate)
        console.log("EndDate = ", endDate)
        query.greaterThanOrEqualTo("Date", startDate);
        query.lessThan("Date", endDate);
        query.descending("createdAt")
        const results = await query.find();
        console.log(results)
        filterResults(results)
    }

    function decrementMonth() {
        console.log("Month is : ", currentMonth)
        console.log("Year is : ", curryear)
        --currentMonth;
        setCurrentMonthState(currentMonth)
        if (currentMonth === -1) {
            --curryear;
            setCurryearState(curryear)
            currentMonth = 11;
            setCurrentMonthState(11)
        }
        var monthAsString = monthToString(currentMonth);
        setMonth(monthAsString)
        setYear(curryear);
        setAllUsersExpense(0);
        setCurrentUserExpense(0);
        getItemsForMonth();
    }

    function incrementMonth() {
        // Should not ever set state during rendering, so do this in useEffect instead.
        ++currentMonth;
        setCurrentMonthState(currentMonth)
        if (currentMonth === 12) {
            ++curryear;
            setCurryearState(curryear)
            currentMonth = 0;
            setCurrentMonthState(0)
        }
        var monthAsString = monthToString(currentMonth);
        setMonth(monthAsString)
        setYear(curryear);
        getItemsForMonth();
    }

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    function generateExcelSheet() {
        console.log(itemsForMonth)
        console.log(itemsForMonthCurrentUser)
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
                    <ExcelSheet data={itemsForMonthCurrentUser} name="Employees">
                        <ExcelColumn label="Date" value="date"/>
                        <ExcelColumn label="Item Name" value="itemName"/>
                        <ExcelColumn label="Price" value="price"/>
                    </ExcelSheet>
                </ExcelFile>
                <ExcelFile element={<button style={{display: "none"}} ref={childRef} className="calc-control-button center" onClick={generateExcelSheet}>Generate Excel sheet</button>} filename={String(currentMonth+1).padStart(2, '0') + "AllUsers"}>
                    <ExcelSheet data={itemsForMonth} name="Employees">
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