import "../Style/ProductsComponent.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import arrowup from "../images/arrowup.svg";
import arrowdown from "../images/arrowdown.svg";
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const ProductDetails = ({ image, name, vendorName, description, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
console.log ( " the id of the product " + id)
  useEffect(() => {});
  const handledecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleincrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const addToCart = () => {
    const product = {
      id: id,
      quantity: quantity,
    };
  
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
  
    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update its quantity
      cartItems[existingProductIndex].quantity += product.quantity;
    } else {
      // If the product is not in the cart, add it to the cart items
      cartItems.push(product);
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="productcomp-title" key={id}>
      <div className="product">
       
        <img src={image} className="product-hppavillon" />
      </div>
      <div className="productdetail">
        <h1 className="productcomp-name"> {name}</h1>
        <div className="product-model">
          {" "}
          <p className="product-bold"> By :</p> {vendorName}{""}
        </div>
        <p className="product-model">
          {" "}
          <p className="product-bold">Description:</p> {description}
        </p>
        <p className="product-price">
          {" "}
          <p className="product-bold1">Price: </p> {price} $
        </p>
        <div className="product-quantity1">
          <div className="product-quantity">
            <img
              src={arrowup}
              onClick={handleincrement}
              className="product-arrowup"
            />
            <div className="product-span">
              <span className="quantity"> {quantity} </span>
            </div>
            <img
              src={arrowdown}
              onClick={handledecrement}
              className="product-arrowdown"
            />
          </div>
          <button type="button" className="btn-addtocart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    {/* Confirmation Modal */}
    {showModal && (
        <div>
          {/* Overlay */}
          <div className="overlay show" onClick={closeModal}></div>

          {/* Modal */}
          <div className="confirmation-modal show">
            <div className="cond">Item Added To Cart</div>
            <div className="Okbutton">
            <Link to='/ProductsPage'>
            <button className="continuebt" onClick={closeModal}>
              Continue Shopping
              </button>
              </Link>
          <Link to='/OrderPage'>
              <button className="addtocartbt" >
                Place Order
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
