import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt, FaCheckCircle, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const faqs = [
  { q:'How do I set my monthly budget?', a:'Go to Monthly Budget page from the sidebar. Click "Edit Budget", enter your amount, and save.' },
  { q:'How do I add an expense?', a:'Click "Add Expense" in the sidebar or the quick action button on Dashboard. Fill in the details and submit.' },
  { q:'Can I edit or delete an expense?', a:'Yes! Go to Expense History, find the expense, and use the Edit or Delete buttons on the right.' },
  { q:'How do savings goals work?', a:'Go to Savings Goals, create a goal with a target amount and deadline. Update your saved amount anytime to track progress.' },
  { q:'Does my budget reset every month?', a:'Yes, your budget resets automatically at the start of each new month. Old data is saved in your history.' },
  { q:'Is BudgetBuddy free to use?', a:'Yes! BudgetBuddy is 100% free for students. No credit card, no hidden charges — ever.' },
  { q:'How do I change my password?', a:'Go to Profile → Change Password tab. Enter your current password and set a new one.' },
];

const ContactHelpPage = () => {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name:'', email:'', message:'' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Help & Contact</h2>
          <p className="page-sub">Need help? We're here for you!</p>
        </div>

        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="inner-card">
              <h5 className="section-label">Get in Touch</h5>
              {[
                { icon:<FaEnvelope />, title:'Email', detail:'support@budgetbuddy.in', color:'#00C853' },
                { icon:<FaMapMarkerAlt />, title:'Location', detail:'India', color:'#2196F3' },
                { icon:<FaMobileAlt />, title:'Response Time', detail:'Within 24 hours', color:'#FF9800' },
              ].map((item,i) => (
                <div className="contact-info-row" key={i}>
                  <div className="contact-info-icon" style={{background:`${item.color}18`, color:item.color}}>{item.icon}</div>
                  <div>
                    <h6>{item.title}</h6>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="inner-card mt-4">
              <h5 className="section-label">About BudgetBuddy</h5>
              <p className="about-blurb">BudgetBuddy is a free expense management tool designed specifically for students aged 16+. Built with React, Flask & MySQL.</p>
              <div className="version-info">
                <span>Version 1.0.0</span>
                <span>🇮🇳 Made in India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="inner-card">
              <h5 className="section-label">Send Us a Message</h5>

              {submitted && <div className="success-toast mb-3"><FaCheckCircle /> Message sent! We'll reply within 24 hours.</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group-bb">
                      <label>Your Name</label>
                      <input type="text" className="bb-form-input" placeholder="e.g. Priya Sharma"
                        value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group-bb">
                      <label>Email Address</label>
                      <input type="email" className="bb-form-input" placeholder="your@email.com"
                        value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group-bb">
                      <label>Message</label>
                      <textarea className="bb-form-input" rows={5} placeholder="Write your message..."
                        value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
                    </div>
                  </div>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message <FaArrowRight />
                </button>
              </form>
            </div>

            {/* FAQs */}
            <div className="inner-card mt-4">
              <h5 className="section-label">Frequently Asked Questions</h5>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <div className={`faq-item ${openFaq===i?'open':''}`} key={i}>
                    <button className="faq-question" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                      <span>{faq.q}</span>
                      {openFaq===i ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {openFaq===i && <div className="faq-answer">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactHelpPage;
