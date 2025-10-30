import FeedbackForm from '../components/feedback/FeedbackForm';
import './FeedbackPage.css';

const FeedbackPage = () => {
  return (
    <div className="feedback-page">
      <h2>We'd Love to Hear From You!</h2>
      <p>Share your experience with our products. Your feedback helps us grow.</p>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;