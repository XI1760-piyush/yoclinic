import React, { Component } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { faMap, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.scss';
import './map.css';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentDidMount() {
  }

  sendMail(e) {
    e.preventDefault()
    

  }

  render() {
    return (
      <div>
        <Header />
        <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="426" id="gmap_canvas" src="https://maps.google.com/maps?q=Beant%20Singh%20Chownk%2C%20Railway%20Road%20Doraha%20Dist.%2C%20Ludhiana%2C%20141421&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
        <section id="contact">
          <div className="container">
          <div class="row">
            <div class="col-sm-6 col-md-6 subpage-block">
              <div class="block-title">
                <h3>Get in Touch</h3>
              </div>
              <p>Sed eleifend sed nibh nec fringilla. Donec eu cursus sem, vitae tristique ante. Cras pretium rutrum egestas. Integer ultrices libero sed justo vehicula, eget tincidunt tortor tempus.</p>
              <p>Sed eleifend sed nibh nec fringilla. Donec eu cursus sem, vitae tristique ante. Cras pretium rutrum egestas. Integer ultrices libero sed justo vehicula, eget tincidunt tortor tempus.</p>
              <div class="contact-info-block">
                  <h5> <FontAwesomeIcon className="icon" icon={faMap} /> Beant Singh Chownk, Railway Road Doraha Dist., Ludhiana, 141421</h5>
               </div>
              <div class="contact-info-block">
                  <h5><FontAwesomeIcon className="icon" icon={faEnvelope} /> help.vikaoo@gmail.co</h5>
               </div>
              <div class="contact-info-block">
                  <h5><FontAwesomeIcon className="icon" icon={faPhoneAlt} /> +91 9855385905</h5>
              </div>
              
            </div>
            <div class="col-sm-6 col-md-6 subpage-block">
              <div class="block-title">
                <h3>Contact Form</h3>
              </div>
              <form id="contact-form" method="post" action="contact_form/contact_form.php" onSubmit={this.sendMail.bind(this)} novalidate="true">
                <div class="messages"></div>
                <div class="controls">
                  <div class="form-group">
                    <input id="form_name" type="text" name="name" class="form-control" placeholder="Full Name" required="required" data-error="Name is required." />
                    <div class="form-control-border"></div>
                    <i class="form-control-icon fa fa-user"></i>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <input id="form_email" type="email" name="email" class="form-control" placeholder="Email Address" required="required" data-error="Valid email is required." />
                    <div class="form-control-border"></div>
                    <i class="form-control-icon fa fa-envelope"></i>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <textarea id="form_message" name="message" class="form-control" placeholder="Message for me" rows="4" required="required" data-error="Please, leave me a message."></textarea>
                    <div class="form-control-border"></div>
                    <i class="form-control-icon fa fa-comment"></i>
                    <div class="help-block with-errors"></div>
                  </div>
                  <input type="submit" class="btn main-btn" value="Send message" />
                </div>
              </form>
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