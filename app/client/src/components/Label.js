import React, { Component, Fragment } from "react";

export default class Label extends Component {
    render() {
        const { label, b, labelClass } = this.props;
        return (
            <Fragment>
                {label ? <label className={labelClass ? labelClass : undefined}><small className={b ? "form-text text-muted font-weight-bold" : "form-text text-muted"}>{label}</small></label> : null}
            </Fragment>
        )
    }
}