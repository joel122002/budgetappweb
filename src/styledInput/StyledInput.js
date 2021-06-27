import './StyledInput.css'
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';

function StyledInput(prop, ref) {
    var [text, setText] = useState("");
    const inputRef = useRef();

    useImperativeHandle(ref, ()=> ({
        clear: () => {
            inputRef.current.value = ""
        }
    }));
    function onValueChanged(event) {
        const attribute = event.target.name
        const value = event.target.value
        const ob = {
            type: attribute,
            value: value
        }
        prop.onValChange(ob)
        setText(event.target.value)
    }
    return (
        <div className="input-wrapper price">
            <div className="form__div">
                <input ref={inputRef} onChange={onValueChanged} value={prop.value} name={prop.name} type={prop.type} className="form__input" placeholder=" "></input>
                <label htmlFor="" className="form__label">{prop.placeholder}</label>
            </div>
        </div>
    )
}

StyledInput = forwardRef(StyledInput)

export default StyledInput;