import React from 'react';
import ReactDOM from 'react-dom';

// Components
import HomePage from './components/homePage/HomePage'
import DivelogForm from './components/diveLogs/DivelogForm'
import LocationsOverview from './components/diveLocations/LocationsOverview'
import LocationDetails from './components/diveLocations/LocationDetails'
import UserView from './components/user/UserView'
// Router and Redux imports
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
// import store from './store';
// Stylesheets
import './index.css';

ReactDOM.render(

//   <Provider store={store}>
        <Router history={hashHistory}>

            <Route path="/" component={HomePage}></Route>
            <Route path="/divelogs/:userId/new" component={DivelogForm}></Route>
            <Route path="/users/:userId" component={UserView}></Route>
            <Route path="/divelocations" component={LocationsOverview}></Route>
            <Route path="/divelocations/:locationId" component={LocationDetails}></Route>

        </Router>,
    // </Provider>,

    document.getElementById('root')
);
