import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "/src/components/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    userRole: "",
    user_Email: "",
    user_Password: "",
    errors: "",
  });
  const handlechng = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // get roles
  const [selectOptions, setSelectOptions] = useState("");
  function handleChoose(data) {
    setSelectOptions(data);
  }
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://192.168.1.63:7241/Roles/getallrole",
        });
        const userOptions = response.data.map((user) => ({
          value: user.role_ID,
          label: user.roleName,
        }));
        setOptions(userOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  //post data

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);

    try {
      console.log("formData", formData);

      // POST request to the registration endpoint
      const response = await axios.post(
        "http://192.168.1.63:7241/Users/Login",
        formData
      );
      console.log("formData546", response.data.token);
      localStorage.setItem("token", response.data.token);
      setSuccess("Registration successful!");
      console.log(response.data);
      toast.success("Register Successfully");
      navigate("/inputques");
    } catch (errors) {
      toast.error(
        "You have entered invalid information...Please enter valid details"
      );
    } finally {
      setLoading(false);
    }
  };

  // const Token =response.token

  return (
    <div>
      <ToastContainer />
      <img src="src/images/pic1.jpg" alt="" />

      <div className="login-wrapper log">
        <div className="login-form-container">
          <h2 className="login-title">Login Here</h2>

          <Form onSubmit={handleSubmit} className="login-form">
            {/* <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="label">UserRole :</Form.Label>
              <Select
                options={options}
                type="text"
                name="userRole"
                placeholder="Select userRole"
                value={[formData.userRole, selectOptions]}
                className="input"
                isSearchable={true}
                onChange={handleChoose}
                required
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicUserRole">
              <Form.Label className="label">UserRole :</Form.Label>
              <Form.Control
                type="text"
                name="userRole"
                placeholder="Enter role"
                value={formData.userRole}
                className="input input2"
                onChange={handlechng}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="label">Username :</Form.Label>
              <Form.Control
                type="email"
                name="user_Email"
                placeholder="Enter username"
                value={formData.user_Email}
                className="input input2"
                onChange={handlechng}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label">Password :</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Enter Password"
                className="input"
                name="user_Password"
                value={formData.user_Password}
                onChange={handlechng}
                required
              />
            </Form.Group>
            <br />
            <span className="align">Don't Have Account?</span>
            <Link to="/register">
              <a href="" className="align">
                Register
              </a>
            </Link>

            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
