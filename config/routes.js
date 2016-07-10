import React from 'react';
import Home from '../components/Home';
import Products from '../components/Products';
import Search from '../components/Search';
import Main from '../components/Main';
import ProdPage from '../components/ProdPage';
import {NotFound} from '../components/NotFound';
import {Route, IndexRoute} from 'react-router';

export default (
  <Route path="/" component={Main}>
    <Route path="/students" component={Studentss} />
    <Route path="/student/:id" component={Student} />
    <Route path="/search/:searchTerm" component={Search} />
	  <Route path="*" component={NotFound}/>
    <IndexRoute component={Home} />
  </Route>
);
