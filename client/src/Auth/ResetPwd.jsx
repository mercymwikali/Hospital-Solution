import React, { useState } from "react";
import { Alert, Button, Card, Input } from "antd";
import logoLogin from "../assets/images/logoLogin.png";
import loginImg from "../assets/images/loginImg.jpg"; 

const ResetPwd = () => {
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change for new password
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle input change for confirm password
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Simulate an API request for password reset
    try {
      // Here you would make an API call for setting the new password
      // Example: await api.resetPassword({ newPassword });

      // Simulate success
      console.log("Password successfully reset:", newPassword);
      setError(""); // Clear error if successful
      alert("Your password has been reset successfully!"); // Alert for demonstration
    } catch (err) {
      setError("An error occurred while resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card
        className="p-0"
        style={{
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          borderRadius: "8px", // Apply border-radius to the card
        }}
      >
        <div className="d-flex flex-row" style={{ width: "100%" }}>
          {/* Right Side with Form */}
          <div
            className="p-4"
            style={{
              flex: 1,
              maxWidth: "450px",
              minWidth: "300px", // Ensure it doesn't shrink too much
            }}
          >
            {/* Logo above the Reset Password message */}
            <div className="text-center mb-3">
              <img
                src={logoLogin}
                alt="Logo"
                style={{ width: "230px", height: "auto" }} // Adjust the size as needed
              />
            </div>

            <p className="text-center text-muted" style={{ fontStyle: "italic" }}>
              Enter your new password and confirm it to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert message={error} type="error" showIcon closeText="Close" />
              )}

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password<span className="text-danger">*</span>
                </label>
                <Input.Password
                  size="large"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  placeholder="Enter your new password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <Input.Password
                  size="large"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="my-3">
                <Button
                  size="large"
                  htmlType="submit"
                  type="primary"
                  disabled={loading}
                  block
                >
                  {loading ? "Resetting password..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </div>

          {/* Left Side with Image */}
          <div
            className="reset-pwd-image"
            style={{
              flex: 1,
              maxWidth: "450px",
              minWidth: "300px", // Ensure it doesn't shrink too much
              padding: 0, // Remove any padding
              borderRadius: "8px", // Match the card's border-radius
              overflow: "hidden", // Ensure the image is contained within the rounded corners
            }}
          >
            <img
              src={loginImg}
              alt="Reset Password Illustration"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px", // Match the card's border-radius
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPwd;
