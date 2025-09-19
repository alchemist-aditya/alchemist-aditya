import { useNavigate } from "react-router-dom";
import "./Paymentstyles.css";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");

    setTimeout(() => {
      const footer = document.getElementById("footer");
      if (footer) {
        document.documentElement.style.scrollBehavior = "auto";
        footer.scrollIntoView({ behavior: "auto", block: "start" });
        document.documentElement.style.scrollBehavior = "";
      }
    }, 100);
  };

  return (
    <div className="terms-fullscreen">
      <div className="terms-content">
        <h2>Privacy Policy</h2>
        <p className="policy-update-date">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <ul className="terms-list">
          <li>
            <strong>Information Collection:</strong> I collect personal
            information such as your name, email address, and payment details
            when you place an order or contact me. Project-related files (video
            footage, scripts, instructions) are collected only to provide the
            service. Technical data such as IP address, browser type, or device
            information may be collected automatically when you visit my
            website.
          </li>
          <li>
            <strong>Use of Information:</strong> To deliver video editing and
            related services. To process payments and send invoices. To
            communicate about projects, revisions, and delivery. To comply with
            legal, tax, or regulatory requirements.
          </li>
          <li>
            <strong>Data Sharing:</strong> Payment information is handled
            securely by third-party payment processors (e.g. Stripe, Razorpay).
            I may share information if required by law or to protect my rights.
            I do not sell or trade your personal information to third parties.
          </li>
          <li>
            <strong>Data Storage & Retention:</strong> Project files and related
            communications are stored securely and retained only as long as
            necessary to complete the service, or as required by law. Financial
            records (invoices, payments) are retained for statutory compliance.
          </li>
          <li>
            <strong>Security:</strong> The website uses SSL (https) to protect
            data transmission. Project files are stored in secure cloud storage
            accessible only to me.
          </li>
          <li>
            <strong>Cookies:</strong> This website may use cookies for basic
            functionality or analytics. You can disable cookies in your browser
            settings if you prefer.
          </li>
          <li>
            <strong>Your Rights:</strong> You may request access, correction, or
            deletion of your personal information. For such requests, please
            contact me via the email below.
          </li>
          <li>
            <strong>Third-Party Services:</strong> Payments are processed via
            trusted third-party platforms (Stripe, Razorpay). Their privacy
            practices apply to payment data.
          </li>
          <li>
            <strong>Changes to this Policy:</strong> This Privacy Policy may be
            updated from time to time. Updates will be posted on this page with
            a revised "Last Updated" date.
          </li>
          <li>
            <strong>Contact:</strong> For privacy concerns or questions, please
            contact: 📧 narayanaditya7804@gmail.com 🔗{" "}
            <a
              href="https://www.linkedin.com/in/alchemist-aditya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </li>
        </ul>
        <button className="close-panel-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

