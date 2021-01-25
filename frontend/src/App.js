import React, { Component, lazy , Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css'
import './main.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Suspense fallback={<h1 className='text-center'>Loading</h1>}>
          <Switch>
            <Route exact path="/" component={lazy(()=>import('./views/pages/home'))} />
            <Route exact path="/forget-password" component={lazy(()=>import('./views/pages/forget-password'))} />
            <Route exact path="/change-password" component={lazy(()=>import('./views/pages/change-password'))} />
            <Route exact path="/profile" component={lazy(()=>import('./views/pages/profile'))} />
            <Route exact path="/medical-profile" component={lazy(()=>import('./views/pages/medical'))} />
            <Route exact path="/notifications" component={lazy(()=>import('./views/pages/notifications'))} />
            <Route exact path="/remove-account" component={lazy(()=>import('./views/pages/remove-account'))} />
            <Route exact path="/add-product" component={lazy(()=>import('./views/pages/add-product'))} />
            <Route exact path="/search" component={lazy(()=>import('./views/pages/search'))} />
            <Route exact path="/products" component={lazy(()=>import('./views/pages/products'))} />
            <Route exact path="/product/:id" component={lazy(()=>import('./views/pages/product'))} />
            <Route exact path="/about-us" component={lazy(()=>import('./views/pages/about'))} />
            <Route exact path="/contact-us" component={lazy(()=>import('./views/pages/contact'))} />
            <Route exact path="/terms-conditions" component={lazy(()=>import('./views/pages/terms'))} />
            <Route exact path="/faqs" component={lazy(()=>import('./views/pages/faq'))} />
            <Route exact path="/terms" component={lazy(()=>import('./views/pages/terms'))} />
            <Route exact path="/appointments" component={lazy(()=>import('./views/pages/appointments'))} />
            
          </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
