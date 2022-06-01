import {Link} from "react-router-dom";
import React from "react";

const SettingsHeader = ({current}) => {
    return (
        <nav className="nav nav-pills flex-lg-column mb-4">
            <Link  to="/dashboard/settings/profile"  className={`nav-link ${current === 'profile' ? 'active' : ''}`}> Profile Settings</Link>
            <Link  to="/dashboard/settings/store" className={`nav-link ${current === 'store' ? 'active' : ''}`}> Store Settings</Link>
            <Link  to="/dashboard/settings/account" className={`nav-link ${current === 'account' ? 'active' : ''}`}> Bank Account</Link>
        </nav>
    );
}

export default SettingsHeader;