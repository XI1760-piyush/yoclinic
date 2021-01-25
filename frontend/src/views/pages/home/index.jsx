import React, { Component } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';

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
        <Header/>
        <Footer/>
      </div>
    )
  }
}

export default Index