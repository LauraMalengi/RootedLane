import React, { useState } from "react";
import "./ContactUs.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in Name, Email and Message");
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    
    setTimeout(() => {
      console.log("Form submitted:", form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setSubmitted(true);
      setLoading(false);
    }, 1500);
    
    /* Uncomment this when your backend is ready:
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setForm({ name: "", email: "", phone: "", message: "" });
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        {submitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>We've received your message and will get back to you soon.</p>
            <a href="/" className="btn-primary">Back to Shopping</a>
          </div>
        ) : (
          <>
            <h2>Contact Us</h2>
            <p className="contact-sub">We'd love to hear from you — send us a message.</p>

            <form onSubmit={onSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Your full name" />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" />
              </div>

              <div className="form-row">
                <label>Phone </label>
                <input name="phone" value={form.phone} onChange={onChange} type="tel" placeholder="+27 71 000 0000" />
              </div>

              <div className="form-row">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={onChange} rows="5" placeholder="Write your message..."></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}