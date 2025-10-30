import { useState } from 'react';
import { useData } from '../../hooks/useData';
import { addProduct, deleteProduct } from '../../services/firestoreService';
import { uploadProductImage } from '../../services/storageService';
import Spinner from '../common/Spinner';

const ProductManager = () => {
  const { products, loading, refreshProducts } = useData();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [washCare, setWashCare] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !description || !washCare || images.length !== imageCount || images.includes(undefined)) {
      alert("Please fill all fields and upload all images.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload all images and get URLs
      const imageUrls = await Promise.all(images.map(img => uploadProductImage(img)));
      await addProduct({ 
        name, 
        price: Number(price), 
        category, 
        description, 
        washCare, 
        imageUrls  // Pass array of URLs instead of single image
      });
      await refreshProducts();
      e.target.reset(); // Reset form
      setName(''); 
      setPrice(''); 
      setCategory(''); 
      setDescription(''); 
      setWashCare(''); 
      setImages([]); 
      setImageCount(0);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await refreshProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="manager-section">
      <h3>Manage Products</h3>
      <form onSubmit={handleAddProduct}>
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" onChange={e => setCategory(e.target.value)} required />
        <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} required />
        <textarea placeholder="Wash Care" onChange={e => setWashCare(e.target.value)} required />
        
        <input
          type="number"
          placeholder="Number of images to upload"
          min="1"
          onChange={e => {
            const count = parseInt(e.target.value) || 0;
            setImageCount(count);
            setImages(new Array(count).fill(undefined));
          }}
          required
        />

        {Array.from({ length: imageCount }).map((_, index) => (
          <input
            key={index}
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(index, e.target.files[0])}
            required
          />
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      <div className="item-list">
        <h4>Current Products</h4>
        {loading ? <Spinner /> : products.map(p => (
          <div key={p.id} className="item">
            <span>{p.name} - ₹{p.price}</span>
            <button onClick={() => handleDeleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
