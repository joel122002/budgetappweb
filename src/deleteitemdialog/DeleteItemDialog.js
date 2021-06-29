import React, {useState} from 'react';
import './DeleteItemDialog.css'
import Dialog from '@material-ui/core/Dialog';

function DeleteItemDialog(props) {
    const { onClose, open } = props;
    const [option, selectedOption] = useState(false);

    const handleClose = () => {
        onClose(option);
    };

    function onNoClick(event) {
        event.preventDefault();
        onClose(option)
    }

    function onYesClick(event) {
        event.preventDefault();
        selectedOption(true);
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