import "../Style/ProductsComponent.css";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ProductDetails from "./ProductsDetails";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductComponent = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchProductById(id);
  }, [id]);
  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(
        `https://fresh-basket.onrender.com/products/getProductById/${productId}`
      );
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  return (
    <div>
      <MenuBar />

      {product ? (
        <ProductDetails
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
          vendorName={product.vendorName}
        />
      ) : (
        <p>Loading...</p>
      )}
      

      <Footer />
    </div>
  );
};

export default ProductComponent;
