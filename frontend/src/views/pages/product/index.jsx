import React, { Component } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { APIURL } from "../../../env";
import { connect } from 'react-redux';
import { getProduct, addFav, removeFav } from "./actions";
import { Link } from "react-router-dom";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lightbox } from "react-modal-image";

import './style.scss';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openLisghtBox : false,
      ...props
    }
    this.imgRef = React.createRef()
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getProduct(params.id)
  }

  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if(prevProps.match.params.id!=params.id){
      this.props.getProduct(params.id)
    }
    if(!prevProps.reload && this.props.reload)  this.props.getProduct(params.id)
  }
  changeImg(src) {
    this.imgRef.current.src = src
  }
  closeLightBox() {
    this.setState({...this.state, openLisghtBox: false })
  }

  openLightBox() {
    this.setState({...this.state, openLisghtBox: true })
  }
  
  render() {
    return (
      <div>
        <Header />
        <section id="product-details">
          {this.state.openLisghtBox && (
            <Lightbox
              medium={this.imgRef.current?.src}
              hideZoom={true}
              hideDownload={true}
              onClose={this.closeLightBox.bind(this)}
            />
          )}
          <div className="container">
            <div className="row padding-div">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-5">
                    <div className="product-img"><img ref={this.imgRef} onClick={this.openLightBox.bind(this)} src={this.props.product ? APIURL + JSON.parse(this.props.product.images)[0] : '/assets/img/product.svg'} className="img-thumbnail rounded" /></div>

                    {this.props.product && JSON.parse(this.props.product.images).length > 1 ?
                      <div className="product-thumb">
                        {
                          JSON.parse(this.props.product.images).map((item, i) => {
                            return (
                              <img key={i} onClick={this.changeImg.bind(this, APIURL + item)} src={this.props.product ? APIURL + item : '/assets/img/product.svg'} className="img-thumbnail rounded" />
                            )
                          })
                        }
                      </div> : null}
                  </div>
                  <div className="col-md-7">
                    <h3>{this.props.product?.title}</h3>
                    <div className="prod-details">
                      <h5>Price - <span>&#8377;{this.props.product?.price}</span></h5>
                    </div>
                    <p>
                      {this.props.product?.description}
                    </p>
                    <div className="prod-details">
      
                      <div className="clearfix"></div>
                      {this.props.product?.fields && JSON.parse(this.props.product?.fields).length > 0 ? <> <br />
                        <table className="table">
                          <tbody>
                            {this.props.product?.fields && JSON.parse(this.props.product?.fields).map((el, i) => {
                              return (
                                <tr key={i}>
                                  <td className="text-capitalize">{el.key}</td>
                                  <td className="text-capitalize">{el.value}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table> </> : null}
                        <h5>Tags</h5>
                      {this.props.product?.tags.split(',').map((el, i) => {
                        return (
                          <span key={i} className="product-tag">{String(el).trim()}</span>
                        )
                      })}
                    </div>
                    <div className="user-details">
                      <h5 className="border-bottom">Seller Deatils</h5>
                      <div><FontAwesomeIcon className={"main-text"} icon={faMapMarkerAlt} />&nbsp;&nbsp;&nbsp; 
                        {this.props.product?.address ? this.props.product?.address : this.props.user?.address}&nbsp;, 
                        {this.props.product?.city ? this.props.product?.city : this.props.user?.city }&nbsp;,
                        {this.props.product?.state ? this.props.product?.state : this.props.user?.state }&nbsp;, 
                        {this.props.product?.pincode ? this.props.product?.pincode : this.props.user?.zipcode }</div>
                      <div><FontAwesomeIcon className={"main-text"} icon={faPhoneAlt} />&nbsp;&nbsp;&nbsp;<a className="main-link" href={"tel://" + (this.props.product?.contact_no ? this.props.product?.contact_no: this.props.user?.phone )}>{(this.props.product?.contact_no ? this.props.product?.contact_no: this.props.user?.phone )}</a></div>
                    </div>
                    <br/>
                    { this.props.product?.isFav ? <button onClick={this.props.removeFav.bind(this,this.props.product?.id)} className="btn main-btn mt10">Remove from Favourite</button> : <button onClick={this.props.addFav.bind(this,this.props.product?.id)} className="btn main-btn mt10">Add to Favourite</button> }
                  </div>
                </div>



                {this.props.related && this.props.related.filter((item) => item.id != this.props.product.id).length ? <>
                  <br /><br /><br />
                  <div>
                    <h5 className="list-title">Related Products</h5>
                    <div className="product-wrap row">
                      {this.props.related.filter((item) => item.id != this.props.product.id).map((item, index) => {
                        return (

                          <div className={"product-card col-lg-3 col-md-4 col-sm-6 col-xs-12"} key={index}>
                            <Link to={"/product/" + item.id}>
                              <div className="text-center ">
                                <div className="product-img"><img src={APIURL + JSON.parse(item.images)[0]} className="img-thumbnail rounded" /></div>
                                <figcaption className="product-body">
                                  <h6 className="main-title text-truncate">{item.title}</h6>
                                </figcaption>
                              </div>
                            </Link>
                          </div>

                        )
                      })}

                    </div>
                  </div> </> : null}

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
    product: state.productReducer.product,
    related: state.productReducer.related,
    user: state.productReducer.user,
    reload: state.productReducer.reload
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(getProduct(data)),
  addFav : (data) => dispatch(addFav(data)),
  removeFav : (data) => dispatch(removeFav(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Index)