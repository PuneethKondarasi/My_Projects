import { useState } from 'react';
import ProductDetail from './ProductDetail';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if imageUrls exists and is an array, otherwise default to an empty array
  const imageUrls = Array.isArray(product.imageUrls) ? product.imageUrls : [];

  // If imageUrls is empty, you can either show a default image or leave it empty
  const mainImage = imageUrls.length > 0 ? imageUrls[0] : 'default-image.jpg'; // Replace with your default image path if needed

  return (
    <>
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        {/* Display the first image from the imageUrls array */}
        <img 
          src={mainImage} 
          alt={product.name} 
          className="product-image" 
        />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
        </div>
      </div>

      {/* Show the ProductDetail modal when clicked */}
      {isModalOpen && <ProductDetail product={product} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ProductCard;
