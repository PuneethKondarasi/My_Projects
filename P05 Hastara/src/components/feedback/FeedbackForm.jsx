import { useState } from 'react';
import { addTestimonial } from '../../services/firestoreService';
import { uploadImage } from '../../services/storageService';
import StarRating from './StarRating';
import './FeedbackForm.css'; // Create this CSS file for styling

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !name || !review) {
      setMessage("Please fill out all fields and provide a rating.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImage(image);
      }
      await addTestimonial({ name, review, rating, imageUrl });
      setMessage("Thank you! Your feedback has been submitted.");
      // Reset form
      setName(''); setReview(''); setRating(0); setImage(null); e.target.reset();
    } catch (error) {
      setMessage("Sorry, something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <StarRating rating={rating} setRating={setRating} />
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Your Review" value={review} onChange={(e) => setReview(e.target.value)} required />
      <label>Add a photo (optional):</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
};
export default FeedbackForm;