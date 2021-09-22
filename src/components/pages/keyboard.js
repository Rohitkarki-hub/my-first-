import{React, useEffect, useState} from "react";
import { db,auth } from "../config/config";
import { Products } from './Products'
import './product.css'
import Navbar from "../Navbar/Navbar";

const Keyboard=(props)=>{
 //gettinf currrrrrent user uid
 function GettingUserid(){
    const [uid,setUid]=useState(null);  
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{   
          if (user) {
             setUid(user.uid);
          }
        })
         },[])
      return uid;
    }           
    const uid =GettingUserid();   

 
 

    


 //state of products
 const [products, setProducts]=useState([]);
 //getting porducts functions
   
  const getProducts=async()=>{     
     const products = await  db.collection('Products')      
     .get();
        
        const productsArray=[];
     for (var snap of products.docs){
         var data=snap.data();        
        data.ID=snap.id;
        productsArray.push({
            ...data
        })
     }
          /*const catogeries =productsArray.map(productsArray=>{    
              if(productsArray.Catogery==="pc")
                newArray.push({
                    data
                })            
           return newArray;
        })   
            console.log(catogeries)*/
            
            const ref=db.collection("Products");
   
            ref.onSnapshot((querysnapshot)=>{
                const items=[];
                querysnapshot.forEach((doc)=>{
                    items.push(doc.data());
                    
        
                });
                
                var wanted = items.filter( function(item){return (item.Catogery==='keyboard');} );
        
                   console.log(wanted)
        
                   
                        
                 setProducts(wanted);  
        
            
            });
           
       
            //if(productsArray.length === products.docs.length ){
            
            // console.log(productsArray)
                
       
       
           
     
         
        }
        useEffect(()=>{
        getProducts();
   
    },[])
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
 //console.log(totalProducts)

 

    
    

   

           
         
   
    
    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.Price * Product.qty;
            db.collection('Cart' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/login');
        }
        
    }

    

    

    
        

    return(
        <>
           
            <Navbar totalProducts={totalProducts}/>
                   
                    {products.length> 0  && (  
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='product-box'>
                    <Products products={products} addToCart={addToCart}/>
                    </div>    
                </div>
            )}  
                   
                   
            {products.length < 1 &&(
                <div className='page-heading'>please wait...</div>
            )
            }
            
             </>
         )
                
};
export default Keyboard;