import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { ListGroup, Card } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import {remove_profile} from './actions'
import './style.scss';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      removed: false,
      ...props
    }
  }



  saveData(key, e) {
    e.preventDefault();
    this.setState({ ...this.state, data: { ...this.state.data, [key]: e.target.value } })
  }

  doRemovePassword(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.password) {
      return setErrorMsg('Please Enter Password')
    } 
    if (data.password.length < 8) {
        return setErrorMsg('Password Should Be atleast 8 Character Long')
    } 
    if (data.password.length > 32) {
        return setErrorMsg('Password Should Be atmost 32 Character Long')
    }

  
    setErrorMsg('')
    this.props.removeProfile(data)
  }

  componentDidUpdate() {
    if(!this.state.removed && this.props.success_msg) {
      this.setState({ ...this.state, removed: true })
      setTimeout(()=>{
        this.props.history.push('/')
      },2000)
    }
  }


  render() {
    return (
      <div>
        <Header />
        <section id="profile">
          <div className="container-fluid">
            <div className="row padding-div">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <h3 className="main-title">Account Settings</h3>
                <Card>
                  <Card.Body>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <ListGroup className={'sideNav'}>
                          <ListGroup.Item><Link to="/profile" className="main-link"><div>Profile</div></Link></ListGroup.Item>
                          <ListGroup.Item><Link to="/medical-profile" className="main-link"><div>Medical Profile</div></Link></ListGroup.Item>
                          <ListGroup.Item className="active">Remove Account</ListGroup.Item>
                        </ListGroup>
                      </div>
                      <div className="col-md-8 remo-div">
                        <img src="/assets/img/bye.png" className="bye-img" />
                        <p className="main-title">Are You Sure you Want to delete Your Account. Enter Your Password to proceed</p><br/>

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
                        <input type="password" onChange={this.saveData.bind(this, 'password')} name="password" placeholder="Password" className="form-control"  /><br/>
                        <button onClick={this.doRemovePassword.bind(this)} className="btn btn-primary btn-block main-btn">Confirm Delete Account</button>
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
    success_msg: state.removeReducer.success_msg,
    error_msg: state.removeReducer.error_msg,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProfile: (data) => dispatch(remove_profile(data)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))
