import React, { Component } from 'react';
import SideBar from '../components/Sidebar';
import ErrorCatch from '../components/ErrorCatch';

export default class Layout extends Component {
    render() {
        const { children, account } = this.props;
        return (
            <ErrorCatch>
                <div className="d-flex flex-column" style={styles.flex} >
                    <div className="d-flex flex-row" style={styles.flex}>
                        <SideBar />
                        <div className='col-md-9 col-lg-9 h-100 p-0 d-flex flex-column'>
                            {children}
                        </div>
                    </div>
                </div>
            </ErrorCatch>
        )
    }
}

const styles = {
    flex: {
        flex: 1
    }
};