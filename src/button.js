import React from 'react';
import './button.css';

function Button(props) {
    return (
        <button
            className={props.class}
            onClick={() => props.onClick(props.symbol)}>
            {props.symbol}
        </button>
    );
}
export default Button;
