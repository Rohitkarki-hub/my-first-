import React,{useState,useEffect} from "react";
import { auth,db } from "../config/config";
import Navbar from "../Navbar/Navbar";
import "./Home.css"
import keyboard from '../images/keyboard.jpg'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import mouse from '../images/mouse.jpg'
import Headphones from '../images/Headphones.jpg'
import PC from '../images/PC.jpg'
import Console from '../images/Console.jpg'



const Home=()=>{
 



  // state of totalProducts
  const [totalProducts, setTotalProducts]=useState(0);
  // getting cart products   
  useEffect(()=>{        
      auth.onAuthStateChanged(user=>{
          if(user){
              db.collection('Cart' + user.uid).onSnapshot(snapshot=>{
                  const qty = snapshot.docs.length;
                  setTotalProducts(qty);
              })
             
          }
      })       
  },[])  
  //path

   

  

    return(<>
       <Navbar totalProducts={totalProducts}/>
          <div className='imageContainer'>
            <img src={keyboard} alt="error"></img>       
             <h2 className="image-heading"> In stock now.</h2>
           <p  className="image-heading">Xtrfy K4 TKL Black & White editions.</p>          
           <button className="btn3">
             <Button class="btn"  component={Link} to='/keyboard'>Check it out! </Button>
            </button>
          </div>
          <div  className="grid-container">
            <div className="sub-imageContainer">          
            <img src={mouse} alt="error"></img> 
            <button  className="catogery-btn">
            <Button class="btn"  component={Link} to='/mice'>Browse Mice </Button> 
            </button>          
            </div>
            <div className="sub-imageContainer">          
              <img src={Headphones} alt="error"></img> 
              <button  className="catogery-btn">
              <Button class="btn"  component={Link} to='/headphones'>Browse Headphones </Button> 
            </button>          
            </div>
            <div className="sub-imageContainer">          
              <img src={PC} alt="error"></img> 
              <button  className="catogery-btn">
              <Button class="btn"  component={Link} to='/monitor'>Browse Monitor </Button> 
            </button>          
            </div>
            <div className="sub-imageContainer">          
              <img src={Console} alt="error"></img> 
              <button  className="catogery-btn">
              <Button class="btn"  component={Link} to='/console'>Browse Console </Button> 
            </button>          
            </div>
          </div>    
         
        </> )

};
export default Home;