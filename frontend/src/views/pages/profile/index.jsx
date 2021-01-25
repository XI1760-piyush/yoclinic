import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { ListGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import './style.scss';
import { get_profile, update_profile , update_image} from './actions';
import {APIURL} from '../../../env';
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      user_data_recived:false,
      ...props
    }
  }

  componentWillMount() {
    this.props.getProfile({ 'token' : localStorage.getItem('token') })
  }

  componentDidUpdate() {
    if(this.props.user_data && !this.state.user_data_recived) {
      this.setState({...this.state, user_data_recived: true, data : {
        name: this.props.user_data.name,
        phone: this.props.user_data.phone,
        address: this.props.user_data.address,
        city: this.props.user_data.city,
        state: this.props.user_data.state,
        zipcode: this.props.user_data.zipcode,
      }})
    }
  }

  saveData(key, e) {
    e.preventDefault();
    this.setState({ ...this.state, data: { ...this.state.data, [key]: e.target.value } })
  }


  onFileChange(event) {
    this.setState({ ...this.state, profilePic: event.target.files[0] });
  }

  fileUpload() {
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }
   if(this.state.profilePic) {
     let data  = new FormData()
     data.append('profilePic', this.state.profilePic)
     data.append('token', localStorage.getItem('token'))
    this.props.updateImage(data)
   } else {
    return setErrorMsg('Please Select  an Image')
   }
  }

  updateProfile(e) {
    e.preventDefault()
    let data = this.state.data
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.name) {
      return setErrorMsg('Please Enter Name')
    }

    if (!data.phone) {
      return setErrorMsg('Please Enter Name')
    }

    if (!data.address) {
      return setErrorMsg('Please Enter Address')
    }

    if (!data.city) {
      return setErrorMsg('Please Enter City')
    }

    if (!data.state) {
      return setErrorMsg('Please Enter State')
    }

    if (!data.zipcode) {
      return setErrorMsg('Please Enter Zipcode')
    }

    setErrorMsg('')
    this.props.updateProfile(data)

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
                          <ListGroup.Item className="active">Personal Profile</ListGroup.Item>
                          <ListGroup.Item><Link to="/medical-profile" className="main-link"><div>Medical Profile</div></Link></ListGroup.Item>
                          <ListGroup.Item><Link to="/remove-account" className="main-link"><div>Remove Account</div></Link></ListGroup.Item>
                        </ListGroup>
                        <br />
                        <div className="avtar">
                          <div className="text-center">
                            <img src={this.props.profilePic ? APIURL+this.props.profilePic : ( this.props.user_data && this.props.user_data.pic ? APIURL+this.props.user_data.pic :  '/assets/img/dummy.png')} className="avatar img-circle img-thumbnail" alt="avatar" />
                            <h6>Upload a different photo...</h6>
                            <input type="file" className="text-center center-block btn-default file-input" onChange={this.onFileChange.bind(this)} />
                            <br/><br/>
                            <button onClick={this.fileUpload.bind(this)} className="btn btn-primary btn-block main-btn">Change</button>
                            <hr/>
                          </div>
                        </div>

                      </div>
                      <div className="col-md-8 form-div">
                        <form className="form-horizontal" encType="multipart/form-data">
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

                          <fieldset>
                            <div className="form-group">
                              <label className="control-label" htmlFor="Name">Name</label>
                              <input id="Name" name="Name" defaultValue={this.props.user_data ? this.props.user_data.name : ''} type="text" onChange={this.saveData.bind(this, 'name')} placeholder="Name" className="form-control input-md" />
                            </div>

                            <div className="form-group">
                              <label className="control-label" htmlFor="Email">Email</label>
                              <input id="Email" name="Email" readOnly defaultValue={this.props.user_data ? this.props.user_data.email : ''} type="text" onChange={this.saveData.bind(this, 'email')} placeholder="Email" className="form-control input-md" />
                            </div>

                            <div className="form-group">
                              <label className="control-label" htmlFor="Phone">Phone Number</label>
                              <input id="Phone" name="Phone" defaultValue={this.props.user_data ? this.props.user_data.phone : ''} type="text" onChange={this.saveData.bind(this, 'phone')} placeholder="Phone Number" className="form-control input-md" />
                            </div>
                            <div className="form-group">
                              <label className="control-label" htmlFor="Address">Address</label>
                              <textarea className="form-control" defaultValue={this.props.user_data ? this.props.user_data.address : ''} id="Address" onChange={this.saveData.bind(this, 'address')} name="Address" placeholder="Enter Address"></textarea>
                            </div>

                            <div className="form-group">
                              <label className="control-label" htmlFor="City">City</label>
                              <input id="City" name="City" type="text" defaultValue={this.props.user_data ? this.props.user_data.city : ''} placeholder="City" onChange={this.saveData.bind(this, 'city')} className="form-control input-md" />
                            </div>

                            <div className="form-group">
                              <label className="control-label" htmlFor="State">State</label>
                              <select id="State" defaultValue={this.props.user_data ? this.props.user_data.state : ''} name="State" className="form-control" onChange={this.saveData.bind(this, 'state')} >
                                <option selected={this.props.user_data && this.props.user_data.state == '' } value="">-- Select State --</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Andhra Pradesh' } value="Andhra Pradesh">Andhra Pradesh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Andaman and Nicobar Islands' } value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Arunachal Pradesh' } value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Assam' } value="Assam">Assam</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Bihar' } value="Bihar">Bihar</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Chandigarh' } value="Chandigarh">Chandigarh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Chhattisgarh' } value="Chhattisgarh">Chhattisgarh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Dadar and Nagar Haveli' } value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Daman and Diu' } value="Daman and Diu">Daman and Diu</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Delhi' } value="Delhi">Delhi</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Lakshadweep' } value="Lakshadweep">Lakshadweep</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Lakshadweep' } value="Lakshadweep">Puducherry</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Goa' } value="Goa">Goa</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Gujarat' } value="Gujarat">Gujarat</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Haryana' } value="Haryana">Haryana</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Himachal Pradesh' } value="Himachal Pradesh">Himachal Pradesh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Jammu and Kashmir' } value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Jharkhand' } value="Jharkhand">Jharkhand</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Karnataka' } value="Karnataka">Karnataka</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Kerala' } value="Kerala">Kerala</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Madhya Pradesh' } value="Madhya Pradesh">Madhya Pradesh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Maharashtra' } value="Maharashtra">Maharashtra</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Manipur' } value="Manipur">Manipur</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Meghalaya' } value="Meghalaya">Meghalaya</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Mizoram' } value="Mizoram">Mizoram</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Nagaland' } value="Nagaland">Nagaland</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Odisha' } value="Odisha">Odisha</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Punjab' } value="Punjab">Punjab</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Rajasthan' } value="Rajasthan">Rajasthan</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Sikkim' } value="Sikkim">Sikkim</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Tamil Nadu' } value="Tamil Nadu">Tamil Nadu</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Telangana' } value="Telangana">Telangana</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Tripura' } value="Tripura">Tripura</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Uttar Pradesh' } value="Uttar Pradesh">Uttar Pradesh</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'Uttarakhand' } value="Uttarakhand">Uttarakhand</option>
                                <option selected={this.props.user_data && this.props.user_data.state == 'West Bengal' } value="West Bengal">West Bengal</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="control-label" htmlFor="zipcode">Zipcode</label>
                              <input id="zipcode" defaultValue={this.props.user_data ? this.props.user_data.zipcode : ''} name="zipcode" type="text" onChange={this.saveData.bind(this, 'zipcode')} placeholder="zipcode" className="form-control input-md" />
                            </div>

                            <div className="form-group">
                              <button onClick={this.updateProfile.bind(this)} className="btn btn-primary main-btn">Save</button>
                            </div>
                          </fieldset>
                        </form>
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
    user_data : state.profileReducer.user_data,
    error_msg : state.profileReducer.error_msg,
    success_msg : state.profileReducer.success_msg,
    profilePic : state.profileReducer.profilePic
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(update_profile(data)),
  getProfile: (data) => dispatch(get_profile(data)),
  updateImage: (data) => dispatch(update_image(data)),

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


