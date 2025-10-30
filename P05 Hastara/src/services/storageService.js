import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

// For the public feedback form
export const uploadImage = async (file) => {
  const storageRef = ref(storage, `feedback-images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// For the admin product manager
export const uploadProductImage = async (file) => {
  const storageRef = ref(storage, `product-images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};