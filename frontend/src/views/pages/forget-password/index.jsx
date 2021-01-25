import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { make_recover_password, make_recover_otp , update_password} from './actions';
import './style.scss';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmailField : true,
      processDone:false,
      data: {},
      ...props
    }
  }

  saveData(key, e) {
    e.preventDefault();
    this.setState({ ...this.state, data: { ...this.state.data, [key]: e.target.value } })
  }

  makeRecoverEmail(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.userinfo) {
      return setErrorMsg('Please Enter Email / Phone Number')
    }

    setErrorMsg('')
    this.props.makeRecoverEmail(data)
  }


  makeRecoverOtp(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.otp) {
      return setErrorMsg('Please Enter Otp')
    } else if(data.otp.length!=6) {
      return setErrorMsg('Otp Should Be 6 Characters Long')
    }

    setErrorMsg('')
    this.props.makeRecoverOtp(data)
  }

  makeRecoverPassword(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (data.npassword) {
      if (data.npassword.length < 8) {
        return setErrorMsg('Password Should Be atleast 8 Character Long')
      } else if (data.npassword.length > 32) {
        return setErrorMsg('Password Should Be atmost 32 Character Long')
      }
    } else {
      return setErrorMsg('Please Enter Password')
    }

    if (!data.cpassword) {
      return setErrorMsg('Please Enter Confirm Password')
    }

    if (data.cpassword != data.cpassword) {
      return setErrorMsg('Password and Confirm Password Should be Same')
    }

    setErrorMsg('')
    this.props.makeRecoverPassword(data)
  }

  render() {
    return (
      <div>
        <Header />
        <section id="forget-password">
          <div className="container-fluid">
            <div className="row padding-div">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Card>
                  <Card.Body>
                    <div className="row no-gutters">
                      <div className="col-md-12">
                        <div className="card-body text-center">
                          <div className="brand-wrapper">
                            <img src="assets/img/logo.png" alt="logo" className="logo" />
                          </div>
                         
                          {this.state.error_msg ?
                            <div className="alert alert-danger">
                              {this.state.error_msg}
                            </div> : null
                          }
                          {
                            this.props.error_msg ? <div className="alert alert-danger">
                              {this.props.error_msg}
                            </div> : null
                          }
                          {
                            this.props.success_msg ? <div className="alert alert-success">
                              {this.props.success_msg}
                            </div> : null
                          }
                          { this.state.showEmailField  && !this.props.showOtp ?<form action="#!">
                            <p className="login-card-description">Enter Email Address </p>
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">Email</label>
                              <input type="email" name="email" onChange={this.saveData.bind(this,'userinfo')} id="email" className="form-control" placeholder="Email address" />
                            </div>
                            <input name="recover" onClick={this.makeRecoverEmail.bind(this)} className="btn btn-block recover-btn mb-4" type="button" value="Recover" />
                          </form> : null }
                         {
                           this.props.showOtp & !this.props.showPassword ?<form action="#!">
                            <p className="login-card-description">Enter One Time Password </p>
                           <div className="form-group">
                             <label htmlFor="otp" className="sr-only">OTP</label>
                             <input type="otp" name="otp" onChange={this.saveData.bind(this,'otp')} id="otp" className="form-control" placeholder="OTP" />
                           </div>
                           <input name="recover" onClick={this.makeRecoverOtp.bind(this)} className="btn btn-block recover-btn mb-4" type="button" value="Recover" />
                         </form> : null 
                         }
                         
                          { this.props.showPassword & !this.props.moveLogin ?<form action="#!">
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">New Password</label>
                              <input type="password" name="password1" id="password1" onChange={this.saveData.bind(this,'npassword')} className="form-control" placeholder="New Password" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">Confirm Password</label>
                              <input type="password" name="password2" id="password2" onChange={this.saveData.bind(this,'cpassword')} className="form-control" placeholder="Confirm Password" />
                            </div>
                            <input name="change" onClick={this.makeRecoverPassword.bind(this)} className="btn btn-block recover-btn mb-4" type="button" value="Change" />
                          </form> : null }
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    success_msg: state.recoverReducer.success_msg,
    error_msg: state.recoverReducer.error_msg,
    showOtp: state.recoverReducer.showOtp,
    showPassword: state.recoverReducer.showPassword
  };
};

const mapDispatchToProps = (dispatch) => ({
  makeRecoverEmail: (data) => dispatch(make_recover_password(data)),
  makeRecoverOtp : (data) => dispatch(make_recover_otp(data)),
  makeRecoverPassword : (data) => dispatch(update_password(data))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))

