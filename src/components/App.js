import React from 'react';
import { BrowserRouter  as Router,Switch,Route}  from 'react-router-dom';
import Home from './pages/Home';
import Console from './pages/Console';
import Keyboard from './pages/keyboard'
import Mice from './pages/mice';
import PC from './pages/PC';
import Headphones from './pages/Headphones';
import Footer from './Footer/Footer';
import { Login } from './Login/Login';
import {Signup} from './Login/Signup';
import { AddProducts } from './AddProduct/AddProduct';
import {Cart} from './Cart/Cart';

import './App.css';


function App() {
   
      
  return (

      <div className="container">
        <Router>
         
          <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/monitor" component={PC}/>
          <Route path="/console" component={Console}/>
          <Route path="/keyboard" component={Keyboard}/>
          <Route path="/mice" component={Mice}/>
          <Route path="/headphones" component={Headphones}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/addproduct" component={AddProducts}/>
          <Route path="/cart" component={Cart}/>
         
          
          </Switch>
        </Router>
        
        
       

       <Footer />
       
       
        
       
        
       
        
        <div>
      

      </div>
      
      </div>
     
    
  );
}

export default App;
