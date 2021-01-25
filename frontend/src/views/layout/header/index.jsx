import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Modal, Card, Dropdown } from 'react-bootstrap';
import { faUser, faSearch, faSignInAlt, faPlusCircle, faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import toastr from 'toastr'
import { make_register, make_login } from './actions'

import './style.scss';

function Header(props) {
  const [state, setState] = useState({ isRegister: false, isLogin: false, isSearch: false, showMenu: true, loc: '', stext: '', type: null });
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const showLogin = () => { setState({ ...state, isRegister: false, isLogin: true }); setUser({}); }
  const hideLogin = () => setState({ ...state, isRegister: false, isLogin: false });
  const showRegister = () => { setState({ ...state, isRegister: true, isLogin: false }); setUser({}); }
  const hideRegister = () => setState({ ...state, isRegister: false, isLogin: false });
  const showSearch = () => setState({ ...state, isSearch: true });
  const hideSearch = () => setState({ ...state, isSearch: false });


  const saveData = (key, e) => {
    e.preventDefault();
    setUser({ ...user, [key]: e.target.value })
  }

  const selectData = (key, value, e) => {
    e.preventDefault();
    setUser({ ...user, [key]: value })
  }

  const makeRegister = (e) => {
    e.preventDefault();

    if (user.name) {
      if (user.name.length < 3) {
        return setErrorMsg('Name Should Be atleast 3 Character Long')
      } else if (user.name.length > 32) {
        return setErrorMsg('Name Should Be atmost 50 Character Long')
      }
    } else {
      return setErrorMsg('Please Enter Name')
    }

    if (user.phone) {
      let phoneReg = /^[0-9]+$/
      if (user.phone.length != 10) {
        return setErrorMsg('Phone Number Should Be 10 Character Long')
      } else if (!user.phone.match(phoneReg)) {
        return setErrorMsg('Phone Number Should Be Numeric Only')
      }
    } else {
      return setErrorMsg('Please Enter Phone Number')
    }

    if (user.email) {
      let emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (user.email.length < 3) {
        return setErrorMsg('Email Should Be atleast 3 Character Long')
      } else if (user.email.length > 300) {
        return setErrorMsg('Email Should Be atmost 300 Character Long')
      } else if (!user.email.match(emailReg)) {
        return setErrorMsg('Invalid Email Format')
      }
    } else {
      return setErrorMsg('Please Enter Email')
    }

    if (user.password) {
      if (user.password.length < 8) {
        return setErrorMsg('Password Should Be atleast 8 Character Long')
      } else if (user.password.length > 32) {
        return setErrorMsg('Password Should Be atmost 32 Character Long')
      }
    } else {
      return setErrorMsg('Please Enter Password')
    }

    if (!user.cpassword) {
      return setErrorMsg('Please Enter Confirm Password')
    }

    if (user.cpassword != user.password) {
      return setErrorMsg('Please Enter Confirm Password')
    }
    setErrorMsg('')
    props.makeRegister(user)
  }


  const makeLogin = (e) => {
    e.preventDefault();

    if (!user.userinfo) {
      return setErrorMsg('Please Enter Email Address/Phone Number')
    }

    if (!user.password) {
      return setErrorMsg('Please Enter Password')
    }

    setErrorMsg('')
    props.makeLogin(user)
  }


  if (props.register_msg == 'success' || props.login_msg == 'success') {
    let user = props.user_data.data;
    localStorage.setItem('token', user.token)
    localStorage.setItem('userName', user.name)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }


  if (localStorage.getItem('token') && localStorage.getItem('userName') && state.showMenu) {
    setUserName(localStorage.getItem('userName'))
    setState({ ...state, showMenu: false })
  }

  const logout = () => {
    localStorage.clear()
    props.history.push('/')
    window.location.reload()
  }

  const openRegister = () => {
    hideLogin()
    showRegister()
  }

  const openLogin = () => {
    hideRegister()
    showLogin()
  }

  const searchText = (e) => {
    setState({ ...state, stext: e.target.value })
  }

  const searchLoc = (e) => {
    setState({ ...state, loc: e.target.value })
  }

  const makeSearch = () => {
    hideSearch()
    window.location = (`/search?q=${state.stext}&loc=${state.loc}`)
  }

  return (
    <header>

      <Navbar expand="lg">
        <Navbar.Brand href="/"><img className="logo" src="/assets/img/logo.png" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          </Nav>
          {state.showMenu ? <Nav className="">
            <Nav.Link className={'d-mobile-none'} href="#search" onClick={showSearch}><FontAwesomeIcon icon={faSearch} /></Nav.Link>
            <Nav.Link className={'d-mobile-none'} href="#login" onClick={showLogin}><FontAwesomeIcon icon={faSignInAlt} /></Nav.Link>
            <Nav.Link className={'d-mobile-none'} href="#register" onClick={showRegister}><FontAwesomeIcon icon={faUser} /></Nav.Link>
            <Nav.Link className={'d-desktop-block'} href="#search" onClick={showSearch}>Search</Nav.Link>
            <Nav.Link className={'d-desktop-block'} href="#login" onClick={showLogin}>Login</Nav.Link>
            <Nav.Link className={'d-desktop-block'} href="#register" onClick={showRegister}>Register</Nav.Link>
          </Nav> :
            <>
              <Nav.Link className={'search-icon'} href="#search" onClick={showSearch}><FontAwesomeIcon icon={faSearch} /></Nav.Link>
              {/* <Nav.Link className={'search-icon'} href="/add-product"><FontAwesomeIcon icon={faPlusCircle} /></Nav.Link> */}

              <Dropdown>
                <Dropdown.Toggle variant="link" className={'name-link'}>
                  <FontAwesomeIcon icon={faUser} /> Welcome {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className={'main-link-nav'}><Link to="/appointments"><div>My Appointments</div></Link></Dropdown.Item>
                  <Dropdown.Item className={'main-link-nav'}><Link to="/profile"><div>Account Settings</div></Link></Dropdown.Item>
                  <Dropdown.Item className={'main-link-nav'} ><Link to="/change-password"><div>Change Password</div></Link></Dropdown.Item>
                  <Dropdown.Item className={'main-link-nav'}><Link to="#" onClick={logout}><div>Logout</div></Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          }
        </Navbar.Collapse>
      </Navbar>

      <Modal className="search-box" size={'lg'} show={state.isSearch} onHide={hideSearch}>
        <Modal.Body>
          <Card>
            <Card.Body className="search-card">
              <div className="form-inline">
                <div className="search-field first-wrap">
                  <input id="search" className="form-control" type="text" onChange={(e) => searchText(e)} placeholder="What are you looking for?" />
                </div>
                <div className="search-field second-wrap">
                  <input id="location" className="form-control" type="text" onChange={(e) => searchLoc(e)} placeholder="location" />
                </div>
                <div className="search-field third-wrap">
                  <Link to={"#"} onClick={makeSearch} className="btn-search btn btn-primary main-btn" type="button">Search</Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

      <Modal className="login-box" size={'lg'} show={state.isLogin} onHide={hideLogin}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body text-center">
                    <div className="brand-wrapper">
                      <img src="assets/img/logo.png" alt="logo" className="logo" />
                    </div>
                    <p className="login-card-description">Login your account</p>
                    {errorMsg ?
                      <div className="alert alert-danger">
                        {errorMsg}
                      </div> : null
                    }
                    {
                      props.login_error_msg ? <div className="alert alert-danger">
                        {props.login_error_msg}
                      </div> : null
                    }
                    {
                      props.login_msg == 'success' ? <div className="alert alert-success">
                        User Successfully Logged In
                      </div> : null
                    }

                    <form action="#!">
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email Address/ Phone Number</label>
                        <input type="email" name="email" id="email" onChange={saveData.bind(this, 'userinfo')} className="form-control" placeholder="Email address / Phone Number" />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" name="password" id="password" onChange={saveData.bind(this, 'password')} className="form-control" placeholder="Password" />
                      </div>
                      <input name="login" onClick={makeLogin} className="btn btn-block login-btn mb-4" type="button" value="Login" />
                    </form>
                    <Link to="forget-password" className="forgot-password-link">Forgot password?</Link>
                    <p className="register-link">Don't have an account? <Link to="#" onClick={openRegister} className="text-reset">Register here</Link></p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
      <Modal className="login-box" size={'lg'} show={state.isRegister} onHide={hideRegister}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body text-center">
                    <div className="brand-wrapper">
                      <img src="assets/img/logo.png" alt="logo" className="logo" />
                    </div>
                    <p className="login-card-description">Create your account</p>
                    {errorMsg ?
                      <div className="alert alert-danger">
                        {errorMsg}
                      </div> : null
                    }
                    {
                      props.reg_error_msg ? <div className="alert alert-danger">
                        {props.reg_error_msg}
                      </div> : null
                    }
                    {
                      props.register_msg == 'success' ? <div className="alert alert-success">
                        User Successfully Registered
                      </div> : null
                    }
                    <div className="user-type-icon-wrapper row">
                        <div className="col-md-6" >
                          <FontAwesomeIcon onClick={selectData.bind(this, 'type', 'patient')} className={`user-type-icon fa-5x ${ user.type=='patient' ? 'selected' : ''}`} icon={faUser} />
                        </div>
                        <div className="col-md-6">
                          <FontAwesomeIcon className={`user-type-icon fa-5x ${ user.type=='doctor' ? 'selected' : ''}`} onClick={selectData.bind(this, 'type', 'doctor')} icon={faUserMd} />
                        </div>

                      </div>
                    {user.type ? <form action="#!">
                      <div className="form-group">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" name="name" onChange={saveData.bind(this, 'name')} id="name" className="form-control" placeholder="Name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name" className="sr-only">Phone Number</label>
                        <input type="text" name="phonenumber" onChange={saveData.bind(this, 'phone')} id="phonenumber" className="form-control" placeholder="Phone Number" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" onChange={saveData.bind(this, 'email')} className="form-control" placeholder="Email address" />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" name="password" onChange={saveData.bind(this, 'password')} id="password" className="form-control" placeholder="Password" />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">Confirm Password</label>
                        <input type="password" name="cpassword" onChange={saveData.bind(this, 'cpassword')} id="cpassword" className="form-control" placeholder="Confirm Password" />
                      </div>
                      <input name="register" onClick={makeRegister} className="btn btn-block login-btn mb-4" type="button" value="Register" />
                    </form> : null
                      }
                    <p className="register-link">Already have an account? <Link to="#" onClick={openLogin} className="text-reset">Login here</Link></p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user_data: state.headerReducer.user_data,
    register_msg: state.headerReducer.register_msg,
    reg_error_msg: state.headerReducer.reg_error_msg,
    login_msg: state.headerReducer.login_msg,
    login_error_msg: state.headerReducer.login_error_msg,
  };
};

const mapDispatchToProps = (dispatch) => ({
  makeRegister: (user) => dispatch(make_register(user)),
  makeLogin: (user) => dispatch(make_login(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(Header)