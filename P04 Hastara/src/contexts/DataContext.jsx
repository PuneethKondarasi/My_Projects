import { createContext, useState, useEffect } from 'react';
import { getProducts, getTestimonials } from '../services/firestoreService';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        const testimonialData = await getTestimonials();
        setProducts(productData);
        setTestimonials(testimonialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshProducts = async () => {
     setProducts(await getProducts());
  }

  const refreshTestimonials = async () => {
    setTestimonials(await getTestimonials());
  }


  const value = { products, testimonials, loading, refreshProducts, refreshTestimonials };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};