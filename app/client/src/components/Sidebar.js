import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

const Link = ({ to, icon, name, orange }) =>
    (<NavLink to={to} className={`nav-link text-white py-3 ${icon ? null : "text-center"} ${orange ? 'orange-link' : ''}`} activeClassName="active">
        {icon ? <i className={`fas mr-2 ${icon}`}></i> : null}
        {name}
    </NavLink>);

export default class SideBar extends Component {
    render() {

        return (
            <div className='col-md-2 col-lg-2 px-0 gradient h-100'>
                <nav id='navlinks' className="nav flex-column justify-content-center alignt-items-center">
                    <Link to="/" name='Home' orange />
                    <Link to="/lostexample" name='URL Lost Example' />
                    <Link to="/user" name='Users' />
                    <Link to="/team" name='Teams' />
                    <Link to="/contract" name='Contracts' />
                </nav>
            </div>
        )
    }
}