import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addProduct = (productData) => {
  return addDoc(collection(db, 'products'), productData);
};
export const deleteProduct = (id) => {
  return deleteDoc(doc(db, 'products', id));
};

// Testimonials
export const getTestimonials = async () => {
  const querySnapshot = await getDocs(collection(db, 'testimonials'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addTestimonial = (testimonialData) => {
  return addDoc(collection(db, 'testimonials'), testimonialData);
};
export const deleteTestimonial = (id) => {
  return deleteDoc(doc(db, 'testimonials', id));
};