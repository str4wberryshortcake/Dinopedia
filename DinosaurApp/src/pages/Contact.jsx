import React, { useState } from 'react';
import '../App.css';
import './Contact.css';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'General Inquiry', message: ''
  });
  const [submitted, setSubmitted] = useState(false);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };


  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form:', formData);
    setSubmitted(true);
  };


  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>


      {submitted
        ? (
          <div className="contact-form" style={{ textAlign:'center' }}>
            <h2>Thank You!</h2>
            <p>We've received your message and will get back to you soon.</p>
            <button
              className="submit-button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name:'', email:'', subject:'General Inquiry', message:'' });
              }}
            >
              Send Another Message
            </button>
          </div>
        )
        : (
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input name="name" id="name" required
                  value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input name="email" id="email" type="email" required
                  value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <select name="subject" id="subject"
                  value={formData.subject} onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Dinosaur Question</option>
                  <option>Website Feedback</option>
                  <option>Merchandise Question</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" rows={5} required
                  value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        )}
    
    </div>
  );
};


export default Contact;
