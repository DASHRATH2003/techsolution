import React from 'react';

const TermsConditions = () => {
  return (
    <div className="terms-conditions">
      <section className="legal-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-text">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on our website 
              for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including 
              without limitation, implied warranties or conditions of merchantability, fitness for 
              a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall our company or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our website.
            </p>

            <h2>5. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the website, to understand our practices.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to revise these terms of service at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of 
              these terms of service.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us through 
              our contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
