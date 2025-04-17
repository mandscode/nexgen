import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Eye, EyeOff } from "react-feather";
import { tokenSuccess } from "../../redux/actions/tokenActions";
import { fetchUserById } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
  userId: string; // User ID required for updating the password
  isFirstLogin?:any;
  email:any;
}

const OldPasswordChangeModal = ({ show, onHide,email, userId, isFirstLogin }: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const dispatch = useDispatch();
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
          isFirstLogin:false
        }
          
      } else {
        data = {
          oldPassword:oldPassword,
          newPassword:password,
          isFirstLogin:false
        }      
      }
      await api.put(`/users/${userId}/change-password`, { ...data });
      const loginResponse = await api.post("/users/login", { email, password, entity:2 });

      if (loginResponse.data.token) {
        const { token, userId } = loginResponse.data;
          // Dispatch new token
        await dispatch(tokenSuccess(token));
        // Fetch updated user details
        setTimeout(() => {
          dispatch(fetchUserById(Number(userId)) as any);
          navigate("/");
        }, 0);
      
        console.log('3');
      } else {
        alert("Password changed, but unable to log in automatically. Please log in manually.");
        navigate("/auth/login");
      }
          
      onHide();
      navigate("/auth/login"); // Redirect to login after password change
    } catch (error:any) {
      setLoading(false);
      onHide();
      alert(error.response.data.message || `Wrong old password`);
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
<div className="login-box">
      <div className="password-form" >
        {/* Old Password Field */}
        <div className="input-group password-group">
          <label htmlFor="old-password">Old Password</label>
          <div className="password-wrapper">
            <input
              type={showOldPassword ? "text" : "password"}
              id="old-password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={inputErrors.oldPassword ? "error" : ""}
            />
            <span className="password-toggle" onClick={() => setShowOldPassword(!showOldPassword)}>
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {inputErrors.oldPassword && <small className="error-text">{inputErrors.oldPassword}</small>}
        </div>

        {/* New Password Field */}
        <div className="input-group password-group">
          <label htmlFor="new-password">New Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="new-password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => handleValidation("password", e.target.value)}
              className={inputErrors.password ? "error" : ""}
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {inputErrors.password && <small className="error-text">{inputErrors.password}</small>}
        </div>

        <div className="button-group">
          <button className="login-button" disabled={loading} onClick={handlePasswordSubmit}>
            {loading ? "Saving..." : "Save and Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OldPasswordChangeModal;