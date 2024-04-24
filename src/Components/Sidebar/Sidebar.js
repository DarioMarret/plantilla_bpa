import React, { useState } from 'react';

export default function Sidebar() {
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
    const [showConfigSubMenu, setShowConfigSubMenu] = useState(false);





    return (
        <div className="vertical-menu">

            <div data-simplebar className="h-100">

                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title" data-key="t-menu">Menu</li>

                        <li>
                            <a href="#;">
                                <i className="bx bx-home-circle"></i>
                                <span data-key="t-dashboard">Dashboard</span>
                            </a>
                        </li>


                        <li>
                            <a href="#;">
                                <i className='bx bx-user'></i>
                                <span data-key="t-dashboard">Pacientes</span>
                            </a>
                        </li>



                        <li>
                            <a href="#;">
                                <i className='bx bx-calendar'></i>
                                <span data-key="t-dashboard">Agenda</span>
                            </a>
                        </li>


                        <li>
                            <a href="#;" className="has-arrow"
                                onClick={() => setShowConfigSubMenu(!showConfigSubMenu)}
                            >
                                <i className='bx bx-file'></i>
                                <span data-key="t-apps">Facturas</span>
                            </a>

                            <ul className={showConfigSubMenu ? "sub-menu" : "sub-menu collapse"}>
                                <li>
                                    <a href="#;">
                                        <span data-key="t-calendar">Listar</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#;">
                                        <span data-key="t-chat">Crear</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-title mt-2" data-key="t-components">Reportes</li>
                        <li>
                            <a href="#;" className="has-arrow" onClick={() => setShowReportsSubMenu(!showReportsSubMenu)}>
                                <i className='bx bx-bar-chart-alt-2'></i>
                                <span data-key="t-pages">Reportes</span>
                            </a>
                            <ul className={showReportsSubMenu ? "sub-menu" : "sub-menu collapse"}>
                                <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                <li><a href="pages-comingsoon.html" data-key="t-coming-soon">Coming Soon</a></li>
                                <li><a href="pages-timeline.html" data-key="t-timeline">Timeline</a></li>
                                <li><a href="pages-faqs.html" data-key="t-faqs">FAQs</a></li>
                                <li><a href="pages-pricing.html" data-key="t-pricing">Pricing</a></li>
                                <li><a href="pages-404.html" data-key="t-error-404">Error 404</a></li>
                                <li><a href="pages-500.html" data-key="t-error-500">Error 500</a></li>
                            </ul>
                        </li>

                        <li className="menu-title mt-2" data-key="t-components">Configuración</li>

                        <li>
                            <a href="#;">
                                <i className='bx bx-cog'></i>
                                <span data-key="t-dashboard">Configuración</span>
                            </a>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    )
}
