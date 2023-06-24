import NavbarTop from '@/pages/admin/components/navbars/navbar-top';
import Sidebar from '@/pages/admin/components/sidebar/sidebar';
import React, { useState } from 'react';


function AdminLayout({children}) {
    const [showMenu, setShowMenu] = useState(true);
    const toggleSidebar = () => {
        return setShowMenu(!showMenu);
    }

    return (
        <div id='wrapper' className={`${showMenu ? "" : "toggled"}`}>
            <Sidebar />
            <div className='page-content'>
                <NavbarTop toggleSidebar={toggleSidebar} />
                <div className="main-content p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;