import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import {DatePicker} from "@material-ui/pickers";

function DatePickerDialog(props) {
    // prop.onClose and prop.open are assigned to onClose and open respectively. This state defines what should happen
    // when the dialog is closed and its state (i.e. whether it is open or closed)
    const { onClose, open } = props;
    // This is the date on which the user is. When the website is freshly loaded it is today's date
    const selectedDate = props.date;
    // Setting the state for date. The value of this date will change based on what the user inputs
    const [date, changeDate] = useState(selectedDate);
    // Method called when the DatePickerDialog is closed
    const handleClose = () => {
        onClose(date);
    };

    return (
        // Dialog that holds the DatePicker
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            {/* DatePicker component.  Setting its value as the date state who's initial value is the date on which the
                user was before opening the dialog. Setting the max date to that of today as we don't want the user to
                enter items in future dates. On the user changing the date on the datepicker the date state is updated
                to the new value chosen by the user */}
            <DatePicker
                autoOk
                variant="static"
                openTo="date"
                value={date}
                maxDate={new Date()}
                onChange={changeDate}
            />
        </Dialog>
    );
}

// Setting some necessary attributes. (I didn't do it, it was already there in the documentation. So I thought to leave
// it as it is)
DatePickerDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default DatePickerDialog;