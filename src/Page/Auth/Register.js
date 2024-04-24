import React from 'react'
import smartmedic from "../../Assets/images/smartmedic.svg"


export default function Register() {
    return (
        <>
            <div className="auth-page">
                <div className="container-fluid p-0">
                    <div className="row g-0">

                        <div className="col-xxl-9 col-lg-8 col-md-7">
                            <div className="auth-bg pt-md-5 p-4 d-flex">
                                <div className="bg-overlay bg-primary"></div>
                                <ul className="bg-bubbles">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-xxl-3 col-lg-4 col-md-5">
                            <div className="auth-full-page-content d-flex p-sm-5 p-4">
                                <div className="w-100">
                                    <div className="d-flex flex-column h-100">
                                        <div className="mb-4 mb-md-1 text-center">
                                            <a href="#;" className="d-block auth-logo">
                                                <img src={smartmedic} alt="" height="120" />
                                            </a>
                                        </div>
                                        <div className="auth-content my-auto">

                                            <div className="text-center">
                                                <h5 className="mb-0">Registro de Cuenta</h5>
                                            </div>
                                            <form className="needs-validation mt-4 pt-2" id="form-registro" novalidate>
                                                <div className="mb-3">
                                                    <label for="username" className="form-label">Nombres</label>
                                                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter username" required />
                                                    <div className="invalid-feedback">
                                                        Please Enter Username
                                                    </div>
                                                </div>


                                                <div className="mb-3">
                                                    <label for="useremail" className="form-label">Correo</label>
                                                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" required />
                                                    <div className="invalid-feedback">
                                                        Please Enter Email
                                                    </div>
                                                </div>


                                                <div className="mb-3">
                                                    <label for="userpassword" className="form-label">Contraseña </label>
                                                    <input type="password" className="form-control" id="password" name="password" minlength="6" placeholder="Enter password" required />
                                                    <div className="invalid-feedback">
                                                        Please Enter Password
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <p className="mb-0">Al registrame acepto los <a href="#;" className="text-primary">Terminos de Uso</a></p>
                                                </div>
                                                <div className="mb-3">
                                                    <button id="btnRegistro" className="btn btn-primary w-100 waves-effect waves-light"
                                                        type="submit">Registro</button>
                                                </div>
                                            </form>


                                            <div className="mt-3 text-center">
                                                <p className="text-muted mb-0">Posees una cuenta ? <a href="{{ route('login') }}"
                                                    className="text-primary fw-semibold"> Login </a> </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
