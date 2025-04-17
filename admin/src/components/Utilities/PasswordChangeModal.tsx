import { useState, useContext } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Eye, EyeOff } from "react-feather";
import { getUser } from "../../api/apiEndpoints";

import { AppStore } from '../../AppStore';
import {AppContext} from '../../AppContext';

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
  userId: string; // User ID required for updating the password
}

const PasswordChangeModal = ({ show, onHide, userId }: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const appStore = useContext<AppStore>(AppContext);

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
        const response = await api.get(`/users/${userId}`)
        const user = response.data; // Extract user data

        const updateData = {
          firstName:user.firstName,
          lastName:user.lastName,
          email: user.email,
          password:password,
          roleIds: 1,
          isMasterAdmin:true,
          isFirstLogin:false
        }

      await api.put("/users", { id: userId, ...updateData });

      // Now automatically log in with new credentials
      const loginData = {
        email: user.email,
        password: password
      };

      const loginResponse = await api.post('/users/login', loginData);
      const { token, userId: loggedInUserId, isMasterAdmin } = loginResponse.data;
      const loggedInUser = await getUser(loggedInUserId);

      if (loggedInUser.roles) {
        const isAdmin = loggedInUser.roles.find((role: any) => role.name === "Admin");
        const isMasterAdminRole = loggedInUser.roles.find((role: any) => role.name === "Master Admin");

        if (token && loggedInUserId) {
          // Store authentication data
          localStorage.setItem('token', token);
          localStorage.setItem('userIds', String(loggedInUserId));
          localStorage.setItem('isMasterAdmin', isMasterAdmin);
          
          if (localStorage.getItem('userIds')) {
            appStore.setAuthenticated(true);
            navigate("/dashboard");
          }
        } else {
          alert("You don't have permission to login");
        }
      } else {
        alert("Login failed after password change");
      }
      
      onHide(); // Close the password change modal if applicable
    } catch (error) {
      alert("Failed to change password.");
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

export default PasswordChangeModal;