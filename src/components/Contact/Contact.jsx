// src/components/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in Name, Email and Message");
      return false;
    }
    // basic email regex
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
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Thank you! Your message has been delivered.");
        setForm({ name: "", email: "", phone: "", message: "" }); // clear
        // redirect to thank you page if you want:
        // window.location.href = "/thankyou";
      } else {
        alert(data.message || "Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p className="contact-sub">We’d love to hear from you — send us a message.</p>

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
            <label>Phone (optional)</label>
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
      </div>
    </div>
  );
}