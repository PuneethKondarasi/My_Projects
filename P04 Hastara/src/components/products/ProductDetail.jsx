import { useState } from 'react';
import { generateWhatsAppLink } from '../../utils/whatsappHelper';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change the displayed image
  const changeImage = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % product.imageUrls.length
      );
    } else if (direction === 'prev') {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length
      );
    }
  };

  const handleBuyNow = () => {
    const link = generateWhatsAppLink(product, quantity, selectedSize);
    window.open(link, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="product-detail-layout">
          <div className="product-detail-image">
            {/* Image Gallery Section */}
            <div className="image-gallery">
              <div className="image-container">
                <button 
                className="image-nav-btn prev-btn" 
                onClick={() => changeImage('prev')}
              >
                &lt;
              </button>
                <img 
                  src={product.imageUrls[currentImageIndex]} 
                  alt={product.name} 
                  className="product-image"
                />
                <button 
                className="image-nav-btn next-btn" 
                onClick={() => changeImage('next')}
              >
                &gt;
              </button>
              </div>
              
            </div>
          </div>
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>
            <h4>Wash Care</h4>
            <p>{product.washCare}</p>
            
            <div className="selectors">
              <div className="size-selector">
                <label>Size:</label>
                {SIZES.map(size => (
                  <button 
                    key={size}
                    className={selectedSize === size ? 'active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="quantity-selector">
                <label>Quantity:</label>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                />
              </div>
            </div>

            <button onClick={handleBuyNow} className="btn btn-primary buy-now-btn">
              Buy Now on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
