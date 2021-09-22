import React,{useState, useEffect} from 'react'
import {auth,db} from '../config/config'
import { CartProducts } from './CartProducts';
import './cart.css'
import Navbar from "../Navbar/Navbar";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import KhaltiCheckout from "khalti-checkout-web";
//import myKey from '../Khalti/KhaltiKey'
//import firebase from "firebase/app";
import { Modal } from './Modal';
toast.configure();


export const Cart = () => {  
    // show modal state
    const [showModal, setShowModal]=useState(false);

    // trigger modal
    const triggerModal=()=>{
        setShowModal(true);
    }

    // hide modal
    const hideModal=()=>{
        setShowModal(false);
    }
         

    

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().Name);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);
     // getting the qty from cartProducts in a seperate array
     const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
        
    })
    

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);


    // global variable
    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.Price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                }) 
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }
    

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.Price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

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
 const history=useHistory();
     //charging payment
    
        const handleToken=async(token)=>{
           // console.log(token);
           const cart={name: 'all product',totalPrice}
           const response=await axios.post('http://localhost:8080/checkout',{
            token,
            cart,
          }) 
          let{status}=response.data;
          if(status==='success'  ){
              //code here
                const uid = auth.currentUser.uid;
                const userData = await db.collection('users').doc(uid).get();
                await db.collection('Buyer-Personal-Info').add({
                    Name: userData.data().Name,
                    Email: userData.data().Email,                   
                     CartPrice: totalPrice,
                    CartQty: totalQty,
                    delevarystatus:"Paid"
                })
                const cartData = await db.collection('Cart' + uid).get();
                for(var snap of cartData.docs){
                    var data = snap.data();
                    data.ID = snap.id;
                    await db.collection('Buyer-Cart' + uid).add(data);
                    await db.collection('Cart' + uid).doc(snap.id).delete();
                }
                history.push('/');
                toast.success('Your order has been placed successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  });
          }
          else{
              alert('something went wrong');
          }
        } 
       
        //khalti
        

        /*let config = {
    
            // replace this key with yours
            "publicKey": myKey.publicTestKey,
            "productIdentity": "1234",
            "productName": "My gamer Choice store",
            "productUrl": "http://localhost:8080",
            "eventHandler": {
                
                onSuccess (payload) {
                    /*history.push('/');
                    // hit merchant api for initiating verfication
                    console.log(payload);
                    toast.success("Payment Sucessfull",{
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                      });                                     
                   
                
        
                },
                // onError handler is optional
                onError (error) {
                    // handle errors
                    alert('something went wrong');
                    console.log(error);
                },
                onClose () {
                    console.log('widget is closing');
                }
            },
            "paymentPreference": ["KHALTI"],
        };
       
        let checkout = new KhaltiCheckout(config);*/
       // <button  onClick={()=>checkout.show({amount: totalPrice*100})} className="khalti-btn"> Pay via khalti </button>
                        
      
   
    return (
        <>
            <Navbar totalProducts={totalProducts}/>     
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                           cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}
                        />                        
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                       
                        <br />
                       <StripeCheckout
                            stripeKey='pk_test_51JZcpAIjVOPLa5urYbam9ODEG211DAf4FGV00HkPADefaXolyBg6IErz5YzG7loc5qrdbwnPCzJYdq6U0FWhvRMK00lcmQdRrI'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice * 100}
                        ></StripeCheckout> 
                            <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>
                        <button className='btn1 ' 
                        onClick={()=>triggerModal()}>Cash on Delivery</button>                                                                                                                                             
                       

                       
                    </div>                         
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='page-heading' component={Link} to='/pc'>No products to show</div>
            ) }   
            {showModal===true&&(
                <Modal TotalPrice={totalPrice} totalQty={totalQty}
                    hideModal={hideModal}
                />
            )}                  
        </>
    )
}