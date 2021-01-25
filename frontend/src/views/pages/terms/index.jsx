import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.scss';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <Header />
        <section id="about">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="banner-section">
                  <img src="https://via.placeholder.com/1000x300" class="img-fluid banner" alt=""/> 
                  <div class="after">Terms & Conditions</div>
                </div>
                </div>
                <div class="col-sm-12">
                  <h4>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium ?</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                  <br/>
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