import React from 'react';
import SidebarProfile from "./SidebarProfile";

const LayoutProfile = ({children}) => {
    return (
        <>
            <div className="d-flex">
                <SidebarProfile/>
                {children}
            </div>
        </>
    )
}

export default LayoutProfile;