import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import Pagination from '../../components/pagination'
import Filters from '../../components/filters'

import { getProducts, removeProduct } from './actions';
import { connect } from 'react-redux';
import { APIURL } from '../../../env'
import './style.scss';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      removeModalId: null,
      removeModalOpen: false,
      ...props
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  removeProduct() {
    this.props.removeProduct(this.state.removeModalId)
    this.handlePopupClose()
  }

  removeProductPopup(id) {
    this.setState({ ...this.state, removeModalId: id, removeModalOpen: true, })
  }

  handlePopupClose() {
    this.setState({ ...this.state, removeModalId: null, removeModalOpen: false, })
  }

  productsParam(data) {
    this.setState({ ...this.state, productParam: { ...this.state.productParam, ...data} },()=>{
      this.props.getProducts({ ...this.state.productParam, ...data})
    })
  }

  render() {
    return (
      <div>
        <Header />
        <section id="products">
          <div className="container">
            <div className="row padding-div">
              <div className="col-md-12">
                <br />
                <h3 className="main-title">My Products</h3>
                <div className="row no-gutters">
                  <div className="col-md-12 product-list">
                    <Filters onChange={this.productsParam.bind(this)} />
                   
                    {this.props.products?.list && this.props.products?.list.length > 0 ?
                      <>
                        <div className="product-wrap row">
                          {this.props.products?.list.map((product, i) => {
                            return (
                              <div className="product-card col-lg-3 col-md-4 col-sm-6 col-xs-12" key={i}>
                                <Link className="no-border" to={'/product/' + product.id}>
                                  <div className="product-img"><img src={APIURL + JSON.parse(product.images)[0]} className="" /></div>
                                </Link>
                                <figcaption className="product-body">
                                  <h6 className="main-title text-truncate">{product.title}</h6>
                                  <p>{String(product.description).substring(0, 130)}...</p>
                                </figcaption>
                                <div className="btn-wrap">
                                  <Link to={'/product/' + product.id} className="btn main-btn-outline btn-round">View</Link>
                                  <Link to="#" onClick={this.removeProductPopup.bind(this, product.id)} className="btn main-btn-outline btn-round">Remove</Link>
                                </div>
                              </div>
                            )
                          })} </div>
                      </> : <div className="alert alert-danger">No Products Found</div>}
                    <br />
                    <div className="pagination-wrap">
                    { this.props.products?.totalCount  && <Pagination  pageNumber={this.props.products?.page} lastPage={Math.floor(this.props.products?.totalCount/this.state.productParam?.count)} onChange={this.productsParam.bind(this)} /> }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal show={this.state.removeModalOpen} onHide={this.handlePopupClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure ! you want to remove this product </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handlePopupClose.bind(this)}>
              Close
          </Button>
            <Button variant="primary" className="main-btn" onClick={this.removeProduct.bind(this)}>
              Remove
          </Button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    products: state.myProductReducer.products
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (data) => dispatch(getProducts(data)),
  removeProduct: (data) => dispatch(removeProduct(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(Index)