import { useNavigate } from "react-router-dom";
import "./Paymentstyles.css";

const RefundPolicyPage = () => {
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
        <h2>Refund & Cancellation Policy</h2>

        <ul className="terms-list">
          <li>
            <strong>Cancellations:</strong> Projects may be cancelled before
            work begins. Once work has started, cancellations are not possible.
          </li>
          <li>
            <strong>Refunds:</strong> All services are non-refundable unless
            otherwise agreed in writing before the project starts. Partial
            refunds or adjustments may be considered only in exceptional cases
            at my discretion.
          </li>
          <li>
            <strong>Delivery Issues:</strong> If a project cannot be delivered
            due to my fault, I will provide a fair resolution which may include
            partial refund or revised delivery timeline.
          </li>
          <li>
            <strong>Contact for Refunds/Cancellations:</strong> Please contact
            me directly at narayanaditya7804@gmail.com for any issues related to
            cancellations or refunds.
          </li>
        </ul>
        <button className="close-panel-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default RefundPolicyPage;

