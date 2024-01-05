import React from 'react';
import SidebarDashboard from './SidebarDashboard';

const Layout = ({children}) => {
    return (
        <>
            <div className="d-flex">
                <SidebarDashboard/>
                {children}
            </div>
        </>
    )
}

export default Layout;

