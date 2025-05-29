import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [products, setproducts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/products').then((res) => {
            setProducts(res.data);
        })
    },[])
  return (
    <div>
        <h1>Products</h1>
        {
            products.map((product) => (
                <div key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} width="150"/>
                        <p>${product.price}</p>
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default Home