import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of services including web development, mobile app development, UI/UX design, digital marketing, and business consulting. Our team specializes in creating custom solutions tailored to your specific business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing depends on the project scope, complexity, and timeline. We offer both fixed-price projects and hourly rates. Contact us for a detailed quote based on your specific requirements."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive support and maintenance packages to ensure your project continues to perform optimally. This includes regular updates, security patches, and technical support."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We're experienced in collaborating with in-house teams and can integrate seamlessly into your existing workflow. We can work as an extension of your team or lead the project as needed."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of modern technologies including React, Node.js, Python, PHP, MongoDB, PostgreSQL, AWS, and many others. We choose the best technology stack for each project based on requirements."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Quality assurance is built into every step of our development process."
    },
    {
      question: "Do you sign NDAs?",
      answer: "Yes, we understand the importance of confidentiality and are happy to sign non-disclosure agreements to protect your business ideas and sensitive information."
    }
  ];

  return (
    <div className="faq">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services and process</p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${openItems[index] ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">{openItems[index] ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <h2>Still have questions?</h2>
            <p>Can't find the answer you're looking for? We're here to help!</p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
