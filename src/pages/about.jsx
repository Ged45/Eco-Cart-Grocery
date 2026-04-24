import "../styles/about.css";
import { LuHeart, LuLeaf } from "react-icons/lu";
import { FiAward, FiTruck } from "react-icons/fi";

function AboutPage() {
  const values = [
    {
      title: "Sustainable Sourcing",
      description:
        "We partner with local organic farms committed to sustainable and eco-friendly practices.",
      icon: LuLeaf,
    },
    {
      title: "Quality First",
      description:
        "Every product is handpicked and quality-checked to ensure you receive only the best.",
      icon: LuHeart,
    },
    {
      title: "Fast Delivery",
      description:
        "Fresh groceries delivered to your door within 24 hours of harvest.",
      icon: FiTruck,
    },
    {
      title: "Certified Organic",
      description:
        "Our organic products are certified and meet the highest standards of quality.",
      icon: FiAward,
    },
  ];

  const impact = [
    { value: "50+", label: "Local Farms" },
    { value: "10k+", label: "Happy Customers" },
    { value: "100%", label: "Organic Options" },
    { value: "24hr", label: "Fresh Delivery" },
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>About Eco-Cart Grocery</h1>
        <p>
          Your trusted partner for fresh, sustainable, and organic groceries
          delivered right to your doorstep.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At Eco-Cart Grocery, we believe in making sustainable, healthy food
          accessible to everyone. We work directly with local farmers and
          producers to bring you the freshest products while supporting our
          community and protecting the environment. Our commitment to quality,
          sustainability, and customer satisfaction drives everything we do.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <div className="about-values-grid">
          {values.map((item) => (
            <article key={item.title} className="about-card">
              <span className="about-card-icon" aria-hidden="true">
                <item.icon className="about-card-icon-svg" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-impact">
        <h2>Our Impact</h2>
        <div className="about-impact-grid">
          {impact.map((item) => (
            <div key={item.label} className="about-impact-item">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, Eco-Cart Grocery started with a simple vision: to
          make fresh, organic groceries accessible to everyone while supporting
          local farmers and reducing environmental impact. What began as a small
          farmer&apos;s market booth has grown into a thriving community of
          conscious consumers and dedicated producers.
        </p>
        <p>
          Today, we&apos;re proud to serve thousands of families with the
          freshest products while maintaining our commitment to sustainability,
          quality, and community. Every purchase you make helps support local
          agriculture and contributes to a healthier planet.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
