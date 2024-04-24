import React from 'react';
import calendario from "../../Assets/images/brands/calendar.png";
import dropbox from "../../Assets/images/brands/dropbox.png";
import facturas from "../../Assets/images/brands/facturas.png";
import mail from "../../Assets/images/brands/mail_chimp.png";
import pacientes from "../../Assets/images/brands/pacientes.png";
import slack from "../../Assets/images/brands/slack.png";
import logoDesktop from "../../Assets/images/logo.svg";
import avatar from "../../Assets/images/users/avatar-3.jpg";
import avatar6 from "../../Assets/images/users/avatar-6.jpg";
import avatarDefault from "../../Assets/images/users/default-avatar.jpg";

export default function AdminNavbar({collaseSidebar, setCollapseSidebar, toggleMenu}) {

    return (
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box ">
                            <a href="#;" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logoDesktop} alt="" width={24} />
                                </span>
                                <span className="logo-lg">
                                    <img src={logoDesktop} alt="" width={24} /> 
                                        {
                                            collaseSidebar ?
                                                    <span className="logo-txt">SmartMedic</span>
                                                :
                                                null
                                        }
                                </span>
                            </a>
                            <a href="#;" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logoDesktop} alt="" width={24} />
                                </span>
                                {collaseSidebar ?
                                    <span className="logo-lg">
                                        <img src={logoDesktop} alt="" width={24} />
                                    </span>
                                    :
                                    <span className="logo-lg">
                                        <img src={logoDesktop} alt="" width={24} /> <span className="logo-txt">SmartMedic</span>
                                    </span>
                                }
                            </a>
                        </div>

                        <button type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn"
                            // onClick={() => setCollapseSidebar(!collaseSidebar)}
                            onClick={toggleMenu}
                        >
                            <i className="fa fa-fw fa-bars"></i>
                        </button>

                    </div>

                    <div className="d-flex">

                        <div className="dropdown d-inline-block d-lg-none ms-2">
                            <button type="button" className="btn header-item" id="page-header-search-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="search" className="icon-lg"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-search-dropdown">

                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Search Result" />

                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>


                        <div className="dropdown d-none d-sm-inline-block">
                            <button type="button" className="btn header-item" id="mode-setting-btn">
                                <i data-feather="moon" className="icon-lg layout-mode-dark"></i>
                                <i data-feather="sun" className="icon-lg layout-mode-light"></i>
                            </button>
                        </div>

                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button type="button" className="btn header-item"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="grid" className="icon-lg"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                                <div className="p-2">
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={calendario} alt="Github" />
                                                <span>Agenda</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={pacientes} alt="bitbucket" />
                                                <span>Pacientes</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={facturas} alt="dribbble" />
                                                <span>Facturas</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={dropbox} alt="dropbox" />
                                                <span>Dropbox</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={mail} alt="mail_chimp" />
                                                <span>Mail Chimp</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#;">
                                                <img src={slack} alt="slack" />
                                                <span>Slack</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon position-relative" id="page-header-notifications-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="bell" className="icon-lg"></i>
                                <span className="badge bg-danger rounded-pill">5</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0"> Notifications </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="small text-reset text-decoration-underline"> Unread (3)</a>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{
                                    maxHeight: '230px'}}>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img src={avatar} className="rounded-circle avatar-sm" alt="user-pic" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">James Lemire</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">It will seem like simplified English.</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span>1 hours ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i className="bx bx-cart"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Your order is placed</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span>3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                    <i className="bx bx-badge-check"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Your item is shipped</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span>3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img src={avatar6} className="rounded-circle avatar-sm" alt="user-pic" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Salena Layfield</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span>1 hours ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>


                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item bg-soft-light border-start border-end" id="page-header-user-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src={avatarDefault}
                                    alt="Header Avatar" />
                                <span className="d-none d-xl-inline-block ms-1 fw-medium"> Admin </span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="apps-contacts-profile.html"><i className="mdi mdi-face-profile font-size-16 align-middle me-1"></i> Profile</a>
                                <a className="dropdown-item" href="auth-lock-screen.html"><i className="mdi mdi-lock font-size-16 align-middle me-1"></i> Lock screen</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#;" ><i className="mdi mdi-logout font-size-16 align-middle me-1"></i> Logout</a>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
    )
}
