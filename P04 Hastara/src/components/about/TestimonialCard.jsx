import './TestimonialCard.css'; // Create this CSS file for styling
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="stars">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</div>
      <p className="review-text">"{testimonial.review}"</p>
      {testimonial.imageUrl && <img src={testimonial.imageUrl} alt="Review" className="review-image"/>}
      <p className="author-name">- {testimonial.name}</p>
    </div>
  );
};
export default TestimonialCard;