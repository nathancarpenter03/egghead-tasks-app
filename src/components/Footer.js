import React from 'react';
import {Link} from './router';

export const Footer = () => {
    return (
        <div className="footer">
            <Link to="/">All</Link>
            <Link to="/active">Active</Link>
            <Link to="/completed">Completed</Link>
            <div><br /><br />
                <span>Note: hover over an item to remove!</span>
            </div>
        </div>
    )
}