import Parse from "parse";
import React, {useEffect, useRef, useState} from "react";
import './Item.css'
import DeleteItemDialog from "../deleteitemdialog/DeleteItemDialog";
// import StyledInput from "../styledInput/StyledInput";
// import {object} from "prop-types";

/*
prop:

objectId
date
itemname
price
 */

function Item(prop) {
    const [itemname, setItemname] = useState("");
    const [price, setPrice] = useState("");
    const [deleteIconClass, setDeleteItemClass] = useState("delete-icon");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const itemdate = prop.date
    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        setItemname(prop.itemname);
        setPrice(prop.price)
    }, []);

    function saveOrUpdateItem(event) {
        event.preventDefault();
        if (!prop.objectId) {
            console.log(prop.objectId);
            console.log(prop.date)
            var today = prop.date;
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var date = new Date(Date.UTC(yyyy, mm, dd));
            const Item = Parse.Object.extend("Items");
            const item = new Item();
            console.log(itemname + " " + price)
            item.set("ItemName", itemname);
            item.set("Price", parseInt(price));
            item.set("username", Parse.User.current().get("username"));
            item.set("Date", date);
            item.save()
                .then((item) => {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + item.id);
                    setItemname("")
                    setPrice("")
                    prop.onAdd();
                }, (error) => {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);

                });
        } else if (prop.objectId) {
            var today = prop.date;
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var date = new Date(Date.UTC(yyyy, mm, dd));
            const item = prop.itemObject;

            item.set("ItemName", itemname);
            item.set("Price", parseInt(price));
            item.set("username", Parse.User.current().get("username"));
            item.set("Date", date);
            item.save().then(() => {
                prop.onAdd();
            });
        }
    }

    function onPriceChange(event) {
        const enteredValue = event.target.value;
        setPrice(enteredValue);
    }

    function onItemnameChange(event) {
        const enteredValue = event.target.value;
        setItemname(enteredValue);
    }

    function onCloseDeleteDialog(value) {
        setDeleteDialogOpen(false)
        if (value) {
            const item = prop.itemObject;
            item.destroy().then((myObject) => {
                prop.onAdd();
            }, (error) => {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
            })
        }
        else {
            console.log("No")
        }
    }

    return (
        <div className="item-wrapper-item">
            <div style={{
                display: "inline"
            }}>
                <div className="styled-input-wrapper-items item">
                    <div className="input-wrapper">
                        <div className="form__div" onMouseEnter={() => setDeleteItemClass("delete-icon show")} onMouseLeave={() => setDeleteItemClass("delete-icon")}>
                            {prop.objectId ? <a href="" onClick={(event) => {
                                event.preventDefault();
                                console.log("Hello")
                                setDeleteDialogOpen(true)
                            }}>
                                <svg className={deleteIconClass} xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 64 58.67">
                                    <title>Asset 25</title>
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path fill="#FFFFFF"
                                                  d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"/>
                                            <path fill="#FFFFFF"
                                                  d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"/>
                                            <path fill="#FFFFFF"
                                                  d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"/>
                                        </g>
                                    </g>
                                </svg>
                            </a> : null}
                            <input onChange={onItemnameChange} type="text" value={itemname} className="form__input"
                                   placeholder=" "/>
                            <label htmlFor="" className="form__label">Item</label>
                        </div>
                    </div>
                </div>
                <div className="styled-input-wrapper-items price">
                    <div className="input-wrapper">
                        <div className="form__div">
                            <input onChange={onPriceChange} type="number" value={price} className="form__input"
                                   placeholder=" "/>
                            <label htmlFor="" className="form__label">Price</label>
                        </div>
                    </div>
                </div>
                <div className="check-outer-wrapper">
                    <a href="" onClick={saveOrUpdateItem}>
                        <svg className="check-wrapper-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 62.2">
                            <path fill="#4CAF50" d="M26.7,50.4L5.9,29.6L0,35.6l26.7,26.7L83,5.9L74.1,0L26.7,50.4z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <DeleteItemDialog onClose={onCloseDeleteDialog} open={deleteDialogOpen}/>
        </div>
    )
}

export default Item;