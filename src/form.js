import React from 'react';
import './App.css';

function Form(props) {
    return (
        <form id="inputform">
            <span className="bigtext"><input
                type="text"
                id="content"
                value={props.value}
                onChange={props.onChange} /></span>
        </form>
    );
}
export default Form;
