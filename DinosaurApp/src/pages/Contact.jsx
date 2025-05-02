import React, { useState } from 'react';
import '../App.css'; // or wherever your global styles live

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };

  // reset form
  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>

      {formSubmitted ? (
        <div className="contact-form" style={{ textAlign: 'center' }}>
          <h2>Thank You!</h2>
          <p>We've received your message and will get back to you soon.</p>
          <button className="submit-button" onClick={resetForm}>
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Dinosaur Question">Dinosaur Question</option>
                <option value="Website Feedback">Website Feedback</option>
                <option value="Merchandise Question">Merchandise Question</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h2>Visit Us</h2>
        <p>
          32-24 Corporal Kennedy Street<br />
          Queens, NY 11361
        </p>
        <p>
          Phone: (555) 123-4567 <br />
          Email: info@dinoworld.whatever
        </p>
      </div>
    </div>
  );
};

export default Contact;
