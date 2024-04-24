import React from 'react'
import smartmedic from "../../Assets/images/smartmedic.svg"

export default function Login() {
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
                                            <img src={smartmedic} alt="" height="120"/>
                                        </a>
                                    </div>
                                    <div className="auth-content my-auto">

                                        <div className="text-center">
                                           {/* <!--<h5 className="mb-0">Bienvenido!</h5>--> */}
                                          <p className="text-muted mt-2">Inicia sesión para continuar con el Sistema</p>
                                        </div>
                                        <form id="form-login" className="mt-4 pt-2" >
                                            <div className="mb-3">
                                                <label className="form-label">Correo</label>
                                                <input type="text" className="form-control" id="email" name="email" placeholder="Ingrese correo" required/>
                                            </div>
                                            <div className="mb-3">
                                                <div className="d-flex align-items-start">
                                                    <div className="flex-grow-1">
                                                        <label className="form-label">Contraseña </label>
                                                    </div>

                                                </div>

                                                <div className="input-group auth-pass-inputgroup">
                                                    <input type="password" className="form-control" id="password" name="password"
                                                                placeholder="Ingrese Contraseña" aria-label="Password" aria-describedby="password-addon" required/>
                                                    <div className="invalid-feedback">
                                                        Please Enter Password
                                                    </div>
                                                    <button className="btn btn-light shadow-none ms-0" type="button" id="password-addon"><i className="mdi mdi-eye-outline"></i></button>
                                                </div>
                                            </div>
                                            <div className="row mb-4">

                                                <div className="d-flex align-items-start">
                                                    <div className="flex-grow-1">
                                                        <div className="col">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="remember-check"/>
                                                                <label className="form-check-label" for="remember-check">
                                                                    Recuerdame
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div className="">
                                                            <a href="{{ route('recuperar-pass') }}" className="text-muted">Ovidaste tu Contraseña?</a>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                            <div className="mb-3">
                                                <button id="btnLogin" className="btn btn-primary w-100 waves-effect waves-light" type="submit">
                                                    Ingresar</button>
                                            </div>
                                        </form>

                                        <div className="mt-4 pt-2 text-center">
                                            <div className="signin-other-title">
                                                <h5 className="font-size-14 mb-3 text-muted fw-medium">- Inicie Sesión con -</h5>
                                            </div>

                                            <ul className="list-inline mb-0">
                                                {/* <li className="list-inline-item">
                                                    <a href="javascript:void()"
                                                        className="social-list-item bg-primary text-white border-primary">
                                                        <i className="mdi mdi-facebook"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()"
                                                        className="social-list-item bg-info text-white border-info">
                                                        <i className="mdi mdi-twitter"></i>
                                                    </a>
                                                </li> */}
                                                <li className="list-inline-item">
                                                    <a href="#;"
                                                        className="social-list-item bg-danger text-white border-danger">
                                                        <i className="mdi mdi-google"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <p className="text-muted mb-0">No posees una Cuenta? <a href="{{ route('registro') }}"
                                                    className="text-primary fw-semibold"> Registrate! </a> </p>
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
