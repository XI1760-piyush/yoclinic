import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { connect } from 'react-redux';
import { make_change_password } from './actions';
import './style.scss';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      ...props
    }
  }

  saveData(key, e) {
    e.preventDefault();
    this.setState({ ...this.state, data: { ...this.state.data, [key]: e.target.value } })
  }

  makeChangePassword(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.opassword) {
      return setErrorMsg('Please Enter Old Password')
    }
    if (!data.npassword) {
      return setErrorMsg('Please Enter New Password')
    } else {
      if (data.npassword.length < 8) {
        return setErrorMsg('Password Should Be atleast 8 Character Long')
      } else if (data.npassword.length > 32) {
        return setErrorMsg('Password Should Be atmost 32 Character Long')
      }
    }

    if (!data.cpassword) {
      return setErrorMsg('Please Enter Confirm Password')
    }
    setErrorMsg('')
    this.props.makeChangePassword(data)
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
                          <p className="login-card-description">Change your Password</p>
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
                          <form action="#!">
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">Old Password</label>
                              <input type="password" name="password1" onChange={this.saveData.bind(this, 'opassword')} id="password1" className="form-control" placeholder="Old Password" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">New Password</label>
                              <input type="password" name="password1" onChange={this.saveData.bind(this, 'npassword')} id="password1" className="form-control" placeholder="New Password" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email" className="sr-only">Confirm Password</label>
                              <input type="password" name="password2" onChange={this.saveData.bind(this, 'cpassword')} id="password2" className="form-control" placeholder="Confirm Password" />
                            </div>
                            <input name="change" onClick={this.makeChangePassword.bind(this)} className="btn btn-block recover-btn mb-4" type="button" value="Change" />
                          </form>
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
    success_msg: state.passwordReducer.success_msg,
    error_msg: state.passwordReducer.error_msg,
  };
};

const mapDispatchToProps = (dispatch) => ({
  makeChangePassword: (data) => dispatch(make_change_password(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Index)
