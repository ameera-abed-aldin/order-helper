import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { Link } from "react-router";

// Validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "USER", // Default role
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        // Determine the endpoint based on the selected role
        const endpoint =
          values.role === "SUPPLIER"
            ? "http://localhost:8080/api/v1/auth/supplier/authenticate"
            : "http://localhost:8080/api/v1/auth/authenticate";

        // Send login request
        const response = await axios.post(endpoint, {
          username: values.username,
          password: values.password,
        });

        // Handle successful login
        login(response.data.token); 
        // Assuming the backend returns a token and user data
        console.log(response.data.token)
        
        setSuccessMessage("Logged in successfully!");
        navigate("/admin/dashboard"); // Redirect to home page
      } catch (error) {
        setError("Login failed. Please check your credentials.");
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h5 className="mb-4">Login</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Form onSubmit={formik.handleSubmit}>
        {/* Username Field */}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && !!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Role Selection Field */}
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.role && !!formik.errors.role}
          >
            <option value="USER">User</option>
            <option value="SUPPLIER">Supplier</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.role}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        {/* Register Link */}
        <Form.Text className="text-muted fs-7 mt-3 d-block text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </Form.Text>
      </Form>
    </div>
  );
}