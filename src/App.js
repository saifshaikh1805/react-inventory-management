// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import Products from './containers/Products/Products';
import AddMovement from './containers/Movements/AddMovement';
import AddEditProduct from './containers/Products/AddEditProduct';
import { Route, Switch } from 'react-router-dom';
import ProductView from './containers/Products/ProductView';
import FullReport from './containers/Products/FullReport';
import { getProdsAndLocations } from './myFunctions';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Movements from './containers/Movements/Movements';
import Locations from './containers/Locations/Locations';
import AddEditLocation from './containers/Locations/AddEditLocation';

class App extends React.Component {
  componentDidMount() {
    getProdsAndLocations();
  }
  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <Navbar></Navbar>
            <Switch>
              <Route path='/' component={Products} exact></Route>
              <Route path='/products' component={Products} exact></Route>
              <Route path='/products/add-edit' component={AddEditProduct}></Route>
              <Route path='/products/view' component={ProductView}></Route>
              <Route path='/products/full-report' component={FullReport}></Route>
              <Route path='/movements' component={Movements} exact></Route>
              <Route path='/movements/add' component={AddMovement}></Route>
              <Route path='/locations' component={Locations} exact></Route>
              <Route path='/locations/add' component={AddEditLocation} exact></Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movementsLocations: state.movementsLocations
  }
}

export default connect(mapStateToProps)(App);
