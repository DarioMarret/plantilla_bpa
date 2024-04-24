import React, { useState } from 'react';
import AdminNavbar from '../Components/Navbars/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';

export default function Admin() {

    const [collaseSidebar, setCollapseSidebar] = useState(true);

    const toggleMenu = () => {
        // quitar esta clase navbar-brand-box y agregar widthSidebar
        const navbarBrandBox = document.querySelector('.navbar-brand-box');
        const widthSidebar = document.querySelector('.vertical-menu');
        navbarBrandBox.classList.toggle('widthSidebar');
        widthSidebar.classList.toggle('widthSidebar');
        // remover la clase navbar-brand-box
    }

  return (
    <div id="layout-wrapper">
        <AdminNavbar
            collaseSidebar={collaseSidebar}
            setCollapseSidebar={setCollapseSidebar}
            toggleMenu={toggleMenu}
        />
        <Sidebar
            collaseSidebar={collaseSidebar}
        />
    </div>
  )
}
