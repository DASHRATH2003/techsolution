import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <section className="legal-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-text">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              fill out a form, or contact us. This may include your name, email address, phone number, 
              and any other information you choose to provide.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information 
              with trusted third parties who assist us in operating our website and conducting our business.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Our website may use cookies to enhance your experience. You can choose to disable cookies 
              through your browser settings, but this may affect the functionality of our website.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the 
              privacy practices or content of these external sites.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "last updated" date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us through our 
              contact page or email us directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
