import { useData } from '../hooks/useData';
import TestimonialCard from '../components/about/TestimonialCard';
import Spinner from '../components/common/Spinner';
import './AboutPage.css';

const AboutPage = () => {
  const { testimonials, loading } = useData();

  return (
    <div className="about-page">
      <section className="about-section">
        <h2>About Our Brand</h2>
        <p>At WEAR THE STORY, every stitch tells a tale. We are more than a clothing brand — we are a movement towards mindful fashion. Our pieces are crafted from sustainable fabrics, brought to life through intricate hand embroidery by skilled artisans who pour their heart and heritage into every thread.

We believe that what you wear should reflect not just your style, but your values. Each garment is designed to celebrate craftsmanship, culture, and conscious living, ensuring you look good while doing good for the planet.

Our approach is simple yet powerful — slow fashion with purpose. We work directly with local artisans and use eco-friendly materials to create timeless pieces that stand for both beauty and responsibility. From handwoven textiles to nature-inspired motifs, our creations carry stories of tradition, sustainability, and care.

We’re also open for customisations, because we know every person’s story is unique. Whether it’s a bespoke design, a special fit, or personalized detailing, we tailor our creations to reflect you. <br/>

<b>✨ To the conscious shoppers, by the conscious makers — join us in wearing stories that matter.</b></p>
        <h3>Our Moto</h3>
        <p>"Crafting quality with passion and purpose."</p>
      </section>
      
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        {loading ? <Spinner /> : (
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)
            ) : (
              <p>No testimonials yet. Be the first to leave a review!</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutPage;