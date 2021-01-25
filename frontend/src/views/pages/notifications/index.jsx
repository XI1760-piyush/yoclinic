import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Card, Alert } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import './style.scss';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
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
                          <ListGroup.Item className="active">Notification</ListGroup.Item>
                          <ListGroup.Item><Link to="/remove-account" className="main-link"><div>Remove Account</div></Link></ListGroup.Item>
                        </ListGroup>
                      </div>
                      <div className="col-md-8 not-div">
                      <Alert variant={'info'}>
                        This is a {'info'} alert with{' '}
                        <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
                        like.
                      </Alert>


                      <Alert variant={'info'}>
                        This is a {'info'} alert with{' '}
                        <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
                        like.
                      </Alert>

                      <Alert variant={'info'}>
                        This is a {'info'} alert with{' '}
                        <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
                        like.
                      </Alert>

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

export default Index