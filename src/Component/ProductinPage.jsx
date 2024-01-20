import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Style/ProductsComponent.css';
import '../Style/ProductsPage.css';


const ProductinPage = ({ id, name, price, image }) => {
  return (
    <div>
      <div className='product' key={id}>
        <img src={image} className='image-product' alt={name} />
        <div className='product-information'>
          <div className='product-name'>
            {name}
            <br />
            Price: ${price}
          </div>
          <Link to={`/ProductComponent/${id}`} className='add-to-cart'>View Product</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductinPage;
