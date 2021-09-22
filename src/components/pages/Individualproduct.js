import React from 'react'

export const Individualproduct = ({individualproduct, addToCart}) => {
   //console.log(individualproduct);
   const handleAddToCart=()=>{
     addToCart(individualproduct);
   }
   
    return (
        <div className='product'>
            <img src={individualproduct.ProductImg} alt="product-img"/> 
            <div className='product-text title'>{individualproduct.ProductName}</div>  
            <div className='product-text description'>{individualproduct.Description}</div> 
            <div className='product-text price'>${individualproduct.Price}</div> 
            <div className='button' onClick={handleAddToCart}>Add to cart</div>  


                    
        </div>
    )   
}

