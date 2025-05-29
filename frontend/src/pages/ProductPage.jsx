import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http:localhost:5000/api/products/${id}`).then((res)=>{
            setProduct(res);
        })
    }, [id])

    if(!product)return <p>LOADING....</p>
  return (
    <div>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} width = '150' />
        <p>{product.description}</p>
        <p>${product.price}</p>
    </div>
  )
}

export default ProductPage