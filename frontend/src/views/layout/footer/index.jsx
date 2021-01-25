import React from 'react';
import { Link } from 'react-router-dom';

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './style.scss';

export default function footer() {


  return (
    <footer >
      <div className="container">
        <div className="row row-30">
          <div className="col-md-4 col-xl-5">
            <div className="pr-xl-4"><a className="brand" href="index.html"><img className="logo" src="/assets/img/logo.png" alt="" height="150" /></a>
              <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Contacts</h5>
            <dl className="contact-list">
              <dt>Address:</dt>
              <dd>Beant Singh Chownk, Railway Road Doraha Dist., Ludhiana, 141421 </dd>
            </dl>
            <dl className="contact-list">
              <dt>email:</dt>
              <dd><a href="mailto:help.yoclinic@gmail.com">help.yoclinic@gmail.com</a></dd>
            </dl>
            <dl className="contact-list">
              <dt>phones:</dt>
              <dd><a href="tel:9855385905">+91 9855385905</a>
              </dd>
            </dl>
          </div>
          <div className="col-md-4 col-xl-3">
            <h5>Quick Links</h5>
            <ul className="nav-list main-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="about-us">About</Link></li>
              <li><Link to="contact-us">Contacts</Link></li>
              <li><Link to="faqs">FAQs</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row red-background">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <ul className="list-unstyled list-inline text-center social">
              <li className="list-inline-item"><a taeget="_blank" href="mailto:help.yoclinic@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a></li>
              <li className="list-inline-item"><a taeget="_blank" href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li className="list-inline-item"><a taeget="_blank" href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li className="list-inline-item"><a taeget="_blank" href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
            </ul>
          </div>
          <hr />
        </div>

        <div className="row red-background">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center text-white">
            <p className="h6">&copy; 2020 Yoclinic.com | All right Reversed.</p>
          </div>
          <hr />
        </div>
      </div>
    </footer>
  );
}
