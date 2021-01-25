import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { ListGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.scss';
import { get_medical, update_medical } from './actions';
import { APIURL } from '../../../env';
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      tags: [],
      description: '',
      medical_data_recived: false,
      ...props
    }
  }

  componentWillMount() {
    this.props.getMedical({ 'token': localStorage.getItem('token') })
  }

  componentDidUpdate() {
    if (this.props.medical_data && !this.state.medical_data_recived) {
      this.setState({
        ...this.state, medical_data_recived: true, 
        biography: this.props.medical_data.biography,
        tags: JSON.parse(this.props.medical_data.tags),
        data: {
          title: this.props.medical_data.title,
          degree: this.props.medical_data.degree,
          experience: this.props.medical_data.experience,
        }
      })
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
    if (this.state.profilePic) {
      let data = new FormData()
      data.append('profilePic', this.state.profilePic)
      data.append('token', localStorage.getItem('token'))
      this.props.updateImage(data)
    } else {
      return setErrorMsg('Please Select  an Image')
    }
  }

  addDescription(event, editor) {
    const data = editor.getData();
    this.setState({ ...this.state, biography: data })
  }

  addTag(value) {
    this.setState({ ...this.state, tags: value })
  }

  updateMedical(e) {
    e.preventDefault()
    let data = this.state.data
    let tags = this.state.tags 
    let biography = this.state.biography
    let setErrorMsg = (str) => {
      this.setState({ ...this.state, error_msg: str })
    }

    if (!data.title) {
      return setErrorMsg('Please Enter Title')
    }

    if (!biography) {
      return setErrorMsg('Please Enter biography')
    }

    if (!tags || tags.length==0) {
      return setErrorMsg('Please Enter Tags')
    }

    setErrorMsg('')
    data = {...data, biography, tags}
    this.props.updateMedical(data)

  }
  saveTime(key, e) {
    e.preventDefault();
    this.setState({ ...this.state, data: { ...this.state.data, timings: { ...this.state.data.timing, [key]: e.target.value } } })
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
                          <ListGroup.Item className="active">Medical Profile</ListGroup.Item>
                          <ListGroup.Item><Link to="/remove-account" className="main-link"><div>Remove Account</div></Link></ListGroup.Item>
                        </ListGroup>
                        <br />
                      </div>
                      <div className="col-md-8 form-div">
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
                            <label className="control-label" htmlFor="Name">Title</label>
                            <input id="title" name="Title" defaultValue={this.props.medical_data ? this.props.medical_data.title : ''} type="text" onChange={this.saveData.bind(this, 'title')} placeholder="Name" className="form-control input-md" />
                          </div>

                          <div className="form-group">
                            <label className="control-label" htmlFor="Name">Degree</label>
                            <input id="Degree" name="Degree" defaultValue={this.props.medical_data ? this.props.medical_data.degree : ''} type="text" onChange={this.saveData.bind(this, 'degree')} placeholder="Name" className="form-control input-md" />
                          </div>

                          <div className="form-group">
                            <label className="control-label" htmlFor="Name">Experience</label>
                            <input id="experience" name="experience" defaultValue={this.props.medical_data ? this.props.medical_data.experience : ''} type="text" onChange={this.saveData.bind(this, 'experience')} placeholder="Name" className="form-control input-md" />
                          </div>

                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <CKEditor
                              id="description" name="description" cols="40" rows="15" className="form-control" required="required"
                              editor={ClassicEditor}
                              data={this.state.biography}
                              onChange={this.addDescription.bind(this)}

                            />
                          </div>
                          <div className="form-group tag-group">
                            <label htmlFor="description">Search Tags</label>
                            <InputTags values={this.state.tags} onTags={({ values }) => { this.addTag(values) }} />
                          </div>

                          <div className="form-group">
                            <br /><hr />
                            <label htmlFor="description"><strong>Appointment Timings</strong></label>
                            <div className="row">
                              <div className="col-md-4">Day</div>
                              <div className="col-md-4">Start Time</div>
                              <div className="col-md-4">End Time</div>
                            </div>
                            <br/>
                            <div className="row daySel">
                              <div className="col-md-4">Sunday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay1')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay1')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Monday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay2')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay2')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Tuesday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay3')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay3')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Wednesday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay4')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay4')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Thursday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay5')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay5')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Friday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay6')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay6')} /></div>
                            </div>
                            <div className="row daySel">
                              <div className="col-md-4">Saturday</div>
                              <div className="col-md-4"><TimerDropDown id="startDay" name="startDay" className="form-control" onChange={this.saveTime.bind(this, 'startDay7')} /></div>
                              <div className="col-md-4"><TimerDropDown id="endDay" name="endDay" className="form-control" onChange={this.saveTime.bind(this, 'endDay7')} /></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <button onClick={this.updateMedical.bind(this)} className="btn btn-primary main-btn">Save</button>
                          </div>
                        </fieldset>
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

const TimerDropDown = (props) => {
  return (<select {...props} >
    <option value="not">-- Select Timing --</option>
    <option value="all">All Day</option>
    <option value="not">Not Working</option>
    <option>00:00</option>
    <option>00:30</option>
    <option>01:00</option>
    <option>01:30</option>
    <option>02:00</option>
    <option>02:30</option>
    <option>03:00</option>
    <option>03:30</option>
    <option>04:00</option>
    <option>04:30</option>
    <option>05:00</option>
    <option>05:30</option>
    <option>06:00</option>
    <option>06:30</option>
    <option>07:00</option>
    <option>07:30</option>
    <option>08:00</option>
    <option>08:30</option>
    <option>09:00</option>
    <option>09:30</option>
    <option>10:00</option>
    <option>10:30</option>
    <option>11:00</option>
    <option>11:30</option>
    <option>12:00</option>
    <option>12:30</option>
    <option>13:00</option>
    <option>13:30</option>
    <option>14:00</option>
    <option>14:30</option>
    <option>15:00</option>
    <option>15:30</option>
    <option>16:00</option>
    <option>16:30</option>
    <option>17:00</option>
    <option>17:30</option>
    <option>18:00</option>
    <option>18:30</option>
    <option>19:00</option>
    <option>19:30</option>
    <option>20:00</option>
    <option>20:30</option>
    <option>21:00</option>
    <option>21:30</option>
    <option>22:00</option>
    <option>22:30</option>
    <option>23:00</option>
    <option>23:30</option>
    <option>24:00</option>
  </select>
  )
}

const mapStateToProps = (state) => {
  return {
    medical_data: state.medicalReducer.medical_data,
    error_msg: state.medicalReducer.error_msg,
    success_msg: state.medicalReducer.success_msg
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateMedical: (data) => dispatch(update_medical(data)),
  getMedical: (data) => dispatch(get_medical(data)),  
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


