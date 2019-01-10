import React from "react";
import { COLORS } from '../config/constants';
/**
 * The Button Component.
 *
 * @version 1
 * @param  text - Add the text
 * @param  bigSize - Set the big size
 */
const Button = ({ text, bigSize, onClick, link, filter }) => {
    const typeClass = link ? "btn-link text-danger" : "text-white";
    let style = !link ? { ...styles.common } : {};
    if (bigSize) style = { ...style, ...styles.bigButton };
    if (filter) style = { ...style, ...styles.filter };
    return (
        <button type={`${onClick ? "button" : "submit"}`} onClick={onClick} className={`bg-secondary btn float-right border border-light ${typeClass}`} style={style}>
            {text}
        </button>
    )
};

const styles = {
    common: {
        // backgroundColor: COLORS.Orange,
        fontSize: 13
    },
    bigButton: {
        width: 110,
        height: 50
    },
    filter:{
        width: 100,
        height: 35
    }
}

export default Button;
