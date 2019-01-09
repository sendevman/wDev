import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants.js';
/**
 * The Select Input Component.
 *
 * @version 1.0.2
 * @param  items - Objects of array
 * @param  onChange - Add method
 * @param  name - Name of input | name of Id
 * @param  selected - Selected a default item to show
 * @param  placeholder - Show the default text, "string" | true | false
 */

export default class SelectInput extends Component {
    state = {
        items: {},
    }

    render() {
        const { items, onChange, name, value, placeholder } = this.props;
        const content = typeof (placeholder);
        let defaultText = 'Select Item';
        if (content === 'string') {
            defaultText = placeholder;
        }

        return (
            <div className="input-group">
                <select id={name} name={name} className="custom-select noBorder bg-secondary text-white" onChange={onChange} value={value}>
                    <option>today</option>
                    <option>yesterday</option>
                    <option>this month</option>
                    <option>last month</option>
                    <option>this year</option>
                    <option>last year</option>
                    <option>custom</option>
                </select>
            </div>
        )
    }
};

