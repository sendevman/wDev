import React, { Component } from "react";
import { COLORS } from '../config/constants';
/**
 * The Breadcrumb Component.
 *
 * @version 1.0.2
 * @param  name - Add the current path
 */

 const Breadcrumb = ({ name }) => {
    return (
        <div style={styles.container}>
            <div className='float-right'>
                <p className='ml-auto mt-3 mr-5' style={styles.breadcrum}>Home > {name}</p>
            </div>
        </div>
    )
};

const styles = {
    container: {
        backgroundColor: COLORS.LightGray,
        height: 56
    },
    breadcrum: {
        color: COLORS.White,
        fontSize: 14
    }
};

export default Breadcrumb;