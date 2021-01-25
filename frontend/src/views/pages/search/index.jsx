import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Pagination from '../../components/pagination'
import Filters from '../../components/filters'
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { APIURL } from '../../../env';
import './style.scss';
import { connect } from 'react-redux';
import { getProducts } from './actions';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: 'list',
      ...props
    }
  }

  componentDidMount() {
    let qs = this.parseQuery(this.props.location.search);
    this.props.getProducts({ search: qs.q, loc: qs.loc })
    this.setState({ ...this.state, loc: qs.loc, stext: qs.q })
  }

  productsParam(data) {
    this.setState({ ...this.state, productParam: { ...this.state.productParam, ...data } }, () => {
      this.props.getProducts({ ...this.state.productParam, ...data, search: this.state.stext, loc: this.state.loc })
    })
  }

  searchText(e) {
    this.setState({ ...this.state, stext: e.target.value })
  }

  searchLoc(e) {
    this.setState({ ...this.state, loc: e.target.value })
  }

  makeSearch() {
    this.props.getProducts({  ...this.state.productParam, search: this.state.stext, loc: this.state.loc })
  }


  parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === "?"
      ? queryString.substr(1)
      : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
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
                <h3 className="main-title">Search</h3>
                <div className="searchWrap">
                  <div className="form-inline">
                    <div className="search-field first-wrap">
                      <input id="search" className="form-control" defaultValue={this.state.stext} type="text" onChange={(e) => this.searchText(e)} placeholder="What are you looking for?" />
                    </div>
                    <div className="search-field second-wrap">
                      <input id="location" className="form-control" defaultValue={this.state.loc} type="text" onChange={(e) => this.searchLoc(e)} placeholder="location" />
                    </div>
                    <div className="search-field third-wrap">
                      <Link to={"#"} onClick={this.makeSearch.bind(this)} className="btn-search btn btn-primary main-btn" type="button">Search</Link>
                    </div>
                  </div>
                </div>
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
                      {this.props.products?.totalCount && <Pagination pageNumber={this.props.products?.page} lastPage={Math.floor(this.props.products?.totalCount / this.state.productParam?.count)} onChange={this.productsParam.bind(this)} />}
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
    products: state.searchReducer.products
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (data) => dispatch(getProducts(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Index)