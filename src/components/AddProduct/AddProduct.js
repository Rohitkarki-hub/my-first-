import React, { useState } from 'react'
import { storage, db } from '../config/config'
import './addproduct.css'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const[description,setDescription]=  useState('');
    const[catogery,setCatogery]=  useState('');
    const [error, setError] = useState('');

    const [successMsg, setsuccessMsg] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        Price: Number(productPrice),
                        ProductImg: url,
                        Description:description,
                        Catogery:(catogery)
                    }).then(() => {
                        setsuccessMsg('product added succesfully')
                        setProductName('');
                        setPrice(0)
                        setProductImg('');
                        setDescription('');
                        setCatogery('');
                        setError('');
                        setTimeout(() => {
                            setsuccessMsg('');
                        }, 3000);
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <div className='form_container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr /> {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form__group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form__control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form__control' required
                    onChange={(e) => setPrice(e.target.value)} value={productPrice} />
                <br />
                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br />
                <label>Catogery</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setCatogery(e.target.value)} value={catogery}></input>
                <br />
                <label htmlFor="product__img">Product Image</label>
                <input type="file" className='form__control' id="file" required
                    onChange={productImgHandler} />
                <br />
                
                <button type="submit" className='button1'>Submit</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )}