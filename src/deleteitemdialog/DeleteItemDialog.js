import React, {useState} from 'react';
import './DeleteItemDialog.css'
import Dialog from '@material-ui/core/Dialog';

function DeleteItemDialog(props) {
    // prop.onClose and prop.open are assigned to onClose and open respectively. This state defines what should happen
    // when the dialog is closed and its state (i.e. whether it is open or closed)
    const { onClose, open } = props;
    // State which indicates the the option chosen by the user (delete or not). By default it is false because if the
    // user clicks outside the dialog and the dialog is dismissed we do not want to delete the item. On closing the
    // dialog if option is true it deletes the item.
    const [option, setOption] = useState(false);

    // This function is called when the dialog is closed
    const handleClose = () => {
        onClose(option);
    };

    // This function is called when the No Button is clicked
    function onNoClick(event) {
        // As the No button is an "a" tag we don't want it to refresh (By default on clicking the "a" tag the page is
        // refreshed). To prevent this default action we event.preventDefault()
        event.preventDefault();
        // Calling the onClose prop which is a function that takes the value selected by the user to determine if the
        // object has to be deleted or not
        onClose(option)
    }

    // This function is called when the Yes Button is clicked
    function onYesClick(event) {
        // As the Yes button is an "a" tag we don't want it to refresh (By default on clicking the "a" tag the page is
        // refreshed). To prevent this default action we event.preventDefault()
        event.preventDefault();
        // Setting the option to true as the user has chosen Yes indicating he wants to delete the item. We don't set
        // this to false in onNoClick() because its default value is flase
        setOption(true);
        // Calling the onClose prop which is a function that takes the value selected by the user to determine if the
        // object has to be deleted or not
        onClose(true);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="delete-item-dialog">
                <h2 className="delete-item-dialog-header">Delete</h2>
                <p className="delete-item-dialog-text">Are you sure you want to delete this item?</p>
                <div className="delete-item-dialog-button-wrapper">
                    <a href="" className="delete-item-dialog-no-button" onClick={onNoClick}><span>No</span></a>
                    <a href="" className="delete-item-dialog-yes-button" onClick={onYesClick}><span>Yes</span></a>
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteItemDialog;