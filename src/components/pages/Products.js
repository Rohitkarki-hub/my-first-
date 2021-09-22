import React from 'react'
import './product.css'
import { Individualproduct } from './Individualproduct'
export const Products = ({products,addToCart}) => {
   // console.log(products);
    return products.map((individualProduct)=>(
      <Individualproduct  key={individualProduct.ID} individualproduct={individualProduct}
      addToCart={addToCart}
      />
      
    ))
}
