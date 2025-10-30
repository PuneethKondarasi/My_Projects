import './ProductFilter.css'; // Create this CSS file for styling

const ProductFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="product-filter">
      {categories.map(category => (
        <button
          key={category}
          className={category === activeCategory ? 'active' : ''}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
export default ProductFilter;