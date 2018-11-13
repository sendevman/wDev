import React, { Component } from "react";

export default class ProfileInput extends Component {
    render() {
        const { src } = this.props;
        return (
            <div className="text-center">
                <img src={src} className="rounded-circle" />
            </div>
        )
    }
}