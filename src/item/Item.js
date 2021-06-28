import Parse from "parse";
import React, {useEffect, useRef, useState} from "react";
import './Item.css'
import StyledInput from "../styledInput/StyledInput";

/*
prop:

objectId
date
itemname
price
 */

function Item(prop) {
    // var itemname, price;
    const [itemname, setItemname] = useState("");
    const [price, setPrice] = useState("");
    const childRef1 = useRef();
    const childRef = useRef();
    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        setItemname(prop.itemname);
        setPrice(prop.price)
    }, []);
    function onChanged(object) {
        if (object.type == "itemname") {
            setItemname(object.value)
            // itemname = object.value;
        } else if (object.type == "price") {
            setPrice(object.value)
            // price = object.value;
        }
    }

    function saveOrUpdateItem(event) {
        event.preventDefault();
        childRef.current.clear()
        childRef1.current.clear()
        if (!prop.objectId) {
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
        } else {

        }
    }


    return (
        <div className="item-wrapper-item">
            <div style={{
                display: "inline"
            }}>
                <div className="styled-input-wrapper-items item">
                    <StyledInput ref={childRef1} className="give-margin" type="text" placeholder="Item" name="itemname"
                                 onValChange={onChanged} value={itemname} showDelete={prop.itemname ? true : false}/>
                </div>
                <div className="styled-input-wrapper-items price">
                    <StyledInput ref={childRef} type="number" placeholder="Price" name="price" onValChange={onChanged} value={price}/>
                </div>
                <div style={
                    {
                        display: "inline-block",
                        top: "50%",
                        marginLeft: "20px",
                        transform: "translateY(-25%)"
                    }
                }>
                    <a href="" onClick={saveOrUpdateItem}>
                        <svg className="check-wrapper-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 62.2">
                            <path fill="#4CAF50" d="M26.7,50.4L5.9,29.6L0,35.6l26.7,26.7L83,5.9L74.1,0L26.7,50.4z"/>
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default Item;