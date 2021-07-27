import Parse from "parse";
import React, {useEffect, useState} from "react";
import './Item.css'
import DeleteItemDialog from "../deleteitemdialog/DeleteItemDialog";

function Item(prop) {
    // State that holds the name of the item.
    const [itemname, setItemname] = useState("");
    // State that holds the price of the item.
    const [price, setPrice] = useState("");
    // State that holds the classname of the delete icon. It is changed when the user hovers over the item name input
    const [deleteIconClass, setDeleteItemClass] = useState("delete-icon");
    // State that determines whether the delete confirmation dialog is open or not
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // If we change the state in directly it infinitely renders the page. So to prevent this we use useEffect which
    // called after the render of the page so this doesn't result in infinite renders
    useEffect(() => {
        // setting the itemname state and price state to that sent from the items component.
        setItemname(prop.itemname);
        setPrice(prop.price)
    }, []);

    // Function that saves or updates the Item. If no objectId has been sent by the "items" component it means the user
    // has entered input in the topmost input and it means we have to add this item to the database as it doesn't exist
    // if there is an objectId passed by the "items" component 
    function saveOrUpdateItem(event) {
        // As the "check" is an "a" tag we don't want it to refresh (By default on clicking the "a" tag the page is
        // refreshed). To prevent this default action we event.preventDefault()
        event.preventDefault();
        // Getting today's date in UTC 00:00:00. For example 29/06/2021 18:54:37 IST will be converted to 29/06/2021
        // 00:00:00 UTC
        const today = prop.date;
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        // Final date in UTC
        const date = new Date(Date.UTC(yyyy, mm, dd));
        // If no objectId then add the item
        if (!prop.objectId) {
            // Referencing the "Items" class in back4app
            const Item = Parse.Object.extend("Items");
            // Creating a new object of type "Item"
            const item = new Item();
            // Setting it's attributes to that entered by the user
            item.set("ItemName", itemname);
            item.set("Price", parseInt(price));
            item.set("username", Parse.User.current().get("username"));
            item.set("Date", date);
            // Saving this "Item" to our backend i.e. back4app
            item.save()
                .then(() => {
                    // If successful
                    setItemname("")
                    setPrice("")
                    prop.onDatabaseChange();
                }, (error) => {
                    // If error encountered
                    alert('Failed to create new object, with error code: ' + error.message);

                });
        }
        // If objectId exists update the "Item" with that specific objectId
        else if (prop.objectId) {
            // The object was passed as a prop form the "Items" component
            const item = prop.itemObject;
            // Setting the updated values chosen by the user
            item.set("ItemName", itemname);
            item.set("Price", parseInt(price));
            item.set("username", Parse.User.current().get("username"));
            item.set("Date", date);
            item.save().then(() => {
                // If successful
                prop.onDatabaseChange();
            }, (error) => {
                // If error encountered
                alert('Failed to update object, with error code: ' + error.message);
            });
        }
    }

    // Function that is called when the price input value is changed by the user
    function onPriceChange(event) {
        // Getting the new value entered by the user
        const enteredValue = event.target.value;
        // Setting the value of the "price" state to the newly updated value so that what the user enters is in sync
        // with the value of the state
        setPrice(enteredValue);
    }

    // Function that is called when the item name input value is changed by the user
    function onItemnameChange(event) {
        // Getting the new value entered by the user
        const enteredValue = event.target.value;
        // Setting the value of the "itemname" state to the newly updated value so that what the user enters is in sync
        // with the value of the state
        setItemname(enteredValue);
    }

    // Function called when the user dismisses the dialog (either by clicking outside or clicking one of the buttons)
    function onCloseDeleteDialog(value) {
        // Setting the "deleteDialogOpen" state to false indicating the dialog to close itself
        setDeleteDialogOpen(false)
        // The value returned is true if the user clicks "Yes" in all other cases it is false indicating the user
        // doesn't want to delete the item
        if (value) {
            // Getting the object that has been passed as a prop
            const item = prop.itemObject;
            // Destroying (deleting) the "Item"
            item.destroy().then(() => {
                // If successful
                prop.onDatabaseChange();
            }, (error) => {
                // If error encountered
                console.error(error.message)
            })
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
                                setDeleteDialogOpen(true)
                            }}>
                                <svg className={deleteIconClass} xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 64 58.67">
                                    <title>Delete Item</title>
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