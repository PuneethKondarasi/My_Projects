import { useData } from '../../hooks/useData';
import { deleteTestimonial } from '../../services/firestoreService';
import Spinner from '../common/Spinner';

const TestimonialManager = () => {
  const { testimonials, loading, refreshTestimonials } = useData();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id);
        await refreshTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  return (
    <div className="manager-section">
      <h3>Manage Testimonials</h3>
      <div className="item-list">
        {loading ? <Spinner/> : testimonials.map(t => (
          <div key={t.id} className="item">
            <span>{t.name} ({t.rating}★): "{t.review.substring(0, 30)}..."</span>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TestimonialManager;