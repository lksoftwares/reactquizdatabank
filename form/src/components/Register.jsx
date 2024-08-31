import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "/src/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    user_Name: "",
    user_Email: "",
    user_Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // POST request to the registration endpoint
      const response = await axios.post(
        "http://192.168.1.63:7241/Users/register",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setSuccess("Registration successful!");
      console.log(response.data);
      toast.success("Register Successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <img src="src/images/pic1.jpg" alt="" />

      <div className="login-wrapper">
        <div className="login-form-container">
          <h2 className="login-title">Register Here</h2>

          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="label">User_Name</Form.Label>
              <Form.Control
                type="name"
                name="user_Name"
                placeholder="Enter name"
                value={formData.User_Name}
                className="input"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label">User_Email</Form.Label>
              <br />
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="user_Email"
                onChange={handleChange}
                value={formData.User_Email}
                className="input"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label">User_Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Enter Password"
                className="input"
                name="user_Password"
                value={formData.User_Password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <span className="align">Already Have Account?</span>
            <Link to="/">
              <a href="" className="align">
                Login here
              </a>
            </Link>
            <p className="align">or</p>

            <Button variant="primary" type="submit" className="login-button">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
