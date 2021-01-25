import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { getProducts } from './actions';
import { connect } from 'react-redux';
import { APIURL } from '../../../env';
import Pagination from '../../components/pagination'
import Filters from '../../components/filters'
import './style.scss';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: 'list',
      ...props
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  productsParam(data) {
    this.setState({ ...this.state, productParam: { ...this.state.productParam, ...data} },()=>{
      console.log({ ...this.state.productParam, ...data})
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
                <h3 className="main-title">Products</h3>
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

        <Footer />
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (data) => dispatch(getProducts(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Index)