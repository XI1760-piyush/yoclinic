import React, { Component, createRef } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import { faPlusCircle, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputTags } from 'react-bootstrap-tagsinput'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { connect } from 'react-redux';
import { makeDraft, savePhoto, saveProduct, removePhoto } from './actions';
import { APIURL } from '../../../env'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-bootstrap-tagsinput/dist/index.css'

import './style.scss';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: 'list',
      cField: [],
      tags: [],
      product: {},
      diffAddess: false,
      ...props
    }
    this.fileIn = createRef()
  }

  componentDidMount() {
    this.props.makeDraft()
  }

  addDescription(event, editor) {
    const data = editor.getData();
    this.setState({ ...this.state, product: { ...this.state.product, description: data } })
  }

  componentDidUpdate(prevProp, prevState) {
    if (!prevState.product.draftId && this.props.draftId) {
      this.setState({ ...this.state, product: { draftId: this.props.draftId } })
    }

    if (!prevProp.success_msg && this.props.success_msg != '' && prevState.product.draftId) {
      window.screenY(0)
      setTimeout(()=>{
        window.location.reload()
      },3000)
    }
  }

  saveData(key, e) {
    e.preventDefault();
    console.log({ [key]: e.target.value })
    this.setState({ ...this.state, product: { ...this.state.product, [key]: e.target.value } })
  }

  addField() {
    let cField = [...this.state.cField]
    cField.push(cField.length + 1)
    this.setState({ ...this.state, cField: cField })
  }

  addTag(value) {
    this.setState({ ...this.state, tags: value })
  }

  addDescription(event, editor) {
    const data = editor.getData();
    this.setState({ ...this.state, product: { ...this.state.product, description: data } })
  }

  changeAddSel(e) {
    this.setState({ ...this.state, diffAddess: e.target.checked, product: { ...this.state.product, newAddress: e.target.checked } })
  }

  openImage(event) {
    this.fileIn.click()
  }

  savePhoto(event) {
    if (event.target.files[0]) {
      let data = new FormData()
      data.append('productPic', event.target.files[0])
      data.append('draftId', this.state.product.draftId)
      data.append('token', localStorage.getItem('token'))
      this.props.savePhoto(data)
    } else {
      return this.setState({ ...this.state, error_msg: 'Please Select  an Image' })
    }
  }

  removePhoto(path) {
    this.props.removePhoto({ path: path })
  }

  changeKey(index, ev) {
    let cflds = [...this.state.cField]
    cflds[index] = { ...this.state.cField[index], ['key']: ev.target.value }
    this.setState({ ...this.state, cField: [...cflds] })
  }

  changeValue(index, ev) {
    let cflds = [...this.state.cField]
    cflds[index] = { ...this.state.cField[index], ['value']: ev.target.value }
    this.setState({ ...this.state, cField: [...cflds] })
  }

  removeField(index) {
    let cField = [...this.state.cField]
    cField.splice(index, 1)
    this.setState({ ...this.state, cField: cField })
  }


  saveProduct() {
    let product = { ...this.state.product, tags: this.state.tags, fields: this.state.cField }
    if (!product.pname) {
      return this.setState({ ...this.state, error_msg: 'Please Enter Product Name' })
    }

    if (!product.price) {
      return this.setState({ ...this.state, error_msg: 'Please Enter Product Price (INR)' })
    }

    if (!product.category) {
      return this.setState({ ...this.state, error_msg: 'Please Select a Category' })
    }

    if (!product.description) {
      return this.setState({ ...this.state, error_msg: 'Please Enter some Description' })
    }
    this.setState({ ...this.state, error_msg: null })


    this.props.saveProduct(product)
  }

  render() {
    return (
      <div>
        <Header />
        <section id="add-product">
          <div className="container">
            <div className="row padding-div">
              <div className="col-md-12">
                <br />
                <h3 className="main-title">Add New Product</h3>
                {this.state.error_msg ?
                  <div className="alert alert-danger">
                    {this.state.error_msg}
                  </div> : null
                }

                {this.props.error_msg ?
                  <div className="alert alert-danger">
                    {this.props.error_msg}
                  </div> : null
                }

                {this.props.success_msg && this.props.success_msg != 'Draft Craeted' ?
                  <div className="alert alert-success">
                    {this.props.success_msg}
                  </div> : null
                }

                <div className="form-group">
                  <label htmlFor="pname">Product Name</label>
                  <input id="pname" name="pname" onChange={this.saveData.bind(this, 'pname')} placeholder="Product Name" type="text" required="required" className="form-control" />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="yes" id="featured" onChange={this.saveData.bind(this, 'isFeatured')} />
                    <label className="form-check-label" htmlFor="featured">
                      Make this Product Featured (Will Deduct 10 Coins)
                      </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price (INR)</label>
                  <input id="price" name="price" placeholder="Price" type="text" required="required" className="form-control" onChange={this.saveData.bind(this, 'price')} />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <div>
                    <select id="category" name="category" onChange={this.saveData.bind(this, 'category')} className="custom-select" required="required">
                      <option value="">-- Choose One Category --</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Property">Property</option>
                      <option value="Pets">Pets</option>
                      <option value="Cars">Cars</option>
                      <option value="Bikes">Bikes</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                {/*<div className="form-group">
                  <label htmlFor="description">Description</label>
                  <CKEditor
                    id="description" name="description" cols="40" rows="15" className="form-control" required="required"
                    editor={ClassicEditor}
                    data={this.state.description}
                    onChange={this.addDescription.bind(this)}

                  />
              </div>*/}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description" name="description" cols="40" rows="5" className="form-control" required="required"
                    onChange={this.saveData.bind(this, 'description')}
                  ></textarea>
                </div>
                <div className="form-group tag-group">
                  <label htmlFor="description">Tags</label>
                  <InputTags values={this.state.tags} onTags={({ values }) => { this.addTag(values) }} />
                </div>
                <div className="form-group"><span onClick={this.addField.bind(this)} className="main-link-red">Add A Field <FontAwesomeIcon icon={faPlusCircle} /></span></div>
                {this.state.cField.length ? <div className="form-group row">
                  <div className="col-md-5">
                    <label htmlFor="description">Product Info Key</label>
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="description">Product Info value</label>
                  </div>
                </div> : null
                }
                {this.state.cField.map((item, index) => {
                  return (<div className="row form-group" key={index}>
                    <div className="col-md-5">
                      <input id="key" name="key" placeholder="Key" onChange={this.changeKey.bind(this, index)} type="text" required="required" className="form-control" />
                    </div>
                    <div className="col-md-5">
                      <input id="value" name="value" placeholder="Value" onChange={this.changeValue.bind(this, index)} type="text" required="required" className="form-control" />
                    </div>
                    <div className="col-md-2">
                      <span className="main-link-red" onClick={this.removeField.bind(this, index)}> <FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                  </div>)
                })
                }
                <div className="form-group">
                  <div className="add-image-tile" onClick={this.openImage.bind(this)}>
                    <svg width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-15D7A" d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path></svg>
                    <input name="pimage" accept="image/*" type="file" ref={(ref) => this.fileIn = ref} onChange={this.savePhoto.bind(this)} />
                  </div>

                  {this.props.imageArr ? [this.props.imageArr.map((path, i) => (<div key={i} className="image-tile">
                    <img src={APIURL + path} />
                    <span className="main-link-red" onClick={this.removePhoto.bind(this, path)}> <FontAwesomeIcon icon={faTimes} /></span>
                  </div>))] : null}


                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" onChange={this.changeAddSel.bind(this)} type="checkbox" value="yes" id="addressSel" />
                    <label className="form-check-label" htmlFor="addressSel">
                      Use Different Address For Product
                      </label>
                  </div>
                </div>
                {this.state.diffAddess ? <> <div className="form-group">
                  <label className="control-label" htmlFor="Address">Address</label>
                  <textarea className="form-control" id="Address" onChange={this.saveData.bind(this, 'address')} name="Address" placeholder="Enter Address"></textarea>
                </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="City">City</label>
                    <input id="City" name="City" type="text" placeholder="City" onChange={this.saveData.bind(this, 'city')} className="form-control input-md" />
                  </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="State">State</label>
                    <select id="State" name="State" className="form-control" onChange={this.saveData.bind(this, 'state')} >
                      <option value="">-- Select State --</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Lakshadweep">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="zipcode">Zipcode</label>
                    <input id="zipcode" name="zipcode" type="text" onChange={this.saveData.bind(this, 'zipcode')} placeholder="zipcode" className="form-control input-md" />
                  </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="zipcode">Contact Number</label>
                    <input id="contact_no" name="contact_no" type="text" onChange={this.saveData.bind(this, 'contact_no')} placeholder="Contact No" className="form-control input-md" />
                  </div> </> : null}
                <div className="form-group">
                  <button name="submit" type="submit" className="btn main-btn" onClick={this.saveProduct.bind(this)}>Submit</button>
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
    success_msg: state.addProductReducer.success_msg,
    error_msg: state.addProductReducer.error_msg,
    draftId: state.addProductReducer.did,
    imageArr: state.addProductReducer.imageArr
  };
};

const mapDispatchToProps = (dispatch) => ({
  makeDraft: (data) => dispatch(makeDraft(data)),
  savePhoto: (data) => dispatch(savePhoto(data)),
  removePhoto: (data) => dispatch(removePhoto(data)),
  saveProduct: (data) => dispatch(saveProduct(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Index)