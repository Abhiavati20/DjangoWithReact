import './App.css';
import Banner from './compnonents/Banner';
// import Footer from './compnonents/Footer';
import Header from './compnonents/Header';
import HomeScreen from './screens/HomeScreen';
import {
  HashRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import userListScreen from './screens/userListScreen';
import userEditScreen from './screens/userEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
function App() {
  return (
    <div >
     <Header/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Banner/>
            <HomeScreen/>
          </Route>
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/admin/userList' component={userListScreen}/>
          <Route path='/admin/productList' component={ProductListScreen}/>
          <Route path='/admin/orderList' component={OrderListScreen}/>
          <Route path='/admin/user/:id/edit' component={userEditScreen}/>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
