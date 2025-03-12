import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Eye, EyeOff } from "react-feather";

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
  userId: string; // User ID required for updating the password
  isFirstLogin?:boolean;
}

const OldPasswordChangeModal = ({ show, onHide, userId, isFirstLogin }: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async () => {
    if (!password) {
      alert("Please enter a new password.");
      return;
    }
    if (inputErrors['password']) {
      alert("Please enter right password.");
      return;
    }
    setLoading(true);
    try {
      let data;
        if(isFirstLogin) {
          data = {
              oldPassword:oldPassword,
              newPassword:password,
              isFirstLogin:true
          }
          
        } else {
          data = {
              oldPassword:oldPassword,
              newPassword:password,
              isFirstLogin:false
          }

        }
        
      await api.put(`/users/${userId}/change-password`, { ...data });
      alert("Password changed successfully. Please log in with your new password.");
      onHide();
      navigate("/login"); // Redirect to login after password change
    } catch (error:any) {
      setLoading(false);
      onHide();
      alert(`Wrong old password`);
    }
    setLoading(false);
  };

  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", email: "" });

  const handleValidation = (name: string, value: string) => {
    setPassword(value)
    if (name === "password") {
      let errorMessage = "";
  
      // Rule 1: Minimum Length (8-16 characters)
      if (value.length < 8 || value.length > 16) {
        errorMessage = "Password must be 8-16 characters long.";
      }
  
      // Rule 2: Upper & Lowercase Letters
      else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        errorMessage = "Password must include at least one uppercase and one lowercase letter.";
      }
  
      // Rule 3: Numbers
      else if (!/\d/.test(value)) {
        errorMessage = "Password must include at least one number.";
      }
  
      // Rule 4: Special Characters
      else if (!/[@$!%*?&]/.test(value)) {
        errorMessage = "Password must include at least one special character (@, #, $, %, &, *, !).";
      }
  
      // Rule 5: No Common Words or Patterns
      else if (/(password|admin|12345678)/i.test(value)) {
        errorMessage = "Password cannot be a common word or pattern.";
      }
  
      // // ✅ Rule 6: No Personal Information (First Name, Email)
      // else if (
      //   personalInfo.firstName &&
      //   value.toLowerCase().includes(personalInfo.firstName.toLowerCase())
      // ) {
      //   errorMessage = "Password cannot contain your first name.";
      // } 
      // else if (
      //   personalInfo.email &&
      //   value.toLowerCase().includes(personalInfo.email.split("@")[0].toLowerCase())
      // ) {
      //   errorMessage = "Password cannot contain your email.";
      // }
  
      // Rule 7: No Consecutive or Repetitive Characters
      else if (/(.)\1{2,}/.test(value) || /(0123|1234|abcd)/i.test(value)) {
        errorMessage = "Password cannot contain consecutive or repetitive characters.";
      }
  
      // If no errors, clear the error message
      if (errorMessage) {
        setInputErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setInputErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                isInvalid={!!inputErrors.oldPassword}
              />
              <InputGroup.Text
                onClick={() => setShowOldPassword(!showOldPassword)}
                style={{ cursor: "pointer", background: "white" }}
              >
                {showOldPassword ? <EyeOff /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid" className="d-block">
              {inputErrors.oldPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
            <Form.Control
            type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => handleValidation("password", e.target.value)}
            />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", background: "white" }}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Control.Feedback type="invalid" className={inputErrors['password'] ? "d-block" : "d-none"}>
          {inputErrors['password']}
          </Form.Control.Feedback>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePasswordSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Password"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OldPasswordChangeModal;