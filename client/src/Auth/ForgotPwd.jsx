import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Alert, Button, Card, Input } from "antd";
import logoLogin from "../assets/images/logoLogin.png"; // Add the logo image import here
import logo from "../assets/images/logo.png"; // Add the logo image import here
import loginImg from "../assets/images/loginImg.jpg";

const ForgotPwd = () => {
  const [identifier, setIdentifier] = useState(""); // Email or Staff Number
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change for identifier (email or staff number)
  const handleInputChange = (e) => {
    setIdentifier(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier) {
      setError("Please enter your email or staff number.");
      return;
    }

    setLoading(true);

    // Simulate an API request to fetch or verify the identifier
    try {
      // Here you would make an API call for resetting the password
      // Example: await api.resetPassword(identifier);

      // Simulate success
      console.log("Password reset request for:", identifier);
      setError(""); // Clear error if successful
      alert("Password reset link sent!"); // Alert for demonstration
    } catch (err) {
      setError("An error occurred while requesting password reset.");
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
            {/* Logo above the Forgot Password message */}
            <div className="text-center mb-3">
              <img
                src={logoLogin}
                alt="Logo"
                style={{ width: "230px", height: "auto" }} // Adjust the size as needed
              />
            </div>

            <p className="text-center text-muted" style={{ fontStyle: "italic" }}>
              Enter your email or staff number to reset your password
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert message={error} type="error" showIcon closeText="Close" />
              )}

              <div className="mb-3">
                <label htmlFor="identifier" className="form-label">
                  Email or Staff Number<span className="text-danger">*</span>
                </label>
                <Input
                  size="large"
                  type="text"
                  name="identifier"
                  id="identifier"
                  value={identifier}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email or staff number"
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
                  {loading ? "Sending request..." : "Send Reset Link"}
                </Button>
              </div>
            </form>

          </div>

          {/* Left Side with Image */}
          <div
            className="forgot-pwd-image"
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
              alt="Forgot Password Illustration"
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

export default ForgotPwd;
