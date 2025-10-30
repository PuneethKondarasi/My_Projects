import { useState } from 'react';
import { useData } from '../../hooks/useData';
import ProductCard from '../products/ProductCard';
import ProductFilter from '../products/ProductFilter';
import Spinner from '../common/Spinner';
import './ProductList.css'; // Create this CSS file for styling

const ProductList = () => {
  const { products, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => 
    activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <section className="product-list-section">
      <h2>Our Products</h2>
      <ProductFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {loading ? <Spinner /> : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
};
export default ProductList;