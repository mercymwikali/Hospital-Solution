import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import useSignIn from "../hooks/useSignIn";
import { Alert, Button, Card, Input } from "antd";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    error,
  } = useSignIn();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-4 mt-5">
        <Card>
          <h3 className="text-center text-muted">Welcome Back</h3>
          <p className="text-center text-muted">
            Sign in to access your account
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {error && (
              <Alert message={error} type="error" showIcon closeText="Close" />
            )}

            <div className="mb-3 ">
              <label htmlFor="email" className="form-label">
                Email<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span
                  id="togglePassword"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                  className="input-group-text"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="py-2 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-muted"
                htmlFor="flexCheckDefault"
              >
                Remember me
              </label>
            </div>

            <div className="mb-3">
              <Button htmlType="submit" type="primary" disabled={loading} block>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="text-muted">
            Don't have an account?{" "}
            <a href="/register" className="text-primary">
              Register
            </a>
          </p>
        </Card>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
