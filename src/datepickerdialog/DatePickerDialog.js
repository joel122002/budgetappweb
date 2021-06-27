import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import * as moment from 'moment';
import {DatePicker} from "@material-ui/pickers";
import { parseISO } from '@date-io/moment'

function DatePickerDialog(props) {
    const { onClose, open } = props;
    const selectedDate = props.date;
    const [date, changeDate] = useState(selectedDate);
    const handleClose = () => {
        var dateDate = date.toDate()
        var dd = String(dateDate.getDate()).padStart(2, '0');
        var mm = String(dateDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateDate.getFullYear();

        var str = mm + '/' + dd + '/' + yyyy;
        // console.log(str)
        onClose(date);
        console.log(dateDate)
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
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

DatePickerDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default DatePickerDialog;