import { useState } from 'react';
import './Contact.css';

/* ─── SVG Icons ─────────────────────────────────────────── */


const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13 1 .37 1.96.72 2.88a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.2-1.2a2 2 0 012.11-.45c.92.35 1.88.59 2.88.72A2 2 0 0122 17z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);



const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Data ──────────────────────────────────────────────── */


const infoCards = [
  {
    icon: <PhoneIcon />,
    title: 'Phone',
    content: <a href="tel:+15551234567">+1 (555) 123-4567</a>,
  },
  {
    icon: <MailIcon />,
    title: 'Email',
    content: <a href="mailto:support@ecocartgrocery.com">support@ecocartgrocery.com</a>,
  },
  {
    icon: <MapPinIcon />,
    title: 'Address',
    content: <p>123 Organic Lane, Green City, GC 12345</p>,
  },
  {
    icon: <ClockIcon />,
    title: 'Business Hours',
    content: <p>Mon-Sat: 7am-9pm, Sun: 9am-6pm</p>,
  },
];

const subjects = [
  'Select a subject',
  'Order Inquiry',
  'Delivery Issue',
  'Return & Refund',
  'Product Question',
  'Partnership',
  'Other',
];

const faqs = [
  {
    question: 'What are your delivery hours?',
    answer:
      'We deliver 7 days a week between 8am-8pm. You can select your preferred delivery window during checkout.',
  },
  {
    question: 'Do you offer same-day delivery?',
    answer:
      'Yes! Orders placed before 12pm can be delivered the same day, subject to availability in your area.',
  },
  {
    question: 'What is your return policy?',
    answer:
      "We guarantee 100% freshness. If you're not satisfied with any product, contact us within 24 hours for a full refund or replacement.",
  },
];

/* ─── Component ─────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email.';
    if (!form.subject || form.subject === 'Select a subject') e.subject = 'Please choose a subject.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="contact-hero">
        <h2>Get in Touch</h2>
        <p>
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll
          respond as soon as possible.
        </p>
      </section>

      {/* ── Main layout ── */}
      <div className="contact-layout">
        {/* Info cards */}
        <aside className="info-cards">
          {infoCards.map((card) => (
            <div className="info-card" key={card.title}>
              <div className="info-card__icon">{card.icon}</div>
              <div className="info-card__body">
                <h4>{card.title}</h4>
                {card.content}
              </div>
            </div>
          ))}
        </aside>

        {/* Form */}
        <div className="contact-form-card">
          <h3>Send us a Message</h3>

          {submitted && (
            <div className="toast" role="alert">
              <CheckIcon /> Message sent! We&apos;ll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name + Email row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Name <span>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.email}</span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">
                Subject <span>*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
              >
                {subjects.map((s) => (
                  <option key={s} value={s === 'Select a subject' ? '' : s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">
                Message <span>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.message}</span>
              )}
            </div>

            <button id="submit-btn" className="btn-submit" type="submit" disabled={loading}>
              {loading ? (
                'Sending…'
              ) : (
                <>
                  <SendIcon /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-card">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.question}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
