import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { SendEmail } from "./SendEmail"; // Adjust path if needed

const ResendEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleSendPassword = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const msg = "Click the link below to reset your password: https://yourwebsite.com/reset-password";
      await SendEmail(email, "Password Reset Request", msg);

      setLastMessage(msg); // Store the last sent message
      setMessage("Password reset link sent to your email!");
    } catch (error) {
      setMessage("Failed to send email. Please try again.");
    }

    setLoading(false);
  };

  const handleResendLastEmail = async () => {
    if (!email || !lastMessage) {
      setMessage("No previous message found. Please request a reset first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await SendEmail(email, "Password Reset Request", lastMessage);
      setMessage("Last email resent successfully!");
    } catch (error) {
      setMessage("Failed to resend email. Please try again.");
    }

    setLoading(false);
  };

  return (
    <MDBContainer className="d-flex flex-column align-items-center">
      <h2 className="mb-4">Forgot Password?</h2>
      <MDBInput
        wrapperClass="mb-3"
        label="Enter your email"
        type="email"
        className="form-control-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <MDBBtn className="btn-lg mb-2" onClick={handleSendPassword} disabled={loading}>
        {loading ? "Sending..." : "Send Password to Your Email"}
      </MDBBtn>
      
      {lastMessage && (
        <MDBBtn className="btn-lg" color="secondary" onClick={handleResendLastEmail} disabled={loading}>
          {loading ? "Resending..." : "Resend Last Email"}
        </MDBBtn>
      )}

      {message && <p className="mt-3">{message}</p>}
    </MDBContainer>
  );
};

export default ResendEmail;
