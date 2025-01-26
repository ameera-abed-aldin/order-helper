

import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import{useNavigate} from "react-router";
import { useAuth } from "./AuthContext";
import { Link } from "react-router";
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
    username: Yup.string().required("Required"),
});
export  function Rigister() {
  const { login } = useAuth();

  const nevigate=useNavigate();
  const cities=["Jerusalem", "Bethlehem", "Hebron", "Nablus", "Ramallah", "Jenin", "Tulkarem", "Qalqilya", "Salfit"]
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
      email: "",
      phone: "",

    },

    validationSchema: SignupSchema,
    onSubmit: (values) => {
 
    },
  });

  return (
    <>
    <h5 className="mb-4">Create Account</h5>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <p className="text-danger fs-7 text">{formik.touched.password && formik.errors.password}</p>
        

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />       
        </Form.Group>
        <p className="text-danger fs-7">
            {formik.touched.email && formik.errors.email}
          </p>

          
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="phone"
            placeholder="phone number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />       
        </Form.Group>
        <p className="text-danger fs-7">
            {formik.touched.phone && formik.errors.phone}
          </p>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <select class="form-select" aria-label="Default select example">
            {cities.map((city,index)=><option key={index}>{city}</option>)} 
          </select>
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />       
        </Form.Group>
        <p className="text-danger fs-7">
            {formik.touched.password && formik.errors.password}
          </p>
             
        <Button variant="primary" type="submit" className="btn-purple w-100">
          Create
        </Button>
        <div>
        <Form.Text className="text-muted fs-7">
           You already Have Account ? <Link to="/login" >Login</Link>
          </Form.Text>
        </div>
      </Form>
    </>
  );
}
